import { db } from "@/db";
import { todos } from "@/db/schema";

import { publicProcedure, router } from "@/server/trpc";
import { z } from "zod";
import { eq } from "drizzle-orm";

export const todosRouter = router({
  getTodos: publicProcedure.query(async () => {
    return await db.select().from(todos);
  }),
  addTodo: publicProcedure.input(z.string()).mutation(async (opts) => {
    await db.insert(todos).values({
      content: opts.input,
      done: false,
    });

    return true;
  }),
  toggleTodo: publicProcedure
    .input(z.object({ id: z.number(), done: z.boolean() }))
    .mutation(async (opts) => {
      await db
        .update(todos)
        .set({ done: opts.input.done })
        .where(eq(todos.id, opts.input.id));
      return true;
    }),
});
