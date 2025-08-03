import VQLProcessor, { VQLConfig } from "@wxn0brp/vql";
export const VQL = new VQLProcessor(
    {},
    null,
    new VQLConfig({ noCheckPermissions: true, strictSelect: false })
);
