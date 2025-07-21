"use server";

import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();

export const fetchMajors = async () => {
  try {
    const majors = await prisma.majors.findMany();
    return majors.map((major) => ({
      id: major.id,
      name: major.name,
    }));
  } catch (error) {
    console.error("Error fetching majors:", error);
    return [];
  }
};

export const getUserById = async (userId) => {
  try {
    const user = await prisma.users.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        username: true,
        major_id: true,
      },
    });
    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};
