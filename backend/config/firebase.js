const admin = require('firebase-admin');

// We use the environment variables from the user's config
const firebaseConfig = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
};

// Initialize Admin SDK
// Since we are using Firebase in test mode or with default credentials on the local environment,
// it's often easier to use the service account if we have it, but for a simple "Web Config" 
// we might need to use a slightly different approach or a service account key.
// However, Firebase Admin usually needs a Service Account Key for full backend access.

// Let's assume we can use the default app if we just want Storage access.
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(), // This might need a service account key
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET
  });
}

const storage = admin.storage();

module.exports = { admin, storage };
