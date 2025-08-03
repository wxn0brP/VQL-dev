import { AdaptersList_Entry } from "#features/adaptersList/types";
import { VqlQueryRaw } from "@wxn0brp/vql-client/vql";

export interface IService {
    fetchVQL<T = any>(query: VqlQueryRaw): Promise<T>;
    getAdapters(): Promise<AdaptersList_Entry[]>;
}