import "@wxn0brp/flanker-ui/html";
import { VConfig } from "@wxn0brp/vql-client";
import { defaultFetchUrl } from "./init";
import "#services";

VConfig.url = defaultFetchUrl + "/VQL";

await import("#features/init");

export { };
