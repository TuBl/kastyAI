import { z } from "zod";
import { getRelevantChunks } from "@/lib/rag/retrieve";

export const ragTool = {
  name: "retrieveKnowledge",
  description: "Retrieves top relevant knowledge based on query",
  parameters: z.object({
    query: z.string(),
  }),
  execute: async ({ query }: { query: string }) => {
    const chunks = await getRelevantChunks(query);
    return chunks.join("\n\n");
  },
};
