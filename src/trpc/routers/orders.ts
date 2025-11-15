import { createTRPCRouter, publicProcedure, protectedProcedure } from "@/trpc/init";
import { db } from "@/db";
import { order, listing, user } from "@/db/schemas";
import { eq, desc } from "drizzle-orm";
import { z } from "zod";

export const orderRouter = createTRPCRouter({
  getBuyerOrders: publicProcedure
    .input(z.string().optional())
    .query(async ({ input }) => {
      try {
        const buyerId = input;
        if (!buyerId) {
          return [];
        }

        return await db.select({
          order: order,
          listing: listing,
          farmer: user,
        })
          .from(order)
          .innerJoin(listing, eq(order.listingId, listing.id))
          .innerJoin(user, eq(listing.farmerId, user.id))
          .where(eq(order.buyerId, buyerId))
          .orderBy(desc(order.createdAt));
      } catch (error) {
        console.error('[v0] Error fetching buyer orders:', error);
        return [];
      }
    }),

  getRecentPurchases: publicProcedure
    .input(z.string().optional())
    .query(async ({ input }) => {
      try {
        const buyerId = input;
        if (!buyerId) {
          return [];
        }

        return await db.select({
          order: order,
          listing: listing,
          farmer: user,
        })
          .from(order)
          .innerJoin(listing, eq(order.listingId, listing.id))
          .innerJoin(user, eq(listing.farmerId, user.id))
          .where(eq(order.buyerId, buyerId))
          .orderBy(desc(order.createdAt))
          .limit(3);
      } catch (error) {
        console.error('[v0] Error fetching recent purchases:', error);
        return [];
      }
    }),

  // Create order
  create: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        listingId: z.number(),
        quantity: z.number(),
        deliveryAddress: z.string(),
        contactNumber: z.string(),
        paymentMethod: z.string().optional(),
        notes: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const listingData = await db.query.listing.findFirst({
          where: eq(listing.id, input.listingId),
        });

        if (!listingData) {
          throw new Error("Listing not found");
        }

        const totalPrice = listingData.pricePerKg * input.quantity;

        return await db.insert(order).values({
          buyerId: input.userId,
          listingId: input.listingId,
          quantity: input.quantity,
          totalPrice,
          deliveryAddress: input.deliveryAddress,
          contactNumber: input.contactNumber,
          paymentMethod: input.paymentMethod,
          notes: input.notes,
        }).returning();
      } catch (error) {
        console.error('[v0] Error creating order:', error);
        throw new Error(`Failed to create order: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }),

  // Update order status
  updateStatus: publicProcedure
    .input(
      z.object({
        id: z.number(),
        userId: z.string(),
        status: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const orderData = await db.query.order.findFirst({
          where: eq(order.id, input.id),
        });

        if (orderData?.buyerId !== input.userId) {
          throw new Error("Unauthorized");
        }

        return await db.update(order)
          .set({ status: input.status, updatedAt: new Date() })
          .where(eq(order.id, input.id))
          .returning();
      } catch (error) {
        console.error('[v0] Error updating order status:', error);
        throw new Error(`Failed to update order: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }),
});
