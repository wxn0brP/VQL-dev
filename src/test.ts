import VQLProcessor, { createValtheraAdapter, VQLConfig } from "@wxn0brp/vql";
import { GateWarden } from "@wxn0brp/gate-warden";
import { Valthera } from "@wxn0brp/db";
import DevPanelBackend from "./back";

const db = new Valthera("data/dev-db");
const gw = new GateWarden("data/dev-auth");

const api = createValtheraAdapter({
    meta: {
        type: "api",
        version: "0.1.0",
        description: "Test DB for VQL Dev Panel",
    },
    async getCollections() {
        return ["collection1", "collection2", "collection3"];
    },
    async find(collection, search, context, options, findOpts) {
        return [];
    },
});

const processor = new VQLProcessor(
    {
        dev: db,
        api,
    },
    gw,
    new VQLConfig({
        noCheckPermissions: true,
        strictSelect: false
    })
);

const panel = new DevPanelBackend(processor, { port: 5000 });
panel.start();
