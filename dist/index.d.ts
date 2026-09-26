import { ValtheraClass, ValtheraCompatible } from "@wxn0brp/db-core";
import FalconFrame, { RouteHandler, Router } from "@wxn0brp/falcon-frame";
import VQLProcessor from "@wxn0brp/vql";
import { ValtheraResolverMeta } from "@wxn0brp/vql/helpers/apiAbstract";
export interface DevPanelOptions {
    port?: number;
    origins?: string[] | string;
}
export declare function setup_VQL_DEV(app: Router, processor: VQLProcessor): void;
export declare function isValtheraInstance(db: any): db is ValtheraClass;
export declare function getAdapterMeta(id: string, db: ValtheraCompatible): ValtheraResolverMeta;
export declare function getAdapterHTTP(processor: VQLProcessor): RouteHandler;
export declare function getAdaptersHTTP(processor: VQLProcessor): RouteHandler;
export declare class VqlDevPanel {
    _app: FalconFrame;
    _port: number;
    _processor: VQLProcessor;
    _origins: string[];
    _started: boolean;
    constructor(processor: VQLProcessor, options?: DevPanelOptions);
    _setupHTTP(): void;
    start(): void;
}
