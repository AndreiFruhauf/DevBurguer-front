import { yupResolver } from '@hookform/resolvers/yup'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

import EyeOff from '../../assets/GroupeyeOff.png'
import EyeOn from '../../assets/GroupeyeOn.png'
import RegisterImg from '../../assets/Hamburguer-register.svg'
import Logo from '../../assets/logoLogin.png'
import { Button, ErrorMessage } from '../../components'
import api from '../../services/api'
import {
  Container,
  RegisterImage,
  ContainerItems,
  Label,
  Input,
  SignInLink
} from './styles'

export const Register = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConfirmed, setShowPasswordConfirmed] = useState(false)

  const navigate = useNavigate()

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const togglePasswordConfirmedVisibility = () => {
    setShowPasswordConfirmed(!showPasswordConfirmed)
  }

  const schema = Yup.object({
    name: Yup.string().required('O seu nome é obrigatório'),
    email: Yup.string()
      .email('Digite um e-mail válido')
      .required('O e-mail é obrigatório'),
    password: Yup.string()
      .required('A senha é obrigatória')
      .min(6, 'A senha deve ter pelo menos 6 digitos'),
    confirmPassword: Yup.string()
      .required('Você precisa confirmar a senha')
      .oneOf([Yup.ref('password')], 'As senhas devem ser iguais')
  }).required()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = async clientData => {
    try {
      const { status } = await api.post(
        'users',
        {
          name: clientData.name,
          email: clientData.email,
          password: clientData.password
        },
        { validateStatus: () => true }
      )

      if (status === 201 || status === 200) {
        toast.success('Cadastro Realizado com sucesso!')
      } else if (status === 409) {
        toast.error('Email já cadastrado')
      } else {
        throw new Error()
      }
    } catch (error) {
      toast.error('Falha no sistema! Tente novamente')
    }
  }

  return (
    <Container>
      <RegisterImage src={RegisterImg} />
      <ContainerItems>
        <img className="img" src={Logo} />
        <h1>Cadastre-se</h1>

        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <div className="name-div">
            <div>
              <Label error={errors.name?.message}>Nome</Label>
              <Input
                type="name"
                {...register('name')}
                placeholder="Seu Nome"
                error={errors.name?.message}
              />
            </div>
            <ErrorMessage>{errors.name?.message}</ErrorMessage>
          </div>

          <div className="email-div">
            <div>
              <Label error={errors.email?.message}>Email</Label>
              <Input
                type="email"
                {...register('email')}
                placeholder="Seu Email"
                error={errors.email?.message}
              />
            </div>
            <ErrorMessage>{errors.email?.message}</ErrorMessage>
          </div>

          <Label error={errors.password?.message}>Senha</Label>
          <div className="key-div">
            <div className="inputAndbutton">
              <Input
                {...register('password')}
                className="key"
                placeholder="Sua Senha"
                type={showPassword ? 'text' : 'password'}
                error={errors.password?.message}
              />
              <button
                type="button"
                className="eye"
                onClick={togglePasswordVisibility}
              >
                <img src={showPassword ? EyeOff : EyeOn} alt="eye" />
              </button>
            </div>
            <ErrorMessage>{errors.password?.message}</ErrorMessage>
          </div>

          <Label error={errors.confirmPassword?.message}>Confirmar Senha</Label>
          <div className="confirm-key-div">
            <div className="confirmInputAndbutton">
              <Input
                {...register('confirmPassword')}
                className="confirm-key"
                placeholder="Confirme sua Senha"
                type={showPasswordConfirmed ? 'text' : 'password'}
                error={errors.confirmPassword?.message}
              />
              <button
                type="button"
                className="confirm-eye"
                onClick={togglePasswordConfirmedVisibility}
              >
                <img src={showPasswordConfirmed ? EyeOff : EyeOn} alt="eye" />
              </button>
            </div>
            <ErrorMessage>{errors.confirmPassword?.message}</ErrorMessage>
          </div>

          <Button
            type="submit"
            style={{
              marginTop: 25,
              marginBottom: 25,
              backgroundColor: '#FFD600',
              color: '#000'
            }}
          >
            Cadastrar
          </Button>
        </form>
        <SignInLink>
          Já possui conta?{' '}
          <Link
            style={{ textDecoration: 'underline', color: '#fff' }}
            to="/login"
          >
            Sign in
          </Link>
        </SignInLink>
      </ContainerItems>
    </Container>
  )
}
