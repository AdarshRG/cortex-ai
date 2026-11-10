import type { NextConfig } from "next";

// ==============================================================================
// PROJECT: CORTEX AI STUDIO
// FILE: next.config.ts
// ROLE: Next.js 16 Configuration & Production Standalone Output
//
// 🎓 BEGINNER'S GUIDE TO NEXT.JS CONFIGURATION:
//   In full-stack AI engineering, Next.js acts as both our frontend presentation tier
//   and our edge/node API gateway. This configuration enables:
//   1. `output: "standalone"`: Bundles only necessary node_modules for ultra-light Docker images.
//   2. Server Actions & Streaming optimizations for real-time AI token feeds.
// ==============================================================================

const nextConfig: NextConfig = {
  // Standalone output is enabled in Linux Docker containers.
  // In local Windows development, standard output avoids Windows symlink permissions.
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
