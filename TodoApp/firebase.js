var firebaseConfig = firebase.initializeApp({
    apiKey: "Your API key",
    authDomain: "doamin id",
    projectId: "id",
    storageBucket: "storage permission",
    messagingSenderId: "id",
    appId: "id",
    measurementId: "value id"
  });

  // Initialize Firebase
firebase.analytics();
var db = firebase.firestore();
