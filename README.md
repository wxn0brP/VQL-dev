# VQL Dev Panel

A development panel for exploring and interacting with **VQL** (Valthera Query Language) adapters and databases. The panel provides a UI for testing queries, inspecting adapters, and visualizing data structures.

## 🔧 Features
- Browse database adapters and their collections.
- View adapter metadata (type, version, etc.).
- Explore inferred data structure types dynamically.

## 📦 Installation

To install the dev panel as a dev dependency:

```bash
npm install --save-dev @wxn0brp/vql-dev
```

## 📑 Links

[Frontend Public Host](https://wxn0brp.github.io/VQL-dev/)

[Docs](https://wxn0brp.github.io/VQL-dev/docs)

## 🚀 Usage

### 1. **Start the Dev Panel**

In your main application:

```ts
import { VQLProcessor } from '@wxn0brp/vql';
import { VqlDevPanel } from '@wxn0brp/vql-dev';

const VQL = new VQLProcessor(...); // configure as needed
const panel = new VqlDevPanel(VQL);
panel.start();
```

### 2. **Access the UI**

Open the following URL in your browser to access the dev panel:

👉 [https://wxn0brp.github.io/VQL-dev/?p=3000](https://wxn0brp.github.io/VQL-dev/?p=3000)

## More Information

💜 [https://wxn0brp.github.io/VQL-dev/docs](https://wxn0brp.github.io/VQL-dev/docs)

## 📄 License

MIT License — see [LICENSE](LICENSE)