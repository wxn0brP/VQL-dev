import { mountView } from "@wxn0brp/flanker-ui";
import $store from "#store";
import { formatUnifiedTypes } from "./helpers";

export const adapterStructureView = () => mountView({
    selector: "#adapter-structure-content",
    query: async (data: { limit: number }) => {
        return {
            db: $store.selectedAdapter.get(),
            d: {
                find: {
                    collection: $store.selectedCollection.get(),
                    search: {},
                    options: { max: data.limit || 10 }
                }
            }
        }
    },
    template: (item) => `<div><b>${item[0]}:</b> <span>${item[1]}</span></div>`,
    transform: (data) => Object.entries(formatUnifiedTypes(data, true))
});