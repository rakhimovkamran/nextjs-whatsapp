import Head from "next/head"
import GoogleButton from "react-google-button"

import { auth, provider } from "../../firebase"
import { S } from "styles/login.styled"

const Login = () => {
    const signIn = () => {
        auth.signInWithPopup(provider).catch(window.alert)
    }

    return (
        <S.Container>
            <Head>
                <title>Login | Whatsapp</title>
            </Head>

            <S.LoginContainer>
                <S.Logo src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1200px-WhatsApp.svg.png" />
                <GoogleButton onClick={signIn} />
            </S.LoginContainer>
        </S.Container>
    )
}

export default Login
