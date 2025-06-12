import VQLProcessor, { createValtheraAdapter, VQLConfig } from "@wxn0brp/vql";
import { Valthera } from "@wxn0brp/db";
import DevPanelBackend from ".";

const db = new Valthera("data/dev-db");

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
    null,
    new VQLConfig({
        noCheckPermissions: true,
        strictSelect: false
    })
);

const panel = new DevPanelBackend(processor, { port: 5000 });
panel.start();
