import React from "react";
import { useForm } from "react-hook-form"
import { toast } from "react-toastify";
import { Link } from 'react-router-dom'

import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

import {Button, ErrorMessage} from "../../components";
import api from '../../services/api'
import RegisterImg from "../../assets/register-image.svg"
import Logo from "../../assets/logo.svg"


import {
    Container,
    RegisterImage,
    ContainerItens,
    Label,
    Input,
    SignInLink
} from './styles'

export function Register() {

    const schema = yup.object({
        name: yup.string().required("O seu nome é obrigatorio"),
        email: yup.string().email('Digite um e-mail válido').required('O e-mail é obrigatorio'),
        password: yup.string().min(6, 'A senha deve ter pelo menos 6 caracteres').required('Digite uma senha'),
        confirmPassword: yup.string().required('Digite uma senha').oneOf([yup.ref('password')], 'As senhas devem ser iguais'),

    }).required();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    })

    const onSubmit = async clientData => {

        try {
            const {status } = await api.post('users', {
                name: clientData.name,
                email: clientData.email,
                password: clientData.password,
            }, {validateStatus: () => true});
            if (status === 200 || status === 201) {
                toast.success('Conta criada com sucesso!')
            } else if (status === 409) {
                toast.error('Email já cadastrado! Faça o login para continuar')
            } else {
                throw new Error()
            }
            } catch (error) {
                toast.error('Falha no sistema! Tente novamente')
                    }

        
    }

    return (
        <Container>
            <RegisterImage src={RegisterImg} alt="register-image" />
            <ContainerItens>
                <img src={Logo} alt="logo" />
                <h1>Cadastre-se</h1>

                <form noValidate onSubmit={handleSubmit(onSubmit)}>
                    <Label error={errors.name?.message}>Nome</Label>
                    <Input type="text" {...register("name")} error={errors.name?.message} />
                    <ErrorMessage>{errors.name?.message}</ErrorMessage>

                    <Label error={errors.email?.message}>Email</Label>
                    <Input type="email" {...register("email")} error={errors.email?.message} />
                    <ErrorMessage>{errors.email?.message}</ErrorMessage>

                    <Label error={errors.password?.message}>Senha</Label>
                    <Input type="password" {...register("password")} error={errors.password?.message} />
                    <ErrorMessage>{errors.password?.message}</ErrorMessage>

                    <Label error={errors.confirmPassword?.message}>Confirmar Senha</Label>
                    <Input type="password" {...register("confirmPassword")} error={errors.confirmPassword?.message} />
                    <ErrorMessage>{errors.confirmPassword?.message}</ErrorMessage>

                    <Button type="submit" style={{ marginTop: 25, marginBottom: 25 }}>Sign In</Button>
                </form>

                <SignInLink>Já possui conta? <Link to='/login'>Sing In</Link></SignInLink>
            </ContainerItens>
        </Container>
    )
}

