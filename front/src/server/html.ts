import { doConfig } from "./config";

export const textarea = document.querySelector("textarea");
export const ul = document.querySelector("ul");

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

setTimeout(() => {
    const data = localStorage.getItem("vql-server-config");
    if (data) {
        textarea.value = data;
        doConfig();
    }
}, 100);