import { cfg } from "./config";
import { configTextarea } from "./html";

const aliasInput = qi("#alias");
const aliasSelect = qs<HTMLSelectElement>("#alias-select");
const nameInput = qi("#name");
const authInput = qi("#auth");
const urlInput = qi("#url");

export function buildSelect() {
    const keys = configTextarea.value.split("\n").map(line => line.split(" ")[0]).filter(Boolean);
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
    url.username = "";
    url.password = "";
    urlInput.value = url.href;
}

aliasInput.addEventListener("change", () => setValues(aliasInput.value));
aliasSelect.addEventListener("change", () => setValues(aliasSelect.value));

qs<HTMLFormElement>("form").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = aliasInput.value;
    const url = new URL(urlInput.value);
    url.username = nameInput.value;
    url.password = authInput.value;

    if (!aliasSelect.value) {
        configTextarea.value += `\n${name} ${url.toString()}\n`;
        buildSelect();
        aliasSelect.value = name;
        return;
    }

    configTextarea.value = configTextarea
        .value
        .split("\n")
        .map(line => {
            if (!line.trim()) return line;
            const key = line.split(" ")[0];
            if (key === name)
                return `${name} ${url.toString()}`;
            return line;
        })
        .join("\n");

    buildSelect();
});
