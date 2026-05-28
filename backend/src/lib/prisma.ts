import { PrismaClient } from "../../generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { DATABASE_URL } from "../config/config.js";
import "dotenv/config";

const connectionString = `${DATABASE_URL}`;

const adapter = new PrismaPg({ connectionString });

// ✅ Singleton pattern 
const globalForPrisma = global as unknown as { prisma: PrismaClient };

const prisma = globalForPrisma.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export { prisma };

