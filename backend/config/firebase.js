const admin = require('firebase-admin');
const path = require('path');

// Initialize Admin SDK with the service account key
const serviceAccount = require('./firebase-service-account.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET
  });
}

const storage = admin.storage().bucket();

module.exports = { admin, storage };
