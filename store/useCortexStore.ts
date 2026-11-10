// ==============================================================================
// PROJECT: CORTEX AI STUDIO
// FILE: store/useCortexStore.ts
// ROLE: Global State Store (Zustand) for Messages, Artifacts & Live Telemetry
//
// 🎓 BEGINNER'S GUIDE TO AI STATE MANAGEMENT:
//   In an AI application, state updates occur at high frequencies (up to 30-50 tokens/sec).
//   Using standard React Context triggers re-renders across the entire component tree,
//   causing jitter and dropped frames.
//   Zustand uses atomic selectors, ensuring that when the token stream updates the
//   active message, ONLY the text renderer updates—keeping the sidebar, canvas,
//   and metrics bar silky smooth at 60 FPS!
// ==============================================================================

import { create } from "zustand";
import { AIMessage, Artifact, ModelProvider, AgentRole } from "@/types/ai";

interface CortexState {
  // Session & Messages
  messages: AIMessage[];
  activeModel: ModelProvider;
  activeAgent: AgentRole;
  activeArtifact: Artifact | null;
  isStreaming: boolean;

  // Live LLMOps Telemetry
  latestTtftMs: number;
  tokensPerSec: number;
  totalTokensUsed: number;
  totalCostUsd: number;

  // Actions
  addMessage: (msg: AIMessage) => void;
  updateMessageContent: (id: string, chunk: string) => void;
  finalizeMessage: (id: string, updates: Partial<AIMessage>) => void;
  setActiveModel: (model: ModelProvider) => void;
  setActiveAgent: (agent: AgentRole) => void;
  setActiveArtifact: (artifact: Artifact | null) => void;
  setIsStreaming: (streaming: boolean) => void;
  recordTelemetry: (stats: {
    ttftMs: number;
    tokens: number;
    costUsd: number;
    durationMs: number;
  }) => void;
  clearSession: () => void;
}

const INITIAL_WELCOME_MESSAGE: AIMessage = {
  id: "msg-welcome-001",
  role: "assistant",
  content: `### Welcome to **Cortex AI Studio** 🚀\n\nI am your **Autonomous Multi-Agent Workspace & Research Engine**. Unlike a traditional chat app, Cortex is engineered with:\n\n* 🧠 **Specialized Agent Swarms**: Supervisor, Researcher, Coder, and Fact-Checker.\n* ⚡ **Live Reasoning & Tool Tracing**: Inspect intermediate thoughts and tool executions in real-time.\n* 🎨 **Interactive Generative UI Canvas**: Live artifacts, comparison tables, and code preview rendered on the right.\n* 📊 **Production LLMOps Telemetry**: Real-time TTFT latency, token velocity, and cost accounting.\n\n*Try asking: "Synthesize the architecture of a production-grade multi-agent platform with an artifact blueprint"*`,
  createdAt: new Date().toISOString(),
  modelUsed: "gemini-2.0-flash",
};

export const useCortexStore = create<CortexState>((set) => ({
  messages: [INITIAL_WELCOME_MESSAGE],
  activeModel: "gemini-2.0-flash",
  activeAgent: "supervisor",
  activeArtifact: null,
  isStreaming: false,

  latestTtftMs: 248,
  tokensPerSec: 42,
  totalTokensUsed: 128,
  totalCostUsd: 0.0001,

  addMessage: (msg) =>
    set((state) => ({
      messages: [...state.messages, msg],
    })),

  updateMessageContent: (id, chunk) =>
    set((state) => ({
      messages: state.messages.map((m) =>
        m.id === id ? { ...m, content: m.content + chunk } : m
      ),
    })),

  finalizeMessage: (id, updates) =>
    set((state) => ({
      messages: state.messages.map((m) =>
        m.id === id ? { ...m, ...updates } : m
      ),
    })),

  setActiveModel: (activeModel) => set({ activeModel }),
  setActiveAgent: (activeAgent) => set({ activeAgent }),
  setActiveArtifact: (activeArtifact) => set({ activeArtifact }),
  setIsStreaming: (isStreaming) => set({ isStreaming }),

  recordTelemetry: ({ ttftMs, tokens, costUsd, durationMs }) =>
    set((state) => {
      const speed = durationMs > 0 ? Math.round((tokens / (durationMs / 1000))) : state.tokensPerSec;
      return {
        latestTtftMs: ttftMs,
        tokensPerSec: speed > 0 ? speed : state.tokensPerSec,
        totalTokensUsed: state.totalTokensUsed + tokens,
        totalCostUsd: Number((state.totalCostUsd + costUsd).toFixed(6)),
      };
    }),

  clearSession: () =>
    set({
      messages: [INITIAL_WELCOME_MESSAGE],
      activeArtifact: null,
    }),
}));
