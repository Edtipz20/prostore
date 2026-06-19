import "dotenv/config";
import ws from "ws";
import { Pool, neonConfig } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
// 1. Updated to match your custom client build location
import { PrismaClient } from "@/lib/generated/prisma";

// Configure Neon to utilize WebSockets over standard Node network hooks
neonConfig.webSocketConstructor = ws;

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is missing from your environment variables.");
}

// 2. Build the serverless network pool and driver adapter
const pool = new Pool({ connectionString });
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const adapter = new PrismaNeon(pool as any);

// 3. Create a base client instance wrapped with your driver adapter
const basePrisma = new PrismaClient({ adapter });

// 4. Inject your custom model transformers using .$extends()
const customPrisma = basePrisma.$extends({
  result: {
    product: {
      price: {
        needs: { price: true },
        compute(product: { price: { toString(): string } | null }) {
          return product.price ? product.price.toString() : "0";
        },
      },
      rating: {
        needs: { rating: true },
        compute(product: { rating: { toString(): string } | null }) {
          return product.rating ? product.rating.toString() : "0";
        },
      },
    },
    cart: {
      itemsPrice: {
        needs: { itemsPrice: true },
        compute(cart) {
          return cart.itemsPrice.toString();
        },
      },
      shippingPrice: {
        needs: { shippingPrice: true },
        compute(cart) {
          return cart.shippingPrice.toString();
        },
      },
      taxPrice: {
        needs: { taxPrice: true },
        compute(cart) {
          return cart.taxPrice.toString();
        },
      },
      totalPrice: {
        needs: { totalPrice: true },
        compute(cart) {
          return cart.totalPrice.toString();
        },
      },
    },
    order: {
      itemsPrice: {
        needs: { itemsPrice: true },
        compute(cart) {
          return cart.itemsPrice.toString();
        },
      },
      shippingPrice: {
        needs: { shippingPrice: true },
        compute(cart) {
          return cart.shippingPrice.toString();
        },
      },
      taxPrice: {
        needs: { taxPrice: true },
        compute(cart) {
          return cart.taxPrice.toString();
        },
      },
      totalPrice: {
        needs: { totalPrice: true },
        compute(cart) {
          return cart.totalPrice.toString();
        },
      },
    },
    orderItem: {
      price: {
        compute(cart) {
          return cart.price.toString();
        },
      },
    },
  },
});

// 5. Establish a global singleton reference to prevent connection bloating during Next.js dev hot-reloads
const globalForPrisma = globalThis as unknown as {
  prisma: typeof customPrisma;
};

export const prisma = globalForPrisma.prisma || customPrisma;

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
