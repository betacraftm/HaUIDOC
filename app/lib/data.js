/**
 * Database Operations and Data Access Layer
 *
 * This file contains all database operations for the HaUIDOC application using Prisma ORM.
 * It provides type-safe database queries, data aggregation, and business logic functions
 * that are used throughout the application.
 *
 * Key Features:
 * - User management operations
 * - Document CRUD operations
 * - Search and filtering functionality
 * - Analytics and statistics queries
 * - Data validation and sanitization
 *
 * All functions are marked as "use server" to ensure they only run on the server side
 * and cannot be called from client components directly.
 *
 * @requires Prisma ORM
 * @requires MySQL database
 */

"use server";

import { PrismaClient } from "generated/prisma";

const prisma = new PrismaClient();
const PAGE_SIZE = 10;

export const fetchMajors = async () => {
  try {
    const majors = await prisma.major.findMany();
    return majors;
  } catch (error) {
    console.error("Error fetching majors:", error);
    return [];
  }
};

export const fetchSubjects = async () => {
  const subjects = await prisma.subject.findMany();
  return subjects;
};

export const getHomeDocuments = async (userId) => {
  try {
    const recentlyDocuments = await prisma.document.findMany({
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
    ).map((doc) => ({ ...doc.document, viewed_at: doc.viewed_at }));

    const likedDocument = (
      await prisma.userLikedDocument.findMany({
        take: 5,
        where: { user_id: userId },
        include: {
          document: { include: { subjects: { select: { name: true } } } },
        },
      })
    ).map((doc) => ({ ...doc.document }));

    const userDocument = await prisma.document.findMany({
      take: 5,
      orderBy: { created_at: "desc" },
      where: { uploaded_by: userId },
      include: { subjects: { select: { name: true } } },
    });

    return { recentlyDocuments, viewedDocument, likedDocument, userDocument };
  } catch (error) {
    console.error("Error fetching document:", error);
    return null;
  }
};

export const checkDocumentExcist = async (docId) => {
  try {
    const isDocExcist = await prisma.document.findFirst({
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

export const getDocumentById = async (docId) => {
  try {
    const document = await prisma.document.findFirst({
      where: { id: docId },
      include: {
        users: { select: { id: true, name: true, image_url: true } },
      },
      omit: { uploaded_by: true, subject_id: true },
    });

    return document;
  } catch (error) {
    console.error("Error get document by id:", error);
    return null;
  }
};

export const getComments = async (docId) => {
  try {
    const comments = await prisma.comment.findMany({
      where: { document_id: docId },
      include: { users: { select: { name: true, image_url: true } } },
      omit: { document_id: true, user_id: true },
      orderBy: { created_at: "desc" },
    });

    return comments;
  } catch (error) {
    console.error("Error get comments:", error);
    return null;
  }
};

export const getDocuments = async (section, page, userId) => {
  const query = {
    orderBy: {},
    where: {},
  };

  switch (section) {
    case "recently":
      query.orderBy = { created_at: "desc" };
      break;
    case "user-doc":
      query.where = { uploaded_by: userId };
      break;
    case "viewed":
      return await getViewedDocuments(page, userId);
    case "liked":
      return await getLikedDocuments(page, userId);
  }

  try {
    const documents = await prisma.document.findMany({
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      where: query.where,
      orderBy: query.orderBy,
      include: { subjects: { select: { name: true } } },
    });

    const total = await prisma.document.count(query.where);

    return { documents, total };
  } catch (error) {
    console.error("Error get documents:", error);
    return null;
  }
};

const getViewedDocuments = async (page, userId) => {
  try {
    const documents = await prisma.userViewedDocument.findMany({
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      orderBy: { viewed_at: "desc" },
      where: { user_id: userId },
      include: {
        document: { include: { subjects: { select: { name: true } } } },
      },
    });

    const total = await prisma.userViewedDocument.count({
      where: { user_id: userId },
    });

    return {
      documents: documents.map((doc) => ({
        ...doc.document,
        viewed_at: doc.viewed_at,
      })),
      total,
    };
  } catch (error) {
    console.error("Error get viewed documents:", error);
    return null;
  }
};

const getLikedDocuments = async (page, userId) => {
  try {
    const documents = await prisma.userLikedDocument.findMany({
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      where: { user_id: userId },
      include: {
        document: { include: { subjects: { select: { name: true } } } },
      },
    });

    const total = await prisma.userLikedDocument.count({
      where: { user_id: userId },
    });

    return {
      documents: documents.map((doc) => ({
        ...doc.document,
      })),
      total,
    };
  } catch (error) {
    console.error("Error get liked documents:", error);
    return null;
  }
};

export const searchDocuments = async (query, page = 1) => {
  try {
    if (!query || query.trim() === "") {
      return { documents: [], total: 0 };
    }

    const documents = await prisma.document.findMany({
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      where: {
        OR: [
          {
            title: {
              contains: query,
            },
          },
          {
            subjects: {
              name: {
                contains: query,
              },
            },
          },
        ],
      },
      orderBy: { created_at: "desc" },
      include: {
        subjects: { select: { name: true } },
      },
    });

    const total = await prisma.document.count({
      where: {
        OR: [
          {
            title: {
              contains: query,
            },
          },
          {
            subjects: {
              name: {
                contains: query,
              },
            },
          },
        ],
      },
    });

    return { documents, total };
  } catch (error) {
    console.error("Error search documents:", error);
    return { documents: [], total: 0 };
  }
};
