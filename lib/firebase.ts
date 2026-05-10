import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
};

export function getFirebaseAuth() {
  const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

  return getAuth(app);
}
