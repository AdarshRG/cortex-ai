# 🚀 CORTEX AI STUDIO — MASTER COURSE GUIDE
## The 30-Day Full-Stack AI Application Engineering Blueprint

---

### 🌟 Executive Overview
Welcome to **Project 2: CORTEX AI Studio**!
In Project 1 (`nova-ecommerce`), you mastered Next.js 16 App Router, React 19, TypeScript, state management, and cloud devops. 

Now, we step into the most in-demand discipline in modern software: **Full-Stack AI Application Engineering**.

A true AI Application Engineer does NOT just call an API wrapper and dump markdown text into a chat box. 
In **Cortex AI Studio**, you will master:
1. **Multi-Model Orchestration & Intelligent Fallbacks** (Google Gemini 2.0 Flash, OpenAI GPT-4o, Claude 3.7).
2. **Real-time Server-Sent Events (SSE) Streaming** with Sub-300ms Time-To-First-Token (TTFT).
3. **Specialized Agent Swarms** (Supervisor, Researcher, Coder, and Fact-Checker).
4. **Intermediate Chain-of-Thought & Autonomous Tool Execution Tracing**.
5. **Interactive Generative UI & Artifact Canvas** (Side-by-side dynamic previews).
6. **Enterprise Hybrid RAG (pgvector + BM25)** with Grounded Footnote Citations.
7. **Production LLMOps Telemetry** (Token velocity, TTFT latency, and financial accounting).

---

### 🏛️ The 3-Zone Architecture of Cortex AI

```
┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                   TOP TELEMETRY HEADER                                          │
│  Engine Status • Active Model • TTFT (248ms) • Speed (42 t/s) • Tokens (1,450) • Cost ($0.0001)  │
├───────────────────┬─────────────────────────────────────────────┬───────────────────────────────┤
│                   │                                             │                               │
│   CONTROL PLANE   │              EXECUTION STREAM               │     GENERATIVE UI CANVAS      │
│   (Left Sidebar)  │               (Center Panel)                │        (Right Panel)          │
│                   │                                             │                               │
│ • Agent Persona   │ • Real-time Token Streaming (SSE)           │ • Standalone Artifact Preview │
│   Swarm Selection │ • Intermediate Agent Thought Traces         │ • TypeScript / Code Viewer    │
│ • Model Gateway   │ • Sandboxed Tool Execution Cards            │ • Architecture Blueprints     │
│ • Active Vector   │ • User Prompt & Command Input               │ • One-Click Clipboard Copy    │
│   Index Status    │ • Quick Action Suggestion Chips             │ • Markdown & JSON Export      │
│                   │                                             │                               │
└───────────────────┴─────────────────────────────────────────────┴───────────────────────────────┘
```

---

### 🧠 Core Concepts & Beginner's Guide (Day 1)

#### 1. What is an LLM Token?
* Unlike humans who read whole words, Large Language Models break text down into **Tokens** (chunks of characters, roughly 4 characters or 0.75 words).
* For example, the sentence *"Building AI apps is fun"* is split into `["Build", "ing", " AI", " apps", " is", " fun"]`.
* **Why it matters:** AI models charge per token, and each model has a **Context Window** (e.g. 1 million tokens in Gemini 1.5/2.0 vs 128k in GPT-4o).

#### 2. Why Server-Sent Events (SSE) instead of JSON?
* Traditional REST APIs send a single JSON payload only AFTER the entire response is generated. If an answer takes 10 seconds, the user is left waiting staring at a spinner.
* **SSE (Streaming)** opens an HTTP pipe where the server pushes tokens word-by-word as soon as the model predicts them.
* **TTFT (Time To First Token)** measures how quickly the user sees the first token appear on screen. Cortex AI targets **< 300ms TTFT**.

#### 3. What is an Agent Swarm?
* In basic AI apps, one prompt tries to do everything (research, code, fact-check). This leads to hallucinations.
* In Cortex AI, we use **Role-Based Agent Swarms**:
  * **Supervisor Agent**: Understands the user's objective, breaks it into sub-tasks, and assigns them.
  * **Research Agent**: Queries vector databases and search engines for grounded facts.
  * **Coder Agent**: Writes strict TypeScript interfaces, Prisma schemas, and algorithms.
  * **Fact-Checker (Critic)**: Audits the generated output against citations to eliminate hallucinations.

#### 4. What is Generative UI & Artifact Canvas?
* Instead of forcing wide tables, code snippets, and diagrams into a tiny chat bubble, Cortex AI extracts standalone assets into an interactive **Side Canvas**.
* This matches the exact design pattern pioneered by modern tools like **Claude Artifacts**, **ChatGPT Canvas**, and **v0**.

---

### 📂 System Codebase Map (Day 1)

| File Path | Architectural Responsibility |
| :--- | :--- |
| `app/page.tsx` | Master Studio Layout orchestrating the 3-column workspace. |
| `app/layout.tsx` | Dark obsidian theme wrapper, metadata, and root layout. |
| `app/globals.css` | Tailwind CSS v4 styling, custom glowing accents, and scrollbars. |
| `app/api/chat/route.ts` | Edge/Node streaming API route providing Server-Sent Events (SSE). |
| `types/ai.ts` | Master TypeScript contracts for Messages, Thoughts, ToolCalls, and Telemetry. |
| `store/useCortexStore.ts` | Zustand high-performance global state store with atomic subscribers. |
| `lib/ai/gateway.ts` | Multi-model provider router (Gemini, OpenAI, Claude, Local Simulator). |
| `lib/ai/simulator.ts` | Zero-dependency local streaming simulator for offline development. |
| `components/telemetry/MetricsBar.tsx` | Real-time TTFT latency, token velocity, and cost monitor. |
| `components/layout/Sidebar.tsx` | Control plane: agent swarm switcher, model selector, knowledge indices. |
| `components/chat/ChatStream.tsx` | Conversational message stream with thought accordions and tool chips. |
| `components/chat/ChatInput.tsx` | Streaming prompt input with suggestion chips and SSE reader. |
| `components/canvas/ArtifactCanvas.tsx` | Side-by-side interactive Generative UI and artifact inspector. |

---

### 🎯 Senior AI Technical Interview Q&A

#### Q1: Why is Time-To-First-Token (TTFT) more important than total generation time?
> **Answer:** Human cognitive perception judges responsiveness by how quickly feedback starts. A response that starts streaming in 200ms feels instantaneous even if it takes 8 seconds to finish, whereas waiting 4 seconds before seeing any text feels sluggish and broken.

#### Q2: How does Server-Sent Events (SSE) compare to WebSockets for AI applications?
> **Answer:** SSE operates over standard HTTP (port 80/443), works natively through enterprise firewalls/proxies, supports HTTP/2 multiplexing, and has built-in auto-reconnection. Because LLM output is primarily unidirectional (server streaming text to client), SSE is significantly simpler, more cacheable, and more reliable than bidirectional WebSockets for conversational inference.

#### Q3: Why use Zustand over React Context for streaming AI applications?
> **Answer:** During active streaming, the server can emit 40 to 60 chunks per second. Updating React Context causes every component consuming that context to re-render 60 times a second, freezing the UI. Zustand uses selective atomic subscriptions, re-rendering ONLY the text span receiving new tokens while leaving the sidebar, canvas, and metric bars completely idle.
