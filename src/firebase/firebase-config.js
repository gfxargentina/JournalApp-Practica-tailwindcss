import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCjwW0qOpZP4n5IR-fG3I9Gr-tkvXO2ucA",
    authDomain: "react-curso-fernando-her-8ca1f.firebaseapp.com",
    projectId: "react-curso-fernando-her-8ca1f",
    storageBucket: "react-curso-fernando-her-8ca1f.appspot.com",
    messagingSenderId: "905973178618",
    appId: "1:905973178618:web:68749d7623c04d8e266943"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

  export {
      db,
      googleAuthProvider,
      firebase
  }


