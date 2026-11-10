"use client";

// ==============================================================================
// PROJECT: CORTEX AI STUDIO
// FILE: components/chat/ChatStream.tsx
// ROLE: Real-time Conversational Stream, Agent Thoughts & Tool Call Traces
//
// 🎓 BEGINNER'S GUIDE TO REASONING & THOUGHT TRACES:
//   Advanced AI models (like Gemini 2.0 Flash or OpenAI o1/o3) generate hidden
//   reasoning tokens before emitting the final answer.
//   Surfacing these intermediate thoughts and tool executions gives users and
//   interviewers transparency into HOW the agent resolved their query!
// ==============================================================================

import React, { useRef, useEffect, useState } from "react";
import { useCortexStore } from "@/store/useCortexStore";
import { AIMessage } from "@/types/ai";
import {
  BrainCircuit,
  Wrench,
  FileCode2,
  ChevronDown,
  ChevronRight,
  User,
  Sparkles,
} from "lucide-react";

export const ChatStream: React.FC = () => {
  const { messages, setActiveArtifact, isStreaming } = useCortexStore();
  const streamEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    streamEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isStreaming]);

  return (
    <div className="flex-1 overflow-y-auto px-6 py-8 space-y-6">
      {messages.map((message) => (
        <MessageBubble
          key={message.id}
          message={message}
          onOpenArtifact={() => message.artifact && setActiveArtifact(message.artifact)}
        />
      ))}
      <div ref={streamEndRef} />
    </div>
  );
};

const MessageBubble: React.FC<{
  message: AIMessage;
  onOpenArtifact: () => void;
}> = ({ message, onOpenArtifact }) => {
  const isUser = message.role === "user";
  const [showThoughts, setShowThoughts] = useState(true);

  return (
    <div className={`flex gap-3 max-w-3xl ${isUser ? "ml-auto justify-end" : "mr-auto"}`}>
      {/* Avatar Icon */}
      {!isUser && (
        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-600 to-indigo-600 flex items-center justify-center shrink-0 mt-1 shadow-md shadow-cyan-500/10">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
      )}

      <div className={`flex flex-col space-y-2 ${isUser ? "items-end" : "items-start"} max-w-2xl`}>
        {/* User Bubble */}
        {isUser ? (
          <div className="bg-[#1a1f33] border border-[#2b3352] text-gray-100 px-4 py-2.5 rounded-2xl rounded-tr-sm text-xs leading-relaxed shadow-sm">
            {message.content}
          </div>
        ) : (
          /* Assistant Response */
          <div className="space-y-3 w-full">
            {/* 1. Intermediate Agent Thoughts (Accordion) */}
            {message.thoughts && message.thoughts.length > 0 && (
              <div className="rounded-lg bg-[#0e111a] border border-[#1c2233] text-xs overflow-hidden">
                <button
                  onClick={() => setShowThoughts(!showThoughts)}
                  className="w-full px-3 py-1.5 flex items-center justify-between text-[11px] font-mono text-gray-400 hover:text-cyan-300 transition-colors bg-[#111522] cursor-pointer"
                >
                  <div className="flex items-center gap-1.5">
                    <BrainCircuit className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Agent Swarm Reasoning ({message.thoughts.length} steps)</span>
                  </div>
                  {showThoughts ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                </button>

                {showThoughts && (
                  <div className="p-3 space-y-2 border-t border-[#1c2233] bg-[#0c0f17]">
                    {message.thoughts.map((th, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-[11px] font-mono leading-relaxed">
                        <span className="text-cyan-400 font-bold shrink-0">#{th.step}</span>
                        <span className="px-1.5 py-0.2 rounded bg-[#161a29] text-gray-300 text-[10px] uppercase font-semibold shrink-0">
                          {th.agent}
                        </span>
                        <span className="text-gray-400">{th.thought}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 2. Tool Execution Cards */}
            {message.toolCalls && message.toolCalls.length > 0 && (
              <div className="space-y-1.5">
                {message.toolCalls.map((tool) => (
                  <div
                    key={tool.id}
                    className="p-2 rounded-lg bg-[#0e121c] border border-[#1b2234] flex items-center justify-between text-[11px] font-mono"
                  >
                    <div className="flex items-center gap-2">
                      <Wrench className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-gray-300 font-medium">{tool.toolName}</span>
                    </div>
                    <span className="px-1.5 py-0.5 rounded text-[9px] bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 uppercase">
                      {tool.status}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* 3. Main Message Content */}
            <div className="bg-[#111420] border border-[#1d2235] text-gray-200 px-4 py-3 rounded-2xl rounded-tl-sm text-xs leading-relaxed space-y-2.5 shadow-sm">
              <div className="whitespace-pre-wrap font-sans">{message.content}</div>

              {/* 4. Generated Artifact Banner (if present) */}
              {message.artifact && (
                <div className="mt-3 pt-3 border-t border-[#1d2235] flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[11px] text-cyan-300 font-medium">
                    <FileCode2 className="w-4 h-4 text-cyan-400" />
                    <span>{message.artifact.title}</span>
                  </div>
                  <button
                    onClick={onOpenArtifact}
                    className="px-2.5 py-1 rounded bg-cyan-950 hover:bg-cyan-900 border border-cyan-800 text-cyan-300 text-[10px] font-medium transition-colors cursor-pointer"
                  >
                    Open in Canvas ➔
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* User Avatar */}
      {isUser && (
        <div className="w-8 h-8 rounded-lg bg-gray-800 border border-gray-700 flex items-center justify-center shrink-0 mt-1">
          <User className="w-4 h-4 text-gray-300" />
        </div>
      )}
    </div>
  );
};
