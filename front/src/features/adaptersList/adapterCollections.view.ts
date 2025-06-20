import { setTsCollectionList } from "#features/monaco/monaco.types";
import $store from "#store";
import { mountView } from "@wxn0brp/flanker-ui";

export const adapterCollectionsView = (element: HTMLDivElement, adapterId: string) => mountView({
    selector: element,
    query: `${adapterId} getCollections`,
    template: (item) => `<button data-collection="${item}">${item}</button>`,
    transform: (data) => {
        setTsCollectionList(adapterId, data);
        return data;
    },
    events: {
        click: {
            button: (el, e) => {
                $store.selectedAdapter.set(adapterId);
                $store.selectedCollection.set(el.getAttribute("data-collection"));
            }
        } 
    }
})