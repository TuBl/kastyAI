import { streamText } from "ai";
import ollama from "@/providers/ollama";
// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { prompt }: { prompt: string } = await req.json();

  const result = streamText({
    maxTokens: 1024,
    model: ollama("deepseek-r1:14b"),
    prompt: prompt,
  });

  return result.toDataStreamResponse();
}
