import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyABdFPlvts7B2UvBa8wTun-AfdlLA6NKoc",
  authDomain: "clone-5bfc5.firebaseapp.com",
  projectId: "clone-5bfc5",
  storageBucket: "clone-5bfc5.appspot.com",
  messagingSenderId: "51894785474",
  appId: "1:51894785474:web:3f91ec921c2df0b9a5b25b",
  measurementId: "G-WYXFQWDCV4"
};

const fireabaseApp = firebase.initializeApp(firebaseConfig)

const auth = fireabaseApp.auth()
const db = fireabaseApp.firestore();

export {db, auth}