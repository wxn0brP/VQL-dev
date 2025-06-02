import "@wxn0brp/flanker-ui/html";
import { componentVars } from "@wxn0brp/flanker-ui";
import { fetchVQL } from "@wxn0brp/vql-client";
componentVars.fetchVQL = fetchVQL;

await import("#/features/init");

export { };
