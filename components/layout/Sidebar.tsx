"use client";

// ==============================================================================
// PROJECT: CORTEX AI STUDIO
// FILE: components/layout/Sidebar.tsx
// ROLE: Workspace Navigation, Swarm Agent Selection & Model Gateway Controls
// ==============================================================================

import React from "react";
import { useCortexStore } from "@/store/useCortexStore";
import { AgentRole, ModelProvider } from "@/types/ai";
import {
  Sparkles,
  PlusCircle,
  BrainCircuit,
  Search,
  Code2,
  ShieldCheck,
  Cpu,
  Database,
  Layers,
} from "lucide-react";

export const Sidebar: React.FC = () => {
  const {
    activeModel,
    activeAgent,
    setActiveModel,
    setActiveAgent,
    clearSession,
    isStreaming,
  } = useCortexStore();

  const agents: { role: AgentRole; label: string; icon: React.ReactNode; desc: string }[] = [
    {
      role: "supervisor",
      label: "Supervisor Agent",
      icon: <BrainCircuit className="w-4 h-4 text-cyan-400" />,
      desc: "Deconstructs prompts into sub-tasks",
    },
    {
      role: "researcher",
      label: "Research Swarm",
      icon: <Search className="w-4 h-4 text-purple-400" />,
      desc: "Deep document & vector retrieval",
    },
    {
      role: "coder",
      label: "Code & Schema",
      icon: <Code2 className="w-4 h-4 text-emerald-400" />,
      desc: "TypeScript & SQL code generation",
    },
    {
      role: "fact-checker",
      label: "Critic & Auditor",
      icon: <ShieldCheck className="w-4 h-4 text-amber-400" />,
      desc: "Zero-hallucination factual audit",
    },
  ];

  const models: { id: ModelProvider; label: string; badge: string }[] = [
    { id: "gemini-2.0-flash", label: "Gemini 2.0 Flash", badge: "Fastest TTFT" },
    { id: "gpt-4o", label: "OpenAI GPT-4o", badge: "Multimodal" },
    { id: "claude-3-7-sonnet", label: "Claude 3.7", badge: "Deep Logic" },
    { id: "simulator", label: "Local Simulator", badge: "Offline / 0 Cost" },
  ];

  return (
    <aside className="w-72 bg-[#0b0d14] border-r border-[#1f2333] flex flex-col h-screen shrink-0 text-sm select-none">
      {/* Brand & Studio Title */}
      <div className="p-4 border-b border-[#1f2333] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-600 via-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-gray-100 tracking-wide text-base">CORTEX AI</h1>
            <p className="text-[10px] text-gray-400 font-mono tracking-wider uppercase">Agent Studio v1.0</p>
          </div>
        </div>
      </div>

      {/* New Session Action */}
      <div className="p-3">
        <button
          onClick={clearSession}
          disabled={isStreaming}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-[#141724] hover:bg-[#1a1e30] border border-[#23273c] text-gray-200 hover:text-white transition-all text-xs font-medium cursor-pointer disabled:opacity-50"
        >
          <PlusCircle className="w-3.5 h-3.5 text-cyan-400" />
          <span>New Workspace Thread</span>
        </button>
      </div>

      {/* Navigation & Selection Sections */}
      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-6">
        {/* Agent Persona Swarm */}
        <div>
          <div className="flex items-center gap-1.5 px-2 mb-2 text-[11px] font-mono font-semibold text-gray-400 uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>Active Agent Role</span>
          </div>
          <div className="space-y-1">
            {agents.map((ag) => {
              const isSelected = activeAgent === ag.role;
              return (
                <button
                  key={ag.role}
                  onClick={() => setActiveAgent(ag.role)}
                  className={`w-full flex items-start gap-3 p-2 rounded-lg text-left transition-all cursor-pointer ${
                    isSelected
                      ? "bg-cyan-950/40 border border-cyan-800/60 text-white"
                      : "hover:bg-[#131622] text-gray-300 border border-transparent"
                  }`}
                >
                  <div className="mt-0.5">{ag.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium leading-tight">{ag.label}</div>
                    <div className="text-[10px] text-gray-400 truncate mt-0.5">{ag.desc}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Model Gateway */}
        <div>
          <div className="flex items-center gap-1.5 px-2 mb-2 text-[11px] font-mono font-semibold text-gray-400 uppercase tracking-wider">
            <Cpu className="w-3.5 h-3.5 text-purple-400" />
            <span>Model Gateway</span>
          </div>
          <div className="space-y-1">
            {models.map((mod) => {
              const isSelected = activeModel === mod.id;
              return (
                <button
                  key={mod.id}
                  onClick={() => setActiveModel(mod.id)}
                  className={`w-full flex items-center justify-between p-2 rounded-lg text-left text-xs transition-all cursor-pointer ${
                    isSelected
                      ? "bg-purple-950/40 border border-purple-800/60 text-white font-medium"
                      : "hover:bg-[#131622] text-gray-400 border border-transparent"
                  }`}
                >
                  <span>{mod.label}</span>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#1c2033] text-gray-300">
                    {mod.badge}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Knowledge Base Indices (Vector RAG) */}
        <div>
          <div className="flex items-center gap-1.5 px-2 mb-2 text-[11px] font-mono font-semibold text-gray-400 uppercase tracking-wider">
            <Database className="w-3.5 h-3.5 text-emerald-400" />
            <span>Active Vector Index</span>
          </div>
          <div className="p-2.5 rounded-lg bg-[#11131c] border border-[#1f2333] space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-300">pgvector_core</span>
              <span className="text-[10px] font-mono text-emerald-400">1,540 vectors</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-1">
              <div className="bg-emerald-500 h-1 rounded-full w-3/4"></div>
            </div>
            <p className="text-[10px] text-gray-400">Hybrid Dense + BM25 Enabled</p>
          </div>
        </div>
      </div>

      {/* Footer / Engineer Badge */}
      <div className="p-3 border-t border-[#1f2333] bg-[#0c0e17]">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold text-gray-200">AdarshRG</p>
            <p className="text-[9px] text-gray-400 font-mono">Full-Stack AI Engineer</p>
          </div>
          <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-cyan-950 text-cyan-400 border border-cyan-800">
            Phase 1
          </span>
        </div>
      </div>
    </aside>
  );
};
