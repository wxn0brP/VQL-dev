import { defaultFetchUrl } from "#init";
import { IService } from "./types";

export let apiService: IService = null;

switch (defaultFetchUrl.toLowerCase()) {
    case "web":
        apiService = (await import("./client.service")).default;
        break;
    case "map":
        apiService = (await import("./map.service")).default;
        break;
    default:
        apiService = (await import("./fetch.service")).default;
        break;
}
