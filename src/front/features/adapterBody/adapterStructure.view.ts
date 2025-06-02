import $store from "#/store";
import { createComponent } from "@wxn0brp/flanker-ui"
import { formatUnifiedTypes } from "./helpers";

export const adapterStructureView = createComponent({
    selector: "#adapter-structure-content",
    autoLoad: [
        `{{#each data}}<div><b>{{0}}:</b> <span>{{1}}</span></div>{{/each}}`,
        {
            query: (limit: number = 10) => $store.selectedAdapter.get() + " " + $store.selectedCollection.get() + " o.max = " + limit,
            transform: (data) => ({ data: Object.entries(formatUnifiedTypes(data, true)) })
        }
    ]
});