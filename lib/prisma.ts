import { PrismaClient } from "@/lib/generated/prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const prisma =
    globalForPrisma.prisma ??
    new PrismaClient({
        accelerateUrl: "", adapter: undefined,
        datasourceUrl: process.env.DATABASE_URL  // ← required in Prisma 7
    })

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma