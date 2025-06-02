# VQL Dev Panel

A development panel for exploring and interacting with **VQL** (Valthera Query Language) adapters and databases. Provides a UI for testing queries, inspecting adapters, and visualizing data structures.

## Features

- ✅ **HTTP API Endpoints**:
  - Execute VQL queries via `/VQL/query-string`.
  - List all adapters via `/VQL/get-adapters`.
  - Retrieve adapter metadata via `/VQL/get-adapter`.
- 🌐 **WebSocket Support**: Real-time updates via GlovesLink.
- 🔍 **UI Dashboard**:
  - Browse database adapters and their collections.
  - View adapter metadata (type, version, etc.).
  - Explore data structure types dynamically.
- 🧪 **Example Test Setup**: Pre-configured with a Valthera database and mock API adapter.

## Installation

```bash
yarn add -D github:wxn0brP/vql-dev#dist
```

## Usage

1. **Start the dev panel**:
    ```ts
    import { VQLProcessor } from '@wxn0brp/vql';
    import DevPanelBackend from '@wxn0brp/vql-dev';

    const yourProcessor = new VQLProcessor(...);
    const panel = new DevPanelBackend(yourProcessor);
    panel.start();
    ```

2. **Access the UI**:
   Open [http://localhost:5000](http://localhost:5000) in your browser.

3. **Try Example Features**:
   - Use the adapter list to select a collection.
   - View inferred data types in the structure panel.
   - Test VQL queries via the HTTP API.

## Example

You can see example usage in the test file [`src/test.ts`](src/test.ts).
```bash
git clone https://github.com/wxn0brP/VQL-dev.git
cd VQL-dev
yarn
yarn build && yarn build:front
yarn test
```

## License

[MIT](LICENSE) license