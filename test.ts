import VQLProcessor, { createValtheraAdapter } from "@wxn0brp/vql";
import { createMemoryValthera } from "@wxn0brp/db-core";
import DevPanelBackend from "./src";

const db = createMemoryValthera();

const api = createValtheraAdapter({
    meta: {
        type: "api",
        version: "0.1.0",
        description: "Test DB for VQL Dev Panel",
    },
    async getCollections() {
        return ["collection1", "collection2", "collection3"];
    },
    async find() {
        return [];
    },
});

const processor = new VQLProcessor(
    {
        dev: db,
        api,
    }
);

const panel = new DevPanelBackend(processor, {
    port: 5000,
    origins: "*",
});
panel.start();
