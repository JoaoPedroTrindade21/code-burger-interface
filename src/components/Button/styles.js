import styled from "styled-components";

export const ContainerButton = styled.button`
    width: 180px;
    height: 35px;
    background: #9758a6;
    border-radius: 20px;
    border: none;
    cursor: pointer;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    text-align: center;
    color: #ffffff;

    &:hover{
        opacity: 0.8;
    }

    &:active{
        opacity: 0.6;
    }
`