import React from "react";
import listLinks from "./menu-list";
import { Container, ItemContainer, ListLink } from "./styles";
import LogoutIcon from '@mui/icons-material/Logout';
import { useUser } from '../../hooks/UserContext'
import PropTypes from "prop-types";


export function SideMenuAdmin({path}) {
    const {logout} = useUser()
    return (
        <Container>
            <hr></hr>
            {listLinks.map(item => (
                 <ItemContainer key={item.id} isActive={path === item.link}>
                    <item.icon className="icon" />
                     <ListLink to={item.link}>{item.label}</ListLink>
                 </ItemContainer>
            ))}
            <hr></hr>
            <ItemContainer style={{position: 'fixed', bottom: 30}}>
                <LogoutIcon style={{color: '#ffffff'}} />
                <ListLink to='/login' onClick={logout} >Sair</ListLink>
            </ItemContainer>
        </Container>
    )
}

SideMenuAdmin.propTypes = {
    path: PropTypes.string
}