import { createTRPCRouter } from "@/trpc/init";
import { listingRouter } from "./listings";
import { priceRouter } from "./prices";
import { userRouter } from "./users";
import { orderRouter } from "./orders";
import { messageRouter } from "./messages";

export const appRouter = createTRPCRouter({
  listing: listingRouter,
  price: priceRouter,
  user: userRouter,
  order: orderRouter,
  message: messageRouter,
});

export type AppRouter = typeof appRouter;
