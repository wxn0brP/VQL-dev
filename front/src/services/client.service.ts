import { AdaptersList_Entry } from "#features/adaptersList/types";
import { IService } from "./types";

class ChannelClient {
    private channel: BroadcastChannel;
    private pending: Map<string, (res: any) => void> = new Map();

    constructor() {
        this.channel = new BroadcastChannel("VQL");
        this.channel.onmessage = this.handleMessage.bind(this);
    }

    private handleMessage(e: MessageEvent) {
        const { type, data } = e.data;

        if (type.startsWith("vql-")) {
            const id = type.slice(4);
            const resolve = this.pending.get(id);
            if (resolve) {
                resolve(data);
                this.pending.delete(id);
            }
        } else if (type === "getAdapters") {
            const resolve = this.pending.get("getAdapters");
            if (resolve) {
                resolve(data);
                this.pending.delete("getAdapters");
            }
        }
    }

    async getAdapters(): Promise<AdaptersList_Entry[]> {
        return new Promise((resolve) => {
            this.pending.set("getAdapters", resolve);
            this.channel.postMessage({ type: "getAdapters" });
        });
    }

    async vql(query: string): Promise<any> {
        const id = crypto.randomUUID();
        return new Promise((resolve) => {
            this.pending.set(id, resolve);
            this.channel.postMessage({ type: "vql", data: { id, query } });
        });
    }

    close() {
        this.channel.close();
    }
}

const client = new ChannelClient();

const clientService: IService = {
    fetchVQL(query: string): Promise<any> {
        return client.vql(query);
    },
    getAdapters(): Promise<AdaptersList_Entry[]> {
        return client.getAdapters();
    }
}

export default clientService;