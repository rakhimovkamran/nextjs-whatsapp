import { useAuthState } from "react-firebase-hooks/auth"
import { useCollection } from "react-firebase-hooks/firestore"

import { IconButton } from "@material-ui/core"
import * as EmailValidator from "email-validator"

import { S } from "./index.styled"
import { I } from "./index.icons"
import { Chat } from "components/Chat"

import { auth, db } from "../../firebase"

export const Sidebar = () => {
    const [user] = useAuthState(auth)
    const userChatRef = db
        .collection("chats")
        .where("users", "array-contains", user.email)

    const [chatsSnapshot] = useCollection(userChatRef)

    const createChat = () => {
        const input = window.prompt(
            "Please enter an email address for the user you wish to chat with"
        )

        if (!input) return null

        if (
            EmailValidator.validate(input) &&
            !chatAlreadyExists(input) &&
            input !== user.email
        ) {
            db.collection("chats").add({
                users: [user.email, input],
            })
        }
    }

    const chatAlreadyExists = (recipientEmail) =>
        !!chatsSnapshot?.docs.find(
            (chat) =>
                chat.data().users.find((user) => user === recipientEmail)
                    ?.length > 0
        )

    return (
        <S.Container>
            <S.Header>
                <S.UserAvatar
                    src={user?.photoURL}
                    onClick={() => auth.signOut()}
                />

                <S.IconsContainer>
                    <IconButton>
                        <I.Chat />
                    </IconButton>

                    <IconButton>
                        <I.More />
                    </IconButton>
                </S.IconsContainer>
            </S.Header>

            <S.Search>
                <I.Search />
                <S.SearchInput placeholder="Search in chats" />
            </S.Search>

            <S.SidebarButton onClick={createChat}>
                Start a new chat
            </S.SidebarButton>

            {chatsSnapshot?.docs.map((chat) => (
                <Chat key={chat.id} id={chat.id} users={chat.data().users} />
            ))}
        </S.Container>
    )
}
