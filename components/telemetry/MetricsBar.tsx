"use client";

// ==============================================================================
// PROJECT: CORTEX AI STUDIO
// FILE: components/telemetry/MetricsBar.tsx
// ROLE: Real-time LLMOps Telemetry, Latency (TTFT) & Cost Monitor
//
// 🎓 BEGINNER'S GUIDE TO LLMOPS TELEMETRY:
//   In consumer chat apps, users only see a blinking cursor.
//   In enterprise AI applications, you MUST monitor:
//   1. TTFT (Time To First Token): How many milliseconds before the user sees the first character.
//   2. Token Velocity: How fast the model produces tokens (ideal: > 30 tokens/sec).
//   3. Financial Accounting: Exactly how many fractions of a cent each run consumes.
// ==============================================================================

import React from "react";
import { useCortexStore } from "@/store/useCortexStore";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { Activity, Clock, Zap, DollarSign, Cpu } from "lucide-react";

export const MetricsBar: React.FC = () => {
  const {
    activeModel,
    isStreaming,
    latestTtftMs,
    tokensPerSec,
    totalTokensUsed,
    totalCostUsd,
  } = useCortexStore();

  return (
    <header className="h-14 border-b border-[#1f2333] bg-[#0c0e17]/80 backdrop-blur-md px-6 flex items-center justify-between text-xs sticky top-0 z-30">
      {/* Left: Active System State */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            {isStreaming ? (
              <>
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
              </>
            ) : (
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            )}
          </span>
          <span className="font-mono font-medium text-gray-300">
            {isStreaming ? "ORCHESTRATING_STREAM..." : "ENGINE_ONLINE"}
          </span>
        </div>

        <div className="h-4 w-[1px] bg-gray-800" />

        <div className="flex items-center gap-1.5 text-gray-400">
          <Cpu className="w-3.5 h-3.5 text-cyan-400" />
          <span className="font-mono text-cyan-300 font-semibold uppercase">{activeModel}</span>
        </div>
      </div>

      {/* Right: Real-time Telemetry Metrics */}
      <div className="flex items-center gap-6">
        {/* Latency / TTFT */}
        <div className="flex items-center gap-1.5" title="Time To First Token">
          <Clock className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-gray-400">TTFT:</span>
          <span className="font-mono font-semibold text-amber-300">{latestTtftMs}ms</span>
        </div>

        {/* Speed / Velocity */}
        <div className="flex items-center gap-1.5" title="Tokens generated per second">
          <Zap className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-gray-400">Speed:</span>
          <span className="font-mono font-semibold text-cyan-300">{tokensPerSec} t/s</span>
        </div>

        {/* Total Tokens */}
        <div className="flex items-center gap-1.5" title="Total Tokens in session">
          <Activity className="w-3.5 h-3.5 text-purple-400" />
          <span className="text-gray-400">Tokens:</span>
          <span className="font-mono font-semibold text-purple-300">{formatNumber(totalTokensUsed)}</span>
        </div>

        {/* Cost Accumulator */}
        <div className="flex items-center gap-1.5" title="Estimated session cost">
          <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-gray-400">Cost:</span>
          <span className="font-mono font-semibold text-emerald-300">{formatCurrency(totalCostUsd)}</span>
        </div>
      </div>
    </header>
  );
};
