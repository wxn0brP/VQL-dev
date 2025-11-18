import { doConfig } from "./config";
import { db } from "./vql";

export const textarea = qs<HTMLTextAreaElement>("textarea");
export const ul = qs<HTMLUListElement>("ul");
export const memoryDbTextarea = qs<HTMLTextAreaElement>("#memory-db");

qs("#run").addEventListener("click", () => doConfig());
textarea.addEventListener("keyup", (e) => {
    if (e.shiftKey && e.key === "Enter") {
        doConfig();
    }
});

qs("#save").addEventListener("click", () => {
    const data = textarea.value;
    localStorage.setItem("vql-server-config", data);
});

function dumpMemoryDb() {
    const memoryAction = db.dbAction as any;
    memoryDbTextarea.value = JSON.stringify(Object.fromEntries(memoryAction.memory.entries()), null, 2);
}

function loadMemoryDb() {
    try {
        const memoryAction = db.dbAction as any;
        const data = JSON.parse(memoryDbTextarea.value);
        memoryAction.memory = new Map(Object.entries(data));
    } catch (e) {
        console.error(e);
    }
}

setTimeout(() => {
    const data = localStorage.getItem("vql-server-config");
    if (data) {
        textarea.value = data;
        doConfig();
    }
    dumpMemoryDb();
}, 100);

memoryDbTextarea.addEventListener("input", () => loadMemoryDb());
memoryDbTextarea.addEventListener("change", () => loadMemoryDb());
db.emiter.on("*", () => dumpMemoryDb());

qs("#memory-db-load-preset").addEventListener("click", async () => {
    const preset = await fetch("example.json").then((res) => res.json());
    memoryDbTextarea.value = JSON.stringify(preset, null, 2);
    loadMemoryDb();
});