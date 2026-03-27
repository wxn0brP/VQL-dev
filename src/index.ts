import { ValtheraClass, ValtheraCompatible } from "@wxn0brp/db-core";
import FalconFrame, { RouteHandler, Router } from "@wxn0brp/falcon-frame";
import VQLProcessor, { FF_VQL } from "@wxn0brp/vql";
import { parseVQLS } from "@wxn0brp/vql/cpu/string/index";
import { ValtheraResolverMeta } from "@wxn0brp/vql/helpers/apiAbstract";

export interface DevPanelOptions {
    port?: number;
    origins?: string[] | string;
}

export function setup_VQL_DEV(app: Router, processor: VQLProcessor) {
    const router = app.router("/VQL");

    router.use((req, res, next) => {
        if (req.socket.remoteAddress !== "127.0.0.1") {
            return res.status(403).send("You are not my master!");
        }
        next();
    })

    router.get("/health", () => "Life expectancy, Hide and Seek, Castling, Scars");

    router.post("/query-string", async (req, res) => {
        try {
            const query = req.body.query;
            const result = parseVQLS(query);
            return { err: false, result };
        } catch (err: any) {
            res.status(500)
            return { err: true, msg: err.message };
        }
    });

    router.get("/get-adapters", getAdaptersHTTP(processor));
    router.get("/get-adapter", getAdapterHTTP(processor));
}

export function isValtheraInstance(db: any): db is ValtheraClass {
    return (
        typeof db?.dbAction === "object" &&
        typeof db?.executor === "object" &&
        !("meta" in db)
    );
}

export function getAdapterMeta(id: string, db: ValtheraCompatible): ValtheraResolverMeta {
    const adapter: ValtheraResolverMeta = {
        logic_id: id,
        type: "unknown",
        version: "0.0.0",
    }
    if (db instanceof ValtheraClass || isValtheraInstance(db)) {
        adapter.type = "valthera";
        if (db.version) adapter.version = db.version + "-valthera.0";
    } else if ("meta" in db) {
        Object.assign(adapter, db.meta);
    }
    return adapter;
}

export function getAdapterHTTP(processor: VQLProcessor): RouteHandler {
    return (req, res) => {
        try {
            const id = req.query.id || req.body.id;
            const adapter = processor.dbInstances[id];
            if (!adapter) return res.status(404).json({ error: "Adapter not found" });

            return getAdapterMeta(id, adapter);
        } catch (err: any) {
            res.status(500).json({ error: err.message });
        }
    }
}

export function getAdaptersHTTP(processor: VQLProcessor): RouteHandler {
    return async (req, res) => {
        try {
            return Object.keys(processor.dbInstances).map((key) => getAdapterMeta(key, processor.dbInstances[key]));
        } catch (err: any) {
            res.status(500).json({ error: err.message });
        }
    }
}

export class VqlDevPanel {
    _app: FalconFrame;
    _port: number;
    _processor: VQLProcessor;
    _origins = [
        "https://wxn0brp.github.io",
        "localhost",
        "localhost:*",
        "127.0.0.1",
        "127.0.0.1:*",
    ];
    _started = false;

    constructor(processor: VQLProcessor, options: DevPanelOptions = {}) {
        this._processor = processor;
        this._port = options?.port ?? 48652;
        this._app = new FalconFrame();

        if (options?.origins)
            this._origins = [options.origins].flat();

        const envOrigins = process.env.VQL_DEV_PANEL_ORIGINS;
        if (envOrigins)
            this._origins.push(...envOrigins.split(",").map(o => o.trim()));
    }

    _setupHTTP() {
        this._app.setOrigin(this._origins);
        setup_VQL_DEV(this._app, this._processor);
        FF_VQL(this._app, this._processor);

        this._app.get("/", () => {
            return "Still running. Must've missed the shutdown memo.";
        });
    }

    public start() {
        if (this._started)
            return console.warn("[DevPanelBackend] Already started.");

        if (process.env.NODE_ENV === "production")
            throw new Error("VQL DevPanel is not available in production mode.");

        this._started = true;
        this._app.listen(this._port, () => {
            console.log(`[DevPanelBackend] Running at http://localhost:${this._port}`);
        });

        this._setupHTTP();
    }
}
