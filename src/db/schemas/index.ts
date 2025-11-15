import { pgTable, text, timestamp, boolean, integer, real, serial } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

// ============ User & Auth ============
export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  role: text("role").notNull().default("farmer"), // farmer, buyer, admin
  phone: text("phone"),
  location: text("location"),
  profileImage: text("profile_image"),
  emailVerified: boolean("emailVerified").notNull().default(false),
  language: text("language").notNull().default("en"), // en, lg (Luganda)
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expiresAt").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  userId: text("userId").notNull().references(() => user.id, { onDelete: "cascade" }),
});

// ============ Listings (Farmer Products) ============
export const listing = pgTable("listing", {
  id: serial("id").primaryKey(),
  farmerId: text("farmer_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  produceName: text("produce_name").notNull(),
  category: text("category").notNull(), // fresh_produce, cash_crops, horticulture, other
  quantity: real("quantity").notNull(),
  pricePerKg: real("price_per_kg").notNull(),
  availableQuantity: real("available_quantity").notNull(),
  unit: text("unit").notNull().default("kg"), // kg, bunch, bag, etc
  description: text("description"),
  imageUrl: text("image_url"),
  isActive: integer("is_active").notNull().default(1),
  location: text("location").notNull(),
  market: text("market"), // Owino, Kalerwe, Gulu, etc
  status: text("status").notNull().default("available"), // available, sold_out, reserved
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

// ============ Market Prices ============
export const marketPrice = pgTable("market_price", {
  id: serial("id").primaryKey(),
  produceName: text("produce_name").notNull(),
  market: text("market").notNull(), // Owino, Kalerwe, Gulu, etc
  pricePerKg: real("price_per_kg").notNull(),
  priceChange: real("price_change").notNull().default(0), // percentage change
  trend: text("trend").notNull().default("stable"), // up, down, stable
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

// ============ Buyer Requests ============
export const buyerRequest = pgTable("buyer_request", {
  id: serial("id").primaryKey(),
  buyerId: text("buyer_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  produceName: text("produce_name").notNull(),
  quantityNeeded: real("quantity_needed").notNull(),
  unit: text("unit").notNull().default("kg"),
  budgetPerKg: real("budget_per_kg"),
  deliveryLocation: text("delivery_location").notNull(),
  deadline: timestamp("deadline"),
  description: text("description"),
  status: text("status").notNull().default("open"), // open, matched, closed
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

// ============ Orders ============
export const order = pgTable("order", {
  id: serial("id").primaryKey(),
  buyerId: text("buyer_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  listingId: integer("listing_id").notNull().references(() => listing.id, { onDelete: "cascade" }),
  quantity: real("quantity").notNull(),
  totalPrice: real("total_price").notNull(),
  status: text("status").notNull().default("pending"), // pending, confirmed, shipped, delivered, cancelled
  paymentMethod: text("payment_method"), // cash, mtn_momo, airtel_money
  deliveryAddress: text("delivery_address").notNull(),
  contactNumber: text("contact_number").notNull(),
  notes: text("notes"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

// ============ Chat/Messaging ============
export const message = pgTable("message", {
  id: serial("id").primaryKey(),
  senderId: text("sender_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  receiverId: text("receiver_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  listingId: integer("listing_id").references(() => listing.id, { onDelete: "set null" }),
  content: text("content").notNull(),
  isRead: boolean("is_read").notNull().default(false),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
});

// ============ Weather & Tips ============
export const farmingTip = pgTable("farming_tip", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  category: text("category").notNull(), // soil, water, pest, harvest, general
  region: text("region"), // Optional: region-specific tip
  language: text("language").notNull().default("en"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
});

export type User = typeof user.$inferSelect;
export type Listing = typeof listing.$inferSelect;
export type MarketPrice = typeof marketPrice.$inferSelect;
export type BuyerRequest = typeof buyerRequest.$inferSelect;
export type Order = typeof order.$inferSelect;
export type Message = typeof message.$inferSelect;
export type FarmingTip = typeof farmingTip.$inferSelect;
