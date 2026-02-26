import { AdaptersList_Entry } from "#features/adaptersList/types";
import { defaultFetchUrl, urlParams } from "#init";
import { fetchVQL, VConfig } from "@wxn0brp/vql-client";
import { VQLUQ } from "@wxn0brp/vql-client/vql";
import { IService } from "./types";

const endpoint = urlParams.get("ep") || "/VQL";
VConfig.url = defaultFetchUrl + endpoint;

const hRaw = urlParams.get("h");
if (hRaw) {
    try {
        VConfig.headers = JSON.parse(atob(hRaw));
    }
    catch (e) {
        console.error("[serverConfig] Invalid headers param:", e);
    }
}

const bRaw = urlParams.get("b");
if (bRaw) {
    try {
        VConfig.body = JSON.parse(atob(bRaw));
    }
    catch (e) {
        console.error("[serverConfig] Invalid body param:", e);
    }
}

const mlRaw = urlParams.get("ml");
const adapters: AdaptersList_Entry[] | null = mlRaw
    ? mlRaw.split(",").map((name) => ({
        logic_id: name.trim(),
        type: "valthera-map",
        version: "0.0.1-map.0",
        description: "Map adapter",
    }))
    : null;

const fetchService: IService = {
    fetchVQL<T = any>(query: VQLUQ): Promise<T> {
        return fetchVQL(query);
    },

    getAdapters(): Promise<AdaptersList_Entry[]> {
        if (adapters) return Promise.resolve(adapters);
        return fetch(defaultFetchUrl + endpoint + "/get-adapters").then((res) => res.json());
    }
};

export default fetchService;
