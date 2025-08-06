import { adapterResultView } from "#features/adapterBody/adapterResult.view";
import { apiService } from "#services";
import $store from "#store";
import * as monaco from "monaco-editor/esm/vs/editor/editor.main.js";
import "./monaco.scss";

(self as any).MonacoEnvironment = {
    getWorkerUrl: function (_: string, label: string) {
        if (label === "json") {
            return "./dist/vs/language/json/json.worker.js";
        }
        if (label === "css" || label === "scss" || label === "less") {
            return "./dist/vs/language/css/css.worker.js";
        }
        if (label === "html" || label === "handlebars" || label === "razor") {
            return "./dist/vs/language/html/html.worker.js";
        }
        if (label === "typescript" || label === "javascript") {
            return "./dist/vs/language/typescript/ts.worker.js";
        }
        return "./dist/vs/editor/editor.worker.js";
    }
}

const container = document.querySelector("#editor");
let editor = monaco.editor.create(container, {
    value: ``,
    language: "typescript",
    theme: "vs-dark",
    automaticLayout: true,
    lineNumbersMinChars: 2,
    minimap: { enabled: false }
});
VQL_reset(false);

export default editor;
export { monaco };

export function getQueryRaw() {
    return editor.getValue();
}

export function getQuery(silent = false) {
    let code = getQueryRaw();

    const start = code.indexOf("=");
    if (start === -1) {
        if (!silent) alert("Invalid query. Must start with `... =`");
        return null;
    }

    const end = code.indexOf(";;");
    if (end === -1) {
        if (!silent) alert("Invalid query. Must end with `;;`");
        return null;
    }

    code = code.substring(start + 1, end);

    try {
        const query = new Function("return " + code)();
        return query;
    } catch (e) {
        if (!silent) alert("Invalid query: " + e.message);
        return null;
    }
}

export async function VQL_run() {
    const query = getQuery();
    if (!query || Object.keys(query).length === 0) return;

    const jsonQuery = JSON.stringify(query);
    let history = $store.history.get();
    history = history.filter(q => q !== jsonQuery);
    history.push(jsonQuery);
    $store.history.set(history);

    console.log(query);
    const result = await apiService.fetchVQL(query);
    console.log(result);

    if (query?.d?.find || query?.d?.findOne || query?.d?.f) {
        const op = query.d.find ?? query.d.findOne ?? query.d.f;
        adapterResultView.render(result, query.db, op.collection);
    }
    else if (query?.r)
        adapterResultView.render(result, "r//" + query.r.path[0], query.r.path[1]);
    else if (typeof query === "string" && typeof result === "object")
        adapterResultView.render(result, "qs/", query);
    else
        adapterResultView.clear();

    const newCode = editor.getValue() + `\n\n//====Result====\nvar result_${Date.now()} = ` + JSON.stringify(result, null, 2);
    editor.setValue(newCode);
}

export function VQL_reset(ask = true) {
    if (ask) {
        if (!window.confirm("Reset query?")) return;
    }
    adapterResultView.clear();
    editor.setValue(`q = {\n\t\n};;`);
}

export function setQuery(query: string) {
    editor.setValue(query);
}

qs("#eb-run").on("click", VQL_run);
qs("#eb-reset").on("click", () => VQL_reset());
