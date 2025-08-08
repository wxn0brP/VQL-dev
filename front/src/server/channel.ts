import { ValtheraRemote } from "@wxn0brp/db-client";
import { VQL } from "./vql";

export const channel = new BroadcastChannel("VQL");

function getAdapterMeta(id: string, db: ValtheraRemote) {
    let version = db.version;
    if (id === "local") version += "-local.0";
    else version += "-client.0";

    const adapter = {
        logic_id: id,
        type: "valthera",
        version,
    }
    return adapter;
}

function getAdapters() {
    const adapters = [];
    for (const [key, db] of Object.entries(VQL.dbInstances)) {
        adapters.push(getAdapterMeta(key, db as any));
    }
    return adapters;
}

channel.onmessage = async (e) => {
    const data = e.data.data;
    const type = e.data.type;
    console.log(type, data);

    if (type === "getAdapters") {
        channel.postMessage({ type: "getAdapters", data: getAdapters() });
    }
    else if (type === "vql") {
        const id = data.id;
        const res = await VQL.execute(data.query, {});
        channel.postMessage({ type: "vql-" + id, data: res });
    }
}