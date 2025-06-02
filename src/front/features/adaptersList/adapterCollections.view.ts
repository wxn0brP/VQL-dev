import $store from "#/store";
import { createComponent } from "@wxn0brp/flanker-ui";

export const adapterCollectionsView = (element: HTMLDivElement, adapterId: string) => {
    return createComponent({
        selector: element,
        data: {
            adapterId
        },
        autoLoad: [
            `<button data-collection="{{}}" data-click="collection">{{}}</button>`,
            `${adapterId} getCollections`
        ],
        events: {
            collection({ collection }) {
                $store.selectedAdapter.set(adapterId);
                $store.selectedCollection.set(collection);
            }
        }
    })
}