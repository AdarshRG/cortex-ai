import React from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { MetricsBar } from "@/components/telemetry/MetricsBar";
import { ChatStream } from "@/components/chat/ChatStream";
import { ChatInput } from "@/components/chat/ChatInput";
import { ArtifactCanvas } from "@/components/canvas/ArtifactCanvas";

// ==============================================================================
// PROJECT: CORTEX AI STUDIO
// FILE: app/page.tsx
// ROLE: Master Studio Interface (Sidebar + Live Stream + Telemetry + Generative Canvas)
//
// 🎓 BEGINNER'S GUIDE TO FULL-STACK AI LAYOUT:
//   A production AI Studio is divided into 3 distinct functional zones:
//   1. Control Plane (Left Sidebar): Agent swarms, knowledge indices, model gateway.
//   2. Execution Stream (Center Panel): Live conversational reasoning & tool traces.
//   3. Generative Canvas (Right Panel): Live artifacts, code snippets, and diagrams.
//   4. Observability Bar (Top Header): Sub-second TTFT latency and real-time cost telemetry.
// ==============================================================================

export default function CortexStudioPage() {
  return (
    <main className="flex h-screen w-screen overflow-hidden bg-[#090a0f]">
      {/* 1. Left Control Plane */}
      <Sidebar />

      {/* 2. Center & Right Workspace */}
      <div className="flex flex-col flex-1 min-w-0 h-screen">
        {/* Top LLMOps Telemetry Header */}
        <MetricsBar />

        {/* Workspace Body: Center Stream + Right Canvas */}
        <div className="flex flex-1 min-h-0 overflow-hidden">
          {/* Conversational & Reasoning Stream */}
          <div className="flex flex-col flex-1 min-w-0 bg-[#090a0f]">
            <ChatStream />
            <ChatInput />
          </div>

          {/* Generative UI & Artifact Canvas */}
          <ArtifactCanvas />
        </div>
      </div>
    </main>
  );
}
