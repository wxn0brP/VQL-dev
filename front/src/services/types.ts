import { AdaptersList_Entry } from "#features/adaptersList/types";
import { VQLUQ } from "@wxn0brp/vql-client/vql";

export interface IService {
    fetchVQL<T = any>(query: VQLUQ): Promise<T>;
    getAdapters(): Promise<AdaptersList_Entry[]>;
}