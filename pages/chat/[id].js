import Head from "next/head"
import { S } from "styles/chat.styled"

import { useAuthState } from "react-firebase-hooks/auth"

import { Sidebar } from "components/Sidebar"
import { ChatScreen } from "components/ChatScreen"

import { db, auth } from "../../firebase"

import { getRecipientEmail } from "utils/getRecipientEmail"

const Chat = ({ chat, messages }) => {
    const [user] = useAuthState(auth)

    return (
        <S.Container>
            <Head>
                <title>
                    Chat with {getRecipientEmail(chat.users, user)} | Whatsapp
                </title>
            </Head>

            <Sidebar />

            <S.ChatContainer>
                <ChatScreen chat={chat} messages={messages} />
            </S.ChatContainer>
        </S.Container>
    )
}

export default Chat

export async function getServerSideProps(context) {
    const ref = db.collection("chats").doc(context.query.id)

    const messagesRes = await ref
        .collection("messages")
        .orderBy("timestamp", "asc")
        .get()

    const messages = messagesRes.docs
        .map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }))
        .map((message) => ({
            ...message,
            timestamp: message.timestamp.toDate().getTime(),
        }))

    const chatRes = await ref.get()
    const chat = {
        id: chatRes.id,
        ...chatRes.data(),
    }

    return {
        props: {
            messages: JSON.stringify(messages),
            chat: chat,
        },
    }
}
