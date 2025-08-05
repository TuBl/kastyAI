// routers
import { router } from "@/server/trpc";
import { ragRouter } from "./routers/rag";
import { todosRouter } from "./routers/todo";

export const appRouter = router({
  rag: ragRouter,
  todo: todosRouter,
});

export type AppRouter = typeof appRouter;
