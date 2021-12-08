import styled from "styled-components"
import ChatBackgroundImage from "public/images/chat-bg.png"

const Container = styled.div`
    background: url("${ChatBackgroundImage}");
    display: grid;
    place-items: center;
    height: 100vh;
`

const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 100px;
    background: white;
    border-radius: 5px;
    box-shadow: 0 4px 14px -3px rgba(0, 0, 0, 0.1);
`

const Logo = styled.img`
    width: 200px;
    height: 200px;
    margin-bottom: 50px;
`

export const S = {
    Container,
    LoginContainer,
    Logo,
}
