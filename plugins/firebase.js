import firebase from "firebase";

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyBeTj7ThrslbYUfDvdFAoGPcaaizMvU3ls",
    authDomain: "sns-app-7740a.firebaseapp.com",
    projectId: "sns-app-7740a",
    storageBucket: "sns-app-7740a.appspot.com",
    messagingSenderId: "482788057078",
    appId: "1:482788057078:web:d2c9c52c4571dcc7fb31d7",
    measurementId: "G-4EJG9F86HF"
  });
}

export default firebase;
