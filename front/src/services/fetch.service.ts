import { AdaptersList_Entry } from "#features/adaptersList/types";
import { defaultFetchUrl } from "#init";
import { fetchVQL, VConfig } from "@wxn0brp/vql-client";
import { VQLUQ } from "@wxn0brp/vql-client/vql";
import { IService } from "./types";

VConfig.url = defaultFetchUrl + "/VQL";

const fetchService: IService = {
    fetchVQL<T = any>(query: VQLUQ): Promise<T> {
        return fetchVQL(query);
    },

    getAdapters(): Promise<AdaptersList_Entry[]> {
        return fetch(defaultFetchUrl + "/VQL/get-adapters").then((res) => res.json());
    }
}

export default fetchService;