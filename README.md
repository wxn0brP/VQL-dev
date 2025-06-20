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

Then open your browser at: [http://localhost:8000](http://localhost:8000)

> You can also use any other static HTTP server like `vite`, `serve`, or `nginx`.

## 📄 License

MIT License — see [LICENSE](LICENSE)