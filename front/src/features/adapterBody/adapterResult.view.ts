import $store from "#store";
import { apiService } from "#services";
import { UiComponent } from "@wxn0brp/flanker-ui";
import { VqlQueryRaw } from "@wxn0brp/vql-client/vql";

class AdapterResultView implements UiComponent {
    element: HTMLDivElement;

    mount() {
        this.element = document.querySelector("#adapter-result");
        this.element.addEventListener("dblclick", this.handleCellDblClick.bind(this));
    }

    render(data: any, adapter = $store.selectedAdapter.get(), collection = $store.selectedCollection.get()) {
        if (!data || (Array.isArray(data) && data.length === 0)) {
            this.clear();
            return;
        }

        const items = Array.isArray(data) ? data : [data];
        if (items.length === 0) {
            this.clear();
            return;
        }

        const headers = Object.keys(items.reduce((acc, item) => ({ ...acc, ...item }), {}));
        const pk = "_id";
        const tbody = items.map(row => `
            <tr data-id="${row[pk]}">
                ${headers.map(h => {
                    const pkData = h === pk ? `data-pk="true"` : "";
                    const isObject = typeof row[h] === "object" && row[h] !== null;
                    const obj = isObject ? `data-object="true"` : ""
                    return `<td data-key="${h}" ${pkData} ${obj}>${this.formatCell(row[h])}</td>`
                }).join("")}
            </tr>
        `).join("");

        const table = `
            <h2>${adapter}/${collection}</h2>
            <table>
                <thead>
                    <tr>
                        ${headers.map(h => `<th>${h}</th>`).join("")}
                    </tr>
                </thead>
                <tbody>
                    ${tbody}
                </tbody>
            </table>
        `;

        this.element.innerHTML = table;
    }

    formatCell(value: any): string {
        if (value === undefined || value === null) return "";
        if (typeof value === "object") {
            return `<pre>${JSON.stringify(value, null, 2)}</pre>`;
        }
        return value.toString();
    }

    clear() {
        if (!this.element) return;
        this.element.innerHTML = "";
    }

    async handleCellDblClick(e: MouseEvent) {
        const td = (e.target as HTMLElement).closest("td");
        if (!td || td.dataset.pk || td.dataset.object || td.querySelector("input")) {
            return;
        }

        const originalValue = td.textContent;
        td.innerHTML = `<input type="text" class="edit-input" value="${originalValue}">`;

        const input = td.querySelector<HTMLInputElement>(".edit-input");
        input.focus();
        input.select();

        const cleanup = () => {
            input.removeEventListener("blur", save);
            input.removeEventListener("keydown", handleKey);
        };

        const save = async () => {
            cleanup();
            const newValue = input.value;

            if (newValue === originalValue) {
                td.textContent = originalValue;
                return;
            }

            const tr = td.parentElement as HTMLTableRowElement;
            const id = tr.dataset.id;
            const key = td.dataset.key;

            const success = await this.updateValue(id, key, newValue);
            if (success) {
                td.textContent = newValue;
            } else {
                td.textContent = originalValue;
            }
        };

        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Enter") {
                save();
            } else if (e.key === "Escape") {
                cleanup();
                td.textContent = originalValue;
            }
        };

        input.addEventListener("blur", save);
        input.addEventListener("keydown", handleKey);
    }

    async updateValue(id: string, key: string, value: string): Promise<boolean> {
        const adapter = $store.selectedAdapter.get();
        const collection = $store.selectedCollection.get();

        let newValue: any = value;
        const numValue = Number(value);
        if (!isNaN(numValue) && value.trim() !== "") {
            newValue = numValue;
        } else if (value.toLowerCase() === "true") {
            newValue = true;
        } else if (value.toLowerCase() === "false") {
            newValue = false;
        }

        const query: VqlQueryRaw = {
            db: adapter,
            d: {
                update: {
                    collection: collection,
                    search: { _id: id },
                    updater: { [key]: newValue },
                }
            }
        };

        try {
            await apiService.fetchVQL(query);
            return true;
        } catch (error) {
            console.error("Failed to update:", error);
            alert("Failed to update value.");
            return false;
        }
    }
}

export const adapterResultView = new AdapterResultView();
