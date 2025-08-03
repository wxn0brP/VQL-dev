import { AdaptersList_Entry } from "#features/adaptersList/types";
import { defaultFetchUrl } from "#init";

export interface IAdapterService {
    getAdapters(): Promise<AdaptersList_Entry[]>;
}

export class AdapterService implements IAdapterService {
    async getAdapters(): Promise<AdaptersList_Entry[]> {
        const adapters = await fetch(defaultFetchUrl+"/VQL/get-adapters").then((res) => res.json());
        return adapters;
    }
}
