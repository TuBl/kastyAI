import { httpBatchLink } from "@trpc/client";
import { appRouter } from "@/server";

export const serverClient = appRouter.createCaller({
  links: [
    httpBatchLink({
      url: "http://loclahost:3000/api/trpc",
    }),
  ],
});

export default serverClient;
