import $store from "#store";
import { mountView } from "@wxn0brp/flanker-ui";

export const adapterCollectionsView = (element: HTMLDivElement, adapterId: string) => mountView({
    selector: element,
    query: `${adapterId} getCollections`,
    template: (item) => `<button data-collection="${item}">${item}</button>`,
    events: {
        click: {
            button: (el, e) => {
                $store.selectedAdapter.set(adapterId);
                $store.selectedCollection.set(el.getAttribute("data-collection"));
            }
        } 
    }
})