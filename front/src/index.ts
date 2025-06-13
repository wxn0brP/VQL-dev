import "@wxn0brp/flanker-ui/html";
import { initVQLClient } from "@wxn0brp/vql-client";
import { defaultFetchUrl } from "./init";

initVQLClient({
    defaultFetchUrl: defaultFetchUrl + "/VQL",
});

await import("#features/init");

export { };
