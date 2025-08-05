import { UiComponent } from "@wxn0brp/flanker-ui";
import "./queryHistory.scss";
import $store from "#store";
import { setQuery } from "#features/monaco";
import { setCollectionTypes } from "#features/monaco/monaco.types";

const HISTORY_KEY = "vql-query-history";

class QueryHistoryView implements UiComponent {
    element: HTMLDivElement;

    mount() {
        this.element = document.querySelector("#query-history");
        this.render();

        this.element.addEventListener("click", (e) => {
            const target = e.target as HTMLElement;
            if (target.matches(".query-history-item")) {
                e.stopPropagation();
                setQuery("q = " + target.getAttribute("data-query") + ";;");
                setCollectionTypes();
            }
        });

        $store.history.subscribe(() => this.render());
        $store.history.subscribe(val => localStorage.setItem(HISTORY_KEY, JSON.stringify(val)));

        $store.history.set(JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]"));
    }

    render() {
        this.element.innerHTML = "";
        const history = $store.history.get().toReversed();
        for (const query of history) {
            const item = document.createElement("pre");
            item.classList.add("query-history-item");
            item.setAttribute("data-query", transformHistoryEntry(query, 4));

            let textContent = transformHistoryEntry(query, 2);
            if (textContent.startsWith('"') && textContent.endsWith('"')) textContent = textContent.slice(1, -1);
            item.textContent = textContent;
            this.element.appendChild(item);
        }
    }
}

export function transformHistoryEntry(query: string, padding: number) {
    query = JSON.stringify(JSON.parse(query), null, padding);
    query = query.replace(/"([a-zA-Z_$][a-zA-Z0-9_$]*)":/g, "$1:");
    return query;
}

export const queryHistoryView = new QueryHistoryView();