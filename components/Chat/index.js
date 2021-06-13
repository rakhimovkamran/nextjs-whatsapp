import { useRouter } from "next/router"

import { useAuthState } from "react-firebase-hooks/auth"
import { useCollection } from "react-firebase-hooks/firestore"
import { auth, db } from "../../firebase"

import { S } from "./index.styled"
import { getRecipientEmail } from "utils/getRecipientEmail"

export const Chat = ({ id, users }) => {
    const router = useRouter()

    const [user] = useAuthState(auth)
    const [recipientSnapshot] = useCollection(
        db
            .collection("users")
            .where("email", "==", getRecipientEmail(users, user))
    )

    const recipient = recipientSnapshot?.docs?.[0]?.data()
    const recipientEmail = getRecipientEmail(users, user)

    const enterChat = () => {
        router.push(`/chat/${id}`)
    }

    return (
        <S.Container onClick={enterChat}>
            {recipient ? (
                <S.UserAvatar src={recipient?.photoURL} />
            ) : (
                <S.UserAvatar />
            )}

            <p>{recipientEmail}</p>
        </S.Container>
    )
}
