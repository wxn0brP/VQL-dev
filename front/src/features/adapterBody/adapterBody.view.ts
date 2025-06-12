import $store from "#store";
import { UiComponent, uiHelpers } from "@wxn0brp/flanker-ui";
import "./adapter.scss";
import { adapterStructureView } from "./adapterStructure.view";

class AdapterBodyView implements UiComponent {
    element: HTMLDivElement;
    adapterStructure: ReturnType<typeof adapterStructureView>;

    constructor() { }

    mount() {
        this.element = document.querySelector("#adapter-body");
        this.adapterStructure = adapterStructureView();

        $store.selectedCollection.subscribe(() => this.adapterStructure.load());
        uiHelpers.storeHide(this.element.querySelector("#adapter-structure"), $store.selectedCollection);
    }
}

const adapterBodyView = new AdapterBodyView();
export default adapterBodyView;