# PocketLedger AI 🏜️✨

> **100% Offline, Privacy-First Personal Finance Agent powered by Dual-Engine AI and Active Offline Learning.**

![React](https://img.shields.io/badge/React-18-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue?style=flat-square&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-6.4-purple?style=flat-square&logo=vite)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=flat-square&logo=tailwindcss)
![IndexedDB](https://img.shields.io/badge/IndexedDB-Dexie.js-green?style=flat-square)
![ONNX Runtime](https://img.shields.io/badge/ONNX--Runtime-WebAssembly-orange?style=flat-square)

---

## 📖 Overview

**PocketLedger AI** is a modern Progressive Web App (PWA) designed to manage personal finances using natural language prompts without compromising user privacy.

Every piece of data, transaction ledger, and AI model inference runs **100% client-side in the browser**. No external servers, no cloud API keys, and no telemetry data leave your device.

---

## ✨ Key Features

### ⚡ Dual-Engine AI Architecture
* **`⚡ Motor Rápido (0ms)`**: Embedded 4 KB Naïve Bayes + TF-IDF vector classifier. Provides instantaneous category classification with zero network latency.
* **`🧠 Qwen 0.5B Neural SLM`**: Integrates Hugging Face's `Qwen 2.5 0.5B Instruct` ONNX model compiled to **WebAssembly (Wasm)**. Executes deep natural language reasoning inside an isolated **Web Worker thread**.

### 🎓 Active Offline Learning (Self-Refining Local AI)
* **Teaches the AI your vocabulary**: If the AI misclassifies a prompt, click `Enseñar a la IA` on any ledger entry to adjust its Category or Type (`Expense` vs `Income`).
* **Persistent Local Memory**: Corrections are saved to IndexedDB (`userCorrections` table). When you enter similar prompts in the future, the model automatically applies your learned preferences and displays a **`🎓 Aprendido por tu IA`** badge.

### 💬 Shorthand Amounts & Multi-Expense Extraction
* **Numeric Shorthand Parsing**: Automatically handles shorthand expressions:
  * `25k` / `25mil` ➔ **$ 25.000**
  * `2m` / `2 millones` ➔ **$ 2.000.000**
  * `1.5m` ➔ **$ 1.500.000**
* **Compound Sentence Splitting**: Parses paragraphs with multiple transactions:
  > *"Gasté 45k en gasolina, 18k en almuerzo y me consignaron 4m de ventas"*
  
  Separates each entry into individual transactions in Dexie IndexedDB automatically.

### 🏜️ Sahara — Warm Minimalism Design System
* Styled following editorial aesthetic principles:
  * **Colors**: Warm Linen (`#faf5ee`), Deep Burnt Sienna (`#c2652a`), Warm Dark Noche (`#120f0d`), Dark Sienna Card (`#1c1714`).
  * **Typography**: Editorial headlines with `EB Garamond` and clean body UI with `Manrope`.
  * **Theme**: Seamless Light Mode and Deep Dark Mode switcher.

### 💵 Dual Currency & Multilingual Support
* **Currencies**: Colombian Pesos (`COP`) formatted as `$ 50.000` & US Dollars (`USD`) formatted as `$ 50.00`.
* **Languages**: Full Spanish (`es`) and English (`en`) dictionary toggle.

---

## 🛠️ Project Structure

```text
pocket-ledger-ai/
├── src/
│   ├── components/
│   │   ├── chat/         # Natural language prompt bar & interactive chip suggestions
│   │   ├── dashboard/    # Metric summary cards, spending category chart, transaction ledger
│   │   └── ui/           # AI Model status banner, badges, buttons, cards
│   ├── db/               # Dexie.js IndexedDB schema & user correction learning tables
│   ├── i18n/             # Localized dictionaries (Spanish / English)
│   ├── store/            # Zustand global state (currency, language, engine mode, active learning)
│   └── workers/          # Dual-engine AI Web Worker (Fast ML + Qwen 0.5B ONNX Pipeline)
├── DESIGN.md             # Sahara design system specifications & color tokens
├── init.MD               # Original application architecture specification
├── README.md
└── vite.config.ts        # Vite, PWA Service Worker & WASM chunk splitting configuration
```

---

## 🚀 Getting Started

### Prerequisites
* **Node.js**: v18.0.0 or higher
* **npm**: v9.0.0 or higher

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Dilan/pocket-ledger-ai.git
   cd pocket-ledger-ai
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

4. **Build for production:**
   ```bash
   npm run build
   ```
   Generates production bundle and PWA Service Worker in `dist/`.

---

## 🛡️ Privacy & Security

PocketLedger AI was built with a strict **Privacy-First** architecture:
* All financial transactions are stored locally inside **IndexedDB** on your machine or phone.
* No transaction data is ever sent to any external server or API.
* The ONNX AI weights are cached in your browser's `CacheStorage` for full **100% Offline PWA** capability.

---

## 📜 License

This project is open source and available under the [MIT License](LICENSE).
