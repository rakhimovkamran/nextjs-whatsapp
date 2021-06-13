import { useState, useRef } from "react"
import { useRouter } from "next/router"
import firebase from "firebase"

import { useAuthState } from "react-firebase-hooks/auth"
import { useCollection } from "react-firebase-hooks/firestore"
import { auth, db } from "../../firebase"

import { Avatar, IconButton } from "@material-ui/core"
import TimeAgo from "timeago-react"

import { S } from "./index.styled"
import { I } from "./index.icons"

import { Message } from "components/Message"

import { getRecipientEmail } from "utils/getRecipientEmail"

export const ChatScreen = ({ chat, messages }) => {
    const [user] = useAuthState(auth)
    const router = useRouter()

    const [input, setInput] = useState("")
    const endOfMessagesRef = useRef(null)

    const [messagesSnapshot] = useCollection(
        db
            .collection("chats")
            .doc(router.query.id)
            .collection("messages")
            .orderBy("timestamp", "asc")
    )

    const [recipientSnapshot] = useCollection(
        db
            .collection("users")
            .where("email", "==", getRecipientEmail(chat.users, user))
    )

    const showMessages = () => {
        if (messagesSnapshot) {
            return messagesSnapshot.docs.map((message) => (
                <Message
                    key={message.id}
                    user={message.data().user}
                    message={{
                        ...message.data(),
                        timestamp: message.data().timestamp?.toDate().getTime(),
                    }}
                />
            ))
        } else {
            return JSON.parse(messages).map((message) => (
                <Message
                    key={message.id}
                    user={message.user}
                    message={message}
                />
            ))
        }
    }

    const scrollToBottom = () => {
        endOfMessagesRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        })
    }

    const sendMessage = (e) => {
        e.preventDefault()

        db.collection("users").doc(user.uid).set(
            {
                lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
            },
            { merge: true }
        )

        db.collection("chats").doc(router.query.id).collection("messages").add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            user: user.email,
            photoURL: user.photoURL,
        })

        setInput("")
        scrollToBottom()
    }

    const recipient = recipientSnapshot?.docs?.[0]?.data()
    const recipientEmail = getRecipientEmail(chat.users, user)

    return (
        <S.Container>
            <S.Header>
                {recipient ? (
                    <Avatar src={recipient?.photoURL} />
                ) : (
                    <Avatar>{recipientEmail[0]}</Avatar>
                )}

                <S.HeaderInfo>
                    <h3>{recipientEmail}</h3>
                    {recipientSnapshot ? (
                        <p>
                            Last active:{" "}
                            {recipient?.lastSeen?.toDate() ? (
                                <TimeAgo
                                    datetime={recipient?.lastSeen?.toDate()}
                                />
                            ) : (
                                "Unavailable"
                            )}
                        </p>
                    ) : (
                        <p>Loading last active...</p>
                    )}
                </S.HeaderInfo>

                <S.HeaderIcons>
                    <IconButton>
                        <I.Attach />
                    </IconButton>

                    <IconButton>
                        <I.More />
                    </IconButton>
                </S.HeaderIcons>
            </S.Header>

            <S.MessageContainer>
                {showMessages()}
                <S.EndOfMessages ref={endOfMessagesRef} />
            </S.MessageContainer>

            <S.InputContainer>
                <IconButton>
                    <I.Emoji />
                </IconButton>

                <S.Input
                    value={input}
                    onChange={({ target }) => setInput(target.value)}
                    placeholder="Message..."
                />

                <button hidden disabled={!input} onClick={sendMessage}>
                    Send Messgae
                </button>
                <IconButton>
                    <I.Mic />
                </IconButton>
            </S.InputContainer>
        </S.Container>
    )
}
