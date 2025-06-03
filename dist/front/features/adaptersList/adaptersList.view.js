import $store from "../../store.js";
import { uiHelpers } from "@wxn0brp/flanker-ui";
import { adapterCollectionsView } from "./adapterCollections.view.js";
import "./adapters-list.scss";
class AdaptersListView {
    element;
    render(adapters) {
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
            collections.mount();
            summary.addEventListener("click", async () => {
                $store.selectedAdapter.set(adapter.logic_id);
                if (detail.open)
                    return;
                collections.load();
            });
            this.element.appendChild(detail);
        });
    }
    mount() {
        this.element = document.querySelector("#adapters-list");
        uiHelpers.bindHandlers(this.element, {
            "#adapters-header": () => this.load(),
        });
        $store.selectedCollection.subscribe(collection => {
            this.element.querySelectorAll("[data-collection]").forEach((button) => {
                button.classList.toggle("selected", button.getAttribute("data-collection") === collection);
            });
        });
        this.load();
    }
    async load() {
        const adapters = await fetch("/VQL/get-adapters").then((res) => res.json());
        $store.adapters.set(adapters);
        this.render(adapters);
    }
}
export const adaptersListView = new AdaptersListView();
export default adaptersListView;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRhcHRlcnNMaXN0LnZpZXcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvZnJvbnQvZmVhdHVyZXMvYWRhcHRlcnNMaXN0L2FkYXB0ZXJzTGlzdC52aWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sTUFBTSxNQUFNLFNBQVMsQ0FBQztBQUM3QixPQUFPLEVBQWUsU0FBUyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDN0QsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFFbkUsT0FBTyxzQkFBc0IsQ0FBQztBQUU5QixNQUFNLGdCQUFnQjtJQUNsQixPQUFPLENBQWlCO0lBRXhCLE1BQU0sQ0FBQyxRQUE4QjtRQUNqQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7UUFFNUIsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQ3pCLE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDakQsTUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNsRCxPQUFPLENBQUMsV0FBVyxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUM7WUFDdkMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUU1QixNQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2hELFNBQVMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLENBQUM7WUFDOUMsU0FBUyxDQUFDLEVBQUUsR0FBRyxXQUFXLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQztZQUM5QyxNQUFNLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBRTlCLE1BQU0sV0FBVyxHQUFHLHNCQUFzQixDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDeEUsV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBRXBCLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsS0FBSyxJQUFJLEVBQUU7Z0JBQ3pDLE1BQU0sQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDN0MsSUFBSSxNQUFNLENBQUMsSUFBSTtvQkFBRSxPQUFPO2dCQUN4QixXQUFXLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDdkIsQ0FBQyxDQUFDLENBQUM7WUFFSCxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNyQyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxLQUFLO1FBQ0QsSUFBSSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFFLENBQUM7UUFDekQsU0FBUyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2pDLGtCQUFrQixFQUFFLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7U0FDeEMsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxDQUFDLGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUM3QyxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLG1CQUFtQixDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7Z0JBQ2xFLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsWUFBWSxDQUFDLGlCQUFpQixDQUFDLEtBQUssVUFBVSxDQUFDLENBQUM7WUFDL0YsQ0FBQyxDQUFDLENBQUE7UUFDTixDQUFDLENBQUMsQ0FBQTtRQUVGLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNoQixDQUFDO0lBRUQsS0FBSyxDQUFDLElBQUk7UUFDTixNQUFNLFFBQVEsR0FBRyxNQUFNLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7UUFDNUUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDOUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUMxQixDQUFDO0NBQ0o7QUFFRCxNQUFNLENBQUMsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLGdCQUFnQixFQUFFLENBQUM7QUFDdkQsZUFBZSxnQkFBZ0IsQ0FBQyJ9