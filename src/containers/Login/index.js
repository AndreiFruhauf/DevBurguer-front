import { yupResolver } from '@hookform/resolvers/yup'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as yup from 'yup'

import EyeOff from '../../assets/GroupeyeOff.png'
import EyeOn from '../../assets/GroupeyeOn.png'
import LoginImg from '../../assets/Hamburgueres-login.svg'
import Logo from '../../assets/logoLogin.png'
import { Button, ErrorMessage } from '../../components'
import { useUser } from '../../hooks/UserContext'
import api from '../../services/api'
import {
  Container,
  LoginImage,
  ContainerItems,
  Label,
  Input,
  SignInLink
} from './styles'

export const Login = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const { putUserData, setUser } = useUser()

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const schema = yup
    .object({
      email: yup
        .string()
        .email('Digite um e-mail Válido')
        .required('O e-mail é obrigatório'),
      password: yup.string().required('A senha é obrigatória')
    })
    .required()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = async clientData => {
    try {
      const { data } = await api.post('sessions', {
        email: clientData.email,
        password: clientData.password
      })

      if (data.admin) {
        window.location.href = '/pedidos'
      } else {
        window.location.href = '/'
      }

      toast.success('Você foi logado!', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored'
      })

      putUserData(data)
      setUser(data)
    } catch (err) {
      toast.error('Verifique seu Email e/ou sua Senha', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored'
      })
    }
  }

  return (
    <Container>
      <LoginImage src={LoginImg} />
      <ContainerItems>
        <img className="img" src={Logo} />
        <h1>Login</h1>

        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <div className="email-div">
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                {...register('email')}
                placeholder="Seu Email"
                error={errors.email?.message}
              />
            </div>
            <ErrorMessage>{errors.email?.message}</ErrorMessage>
          </div>

          <Label>Senha</Label>
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

          <Button type="submit" style={{ marginTop: 75, marginBottom: 25 }}>
            Entrar
          </Button>
        </form>
        <SignInLink>
          Não possui conta?{' '}
          <Link
            style={{ textDecoration: 'underline', color: '#000' }}
            to="/cadastro"
          >
            Cadastrar
          </Link>
        </SignInLink>
      </ContainerItems>
    </Container>
  )
}
