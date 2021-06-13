import { useEffect } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth, db } from "../firebase"
import firebase from "firebase"

import { Loading } from "containers/Loading"
import Login from "./login"

import "../styles/globals.css"

function MyApp({ Component, pageProps }) {
    const [user, isLoading] = useAuthState(auth)

    useEffect(() => {
        if (user) {
            db.collection("users").doc(user.uid).set(
                {
                    email: user.email,
                    lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
                    photoURL: user.photoURL,
                },
                { merge: true }
            )
        }
    }, [user])

    if (isLoading) return <Loading />
    if (!user) return <Login />

    return <Component {...pageProps} />
}

export default MyApp
