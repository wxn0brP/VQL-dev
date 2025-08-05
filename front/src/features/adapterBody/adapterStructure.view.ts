import { mountView } from "@wxn0brp/flanker-ui";
import $store from "#store";
import { formatUnifiedTypes } from "./helpers";
import { apiService } from "#services";
import { adapterResultView } from "./adapterResult.view";

export const adapterStructureView = () => mountView({
    selector: "#adapter-structure-content",
    queryFunction: async (data: { limit: number }) => {
        return apiService.fetchVQL({
            db: $store.selectedAdapter.get(),
            d: {
                find: {
                    collection: $store.selectedCollection.get(),
                    search: {},
                    options: { max: data.limit || 10 }
                }
            }
        });
    },
    template: (item) => `<div><b>${item[0]}:</b> <span>${item[1]}</span></div>`,
    transform: (data) => Object.entries(formatUnifiedTypes(data, true)),
    onData(data) {
        adapterResultView.render(data);
    },
});