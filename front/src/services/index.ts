import { defaultFetchUrl } from "#init";
import { IService } from "./types";

export let apiService: IService = null;

if (defaultFetchUrl.toLowerCase() === "web") {
    apiService = (await import("./client.service")).default;
} else {
    apiService = (await import("./fetch.service")).default;
}
