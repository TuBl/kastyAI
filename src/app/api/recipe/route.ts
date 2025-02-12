#! /usr/bin/env -S pnpm tsx
import ollama from "@/providers/ollama";
import recipeSchema from "@/schemas/recipe";
import { streamObject } from "ai";

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const result = streamObject({
    model: ollama("deepseek-r1:14b", { structuredOutputs: true }),
    system:
      "You are an experienced chef who knows to prepare any dish from any cusine around the world",
    prompt: `Generate a recipe for ${prompt}`,
    schema: recipeSchema,
    schemaName: "A recipe for a dish",
    schemaDescription:
      "Detailed instructions of how to put together a recipe listing each ingredient name and amount, the dish name  as well as step by step instructions of how to put it together",
  });

  return result.toTextStreamResponse();
}
