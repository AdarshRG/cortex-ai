import type { Metadata } from "next";
import "./globals.css";

// ==============================================================================
// PROJECT: CORTEX AI STUDIO
// FILE: app/layout.tsx
// ROLE: Master Root Layout & Visual Theme Enclosure
// ==============================================================================

export const metadata: Metadata = {
  title: "CORTEX AI Studio — Autonomous Multi-Agent Workspace",
  description:
    "Production-grade Full-Stack AI workspace featuring stateful agent swarms, dynamic tool tracing, Generative UI canvas, and live LLMOps telemetry.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased min-h-screen bg-[#090a0f] text-gray-100 selection:bg-cyan-500/20 selection:text-cyan-200">
        {children}
      </body>
    </html>
  );
}
