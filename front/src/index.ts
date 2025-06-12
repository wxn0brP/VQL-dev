import "@wxn0brp/flanker-ui/html";
import { componentVars } from "@wxn0brp/flanker-ui";
import { fetchVQL, initVQLClient } from "@wxn0brp/vql-client";
import { defaultFetchUrl } from "./init";

initVQLClient({
    defaultFetchUrl: defaultFetchUrl + "/VQL",
});

componentVars.fetchVQL = fetchVQL;
await import("#features/init");

export { };
