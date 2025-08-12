"use server";

import { PrismaClient } from "../../generated/prisma";
import { viewedDocument } from "./action";
import { getUserAuth } from "./auth";

const prisma = new PrismaClient();

export const fetchMajors = async () => {
  try {
    const majors = await prisma.majors.findMany();
    return majors;
  } catch (error) {
    console.error("Error fetching majors:", error);
    return [];
  }
};

export const fetchSubjects = async () => {
  const subjects = await prisma.subjects.findMany();
  return subjects;
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

export const getDashboardDocument = async (userId) => {
  try {
    const recentlyDocuments = await prisma.documents.findMany({
      take: 5,
      orderBy: { created_at: "desc" },
      include: {
        subjects: {
          select: {
            name: true,
          },
        },
      },
    });

    const viewedDocument = (
      await prisma.userViewedDocument.findMany({
        take: 5,
        orderBy: { viewed_at: "desc" },
        where: { user_id: userId },
        include: {
          document: { include: { subjects: { select: { name: true } } } },
        },
      })
    ).map((doc) => doc?.document);

    return { recentlyDocuments, viewedDocument };
  } catch (error) {
    console.error("Error fetching document:", error);
    return null;
  }
};

export const checkDocumentExcist = async (docId) => {
  try {
    const isDocExcist = await prisma.documents.findFirst({
      where: { id: docId },
    });
    if (!isDocExcist) {
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error get document:", error);
    return null;
  }
};
