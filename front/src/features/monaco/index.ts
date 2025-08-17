import { adapterResultView } from "#features/adapterBody/adapterResult.view";
import { apiService } from "#services";
import $store from "#store";
import editor, { monaco } from "./create";
import "./monaco.scss";

export function getQueryRaw() {
    return editor.getValue();
}

editor.addCommand(
    monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, // Ctrl+Enter
    () => VQL_run()
);

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
VQL_reset(false);