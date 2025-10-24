import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

export async function GET() {
  try {
    console.log('Testing Firebase Admin credentials...');
    console.log('Environment variables check:');
    console.log('- NEXT_PUBLIC_FIREBASE_PROJECT_ID:', process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ? 'Set' : 'NOT SET');
    console.log('- FIREBASE_ADMIN_CLIENT_EMAIL:', process.env.FIREBASE_ADMIN_CLIENT_EMAIL ? 'Set' : 'NOT SET');
    console.log('- FIREBASE_ADMIN_PRIVATE_KEY:', process.env.FIREBASE_ADMIN_PRIVATE_KEY ? `Set (length: ${process.env.FIREBASE_ADMIN_PRIVATE_KEY.length})` : 'NOT SET');
    console.log('- NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET:', process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ? 'Set' : 'NOT SET');

    if (!process.env.FIREBASE_ADMIN_PRIVATE_KEY) {
      return Response.json({
        error: 'FIREBASE_ADMIN_PRIVATE_KEY is not set',
        status: 'missing_private_key'
      }, { status: 500 });
    }

    if (!process.env.FIREBASE_ADMIN_CLIENT_EMAIL) {
      return Response.json({
        error: 'FIREBASE_ADMIN_CLIENT_EMAIL is not set',
        status: 'missing_email'
      }, { status: 500 });
    }

    // Format the private key
    const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY.replace(/\\n/g, '\n');

    console.log('Private key starts with:', privateKey.substring(0, 50) + '...');
    console.log('Private key ends with:', privateKey.substring(privateKey.length - 50));

    // Check if it has proper headers
    if (!privateKey.includes('-----BEGIN PRIVATE KEY-----')) {
      return Response.json({
        error: 'Private key does not contain proper BEGIN header',
        status: 'invalid_private_key_format'
      }, { status: 500 });
    }

    if (!privateKey.includes('-----END PRIVATE KEY-----')) {
      return Response.json({
        error: 'Private key does not contain proper END header',
        status: 'invalid_private_key_format'
      }, { status: 500 });
    }

    // Try to initialize Firebase Admin
    if (!getApps().length) {
      initializeApp({
        credential: cert({
          projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
          privateKey: privateKey,
        }),
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      });
    }

    // Test basic Firebase Admin functionality (without storage)
    const auth = getAuth();
    console.log('Firebase Admin initialized successfully with auth');

    return Response.json({
      success: true,
      message: 'Firebase Admin credentials are valid!',
      details: {
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
        bucketName: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        privateKeyLength: privateKey.length,
        hasBeginHeader: privateKey.includes('-----BEGIN PRIVATE KEY-----'),
        hasEndHeader: privateKey.includes('-----END PRIVATE KEY-----'),
      }
    });

  } catch (error) {
    console.error('Firebase Admin test failed:', error);

    return Response.json({
      error: error.message,
      status: 'firebase_error',
      details: {
        code: error.code,
        message: error.message,
        stack: error.stack?.split('\n').slice(0, 5)
      }
    }, { status: 500 });
  }
}
