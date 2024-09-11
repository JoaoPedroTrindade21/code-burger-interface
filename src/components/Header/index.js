import React from "react";
import { useHistory } from "react-router-dom";

import { useUser } from "../../hooks/UserContext";

import Cart from "../../assets/cart.svg"
import Person from "../../assets/person.svg"
import { ConatinerText, Container, ContainerLeft, ContainerRight, Line, PageLink, PageLinkExit } from "./styles";

export function Header() {
    const { logout, userData } = useUser()

    const {push, location: {pathname}} = useHistory()

    const logoutUser = () => {
        logout()
        push('/login')
    }

    return (
        <Container>
            <ContainerLeft>
                <PageLink onClick={()=> push('/inicio')} isActive={pathname === '/inicio'}>
                    Home
                </PageLink>
                <PageLink onClick={()=> push('/produtos')} isActive={pathname.includes('produtos')}>
                    Ver Produtos
                </PageLink>
            </ContainerLeft>

            <ContainerRight>
                <PageLink onClick={()=> push('/carrinho')}>
                    <img src={Cart} alt="carrinho" />
                </PageLink>
                <Line></Line>
                <PageLink>
                    <img src={Person} alt="personagem" />
                </PageLink>

                <ConatinerText>
                    <p>Olá, {userData.name}</p>
                    <PageLinkExit onClick={logoutUser}>
                        Sair
                    </PageLinkExit>
                </ConatinerText>
            </ContainerRight>
        </Container>
    )
}
