"use server";

import { LATEST_PRODUTCS_LIMIT } from "../constants";
// Import the pre-configured, single instance of prisma
import { prisma } from "@/db/prisma";
import { convertToPlainObject } from "../utils";

// Get all the latest products
export async function getLatestProducts() {
  try {
    const data = await prisma.product.findMany({
      take: LATEST_PRODUTCS_LIMIT,
      orderBy: { createdAt: "desc" },
    });

    return convertToPlainObject(data);
  } catch (error) {
    console.error("Error fetching latest products:", error);
    return [];
  }
}

// Get single product by it's slug
export async function getProductBySlug(slug: string) {
  return await prisma.product.findFirst({
    where: { slug: slug },
  });
}
