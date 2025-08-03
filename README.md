# VQL Dev Panel

A development panel for exploring and interacting with **VQL** (Valthera Query Language) adapters and databases. The panel provides a UI for testing queries, inspecting adapters, and visualizing data structures.

## 🔧 Features

- ✅ **HTTP API Endpoints**
  - Execute VQL queries via `/VQL/query-string`.
  - List all adapters via `/VQL/get-adapters`.
  - Retrieve adapter metadata via `/VQL/get-adapter`.

- 🖥️ **UI Dashboard**
  - Browse database adapters and their collections.
  - View adapter metadata (type, version, etc.).
  - Explore inferred data structure types dynamically.

## 📦 Installation

To install the dev panel as a dev dependency using Yarn:

```bash
yarn add -D github:wxn0brP/VQL-dev#dist
```

## 🚀 Usage

### 1. **Start the Dev Panel**

In your main application file:

```ts
import { VQLProcessor } from '@wxn0brp/vql';
import DevPanelBackend from '@wxn0brp/vql-dev';

const VQL = new VQLProcessor(...); // configure as needed
const panel = new DevPanelBackend(VQL);
panel.start();
```

### 2. **Access the UI**

Open the following URL in your browser to access the dev panel:

👉 [https://wxn0brp.github.io/VQL-dev/?p=3000](https://wxn0brp.github.io/VQL-dev/?p=3000)

> ⚠️ Note: This hosted version may not reflect local changes. For full control, run the frontend locally (see below).

### 3. **Try Example Features**
- Use the adapter list to select a collection.
- View inferred data types in the structure panel.
- Test VQL queries via the HTTP API endpoints.

You can also check out the example usage in the test file: [`test.ts`](test.ts).

## 🏗️ Build & Test Locally

To build and test the project locally:

```bash
git clone https://github.com/wxn0brP/VQL-dev.git
cd VQL-dev
yarn
yarn build
yarn test
```

## 🌐 Run Frontend Locally

If you want to run the frontend on a local HTTP server:

```bash
cd front
yarn
yarn build
cd ..
cp -r front/dist public
cd public
python3 -m http.server
```

Then open your browser at: [http://localhost:8000](http.localhost:8000)

> You can also use any other static HTTP server like `vite`, `serve`, or `nginx`.

## Advanced Usage

### Using with Remote Databases (`/server.html`)

The dev panel can connect to **remote Valthera databases** entirely in-browser, without the Node.js backend.

Opening `/server.html` starts a local `VQLProcessor` that forwards queries to remote databases over HTTP.

#### Steps:

1. Open `/server.html` in your browser.
2. Enter connection strings (one per line) in the format:

   ```
   db-alias http://db-name:db-auth@your-vql-server.com
   ```

   * `db-alias` – name used in the UI
   * `db-name` – database name on the remote server
   * `db-auth` – auth token

   **Example:**

   ```
   users-db http://main:secrettoken@db.example.com
   ```
3. Click **Save** — this registers the databases with the processor and opens a `BroadcastChannel` for communication.

Other tabs (e.g. `/index.html?p=web`) can now route VQL queries through this processor — enabling full remote access **directly from the browser**.

### Client-Side Web Mode (`/index.html?p=web`)

Open the main UI with the `?p=web` parameter to run it in browser-only mode:

👉 `http://localhost:8000/?p=web`

In this mode, it uses the in-browser processor from `/server.html` to access remote databases, making it suitable for static hosting or embedding.

> **Note:** Both `/server.html` and `/index.html?p=web` must be opened in the **same browser** and **same origin** (protocol + domain + port).
> `BroadcastChannel` does not work across different domains, ports, or browser profiles.


## 📄 License

MIT License — see [LICENSE](LICENSE)