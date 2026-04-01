import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()
import bcrypt from "bcryptjs"

async function main() {
    const userName = process.env.ADMIN_NAME;
  const password = process.env.ADMIN_PASSWORD;


  if (process.env.SEED_ENABLED !== "true") {
  console.log("Seeding is disabled. Set SEED_ENABLED=true to enable.");
  return;
}

  if (!userName || !password) {
    throw new Error("ADMIN_NAME and ADMIN_PASSWORD must be set in environment variables");
  }

  const exists = await prisma.user.findUnique({
    where: { userName },
  });

  if (exists) {
  throw new Error("Admin user already exists")
  }

  const hashed = await bcrypt.hash(password, 12)

  await prisma.user.create({
    data: {
        name: "Admin",
      userName: userName,
      password: hashed,
      
    },
  });

  console.log("Admin user created successfully")
}

main()
  .catch((e) => {
    console.log(e.message);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());