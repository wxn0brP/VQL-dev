import { mountView } from "@wxn0brp/flanker-ui";
import $store from "#store";
import { formatUnifiedTypes } from "./helpers";

export const adapterStructureView = () => mountView({
    selector: "#adapter-structure-content",
    query: async (limit: number = 10) => {
        return $store.selectedAdapter.get() + " " + $store.selectedCollection.get() + " o.max = " + limit
    },
    template: (item) => `<div><b>${item[0]}:</b> <span>${item[1]}</span></div>`,
    transform: (data) => Object.entries(formatUnifiedTypes(data, true))
})