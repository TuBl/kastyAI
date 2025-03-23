// import ollama from "@/providers/ollama";
import {openai} from "@/providers/openai";
import { weatherTool, conversionTool } from "@/tools/weather";
import { streamText } from "ai";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai("gpt-4o"),
    system: "Provide the current weather for the specified location.",
    messages,
    tools: {
      weatherTool,
      conversionTool,
    },
    toolChoice: "required",
    maxSteps: 2,
    onStepFinish: ({ text, toolCalls, toolResults, finishReason, usage }) => {
      console.log(text, toolCalls, toolResults, finishReason, usage);
    },
  });

  return result.toDataStreamResponse({
    getErrorMessage: (error) => {
      if (error == null) {
        return "unknown error";
      }

      if (typeof error === "string") {
        return error;
      }

      if (error instanceof Error) {
        return error.message;
      }

      return JSON.stringify(error);
    },
  });
}
