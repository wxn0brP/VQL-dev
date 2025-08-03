import { AdaptersList_Entry } from "#features/adaptersList/types";
import $store from "#store";
import { UiComponent } from "@wxn0brp/flanker-ui";

class AdapterMetaView implements UiComponent {
    element: HTMLDivElement;

    render(adapter: AdaptersList_Entry) {
        this.element.innerHTML =
            Object.entries(adapter)
            .map(([key, value]) => `<p><strong>${key}</strong>: ${value}</p>`)
            .join("")
    }

    mount() {
        this.element = document.querySelector("#adapter-meta");

        $store.selectedAdapter.subscribe((adapterId) => {
            const adapter = $store.adapters.get().find((adapter) => adapter.logic_id === adapterId);
            if (!adapter) return console.warn(`Adapter ${adapterId} not found`);
            this.render(adapter);
        });
    }
}

const adapterMetaView = new AdapterMetaView();
export default adapterMetaView;