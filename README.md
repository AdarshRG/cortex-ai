# 🧠 Cortex AI Studio — Autonomous Multi-Agent Workspace

[![Next.js](https://img.shields.io/badge/Next.js-16.3-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-cyan?logo=tailwindcss)](https://tailwindcss.com/)
[![State Management](https://img.shields.io/badge/State-Zustand-orange)](https://github.com/pmndrs/zustand)
[![Streaming](https://img.shields.io/badge/Streaming-Server--Sent_Events_(SSE)-emerald)](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events)

> **Author:** [AdarshRG](https://github.com/AdarshRG) (`adarshrg1998@gmail.com`)  
> **Course Manual & Study Notes:** [`COURSE_NOTES.md`](./COURSE_NOTES.md)

---

## 🚀 Overview

**Cortex AI Studio** is a full-stack AI engineering platform built to deliver production-grade generative AI experiences. Moving beyond simple text chatbots, Cortex AI implements **Multi-Model Orchestration**, **Real-time Server-Sent Events (SSE) Streaming**, **Autonomous Agent Swarms**, **Intermediate Reasoning Traces**, **Generative UI Canvas**, and **Live LLMOps Telemetry**.

---

## 🏛️ The 3-Zone Architecture

```
┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                   TOP TELEMETRY HEADER                                          │
│  [● ONLINE]  ACTIVE MODEL: GEMINI-2.0-FLASH  |  TTFT: 248ms  |  SPEED: 42 t/s  |  COST: $0.0001 │
├───────────────────┬─────────────────────────────────────────────┬───────────────────────────────┤
│   CONTROL PLANE   │              EXECUTION STREAM               │     GENERATIVE UI CANVAS      │
│   (Left Sidebar)  │               (Center Panel)                │        (Right Panel)          │
│                   │                                             │                               │
│ • Agent Swarms:   │ • Conversational Chat Stream                │ • Live Artifact Inspector     │
│   - Supervisor    │ • Real-Time Token Streaming (SSE)           │ • Standalone Code Viewer      │
│   - Researcher    │ • Intermediate Agent Reasoning Accordion    │ • Architecture Blueprints     │
│   - Coder         │ • Sandboxed Tool Execution Cards            │ • Rendered vs Raw Markdown    │
│   - Fact-Checker  │ • Streaming Chat Input & Suggestion Chips   │ • 1-Click Clipboard Copy      │
│ • Model Gateway   │ • Sub-300ms TTFT Latency Loop               │ • Close / Collapse Controls   │
└───────────────────┴─────────────────────────────────────────────┴───────────────────────────────┘
```

---

## ✨ Key Features

1. **Multi-Model Gateway & Intelligent Fallbacks**
   - Seamlessly routes across **Google Gemini 2.0 Flash**, **OpenAI GPT-4o**, and **Claude 3.7 Sonnet**.
   - Built-in zero-dependency deterministic simulator for offline development without API keys.

2. **Sub-300ms Time-To-First-Token (TTFT)**
   - Utilizes standard Web Streams API (`ReadableStream`, `TextEncoder`) over Server-Sent Events (SSE).
   - Zero UI spinners; tokens are rendered word-by-word as generated.

3. **Autonomous Role-Based Agent Swarms**
   - **Supervisor Agent:** Task planning and decomposition.
   - **Research Swarm:** Knowledge retrieval and citation grounding.
   - **Coder Agent:** TypeScript interfaces and system architecture synthesis.
   - **Critic / Auditor:** Zero-hallucination verification.

4. **Intermediate Chain-of-Thought & Tool Tracing**
   - Collapsible reasoning accordions surface the internal thought tokens of reasoning models.
   - Live tool execution badges display structured JSON arguments and status.

5. **Generative UI & Interactive Artifact Canvas**
   - Extracts code blueprints, markdown documentation, and schemas into a side-by-side workspace.
   - Mode switcher for live preview vs raw source and one-click copy.

6. **Production LLMOps Telemetry Bar**
   - Live tracking of TTFT latency in milliseconds.
   - Token production velocity (tokens/sec).
   - Session token consumption and real-time USD cost estimation.

---

## 🛠️ Quickstart

### 1. Prerequisites
- Node.js 20+
- pnpm (`corepack enable pnpm` or `npm install -g pnpm`)

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/AdarshRG/cortex-ai.git
cd cortex-ai

# Install dependencies
pnpm install
```

### 3. Environment Variables (Optional)
Copy `.env.example` to `.env.local` to enable live frontier models:
```bash
cp .env.example .env.local
```
*(If no keys are provided, the studio automatically runs in high-fidelity Simulator mode with full streaming features).*

### 4. Run Development Server
```bash
pnpm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📚 Daily Learning Guide & Course Notes

For detailed, step-by-step explanations of full-stack AI concepts, system design diagrams, and senior technical interview Q&A, refer to:
👉 [**COURSE_NOTES.md**](./COURSE_NOTES.md)

---

## 📜 License
MIT License. Created by [AdarshRG](https://github.com/AdarshRG).

