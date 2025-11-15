import { createTRPCRouter, publicProcedure, protectedProcedure } from "@/trpc/init";
import { db } from "@/db";
import { listing, user } from "@/db/schemas";
import { eq, and, desc, ilike, or } from "drizzle-orm";
import { z } from "zod";

export const listingRouter = createTRPCRouter({
  // Get all listings with filters
  getAll: publicProcedure
    .input(
      z.object({
        category: z.string().optional(),
        market: z.string().optional(),
        search: z.string().optional(),
      }).optional()
    )
    .query(async ({ input }) => {
      let query = db.select().from(listing).where(eq(listing.isActive, 1));

      if (input?.category) {
        query = query.where(eq(listing.category, input.category));
      }
      if (input?.market) {
        query = query.where(eq(listing.market, input.market));
      }

      return await query.orderBy(desc(listing.createdAt)).limit(100);
    }),

  // Get listing by ID
  getById: publicProcedure
    .input(z.number())
    .query(async ({ input }) => {
      return await db.query.listing.findFirst({
        where: eq(listing.id, input),
      });
    }),

  // Get listings by farmer
  getByFarmer: publicProcedure
    .input(z.string())
    .query(async ({ input }) => {
      return await db.query.listing.findMany({
        where: eq(listing.farmerId, input),
        orderBy: desc(listing.createdAt),
      });
    }),

  // Create listing (farmer only)
  create: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        produceName: z.string(),
        category: z.string(),
        quantity: z.number(),
        pricePerKg: z.number(),
        unit: z.string(),
        description: z.string().optional(),
        imageUrl: z.string().optional(),
        location: z.string(),
        market: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        return await db.insert(listing).values({
          farmerId: input.userId,
          produceName: input.produceName,
          category: input.category,
          quantity: input.quantity,
          pricePerKg: input.pricePerKg,
          availableQuantity: input.quantity,
          unit: input.unit,
          description: input.description,
          imageUrl: input.imageUrl,
          location: input.location,
          market: input.market,
        }).returning();
      } catch (error) {
        console.error('[v0] Error creating listing:', error);
        throw new Error(`Failed to create listing: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }),

  // Update listing
  update: publicProcedure
    .input(
      z.object({
        id: z.number(),
        userId: z.string(),
        pricePerKg: z.number().optional(),
        quantity: z.number().optional(),
        isActive: z.number().optional(),
        status: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const listingData = await db.query.listing.findFirst({
          where: eq(listing.id, input.id),
        });

        if (listingData?.farmerId !== input.userId) {
          throw new Error("Unauthorized");
        }

        return await db.update(listing)
          .set({ ...input })
          .where(eq(listing.id, input.id))
          .returning();
      } catch (error) {
        console.error('[v0] Error updating listing:', error);
        throw new Error(`Failed to update listing: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }),

  searchWithFarmers: publicProcedure
    .input(
      z.object({
        search: z.string().optional(),
        category: z.string().optional(),
        market: z.string().optional(),
      }).optional()
    )
    .query(async ({ input }) => {
      let query = db
        .select({
          listing: listing,
          farmer: user,
        })
        .from(listing)
        .innerJoin(user, eq(listing.farmerId, user.id))
        .where(eq(listing.isActive, 1));

      if (input?.search) {
        query = query.where(
          ilike(listing.produceName, `%${input.search}%`)
        );
      }
      if (input?.category) {
        query = query.where(eq(listing.category, input.category));
      }
      if (input?.market) {
        query = query.where(eq(listing.market, input.market));
      }

      return await query.orderBy(desc(listing.createdAt)).limit(100);
    }),

  getByFarmerWithDetails: publicProcedure
    .input(z.string())
    .query(async ({ input }) => {
      return await db
        .select({
          listing: listing,
          farmer: user,
        })
        .from(listing)
        .innerJoin(user, eq(listing.farmerId, user.id))
        .where(and(eq(listing.farmerId, input), eq(listing.isActive, 1)))
        .orderBy(desc(listing.createdAt));
    }),
});
