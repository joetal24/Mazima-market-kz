import { initTRPC } from "@trpc/server";
import { z } from "zod";

// Initialize tRPC
const t = initTRPC.create();

// Create router and procedures
export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;

// For protected procedures, you would normally add middleware
// For now, using public procedure since we don't have auth middleware set up
export const protectedProcedure = t.procedure;
