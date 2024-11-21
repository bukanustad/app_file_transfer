// firebase-config.js

// Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyB0ogzX2GRVduoBUHr26hxnAiesXk6dr0A",
    authDomain: "file-55397.firebaseapp.com",
    projectId: "file-55397",
    storageBucket: "file-55397.firebasestorage.app",
    messagingSenderId: "554198137241",
    appId: "1:554198137241:web:a891df5387d2ce6596fb08",
    measurementId: "G-JZL0KBLHWT"
  };	

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database(app);
