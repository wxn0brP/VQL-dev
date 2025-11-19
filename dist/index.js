import { ValtheraClass } from "@wxn0brp/db-core";
import FalconFrame from "@wxn0brp/falcon-frame";
import { FF_VQL } from "@wxn0brp/vql";
import { parseVQLS } from "@wxn0brp/vql/cpu/string/index";
function isValtheraInstance(db) {
    return (typeof db?.dbAction === "object" &&
        typeof db?.executor === "object" &&
        !("meta" in db));
}
function getAdapterMeta(id, db) {
    const adapter = {
        logic_id: id,
        type: "unknown",
        version: "0.0.0",
    };
    if (db instanceof ValtheraClass || isValtheraInstance(db)) {
        adapter.type = "valthera";
        if (db.version)
            adapter.version = db.version + "-valthera.0";
    }
    else if ("meta" in db) {
        Object.assign(adapter, db.meta);
    }
    return adapter;
}
export class VqlDevPanel {
    app;
    port;
    processor;
    origins = [
        "https://wxn0brp.github.io",
    ];
    started = false;
    constructor(processor, options = {}) {
        this.processor = processor;
        this.port = options?.port ?? 3000;
        this.app = new FalconFrame();
        if (options?.origins) {
            this.origins = [options.origins].flat();
        }
    }
    setupHTTP() {
        this.app.setOrigin(this.origins);
        FF_VQL(this.app, this.processor);
        this.app.post("/VQL/query-string", async (req, res) => {
            try {
                const query = req.body.query;
                const result = parseVQLS(query);
                return { err: false, result };
            }
            catch (err) {
                res.status(500);
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
            }
            catch (err) {
                res.status(500).json({ error: err.message });
            }
        });
        this.app.get("/VQL/get-adapter", async (req, res) => {
            try {
                const id = req.query.id;
                const adapter = this.processor.dbInstances[id];
                if (!adapter)
                    return res.status(404).json({ error: "Adapter not found" });
                return getAdapterMeta(id, adapter);
            }
            catch (err) {
                res.status(500).json({ error: err.message });
            }
        });
        this.app.get("/", () => {
            return "Still running. Must've missed the shutdown memo.";
        });
    }
    start() {
        if (this.started)
            return console.warn("[DevPanelBackend] Already started.");
        this.started = true;
        this.app.listen(this.port, () => {
            console.log(`[DevPanelBackend] Running at http://localhost:${this.port}`);
        });
        this.setupHTTP();
    }
}
