const { execSync } = require('child_process');

// Firebase configuration for production
const firebaseConfig = {
  REACT_APP_FIREBASE_API_KEY: 'AIzaSyD9ScwJOCLWWlm_VHvN22SXO2OcMI79cJ8',
  REACT_APP_FIREBASE_AUTH_DOMAIN: 'diet-calendar-609d1.firebaseapp.com',
  REACT_APP_FIREBASE_PROJECT_ID: 'diet-calendar-609d1',
  REACT_APP_FIREBASE_STORAGE_BUCKET: 'diet-calendar-609d1.firebasestorage.app',
  REACT_APP_FIREBASE_MESSAGING_SENDER_ID: '153352844845',
  REACT_APP_FIREBASE_APP_ID: '1:153352844845:web:23e86e3371b4f006c7eaa4'
};

console.log('🏗️  Building with Firebase configuration...');

// Set environment variables
const envVars = Object.entries(firebaseConfig)
  .map(([key, value]) => `${key}=${value}`)
  .join(' ');

try {
  // Build with environment variables
  execSync(`${envVars} npm run build`, { stdio: 'inherit' });
  
  console.log('✅ Build completed successfully!');
  console.log('🚀 Deploying to GitHub Pages...');
  
  // Deploy to GitHub Pages
  execSync('npx gh-pages -d build', { stdio: 'inherit' });
  
  console.log('🎉 Deployment completed!');
  console.log('🌐 Your app is available at: https://hectorfvg.github.io/diet-calendar/');
  
} catch (error) {
  console.error('❌ Error during build or deployment:', error.message);
  process.exit(1);
}