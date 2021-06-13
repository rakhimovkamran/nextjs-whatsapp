import styled from "styled-components"
import ChatBackgroundImage from "public/images/chat-bg.png"

const Container = styled.div``

const Header = styled.div`
    position: sticky;
    background-color: #ffffff;
    z-index: 100;
    top: 0;
    display: flex;
    padding: 11px;
    height: 80px;
    align-items: center;
    border-bottom: 1px solid whitesmoke;
`

const HeaderInfo = styled.div`
    margin-left: 50px;
    flex: 1;

    > h3 {
        margin-bottom: 3px;
    }

    > p {
        font-size: 14px;
        color: gray;
    }
`

const HeaderIcons = styled.div``

const MessageContainer = styled.div`
    padding: 30px;
    background: url(${ChatBackgroundImage});
    min-height: 90vh;
`

const EndOfMessages = styled.div``

const InputContainer = styled.form`
    display: flex;
    align-items: center;
    padding: 15px 5px;
    position: sticky;
    background-color: #ffffff;
    z-index: 100;
    bottom: 0;
`

const Input = styled.input`
    flex: 1;
    outline: 0;
    border: none;
    border-radius: 10px;
    background-color: whitesmoke;
    padding: 20px;
    margin-left: 15px;
    margin-right: 15px;
`

export const S = {
    Container,
    Header,
    HeaderInfo,
    HeaderIcons,
    MessageContainer,
    EndOfMessages,
    InputContainer,
    Input,
}
