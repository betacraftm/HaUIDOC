import { PrismaClient } from "../../../generated/prisma";
import { subjects, majors } from "@/lib/seeded-data";

const prisma = new PrismaClient();

export async function GET() {
  try {
    await prisma.majors.createMany({
      data: [
        ...majors.map((major) => ({
          name: major,
        })),
      ],
    });

    await prisma.subjects.createMany({
      data: [
        ...subjects.map((subject) => ({
          name: subject,
        })),
      ],
    });

    return new Response("ok", { status: 200 });
  } catch (error) {
    console.log("Error in seed data: ", error);
    return new Response("Error", { status: 500 });
  }
}
