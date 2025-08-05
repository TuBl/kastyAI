import { getRelevantChunks } from "@/lib/rag/retrieve";
import { publicProcedure, router } from "@/server/trpc";
import { z } from "zod";

export const ragRouter = router({
  getRelevantChunks: publicProcedure
    .input(z.object({ query: z.string(), threshold: z.number().nullable() }))
    .query(async ({ input }) => {
      const chunks = await getRelevantChunks(
        input.query,
        3,
        input.threshold ?? 0.8
      );
      return chunks;
    }),
});
