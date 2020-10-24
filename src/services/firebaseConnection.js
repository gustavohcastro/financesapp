import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

let firebaseConfig = {
  apiKey: "AIzaSyAGStaFo3W2iY37syRQ56BTRL3XSiKPgsQ",
    authDomain: "newbank-6b11f.firebaseapp.com",
    databaseURL: "https://newbank-6b11f.firebaseio.com",
    projectId: "newbank-6b11f",
    storageBucket: "newbank-6b11f.appspot.com",
    messagingSenderId: "953022458465",
    appId: "1:953022458465:web:4c0396b27f580528669820",
    measurementId: "G-L66ZMCTLH7"
    
  };
  // Initialize Firebase
  if(!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default firebase;