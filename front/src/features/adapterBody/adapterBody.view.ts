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

        setUpResize();
    }
}

function setUpResize() {
    const editor = qs("#editor");
    const resize = qs("#resize");

    let isResizing = false;
    resize.addEventListener("mousedown", () => isResizing = true);
    document.addEventListener("mouseup", () => isResizing = false);

    document.addEventListener("mousemove", (e) => {
        if (!isResizing) return;
        const px = window.innerWidth - e.clientX;
        editor.style.setProperty("--w", px + "px");
    });
}

const adapterBodyView = new AdapterBodyView();
export default adapterBodyView;