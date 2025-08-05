import { ValtheraRemote } from "@wxn0brp/db-client";
import { textarea, ul } from "./html";
import { VQL } from "./vql";
import { buildSelect } from "./form";

type Config = Record<string, string>;
export let cfg: Config = {};

function setDatabases(cfg: Config) {
    const instances = {};
    for (const [key, value] of Object.entries(cfg)) {
        instances[key] = new ValtheraRemote(value);
    }
    VQL.dbInstances = instances;
    VQL.relation.dbs = instances;
}

function getConfig() {
    cfg = {};
    const lines = textarea.value.split("\n");
    for (const line of lines) {
        if (!line) continue;
        const [name, value] = line.split(" ");
        cfg[name] = value;
    }
}

export async function doConfig() {
    getConfig();
    setDatabases(cfg);

    ul.innerHTML = "";

    const keys = Object.keys(cfg);
    keys.forEach(async (key) => {
        const original = cfg[key];
        const url = new URL(original);
        const name = url.username;
        const auth = url.password;
        url.password = "";
        url.username = "";

        let ok = false;
        try {
            await fetch(url + "/db/getCollections", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": auth,  
                },
                body: JSON.stringify({ db: name }),
            });
            ok = true;
        } catch (err) {
            ok = false;
        }

        const li = document.createElement("li");
        li.textContent = `${key}: ${ok ? "OK" : "ERR"}`;
        ul.appendChild(li);
    });
    buildSelect();
}