import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyDlxrLArJYsVbwOu_1R3TgEmuRdH1hMlbE",
    authDomain: "drive-daksh-desai.firebaseapp.com",
    projectId: "drive-daksh-desai",
    storageBucket: "drive-daksh-desai.appspot.com",
    messagingSenderId: "277446724621",
    appId: "1:277446724621:web:79d5b38047907c8d3c1944",
    measurementId: "G-3EEJ4NPK2X"
  };
const firebaseApp = firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()
const storage = firebase.storage()
const db = firebaseApp.firestore()

export { auth, provider, db, storage }