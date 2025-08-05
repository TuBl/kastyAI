"use server";
import { generateObject } from "ai";
import fs from "fs/promises";
import { MonthlyBudgetInsightsSchema } from "@/schemas/monthly-budget";
import { generateText } from "ai";
import { openai } from "@/providers/openai";
import { readFileSync } from "fs";
import path from "path";

const systemPrompt = `You will receive an image. Please create an alt text description of the image that is concise, 
accurate, and informative. The description should be suitable for users with visual impairments and should 
not include any personal opinions or subjective interpretations. Do not exceed 160 characters.`;

export const describeImage = async (imageRelativePath: string) => {
  if (!imageRelativePath) {
    throw new Error("Image path is required");
  }

  const imagePath = path.join(process.cwd(), "public", imageRelativePath);

  const imageAsUint8Array = readFileSync(imagePath);

  const { text } = await generateText({
    model: openai("gpt-4o", {
      structuredOutputs: true,
    }),
    system: systemPrompt,
    messages: [
      { role: "user", content: [{ type: "image", image: imageAsUint8Array }] },
    ],
    maxTokens: 160,
  });

  return text.trim();
};

export const describeImageFromURL = async (imageUrl: string) => {
  if (!imageUrl) {
    throw new Error("Image URL is required");
  }

  const { text } = await generateText({
    model: openai("gpt-4o", {
      structuredOutputs: true,
    }),
    system: systemPrompt,
    messages: [
      { role: "user", content: [{ type: "image", image: new URL(imageUrl) }] },
    ],
    maxTokens: 160,
  });

  return text.trim();
};

// actions/extractMonthlyInsights.ts
export const extractMonthlyInsights = async (csvPath: string) => {
  const csv = await fs.readFile(csvPath, "utf8");

  return await generateObject({
    model: openai("gpt-4o", { structuredOutputs: true }),
    schema: MonthlyBudgetInsightsSchema,
    system: `You will be provided a CSV of monthly expenses. Extract useful insights including total spending, spending breakdowns, trends, and recommendations.`,
    prompt: `Here is the CSV content:\n\n${csv}`,
  });
};
