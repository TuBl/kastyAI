import { db } from "@/db";
import { publicProcedure, router } from "./trpc";
import { z } from "zod";
import { eq } from "drizzle-orm";

import { todos } from "@/db/schema";
import { migrate } from "drizzle-orm/neon-http/migrator";

migrate(db, { migrationsFolder: "drizzle" });

export const appRouter = router({
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
  toggleTodo: publicProcedure.input(z.object({ id: z.number(), done: z.boolean() })).mutation(async (opts) => {
    await db.update(todos).set({ done: opts.input.done }).where(eq(todos.id, opts.input.id));
    return true;
  }),
});

export type AppRouter = typeof appRouter;
