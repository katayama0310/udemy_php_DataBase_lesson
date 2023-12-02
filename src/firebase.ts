import { initializeApp } from 'firebase-admin/app';
import { credential, ServiceAccount, firestore } from 'firebase-admin';
import firebaseServiceAccount from '../serviceAccountKey.json';

const serviceAccount = firebaseServiceAccount as ServiceAccount;

initializeApp({
  credential: credential.cert(serviceAccount),
  // databaseURL: 'https://<DATABASE_NAME>.firebaseio.com'
});

export const db = firestore();
