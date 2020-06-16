import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

let firebaseConfig = {
    apiKey: "AIzaSyBYAtWtFE59sJxPky-RpBfXpVH0jAhZ9jM",
    authDomain: "meua-10f40.firebaseapp.com",
    databaseURL: "https://meua-10f40.firebaseio.com",
    projectId: "meua-10f40",
    storageBucket: "meua-10f40.appspot.com",
    messagingSenderId: "594518505452",
    appId: "1:594518505452:web:84b36f1c3859a6856af2c9",
    measurementId: "G-FQ770YEZ8V"
  };
  // Initialize Firebase
  if(!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default firebase;