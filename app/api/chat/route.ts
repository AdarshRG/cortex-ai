import { NextRequest, NextResponse } from "next/server";
import { generateSimulatedResponse } from "@/lib/ai/simulator";
import { estimateCost } from "@/lib/ai/gateway";
import { ModelProvider, AgentRole } from "@/types/ai";

// ==============================================================================
// PROJECT: CORTEX AI STUDIO
// FILE: app/api/chat/route.ts
// ROLE: Real-time Streaming AI API Route (SSE) with Latency & Tool Tracing
//
// 🎓 BEGINNER'S GUIDE TO STREAMING AI APIS:
//   Why Server-Sent Events (SSE) instead of traditional JSON responses?
//   - Traditional: The user waits 5 to 10 seconds staring at a blank screen
//     until the entire 500-word response finishes generating.
//   - SSE Streaming: The server sends chunks word-by-word as the LLM predicts them!
//     The user sees the first token in ~200ms (TTFT), making the app feel instantaneous.
// ==============================================================================

export async function POST(req: NextRequest) {
  const startTime = Date.now();

  try {
    const body = await req.json();
    const prompt: string = body.prompt || "";
    const model: ModelProvider = body.model || "gemini-2.0-flash";
    const agent: AgentRole = body.agent || "supervisor";

    if (!prompt.trim()) {
      return NextResponse.json({ error: "Prompt is required." }, { status: 400 });
    }

    // In Day 1, we use our deterministic streaming simulator
    // (Can be linked to live Gemini/OpenAI API keys in .env.local seamlessly)
    const simulation = generateSimulatedResponse(prompt);
    const words = simulation.streamText.split(" ");

    // Create a streaming ReadableStream using standard Web APIs
    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        let firstTokenEmitted = false;
        let ttftMs = 0;

        // 1. Emit Initial Metadata (Thoughts & Tool Calls)
        const initPayload = JSON.stringify({
          type: "init",
          thoughts: simulation.thoughts,
          toolCalls: simulation.toolCalls,
          modelUsed: model,
          agentUsed: agent,
        });
        controller.enqueue(encoder.encode(`data: ${initPayload}\n\n`));

        // 2. Stream tokens word-by-word to simulate real LLM generation
        for (let i = 0; i < words.length; i++) {
          const chunk = (i === 0 ? "" : " ") + words[i];

          if (!firstTokenEmitted) {
            ttftMs = Date.now() - startTime;
            firstTokenEmitted = true;
          }

          const chunkPayload = JSON.stringify({
            type: "chunk",
            text: chunk,
          });
          controller.enqueue(encoder.encode(`data: ${chunkPayload}\n\n`));

          // Simulate realistic token generation latency (~20ms per word)
          await new Promise((resolve) => setTimeout(resolve, 22));
        }

        const totalDurationMs = Date.now() - startTime;
        const costUsd = estimateCost(model, simulation.promptTokens, simulation.completionTokens);

        // 3. Emit Completion Payload (Artifact & Telemetry Metrics)
        const finalPayload = JSON.stringify({
          type: "done",
          artifact: simulation.artifact,
          telemetry: {
            ttftMs,
            durationMs: totalDurationMs,
            promptTokens: simulation.promptTokens,
            completionTokens: simulation.completionTokens,
            tokensPerSecond: Math.round(
              simulation.completionTokens / (totalDurationMs / 1000)
            ),
            estimatedCostUsd: costUsd,
          },
        });
        controller.enqueue(encoder.encode(`data: ${finalPayload}\n\n`));
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Chat API Route Error:", error);
    return NextResponse.json(
      { error: "Internal AI processing error." },
      { status: 500 }
    );
  }
}
