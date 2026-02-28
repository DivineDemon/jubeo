import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  // Use process.env so prisma generate can run without DATABASE_URL at build time (e.g. on Vercel)
  datasource: {
    url: process.env.DATABASE_URL ?? "postgresql://localhost:5432/dummy",
  },
});
