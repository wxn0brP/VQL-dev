import { UiComponent, uiHelpers } from "@wxn0brp/flanker-ui";
import "./adapter.scss";
import { adapterStructureView } from "./adapterStructure.view";
import $store from "#/store";

class AdapterBodyView implements UiComponent {
    element: HTMLDivElement;

    constructor() { }

    mount() {
        this.element = document.querySelector("#adapter-body");
        adapterStructureView.mount();

        $store.selectedCollection.subscribe(() => adapterStructureView.load());
        uiHelpers.storeHide(this.element.querySelector("#adapter-structure"), $store.selectedCollection);
    }
}

const adapterBodyView = new AdapterBodyView();
export default adapterBodyView;