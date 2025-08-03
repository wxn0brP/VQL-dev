import * as monaco from "monaco-editor/esm/vs/editor/editor.main.js";
import "./monaco.scss";
import { apiService } from "#services";

(self as any).MonacoEnvironment = {
    getWorkerUrl: function (moduleId: string, label: string) {
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

export function getQuery() {
    let code = editor.getValue();
    code = code.replace("const q: VQLR =", "");
    const end = code.indexOf("};");
    if (end !== -1) code = code.substring(0, end+1);
    const query = new Function("return " + code)();
    return query;
}

export async function VQL_run() {
    const query = getQuery();
    const result = await apiService.fetchVQL(query);

    console.log(result);

    const newCode = editor.getValue() + `\n\n//====Result====\nvar result_${Date.now()} = ` + JSON.stringify(result, null, 2);
    editor.setValue(newCode);
}

export function VQL_reset(ask = true) {
    if (ask) {
        if (!window.confirm("Reset query?")) return;
    }
    editor.setValue(`const q: VQLR = {\n\t\n};`);
}

qs("#eb-run").on("click", VQL_run);
qs("#eb-reset").on("click", () => VQL_reset());