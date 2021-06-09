import firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyApOzn81BSTDzWblbAqnFAdSa3-M-fDhUc",
    authDomain: "footballstatsdirect.firebaseapp.com",
    projectId: "footballstatsdirect",
    storageBucket: "footballstatsdirect.appspot.com",
    messagingSenderId: "239765740732",
    appId: "1:239765740732:web:366a0007b1394cc84b44b9",
    measurementId: "G-WH3TQQ5RMB"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

export default db;