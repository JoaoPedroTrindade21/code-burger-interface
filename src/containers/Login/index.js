import React from "react";
import { useForm } from "react-hook-form"
import { Link, useHistory } from 'react-router-dom'
import { toast } from "react-toastify";

import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

import { useUser } from "../../hooks/UserContext";
import {Button, ErrorMessage} from "../../components";
import api from '../../services/api'
import LoginImg from "../../assets/login-image.svg"
import Logo from "../../assets/logo.svg"


import {Container, 
    LoginImage, 
    ContainerItens, 
    Label, 
    Input,
    SignInLink
} from './styles'

export function Login() {
    const history = useHistory()
    const { putUserData } = useUser()

    const schema = yup.object({
        email: yup.string().email('Digite um e-mail válido').required('O e-mail é obrigatorio'),
        password: yup.string().min(6, 'A senha deve ter pelo menos 6 caracteres').required('Digite uma senha'),
    }).required();

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        resolver: yupResolver(schema),
      })

      const onSubmit = async clientData=> {
        const { data } = await toast.promise(       
        api.post('session', {
            email: clientData.email,
            password: clientData.password,
        }), {
            pending: 'Verifcando seus dados',
            success: 'Seja bem-vindo(a)',
            error: 'Email ou Senha Incorretos',
        }
        )
        putUserData(data)

        setTimeout(() => {
            if (data.admin) {
                history.push('/pedidos')
            } else {
                history.push('/inicio')
            }
        }, 1000);
        }

    return (
        <Container>
            <LoginImage src={LoginImg} alt="login-image"/>
            <ContainerItens>
                <img src={Logo} alt="logo"/>
                <h1>Login</h1>

                <form noValidate onSubmit={handleSubmit(onSubmit)}>
                <Label>Email</Label>
                <Input type="email" {...register("email")} error={errors.email?.message}/>
                <ErrorMessage>{errors.email?.message}</ErrorMessage>

                <Label>Senha</Label>
                <Input type="password" {...register("password")} error={errors.password?.message}/>
                <ErrorMessage>{errors.password?.message}</ErrorMessage>

                <Button type="submit" style={{marginTop: 75, marginBottom: 25}}>Sign In</Button>                
                </form>

                <SignInLink>Não possui conta? <Link style={{color: 'white'}} to='/cadastro'>Sing Up</Link></SignInLink>
            </ContainerItens>
        </Container>
    )
}

