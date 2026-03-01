import { createStore } from "@wxn0brp/flanker-ui";
import { AdaptersList_Entry } from "./features/adaptersList/types";

type SortDirection = "asc" | "desc" | "original";

export const $store = createStore({
    selectedAdapter: null as string,
    selectedCollection: null as string,
    adapters: [] as AdaptersList_Entry[],
    history: [] as string[],
    tableSort: {
        column: null,
        direction: "original" as SortDirection
    },
});
