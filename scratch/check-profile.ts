import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const profile = await prisma.profile.findFirst()
  console.log("Profile data in DB:", profile)
}

main().catch(console.error).finally(() => prisma.$disconnect())
