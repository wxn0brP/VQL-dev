import $store from "#store";
import { UiComponent } from "@wxn0brp/flanker-ui";

class AdapterResultView implements UiComponent {
    element: HTMLDivElement;

    mount() {
        this.element = document.querySelector("#adapter-result");
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

        const table = `
            <h2>${adapter}/${collection}</h2>
            <table>
                <thead>
                    <tr>
                        ${headers.map(h => `<th>${h}</th>`).join("")}
                    </tr>
                </thead>
                <tbody>
                    ${items.map(row => `
                        <tr>
                            ${headers.map(h => `<td>${this.formatCell(row[h])}</td>`).join("")}
                        </tr>
                    `).join("")}
                </tbody>
            </table>
        `;

        this.element.innerHTML = table;
    }

    formatCell(value: any): string {
        if (value === undefined || value === null) return "";
        if (typeof value === 'object') {
            return `<pre>${JSON.stringify(value, null, 2)}</pre>`;
        }
        return value.toString();
    }

    clear() {
        if (!this.element) return;
        this.element.innerHTML = "";
    }
}

export const adapterResultView = new AdapterResultView();
