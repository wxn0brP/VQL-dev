import FalconFrame, { PluginSystem } from "@wxn0brp/falcon-frame";
import VQLProcessor from "@wxn0brp/vql";
import { Server } from "http";
interface DevPanelOptions {
    port?: number;
    app?: FalconFrame;
    http?: Server;
    origins?: string[];
    pluginSystem?: PluginSystem;
}
export declare class DevPanelBackend {
    private app;
    private port;
    private processor;
    private http;
    private pluginSystem;
    private origins;
    constructor(processor: VQLProcessor, options?: DevPanelOptions);
    private setupHTTP;
    start(): void;
}
export default DevPanelBackend;
