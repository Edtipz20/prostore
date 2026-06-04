// import { PrismaClient } from "@/lib/generated/prisma";
// import { PrismaPg } from "@prisma/adapter-pg";
// import pg from "pg"; // Make sure to import pg
// import sampleData from "./sample-data";

// async function main() {
//   // 1. Establish a standard PostgreSQL connection pool first
//   const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

//   // 2. Wrap the active pool instance inside your Prisma adapter
//   const adapter = new PrismaPg(pool);

//   // 3. Hand over the driver adapter to Prisma Client
//   const prisma = new PrismaClient({ adapter });

//   await prisma.product.deleteMany();
//   await prisma.product.createMany({ data: sampleData.products });

//   console.log("successful");

//   // Clean up connections so the terminal script exits cleanly
//   await pool.end();
// }
// main();

import { PrismaClient } from "@/lib/generated/prisma";
import { PrismaNeon } from "@prisma/adapter-neon";
import { Pool, neonConfig } from "@neondatabase/serverless";
import ws from "ws";
import sampleData from "./sample-data";

async function main() {
  neonConfig.webSocketConstructor = ws;

  const pool = new Pool({ connectionString: process.env.DATABASE_URL! });
  const adapter = new PrismaNeon(pool);
  const prisma = new PrismaClient({ adapter });

  await prisma.product.deleteMany();
  await prisma.account.deleteMany();
  await prisma.session.deleteMany();
  await prisma.verificationToken.deleteMany();
  await prisma.user.deleteMany();

  await prisma.product.createMany({ data: sampleData.products });
  await prisma.user.createMany({ data: sampleData.users });

  console.log("successful");
  process.exit(0);
}

main();
