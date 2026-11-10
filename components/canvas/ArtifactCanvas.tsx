"use client";

// ==============================================================================
// PROJECT: CORTEX AI STUDIO
// FILE: components/canvas/ArtifactCanvas.tsx
// ROLE: Dynamic Generative UI Canvas & Artifact Inspector
//
// 🎓 BEGINNER'S GUIDE TO GENERATIVE UI & ARTIFACTS:
//   In traditional chat interfaces, everything is trapped inside a narrow chat bubble.
//   In modern AI engineering (like Claude Artifacts, ChatGPT Canvas, or v0), the AI
//   extracts standalone files, diagrams, and dashboards into a dedicated interactive canvas!
//   This allows the user to inspect, modify, and export production assets in real-time.
// ==============================================================================

import React, { useState } from "react";
import { useCortexStore } from "@/store/useCortexStore";
import { FileCode2, Copy, Check, Sparkles, X, Terminal } from "lucide-react";

export const ArtifactCanvas: React.FC = () => {
  const { activeArtifact, setActiveArtifact } = useCortexStore();
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<"rendered" | "raw">("rendered");

  const handleCopy = () => {
    if (!activeArtifact) return;
    navigator.clipboard.writeText(activeArtifact.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!activeArtifact) {
    return (
      <section className="w-96 bg-[#0b0d14] border-l border-[#1f2333] hidden xl:flex flex-col h-[calc(100vh-3.5rem)] shrink-0 items-center justify-center p-6 text-center select-none">
        <div className="w-12 h-12 rounded-xl bg-[#141724] border border-[#23273c] flex items-center justify-center text-cyan-400 mb-4 shadow-lg">
          <FileCode2 className="w-6 h-6" />
        </div>
        <h3 className="text-sm font-semibold text-gray-200">Generative UI Canvas</h3>
        <p className="text-xs text-gray-400 mt-2 max-w-xs leading-relaxed">
          When Cortex AI synthesizes diagrams, TypeScript interfaces, or research documents, they appear here in live interactive form.
        </p>
        <div className="mt-6 p-3 rounded-lg bg-[#11131c] border border-[#1f2333] text-[11px] text-gray-400 text-left w-full max-w-xs">
          <div className="flex items-center gap-1.5 text-cyan-400 font-mono font-medium mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Try Prompt:</span>
          </div>
          &quot;Synthesize the architecture of a production-grade multi-agent platform with an artifact blueprint&quot;
        </div>
      </section>
    );
  }

  return (
    <section className="w-96 lg:w-[420px] bg-[#0c0e17] border-l border-[#1f2333] flex flex-col h-[calc(100vh-3.5rem)] shrink-0 z-20">
      {/* Canvas Top Bar */}
      <div className="h-12 border-b border-[#1f2333] px-4 flex items-center justify-between bg-[#0e101b]">
        <div className="flex items-center gap-2 min-w-0">
          <Terminal className="w-4 h-4 text-cyan-400 shrink-0" />
          <h2 className="text-xs font-semibold text-gray-200 truncate">{activeArtifact.title}</h2>
        </div>

        <div className="flex items-center gap-1">
          {/* Mode Switcher */}
          <div className="flex items-center bg-[#151826] rounded-md p-0.5 border border-[#23273c]">
            <button
              onClick={() => setViewMode("rendered")}
              className={`px-2 py-0.5 text-[10px] font-medium rounded cursor-pointer ${
                viewMode === "rendered" ? "bg-cyan-950 text-cyan-300" : "text-gray-400 hover:text-white"
              }`}
            >
              Preview
            </button>
            <button
              onClick={() => setViewMode("raw")}
              className={`px-2 py-0.5 text-[10px] font-medium rounded cursor-pointer ${
                viewMode === "raw" ? "bg-cyan-950 text-cyan-300" : "text-gray-400 hover:text-white"
              }`}
            >
              Raw
            </button>
          </div>

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            title="Copy Content"
            className="p-1.5 rounded hover:bg-[#1a1e30] text-gray-400 hover:text-gray-200 cursor-pointer transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>

          {/* Close Canvas */}
          <button
            onClick={() => setActiveArtifact(null)}
            title="Close Canvas"
            className="p-1.5 rounded hover:bg-[#1a1e30] text-gray-400 hover:text-gray-200 cursor-pointer transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Canvas Body */}
      <div className="flex-1 overflow-y-auto p-4 font-sans text-xs text-gray-300 leading-relaxed space-y-3">
        {viewMode === "rendered" ? (
          <div className="prose prose-invert max-w-none text-xs space-y-3">
            <pre className="p-3 rounded-lg bg-[#07080d] border border-[#1f2333] text-gray-200 font-mono text-[11px] overflow-x-auto whitespace-pre-wrap leading-relaxed">
              {activeArtifact.content}
            </pre>
          </div>
        ) : (
          <textarea
            readOnly
            value={activeArtifact.content}
            className="w-full h-full bg-[#07080d] p-3 rounded-lg border border-[#1f2333] text-gray-300 font-mono text-[11px] resize-none focus:outline-none"
          />
        )}
      </div>

      {/* Canvas Footer */}
      <div className="p-2.5 border-t border-[#1f2333] bg-[#0b0d14] flex items-center justify-between text-[10px] text-gray-400 font-mono">
        <span>TYPE: {activeArtifact.type.toUpperCase()}</span>
        <span>ID: {activeArtifact.id}</span>
      </div>
    </section>
  );
};
