import { PrismaClient } from "../../../generated/prisma";

const prisma = new PrismaClient();

export async function GET(request) {
  const allUsers = await prisma.users.findMany();

  return new Response(JSON.stringify(allUsers), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
