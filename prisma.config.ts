// prisma.config.ts
import "dotenv/config"
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",        // or a folder path
  migrations: {
    path: "prisma/migrations",
    // seed: "tsx prisma/seed.ts",       // optional
  },
  datasource: {
    url: env("DATABASE_URL"),
    // optional:
    // directUrl: env("DIRECT_DATABASE_URL"),
    // shadowDatabaseUrl: env("SHADOW_DATABASE_URL"),
  },
});