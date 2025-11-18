import { doConfig } from "./config";
import { db } from "./vql";

export const textarea = document.querySelector("textarea");
export const ul = document.querySelector("ul");
export const memoryDbTextarea = document.querySelector<HTMLTextAreaElement>("#memory-db");

document.querySelector("#run").addEventListener("click", () => doConfig());
textarea.addEventListener("keyup", (e) => {
    if (e.shiftKey && e.key === "Enter") {
        doConfig();
    }
});

document.querySelector("#save").addEventListener("click", () => {
    const data = textarea.value;
    localStorage.setItem("vql-server-config", data);
});

function dumpMemoryDb() {
    const memoryAction = db.dbAction as any;
    memoryDbTextarea.value = JSON.stringify(Object.fromEntries(memoryAction.memory.entries()), null, 2);
}

document.querySelector("#memory-db-dump").addEventListener("click", () => dumpMemoryDb());

document.querySelector("#memory-db-load").addEventListener("click", () => {
    try {
        const memoryAction = db.dbAction as any;
        const data = JSON.parse(memoryDbTextarea.value);
        memoryAction.memory = new Map(Object.entries(data));
        alert("Memory DB loaded!");
    } catch (e) {
        console.error(e);
        alert("Error loading data into memory DB. Check console.");
    }
});

setTimeout(() => {
    const data = localStorage.getItem("vql-server-config");
    if (data) {
        textarea.value = data;
        doConfig();
    }
    dumpMemoryDb();
}, 100);