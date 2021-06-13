import { useAuthState } from "react-firebase-hooks/auth"
import moment from "moment"

import { auth } from "../../firebase"

import { S } from "./index.styled"

export const Message = ({ user, message }) => {
    const [userLoggedIn] = useAuthState(auth)

    const TypeOfMessage = user === userLoggedIn.email ? S.Sender : S.Receiver

    return (
        <S.Container>
            <TypeOfMessage>
                {message.message}
                <S.Timestamp>
                    {message.timestamp
                        ? moment(message.timestamp).format("LT")
                        : "..."}
                </S.Timestamp>
            </TypeOfMessage>
        </S.Container>
    )
}
