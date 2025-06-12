import { Valthera, ValtheraCompatible } from "@wxn0brp/db";
import FalconFrame, { PluginSystem } from "@wxn0brp/falcon-frame";
import { createCORSPlugin } from "@wxn0brp/falcon-frame/plugins/cors";
import VQLProcessor, { FF_VQL } from "@wxn0brp/vql";
import { ValtheraResolverMeta } from "@wxn0brp/vql/apiAbstract";
import { parseStringQuery } from "@wxn0brp/vql/cpu/string/index";
import { Server } from "http";

interface DevPanelOptions {
    port?: number;
    app?: FalconFrame;
    http?: Server;
    origins?: string[];
    pluginSystem?: PluginSystem;
}

function getAdapterMeta(id: string, db: ValtheraCompatible): ValtheraResolverMeta {
    const adapter: ValtheraResolverMeta = {
        logic_id: id,
        type: "unknown",
        version: "0.0.0",
    }
    if (db instanceof Valthera) {
        adapter.type = "valthera";
    } else if ("meta" in db) {
        Object.assign(adapter, db.meta);
    }
    return adapter;
}

export class DevPanelBackend {
    private app: FalconFrame;
    private port: number;
    private processor: VQLProcessor;
    private http: Server;
    private pluginSystem: PluginSystem;
    private origins = [
        "https://wxn0brp.github.io",
    ];

    constructor(processor: VQLProcessor, options?: DevPanelOptions) {
        this.processor = processor;
        this.port = options?.port ?? 3000;
        this.app = options?.app ?? new FalconFrame();
        this.http = options?.http ?? null;
        this.pluginSystem = options?.pluginSystem ?? new PluginSystem();

        if (!options.app) {
            this.app.use(this.pluginSystem.getRouteHandler());
        }

        if (options?.origins) {
            this.origins = options.origins;
        }
    }

    private setupHTTP() {
        this.pluginSystem.register(createCORSPlugin(this.origins));
        FF_VQL(this.app, this.processor);

        this.app.post("/VQL/query-string", async (req, res) => {
            try {
                const query = req.body.query;
                const result = parseStringQuery(query);
                return { err: false, result };
            } catch (err: any) {
                res.status(500)
                return { err: true, msg: err.message };
            }
        });

        this.app.get("/VQL/get-adapters", async (req, res) => {
            try {
                const result = [];

                const dbs = this.processor.dbInstances;
                Object.keys(dbs).forEach((key) => {
                    result.push(getAdapterMeta(key, dbs[key]));
                });

                return result;
            } catch (err: any) {
                res.status(500).json({ error: err.message });
            }
        });

        this.app.get("/VQL/get-adapter", async (req, res) => {
            try {
                const id = req.query.id;
                const adapter = this.processor.dbInstances[id];
                if (!adapter) return res.status(404).json({ error: "Adapter not found" });

                return getAdapterMeta(id, adapter);
            } catch (err: any) {
                res.status(500).json({ error: err.message });
            }
        });

        this.app.get("/", () => {
            return "Still running. Must've missed the shutdown memo.";
        });
    }

    public start() {
        if (!this.http) this.http = this.app.listen(this.port, () => {
            console.log(`[DevPanelBackend] Running at http://localhost:${this.port}`);
        });

        this.setupHTTP();
    }
}

export default DevPanelBackend;