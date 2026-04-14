import { UiComponent } from "@wxn0brp/flanker-ui";
import "./server-config.scss";

type Mode = "web" | "http";

function hasRequiredParams(): boolean {
    const p = new URLSearchParams(location.hash.slice(1) || window.location.search);
    return p.has("server") || p.has("url") || p.has("s") || p.has("p") || p.has("port");
}

function buildKvRow(listEl: HTMLElement): HTMLDivElement {
    const row = document.createElement("div");
    row.className = "kv-row";

    const key = document.createElement("input");
    key.type = "text";
    key.placeholder = "Key";
    key.className = "kv-key";
    key.autocomplete = "off";
    key.spellcheck = false;

    const sep = document.createElement("span");
    sep.textContent = ":";
    sep.className = "kv-sep";

    const value = document.createElement("input");
    value.type = "text";
    value.placeholder = "Value";
    value.className = "kv-value";
    value.autocomplete = "off";
    value.spellcheck = false;

    const del = document.createElement("button");
    del.type = "button";
    del.textContent = "×";
    del.className = "kv-del";
    del.addEventListener("click", () => row.remove());

    row.append(key, sep, value, del);
    listEl.appendChild(row);
    key.focus();
    return row;
}

function collectKv(listEl: HTMLElement): Record<string, string> | null {
    const rows = listEl.querySelectorAll<HTMLDivElement>(".kv-row");
    if (!rows.length) return null;
    const result: Record<string, string> = {};
    rows.forEach((row) => {
        const k = (row.querySelector(".kv-key") as HTMLInputElement).value.trim();
        const v = (row.querySelector(".kv-value") as HTMLInputElement).value.trim();
        if (k) result[k] = v;
    });
    return Object.keys(result).length ? result : null;
}

class ServerConfigView implements UiComponent {
    element: HTMLDivElement;
    form: HTMLFormElement;

    mount() {
        this.element = document.qs("#server-config-overlay");
        this.form = this.element.qs("#server-config-form");

        this.element.addEventListener("click", (e) => {
            if (e.target === this.element) this.close();
        });

        this.element.qs("#server-config-cancel").on("click", () => this.close());

        this.form.addEventListener("submit", (e) => {
            e.preventDefault();
            this._apply();
        });

        this.form.querySelectorAll<HTMLInputElement>(`input[name="mode"]`).forEach((radio) => {
            radio.addEventListener("change", () => this._onModeChange(radio.value as Mode));
        });

        const manualToggle = this.form.qi(`#http-manual-toggle`);
        manualToggle?.addEventListener("change", () => {
            const section = this.form.qs("#http-manual-section");
            section.hidden = !manualToggle.checked;
        });

        this.form.querySelectorAll<HTMLButtonElement>(".kv-add-btn").forEach((btn) => {
            btn.addEventListener("click", () => {
                const target = btn.dataset.target;
                const listEl = this.form.qs(`#kv-${target}`);
                buildKvRow(listEl);
            });
        });

        if (!hasRequiredParams())
            this.open();
    }

    _onModeChange(mode: Mode) {
        this.form.querySelectorAll<HTMLElement>(".mode-section").forEach((section) => {
            section.hidden = section.dataset.mode !== mode;
        });
    }

    open() {
        this.element.classList.add("active");
        const firstRadio = this.form.qi(`input[name="mode"]`);
        if (firstRadio) {
            firstRadio.checked = true;
            this._onModeChange(firstRadio.value as Mode);
        }
    }

    close() {
        this.element.classList.remove("active");
    }

    _apply() {
        const mode = this.form.qi(`input[name="mode"]:checked`)?.value as Mode;
        if (!mode) return;

        const params = new URLSearchParams();

        if (mode === "web") {
            params.set("p", "web");
        } else if (mode === "http") {
            const portOrUrl = this.form.qi("#http-port").value.trim();
            if (!portOrUrl) return;
            params.set("p", portOrUrl);

            const endpoint = this.form.qi("#http-endpoint").value.trim();
            if (endpoint && endpoint !== "/VQL")
                params.set("ep", endpoint);

            const manualToggle = this.form.qi("#http-manual-toggle");
            if (manualToggle.checked) {
                const adapters = this.form.qi("#http-adapters").value.trim();
                if (adapters) params.set("ml", adapters);
            }

            const headers = collectKv(this.form.qs("#kv-headers"));
            if (headers) params.set("h", btoa(JSON.stringify(headers)));

            const body = collectKv(this.form.qs("#kv-body"));
            if (body) params.set("b", btoa(JSON.stringify(body)));
        }

        window.location.href = `${window.location.pathname}#${params.toString()}`;
    }
}

let lastHash = location.hash;

window.addEventListener("hashchange", () => {
    if (location.hash !== lastHash)
        location.reload();
})

export const serverConfigView = new ServerConfigView();
