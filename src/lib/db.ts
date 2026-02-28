import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined };

function createPrisma(): PrismaClient {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is not set");
  }
  const adapter = new PrismaPg({ connectionString });
  return new PrismaClient({
    adapter,
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });
}

function getPrisma(): PrismaClient {
  if (globalForPrisma.prisma) return globalForPrisma.prisma;
  const client = createPrisma();
  if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = client;
  return client;
}

/** Prisma client — lazily created so build (e.g. on Vercel) does not require DATABASE_URL. */
export const prisma = new Proxy({} as PrismaClient, {
  get(_, prop) {
    return (getPrisma() as unknown as Record<string | symbol, unknown>)[prop];
  },
});

export async function getReportById(id: string) {
  const row = await prisma.report.findUnique({ where: { id } });
  if (!row || typeof row.report !== "string") return null;
  try {
    return JSON.parse(row.report) as import("@/types").ValidationReport;
  } catch {
    return null;
  }
}

export async function getReportsByIds(
  ids: string[],
): Promise<import("@/types").ValidationReport[]> {
  if (ids.length === 0) return [];
  const rows = await prisma.report.findMany({
    where: { id: { in: ids } },
  });
  const reportMap = new Map(rows.map((r) => [r.id, r.report]));
  return ids
    .map((id) => {
      const raw = reportMap.get(id);
      if (typeof raw !== "string") return null;
      try {
        return JSON.parse(raw) as import("@/types").ValidationReport;
      } catch {
        return null;
      }
    })
    .filter((r): r is import("@/types").ValidationReport => r !== null);
}
