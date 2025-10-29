import { majors, subjects } from "@/lib/seeded-data";
import { PrismaClient } from "generated/prisma";

const prisma = new PrismaClient();

export async function GET() {
  try {
    await prisma.major.createMany({
      data: [
        ...majors.map((major) => ({
          name: major,
        })),
      ],
    });

    await prisma.subject.createMany({
      data: [
        ...subjects.map((subject) => ({
          name: subject,
        })),
      ],
    });

    return new Response("ok", { status: 200 });
  } catch (error) {
    return new Response("Error", { status: 500 });
  }
}
