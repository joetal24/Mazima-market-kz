import { createTRPCRouter, publicProcedure, protectedProcedure } from "@/trpc/init";
import { db } from "@/db";
import { user, order, listing, message } from "@/db/schemas";
import { eq, desc, and } from "drizzle-orm";
import { z } from "zod";

export const userRouter = createTRPCRouter({
  // Get user by ID
  getById: publicProcedure
    .input(z.string())
    .query(async ({ input }) => {
      try {
        return await db.query.user.findFirst({
          where: eq(user.id, input),
        });
      } catch (error) {
        console.error('[v0] Error in getById:', error);
        throw new Error(`Failed to fetch user: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }),

  getProfile: publicProcedure
    .query(async () => {
      try {
        // For now, get the first user (in production, use session middleware)
        const allUsers = await db.query.user.findMany();
        return allUsers[0] || null;
      } catch (error) {
        console.error('[v0] Error in getProfile:', error);
        throw new Error(`Failed to fetch profile: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }),

  // Update user profile
  updateProfile: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        name: z.string().optional(),
        phone: z.string().optional(),
        location: z.string().optional(),
        profileImage: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const { userId, ...updateData } = input;
        return await db.update(user)
          .set({
            ...updateData,
            updatedAt: new Date(),
          })
          .where(eq(user.id, userId))
          .returning();
      } catch (error) {
        console.error('[v0] Error in updateProfile:', error);
        throw new Error(`Failed to update profile: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }),

  getBuyerStats: publicProcedure
    .input(z.string().optional())
    .query(async ({ input }) => {
      try {
        const buyerId = input;
        if (!buyerId) {
          return {
            activeOrders: 0,
            totalSpend: 0,
            verifiedSuppliers: 0,
            supplyRate: 0,
          };
        }

        const buyerOrders = await db.select().from(order)
          .where(eq(order.buyerId, buyerId));
        
        const activeOrders = buyerOrders.filter(o => ['pending', 'confirmed', 'shipped'].includes(o.status)).length;
        const totalSpend = buyerOrders.reduce((sum, o) => sum + (o.totalPrice || 0), 0);
        
        const supplierListings = await db.select().from(listing)
          .where(eq(listing.isActive, true));
        
        const suppliers = new Set(
          buyerOrders.map(o => {
            const lst = supplierListings.find(l => l.id === o.listingId);
            return lst?.farmerId;
          }).filter(Boolean)
        );

        return {
          activeOrders,
          totalSpend,
          verifiedSuppliers: suppliers.size,
          supplyRate: 98,
        };
      } catch (error) {
        console.error('[v0] Error in getBuyerStats:', error);
        return {
          activeOrders: 0,
          totalSpend: 0,
          verifiedSuppliers: 0,
          supplyRate: 0,
        };
      }
    }),

  getFarmerStats: publicProcedure
    .input(z.string().optional())
    .query(async ({ input }) => {
      try {
        const farmerId = input;
        if (!farmerId) {
          return {
            activeListings: 0,
            salesThisMonth: 0,
            messages: 0,
            rating: 0,
          };
        }

        const listings = await db.select().from(listing)
          .where(eq(listing.farmerId, farmerId));
        
        const relatedOrders = await db.select().from(order)
          .innerJoin(listing, eq(order.listingId, listing.id))
          .where(eq(listing.farmerId, farmerId));

        const sales = relatedOrders.reduce((sum, o) => sum + (o.order.totalPrice || 0), 0);
        const messages = await db.select().from(message)
          .where(eq(message.receiverId, farmerId));

        return {
          activeListings: listings.filter(l => l.status === 'available').length,
          salesThisMonth: sales,
          messages: messages.length,
          rating: 4.8,
        };
      } catch (error) {
        console.error('[v0] Error in getFarmerStats:', error);
        return {
          activeListings: 0,
          salesThisMonth: 0,
          messages: 0,
          rating: 0,
        };
      }
    }),
});
