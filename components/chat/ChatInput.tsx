"use client";

// ==============================================================================
// PROJECT: CORTEX AI STUDIO
// FILE: components/chat/ChatInput.tsx
// ROLE: Real-time Streaming Input Controller & SSE Stream Consumer
//
// 🎓 BEGINNER'S GUIDE TO CONSUMING STREAMING APIS:
//   In traditional React apps, you do `const res = await fetch(); const data = await res.json()`.
//   With streaming AI, we read the HTTP response body as a ReadableStream stream:
//   `const reader = response.body.getReader();`
//   `while (true) { const { value, done } = await reader.read(); ... }`
//   This enables real-time token rendering without waiting for completion!
// ==============================================================================

import React, { useState } from "react";
import { useCortexStore } from "@/store/useCortexStore";
import { Send, Sparkles, Loader2 } from "lucide-react";

export const ChatInput: React.FC = () => {
  const [prompt, setPrompt] = useState("");
  const {
    activeModel,
    activeAgent,
    isStreaming,
    setIsStreaming,
    addMessage,
    updateMessageContent,
    finalizeMessage,
    setActiveArtifact,
    recordTelemetry,
  } = useCortexStore();

  const promptSuggestions = [
    "Synthesize the architecture of a production-grade multi-agent platform with an artifact blueprint",
    "Explain hybrid RAG: dense vector embeddings vs sparse BM25 search",
    "Generate a TypeScript state machine for an autonomous supervisor agent",
  ];

  const handleSend = async (textToSend?: string) => {
    const inputContent = textToSend || prompt;
    if (!inputContent.trim() || isStreaming) return;

    setPrompt("");

    const userMessageId = `msg-user-${Date.now()}`;
    const assistantMessageId = `msg-assistant-${Date.now()}`;

    // 1. Append User Message
    addMessage({
      id: userMessageId,
      role: "user",
      content: inputContent.trim(),
      createdAt: new Date().toISOString(),
    });

    // 2. Append Empty Placeholder Assistant Message for Streaming
    addMessage({
      id: assistantMessageId,
      role: "assistant",
      content: "",
      createdAt: new Date().toISOString(),
      modelUsed: activeModel,
    });

    setIsStreaming(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: inputContent,
          model: activeModel,
          agent: activeAgent,
        }),
      });

      if (!response.ok || !response.body) {
        throw new Error("Failed to connect to AI streaming gateway.");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let buffer = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const jsonStr = line.replace("data: ", "").trim();
          if (!jsonStr) continue;

          try {
            const data = JSON.parse(jsonStr);

            if (data.type === "init") {
              finalizeMessage(assistantMessageId, {
                thoughts: data.thoughts,
                toolCalls: data.toolCalls,
              });
            } else if (data.type === "chunk") {
              updateMessageContent(assistantMessageId, data.text);
            } else if (data.type === "done") {
              if (data.artifact) {
                finalizeMessage(assistantMessageId, { artifact: data.artifact });
                setActiveArtifact(data.artifact);
              }
              if (data.telemetry) {
                finalizeMessage(assistantMessageId, { telemetry: data.telemetry });
                recordTelemetry({
                  ttftMs: data.telemetry.ttftMs,
                  tokens: data.telemetry.completionTokens,
                  costUsd: data.telemetry.estimatedCostUsd,
                  durationMs: data.telemetry.durationMs,
                });
              }
            }
          } catch (parseErr) {
            console.error("Error parsing stream chunk:", parseErr);
          }
        }
      }
    } catch (err) {
      console.error("Streaming error:", err);
      updateMessageContent(
        assistantMessageId,
        "\n\n⚠️ *Connection interrupted while streaming response. Please check your network or try again.*"
      );
    } finally {
      setIsStreaming(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-4 border-t border-[#1f2333] bg-[#0c0e17] space-y-3">
      {/* Quick Prompt Suggestion Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-[11px] no-scrollbar">
        <span className="text-gray-400 flex items-center gap-1 shrink-0">
          <Sparkles className="w-3 h-3 text-cyan-400" />
          <span>Quick Prompts:</span>
        </span>
        {promptSuggestions.map((sug, i) => (
          <button
            key={i}
            onClick={() => handleSend(sug)}
            disabled={isStreaming}
            className="px-2.5 py-1 rounded-full bg-[#131624] hover:bg-[#1a1f33] border border-[#22273e] text-gray-300 hover:text-white transition-colors truncate max-w-xs shrink-0 cursor-pointer disabled:opacity-50"
          >
            {sug}
          </button>
        ))}
      </div>

      {/* Main Input Form */}
      <div className="relative flex items-center">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Command Cortex AI (e.g. 'Synthesize multi-agent architecture')..."
          disabled={isStreaming}
          className="w-full bg-[#11131c] border border-[#1f2333] focus:border-cyan-500 rounded-xl px-4 py-3 text-xs text-gray-100 placeholder-gray-400 focus:outline-none transition-colors pr-12 shadow-inner"
        />

        <button
          onClick={() => handleSend()}
          disabled={!prompt.trim() || isStreaming}
          className="absolute right-2 p-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white disabled:opacity-40 disabled:hover:bg-cyan-600 cursor-pointer transition-colors shadow-md shadow-cyan-600/30"
        >
          {isStreaming ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Send className="w-4 h-4" />
          )}
        </button>
      </div>
    </div>
  );
};
