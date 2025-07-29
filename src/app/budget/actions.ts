"use server";

import { MonthlyBudgetInsightsSchema } from "@/schemas/monthly-budget";
import { generateObject } from "ai";
import { readFile, writeFile } from "fs/promises";
import { nanoid } from "nanoid";
import { openai } from "@/providers/openai";
import path from "path";

export async function processBudgetFile(formData: FormData) {
  const file = formData.get("file") as File;
  if (!file || file.size === 0) return { error: "No file uploaded." };

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const filePath = path.join("/tmp", `${nanoid()}.csv`);

  await writeFile(filePath, buffer);
  const csv = await readFile(filePath, "utf8");

  const result = await generateObject({
    model: openai("gpt-4o", { structuredOutputs: true }),
    schema: MonthlyBudgetInsightsSchema,
    system:
      "You will be provided a CSV of monthly expenses spanning multiple months. Each row includes a date, category, and amount. Analyze the file to produce insights. (Ignore the wants / needs categories as they are used for all entries)",
    prompt: `Here is the CSV content:\n\n${csv}`,
  });

  return JSON.parse(JSON.stringify(result.object));
}
