import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getStorage } from "firebase-admin/storage";

// Khởi tạo Firebase Admin lazily hoặc bỏ qua lỗi ở build time
function initFirebase() {
  if (getApps().length > 0) return true;

  const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY;
  if (!privateKey) {
    console.warn("FIREBASE_ADMIN_PRIVATE_KEY is not set. Firebase Admin is not initialized.");
    return false;
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
    return true;
  } catch (error) {
    console.error("Failed to initialize Firebase Admin:", error);
    return false;
  }
}

let bucket;
if (initFirebase()) {
  bucket = getStorage().bucket();
} else {
  // Dummy object to prevent destructuring errors if any
  bucket = null;
}

export { bucket };
