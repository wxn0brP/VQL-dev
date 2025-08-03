import { fetchVQL } from "@wxn0brp/vql-client";
import { VQLR } from "@wxn0brp/vql-client/vql";

export interface IApiService {
    fetchVQL<T = any>(query: VQLR | string): Promise<T>;
}

export class ApiService implements IApiService {
    fetchVQL<T = any>(query: VQLR | string): Promise<T> {
        return fetchVQL(query);
    }
}
