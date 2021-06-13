import firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyCbRi5fg85I_YGj_f5W6GTCgAcrgTw3l0I",
    authDomain: "nextjs-whatsapp-application.firebaseapp.com",
    projectId: "nextjs-whatsapp-application",
    storageBucket: "nextjs-whatsapp-application.appspot.com",
    messagingSenderId: "1008194838001",
    appId: "1:1008194838001:web:623941ebb15ac11d197850",
}

const app = !firebase.apps.length
    ? firebase.initializeApp(firebaseConfig)
    : firebase.app()

const db = app.firestore()
const auth = app.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export { db, auth, provider }
