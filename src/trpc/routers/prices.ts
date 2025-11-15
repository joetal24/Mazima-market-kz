import { createTRPCRouter, publicProcedure } from "@/trpc/init";
import { db } from "@/db";
import { marketPrice } from "@/db/schemas";
import { eq } from "drizzle-orm";
import { z } from "zod";

export const priceRouter = createTRPCRouter({
  // Get all market prices
  getAll: publicProcedure.query(async () => {
    return await db.query.marketPrice.findMany();
  }),

  // Get prices by market
  getByMarket: publicProcedure
    .input(z.string())
    .query(async ({ input }) => {
      return await db.query.marketPrice.findMany({
        where: eq(marketPrice.market, input),
      });
    }),

  // Get prices by produce
  getByProduce: publicProcedure
    .input(z.string())
    .query(async ({ input }) => {
      return await db.query.marketPrice.findMany({
        where: eq(marketPrice.produceName, input),
      });
    }),
});
