import { $store } from "#store";
import { apiService } from "#services";
import { UiComponent } from "@wxn0brp/flanker-ui";
import { VQLUQ } from "@wxn0brp/vql-client/vql";

type SortDirection = "asc" | "desc" | "original";

class AdapterResultView implements UiComponent {
    element: HTMLDivElement;
    private originalData: any[] = [];

    mount() {
        this.element = document.querySelector("#adapter-result");
        this.element.addEventListener("dblclick", this.handleCellDblClick.bind(this));
        this.element.addEventListener("click", this.handleHeaderClick.bind(this));
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

        const isNewData = this.originalData !== items;
        if (isNewData) {
            this.originalData = items;
            $store.tableSort.set({ column: null, direction: "original" });
        }
        const sortedItems = this.getSortedData();

        const headers = Object.keys(sortedItems.reduce((acc, item) => ({ ...acc, ...item }), {}));
        const pk = "_id";
        const tbody = sortedItems.map(row => {
            const cells = headers.map(h => {
                const value = row[h];
                const attrs = [
                    `data-key="${h}"`,
                    h === pk ? 'data-pk="true"' : '',
                    (typeof value === "object" && value !== null) ? 'data-object="true"' : ''
                ].filter(Boolean).join(" ");

                return `<td ${attrs}>${this.formatCell(value)}</td>`;
            }).join("");

            return `<tr data-id="${row[pk]}">${cells}</tr>`;
        }).join("");

        const headerBody = headers.map(h => {
            const sort = $store.tableSort.get();
            const sortIcon = sort.column === h
                ? (sort.direction === "asc" ? " /\\" : "\\/")
                : "";
            return `<th data-sort="${h}" style="cursor: pointer; user-select: none;">${h}${sortIcon}</th>`;
        }).join("");

        const table = `
<h2>${adapter}/${collection}</h2>
<table>
    <thead>
        <tr>${headerBody}</tr>
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
            return `< pre > ${JSON.stringify(value, null, 2)} </pre>`;
        }
        return value.toString();
    }

    clear() {
        if (!this.element) return;
        this.element.innerHTML = "";
    }

    private getSortedData(): any[] {
        const sort = $store.tableSort.get();
        if (!sort.column || sort.direction === "original") {
            return this.originalData;
        }

        const { column, direction } = sort;
        const multiplier = direction === "asc" ? 1 : -1;

        return [...this.originalData].sort((a, b) => {
            const aVal = a[column];
            const bVal = b[column];

            if (aVal === null || aVal === undefined) return 1;
            if (bVal === null || bVal === undefined) return -1;

            const aNum = Number(aVal);
            const bNum = Number(bVal);
            const bothNumbers = !isNaN(aNum) && !isNaN(bNum);

            let comparison: number;
            if (bothNumbers) {
                comparison = aNum - bNum;
            } else {
                const aStr = String(aVal);
                const bStr = String(bVal);
                comparison = aStr.localeCompare(bStr, undefined, { numeric: true });
            }

            return comparison * multiplier;
        });
    }

    private handleHeaderClick(e: MouseEvent) {
        const th = (e.target as HTMLElement).closest("th[data-sort]") as HTMLElement;
        if (!th) return;

        const column = th.dataset.sort;
        const sort = $store.tableSort.get();

        if (sort.column === column) {
            const directionCycle: SortDirection[] = ["asc", "desc", "original"];
            const currentIndex = directionCycle.indexOf(sort.direction);
            const newDirection = directionCycle[(currentIndex + 1) % 3];

            if (newDirection === "original") {
                $store.tableSort.set({ column: null, direction: "original" });
            } else {
                $store.tableSort.set({ column, direction: newDirection });
            }
        } else {
            $store.tableSort.set({ column, direction: "asc" });
        }

        this.render(this.originalData);
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

        const query: VQLUQ = {
            db: adapter,
            d: {
                updateOne: {
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
