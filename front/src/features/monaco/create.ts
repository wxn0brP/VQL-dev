import * as monaco from "monaco-editor/esm/vs/editor/editor.main.js";

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

const container = qs("#editor");
let editor = monaco.editor.create(container, {
    value: ``,
    language: "typescript",
    theme: "vs-dark",
    automaticLayout: true,
    lineNumbersMinChars: 2,
    minimap: { enabled: false }
});

export default editor;
export { monaco };