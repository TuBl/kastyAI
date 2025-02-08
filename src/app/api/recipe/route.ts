#! /usr/bin/env -S pnpm tsx
import ollama from "@/providers/ollama";
import recipeSchema from "@/schemas/recipe";
import { streamObject } from "ai";

export async function POST(req: Request) {
  const context = await req.json();

  const result = streamObject({
    model: ollama("deepseek-r1:14b"),
    prompt: `You are a world class chef, Generate a recipe based on the following requirements: ${context}`,
    schema: recipeSchema,
  });

  return result.toTextStreamResponse();
}
