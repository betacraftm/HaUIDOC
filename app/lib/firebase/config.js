// Import the functions you need from the SDKs you need
/**
 * Firebase Client Configuration
 *
 * This file configures the Firebase client SDK for client-side operations in the HaUIDOC application.
 * It provides access to Firebase services like Storage for file uploads and user authentication.
 *
 * Services Configured:
 * - Firebase Storage: For document file uploads and storage
 * - Firebase Auth: For client-side authentication state management
 *
 * Security Notes:
 * - These are client-side credentials (safe to expose)
 * - Server-side operations use Firebase Admin SDK with service account
 * - Storage rules control access permissions
 *
 * @requires Firebase project configuration
 * @see Firebase Console for project settings
 */

import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export { storage };
