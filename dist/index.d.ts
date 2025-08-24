import VQLProcessor from "@wxn0brp/vql";
interface DevPanelOptions {
    port?: number;
    origins?: string[] | string;
}
export declare class VqlDevPanel {
    private app;
    private port;
    private processor;
    private origins;
    private started;
    constructor(processor: VQLProcessor, options?: DevPanelOptions);
    private setupHTTP;
    start(): void;
}
export {};
