# Project Overview: Offline Local PWA Finance Agent

## 1. Role & Objective

You are an expert TypeScript and React developer. Your task is to scaffold and build "PocketLedger AI", a 100% offline, privacy-first personal finance Progressive Web App (PWA). The core feature is a natural language processor that categorizes expenses using a local Small Language Model (SLM) running entirely inside the browser.

## 2. Tech Stack & Dependencies

Strictly use the following technologies. Do NOT introduce any external backend services or cloud APIs.

- **Core:** React, TypeScript, Vite.
- **Styling:** Tailwind CSS, Lucide React (for icons).
- **State Management:** Zustand.
- **Local Database:** Dexie.js (wrapper for IndexedDB).
- **Local AI Engine:** @xenova/transformers (Transformers.js) for running the model via WebAssembly/WebGPU.
- **PWA:** vite-plugin-pwa.

## 3. Strict Architecture Constraints

- **Zero Backend:** All logic, data persistence, and AI inference must happen on the client side.
- **Non-Blocking UI:** The AI model (Transformers.js) MUST be instantiated and executed inside a `Web Worker`. The main UI thread must only communicate with the worker via message passing.
- **Data Persistence:** All transactions and generated categories must be stored in IndexedDB via Dexie.js.
- **Types:** Strict TypeScript typing is required for all components, store slices, and database schemas.

## 4. Directory Structure

Generate the scaffolding following this exact structure:

```text
/pocket-ledger-ai
├── /public
│   └── manifest.json
├── /src
│   ├── /components
│   │   ├── chat/             # UI for natural language input
│   │   ├── dashboard/        # Charts and transaction lists
│   │   └── ui/               # Reusable Tailwind components
│   ├── /db
│   │   └── database.ts       # Dexie.js setup and schema definition
│   ├── /store
│   │   └── useStore.ts       # Zustand store for UI state & DB sync
│   ├── /workers
│   │   └── ai.worker.ts      # Web Worker for Transformers.js
│   ├── App.tsx
│   └── main.tsx
├── package.json
└── vite.config.ts
```

## 5. Execution Plan (Phase 1)

Please execute the following steps sequentially. Ask for confirmation before moving to the next step.

1. **Scaffold the App:** Initialize the Vite React-TS project and install all required dependencies (Tailwind, Zustand, Dexie, Transformers.js).
2. **Database Setup:** Create `/src/db/database.ts` with a `Transaction` table schema (id, amount, category, description, date).
3. **State Setup:** Create the Zustand store to fetch and update transactions from Dexie.
4. **Web Worker Integration:** Implement `/src/workers/ai.worker.ts` to load a small pipeline (e.g., a lightweight classification model) and set up the `postMessage` listener.
5. **Basic UI:** Build a simple layout with an input field to send messages to the worker, and a list to display the saved transactions.

Begin with Phase 1, Step 1.
