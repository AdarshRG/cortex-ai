// ==============================================================================
// PROJECT: CORTEX AI STUDIO
// FILE: lib/ai/gateway.ts
// ROLE: Multi-Model Gateway & Intelligent Fallback Router
//
// 🎓 BEGINNER'S GUIDE TO MODEL ROUTING:
//   In enterprise AI applications, you never tie your codebase directly to a single
//   vendor's API. Why?
//   1. Redundancy: If OpenAI experiences an outage, your app automatically falls back to Gemini.
//   2. Cost Efficiency: Simple prompts use ultra-cheap/fast models (Gemini 2.0 Flash);
//      complex reasoning prompts use high-end models (Claude 3.7 / GPT-4o).
//   3. Zero-Failure Local Mode: When developing without credentials, it falls back
//      to the internal simulator gracefully with real streaming behavior!
// ==============================================================================

import { google } from "@ai-sdk/google";
import { openai } from "@ai-sdk/openai";
import { ModelProvider } from "@/types/ai";

export interface GatewayConfig {
  preferredModel: ModelProvider;
  forceSimulator?: boolean;
}

export function getSelectedModel(modelName: ModelProvider) {
  const hasGoogleKey = Boolean(process.env.GOOGLE_GENERATIVE_AI_API_KEY);
  const hasOpenAIKey = Boolean(process.env.OPENAI_API_KEY);

  // Check if live API usage is feasible
  if (modelName === "gemini-2.0-flash" && hasGoogleKey) {
    return {
      type: "live" as const,
      model: google("gemini-2.0-flash-exp"),
      name: "gemini-2.0-flash",
    };
  }

  if (modelName === "gpt-4o" && hasOpenAIKey) {
    return {
      type: "live" as const,
      model: openai("gpt-4o"),
      name: "gpt-4o",
    };
  }

  // Graceful fallback to Simulator mode
  return {
    type: "simulator" as const,
    model: null,
    name: "simulator" as const,
  };
}

// Cost estimation helper per 1,000 tokens
export function estimateCost(model: ModelProvider, promptTokens: number, completionTokens: number): number {
  switch (model) {
    case "gemini-2.0-flash":
      // Google Gemini 2.0 Flash: ~$0.0001 per 1k input, ~$0.0004 per 1k output
      return (promptTokens * 0.0001 + completionTokens * 0.0004) / 1000;
    case "gpt-4o":
      // GPT-4o: ~$0.0025 per 1k input, ~$0.01 per 1k output
      return (promptTokens * 0.0025 + completionTokens * 0.01) / 1000;
    case "claude-3-7-sonnet":
      // Claude 3.7: ~$0.003 per 1k input, ~$0.015 per 1k output
      return (promptTokens * 0.003 + completionTokens * 0.015) / 1000;
    case "simulator":
    default:
      return 0.0;
  }
}
