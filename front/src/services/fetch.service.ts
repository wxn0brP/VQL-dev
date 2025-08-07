import { VQLUQ } from "@wxn0brp/vql-client/vql";
import { IService } from "./types";
import { fetchVQL } from "@wxn0brp/vql-client";
import { AdaptersList_Entry } from "#features/adaptersList/types";
import { defaultFetchUrl } from "#init";

const fetchService: IService = {
    fetchVQL<T = any>(query: VQLUQ): Promise<T> {
        return fetchVQL(query);
    },

    getAdapters(): Promise<AdaptersList_Entry[]> {
        return fetch(defaultFetchUrl + "/VQL/get-adapters").then((res) => res.json());
    }
}

export default fetchService;