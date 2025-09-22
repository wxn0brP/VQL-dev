import { AdaptersList_Entry } from "#features/adaptersList/types";
import { urlParams } from "#init";
import { fetchVQL, VConfig } from "@wxn0brp/vql-client";
import { VQLUQ } from "@wxn0brp/vql-client/vql";
import { IService } from "./types";

let replace = false;
let mlRaw = urlParams.get("ml");
if (!mlRaw) {
    mlRaw = prompt("Enter ml url (comma separated):");
    if (!mlRaw) {
        alert("Missing ml url");
        throw new Error("Missing ml url");
    } else {
        urlParams.set("ml", mlRaw);
        replace = true;
    }
}

let port = urlParams.get("mp");
if (!port) {
    port = prompt("Enter map port:");
    if (!port) {
        alert("Missing map port");
        throw new Error("Missing map port");
    } else {
        urlParams.set("mp", port);
        replace = true;
    }
}

if (replace)
    window.history.replaceState(null, "", `?${urlParams.toString()}`);

const adapters: AdaptersList_Entry[] = mlRaw.split(",").map(name => {
    return {
        logic_id: name,
        type: "valthera-map",
        version: "0.0.1-map.0",
        description: "Map adapter",
    }
});

VConfig.url = !port.includes("/") ? `http://localhost:${port}/VQL` : port;

if (urlParams.has("mb")) {
    VConfig.body = JSON.parse(urlParams.get("mb"));
}

const fetchService: IService = {
    fetchVQL<T = any>(query: VQLUQ): Promise<T> {
        return fetchVQL(query);
    },

    async getAdapters(): Promise<AdaptersList_Entry[]> {
        return adapters;
    }
}

export default fetchService;