import { doConfig } from "./config";

export const textarea = document.querySelector("textarea");
export const ul = document.querySelector("ul");

document.querySelector("button").addEventListener("click", () => doConfig());
textarea.addEventListener("keyup", (e) => {
    if (e.shiftKey && e.key === "Enter") {
        doConfig();
    }
});
