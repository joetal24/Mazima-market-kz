import { createTRPCRouter, protectedProcedure, publicProcedure } from "@/trpc/init";
import { db } from "@/db";
import { message, user, listing } from "@/db/schemas";
import { eq, desc, or, and } from "drizzle-orm";
import { z } from "zod";

export const messageRouter = createTRPCRouter({
  getConversations: protectedProcedure
    .query(async ({ ctx }) => {
      const conversations = await db
        .select({
          id: message.id,
          lastMessage: message.content,
          lastMessageTime: message.createdAt,
          otherUser: user,
          listing: listing,
        })
        .from(message)
        .innerJoin(user, or(
          eq(message.senderId, user.id),
          eq(message.receiverId, user.id)
        ))
        .leftJoin(listing, eq(message.listingId, listing.id))
        .where(or(
          eq(message.senderId, ctx.user.id),
          eq(message.receiverId, ctx.user.id)
        ))
        .orderBy(desc(message.createdAt))
        .limit(50);

      const grouped = new Map();
      conversations.forEach((conv) => {
        const key = `${conv.otherUser.id}`;
        if (!grouped.has(key)) {
          grouped.set(key, {
            otherUser: conv.otherUser,
            lastMessage: conv.lastMessage,
            lastMessageTime: conv.lastMessageTime,
            listing: conv.listing,
          });
        }
      });

      return Array.from(grouped.values());
    }),

  getConversation: protectedProcedure
    .input(z.object({ otherUserId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await db
        .select({
          message: message,
          sender: user,
        })
        .from(message)
        .innerJoin(user, eq(message.senderId, user.id))
        .where(
          or(
            and(
              eq(message.senderId, ctx.user.id),
              eq(message.receiverId, input.otherUserId)
            ),
            and(
              eq(message.senderId, input.otherUserId),
              eq(message.receiverId, ctx.user.id)
            )
          )
        )
        .orderBy(message.createdAt);
    }),

  sendMessage: protectedProcedure
    .input(
      z.object({
        receiverId: z.string(),
        content: z.string().min(1).max(5000),
        listingId: z.number().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const newMessage = await db
        .insert(message)
        .values({
          senderId: ctx.user.id,
          receiverId: input.receiverId,
          content: input.content,
          listingId: input.listingId,
        })
        .returning();

      return newMessage[0];
    }),

  markAsRead: protectedProcedure
    .input(z.object({ senderId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await db
        .update(message)
        .set({ isRead: true })
        .where(
          and(
            eq(message.receiverId, ctx.user.id),
            eq(message.senderId, input.senderId)
          )
        );
    }),

  getUnreadCount: protectedProcedure
    .query(async ({ ctx }) => {
      const result = await db
        .select({ count: message.id })
        .from(message)
        .where(
          and(
            eq(message.receiverId, ctx.user.id),
            eq(message.isRead, false)
          )
        );

      return result.length;
    }),

  getMessagesForListing: protectedProcedure
    .input(z.object({ listingId: z.number() }))
    .query(async ({ ctx, input }) => {
      return await db
        .select({
          message: message,
          sender: user,
        })
        .from(message)
        .innerJoin(user, eq(message.senderId, user.id))
        .where(eq(message.listingId, input.listingId))
        .orderBy(message.createdAt);
    }),

  getOrCreateConversation: protectedProcedure
    .input(z.object({ otherUserId: z.string() }))
    .query(async ({ ctx, input }) => {
      // Check if conversation exists
      const existingMessages = await db
        .select()
        .from(message)
        .where(
          or(
            and(
              eq(message.senderId, ctx.user.id),
              eq(message.receiverId, input.otherUserId)
            ),
            and(
              eq(message.senderId, input.otherUserId),
              eq(message.receiverId, ctx.user.id)
            )
          )
        )
        .limit(1);

      // Get other user details
      const otherUser = await db
        .select()
        .from(user)
        .where(eq(user.id, input.otherUserId))
        .limit(1);

      return {
        otherUser: otherUser[0],
        hasExistingMessages: existingMessages.length > 0,
      };
    }),

  getFarmerInfo: publicProcedure
    .input(z.string())
    .query(async ({ input }) => {
      const farmerData = await db
        .select({
          user: user,
          listings: listing,
        })
        .from(user)
        .leftJoin(listing, and(
          eq(listing.farmerId, user.id),
          eq(listing.isActive, 1)
        ))
        .where(eq(user.id, input));

      if (!farmerData.length) return null;

      const farmer = farmerData[0].user;
      const listings = farmerData.map(d => d.listings).filter(Boolean);

      return {
        farmer,
        listings,
        totalListings: listings.length,
      };
    }),
});
