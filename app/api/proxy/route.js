/**
 * PDF Proxy API Route
 *
 * This API route serves as a secure proxy for Firebase Storage files, specifically PDFs.
 * It uses Firebase Admin SDK to access files server-side, avoiding CORS issues and
 * providing better security control over file access.
 *
 * Key Features:
 * - Server-side Firebase Storage access using Admin SDK
 * - PDF file streaming with proper content-type headers
 * - Security through service account authentication
 * - Error handling for missing or inaccessible files
 *
 * Why a proxy is needed:
 * - Firebase Storage URLs can expire or have access restrictions
 * - CORS issues when accessing from client-side
 * - Better control over file access permissions
 * - Server-side authentication using service accounts
 *
 * @param {Request} request - GET request with 'url' query parameter
 * @returns {Response} PDF file or error response
 */

import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getStorage } from "firebase-admin/storage";

// Initialize Firebase Admin if not already initialized
if (!getApps().length) {
  const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY;

  if (!privateKey) {
    throw new Error(
      "FIREBASE_ADMIN_PRIVATE_KEY environment variable is not set",
    );
  }

  const formattedPrivateKey = privateKey.replace(/\\n/g, "\n");

  try {
    initializeApp({
      credential: cert({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
        privateKey: formattedPrivateKey,
      }),
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    });
    console.log("Firebase Admin initialized successfully");
  } catch (error) {
    console.error("Failed to initialize Firebase Admin:", error);
    throw error;
  }
}

const bucket = getStorage().bucket();

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const firebaseUrl = searchParams.get("url");

  if (!firebaseUrl) {
    return new Response("Missing url parameter", { status: 400 });
  }

  try {
    console.log('Proxy request for URL:', firebaseUrl);

    // Extract file path from Firebase Storage URL
    const urlParts = firebaseUrl.split("/o/");
    if (urlParts.length < 2) {
      console.error('Invalid Firebase Storage URL format:', firebaseUrl);
      throw new Error("Invalid Firebase Storage URL format");
    }

    const filePath = decodeURIComponent(urlParts[1].split("?")[0]);
    console.log('Extracted file path:', filePath);
    console.log('Bucket name:', bucket.name);

    // Also log the original URL parts for debugging
    console.log('URL parts:', urlParts);
    console.log('Full firebaseUrl:', firebaseUrl);

    // Get file from Firebase Storage
    const file = bucket.file(filePath);

    // Check if file exists
    const [exists] = await file.exists();
    if (!exists) {
      console.error("File not found:", filePath);
      return new Response("File not found", { status: 404 });
    }

    console.log('File exists, downloading...');

    // Get file contents
    const [buffer] = await file.download();

    console.log('Successfully fetched file:', filePath, 'Size:', buffer.length);

    return new Response(buffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Cache-Control": "no-store",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  } catch (error) {
    console.error("Proxy error:", error);
    return new Response(`Error fetching PDF: ${error.message}`, {
      status: 500,
    });
  }
}
