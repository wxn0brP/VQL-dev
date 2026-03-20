import FalconFrame, { Router } from "@wxn0brp/falcon-frame";
import VQLProcessor from "@wxn0brp/vql";
export interface DevPanelOptions {
    port?: number;
    origins?: string[] | string;
}
export declare function setup_VQL_DEV(app: Router, processor: VQLProcessor): void;
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
