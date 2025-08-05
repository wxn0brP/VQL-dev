import { cfg } from "./config";
import { textarea } from "./html";

const aliasInput = qsi("#alias");
const aliasSelect = qs<HTMLSelectElement>("#alias-select");
const nameInput = qsi("#name");
const authInput = qsi("#auth");
const urlInput = qsi("#url");

export function buildSelect() {
    const keys = Object.keys(cfg);
    aliasSelect.innerHTML = "";
    const add = document.createElement("option");
    add.value = "";
    add.text = "Add";
    aliasSelect.add(add);

    for (const key of keys) {
        const option = document.createElement("option");
        option.value = key;
        option.text = key;
        aliasSelect.add(option);
    }
}

function setValues(name: string) {
    if (!cfg[name]) return;
    const url = new URL(cfg[name]);

    aliasSelect.value = name;
    aliasInput.value = name;
    nameInput.value = url.username;
    authInput.value = url.password;
    urlInput.value = url.origin;
}

aliasInput.addEventListener("change", () => setValues(aliasInput.value));
aliasSelect.addEventListener("change", () => setValues(aliasSelect.value));

qs<HTMLFormElement>("form").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = aliasInput.value;
    const url = new URL(urlInput.value);
    url.username = nameInput.value;
    url.password = authInput.value;

    textarea.value = textarea
        .value
        .split("\n")
        .map(line => {
            if (!line.trim()) return line;
            const key = line.split(" ")[0];
            if (key === name) 
                return `${name} ${url.href}`;
            return line;
        })
        .join("\n");
    
    buildSelect();
});