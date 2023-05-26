import { initTRPC } from "@trpc/server";
import { z } from "zod";

const t = initTRPC.create();

export const router = t.router;
export const publicProducer = t.procedure;

const appRouter = router({
  userList: publicProducer.input(z.string()).query(async ({ input }) => {
    const users: { id: string }[] = [].filter(({ id }) => id === input);

    return users;
  }),
});
