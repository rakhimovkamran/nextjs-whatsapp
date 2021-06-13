import styled from "styled-components"
import { Avatar, Button } from "@material-ui/core"

const Container = styled.div``

const Header = styled.div`
    position: sticky;
    display: flex;

    top: 0;
    background-color: #fff;
    z-index: 1;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    height: 80px;
    border-bottom: 1px solid whitesmoke;
`

const UserAvatar = styled(Avatar)`
    cursor: pointer;
    transition: all 0.2s;

    :hover {
        opacity: 0.8;
    }
`

const IconsContainer = styled.div``

const Search = styled.div`
    display: flex;
    align-items: center;
    padding: 20px;
    border-radius: 2px;
`

const SearchInput = styled.input`
    outline-width: 0;
    border: none;
    flex: 1;
`

const SidebarButton = styled(Button)`
    width: 100%;

    &&& {
        border-bottom: 1px solid whitesmoke;
        border-top: 1px solid whitesmoke;
    }
`

export const S = {
    Container,
    Header,
    UserAvatar,
    IconsContainer,
    Search,
    SearchInput,
    SidebarButton,
}
