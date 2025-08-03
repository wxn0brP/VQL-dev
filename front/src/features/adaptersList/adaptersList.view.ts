import { setDbList } from "#features/monaco/monaco.types";
import $store from "#store";
import { UiComponent, uiHelpers } from "@wxn0brp/flanker-ui";
import { adapterCollectionsView } from "./adapterCollections.view";
import "./adapters-list.scss";
import { AdaptersList_Entry } from "./types";
import { apiService } from "#services";

class AdaptersListView implements UiComponent {
    element: HTMLDivElement;

    render(adapters: AdaptersList_Entry[]) {
        this.element.innerHTML = "";

        adapters.forEach((adapter) => {
            const detail = document.createElement("details");
            const summary = document.createElement("summary");
            summary.textContent = adapter.logic_id;
            detail.appendChild(summary);

            const container = document.createElement("div");
            container.classList.add("adapter__container");
            container.id = "adapter__" + adapter.logic_id;
            detail.appendChild(container);

            const collections = adapterCollectionsView(container, adapter.logic_id);
            
            summary.addEventListener("click", async () => {
                $store.selectedAdapter.set(adapter.logic_id);
                if (detail.open) return;
                collections.load();
            });

            this.element.appendChild(detail);
        });
    }

    mount(): void {
        this.element = document.querySelector("#adapters-list")!;
        uiHelpers.bindHandlers(this.element, {
            "#adapters-header": () => this.load(),
        });
        
        $store.selectedCollection.subscribe(collection => {
            this.element.querySelectorAll("[data-collection]").forEach((button) => {
                button.classList.toggle("selected", button.getAttribute("data-collection") === collection);
            })
        })

        $store.adapters.subscribe(adapters => {
            const names = adapters.map((adapter) => adapter.logic_id);
            setDbList(names);
        });

        this.load();
    }

    async load() {
        const adapters = await apiService.getAdapters();
        $store.adapters.set(adapters);
        this.render(adapters);
    }
}

export const adaptersListView = new AdaptersListView();
export default adaptersListView;