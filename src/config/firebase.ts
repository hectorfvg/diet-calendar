import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Check if we're in production (GitHub Pages)
const isProduction = process.env.NODE_ENV === 'production' && 
                    typeof window !== 'undefined' && 
                    window.location.hostname === 'hectorfvg.github.io';

// Production config (GitHub Pages)
const prodConfig = {
  apiKey: "AIzaSyD9ScwJOCLWWlm_VHvN22SXO2OcMI79cJ8",
  authDomain: "diet-calendar-609d1.firebaseapp.com",
  projectId: "diet-calendar-609d1",
  storageBucket: "diet-calendar-609d1.firebasestorage.app",
  messagingSenderId: "153352844845",
  appId: "1:153352844845:web:23e86e3371b4f006c7eaa4"
};

// Development config (from environment variables)
const devConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

const firebaseConfig = isProduction ? prodConfig : devConfig;

console.log(`🔧 Environment: ${isProduction ? 'Production (GitHub Pages)' : 'Development'}`);

// Check if Firebase config is available
export const isFirebaseConfigured = () => {
  return !!(firebaseConfig.apiKey && firebaseConfig.projectId);
};

// Initialize Firebase only if configured
let app: any = null;
let db: any = null;
let auth: any = null;

if (isFirebaseConfigured()) {
  try {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    auth = getAuth(app);
    console.log('🔥 Firebase initialized successfully');
  } catch (error) {
    console.error('❌ Firebase initialization failed:', error);
  }
} else {
  console.warn('⚠️ Firebase not configured - using mock data');
}

export { db, auth };
export default app;