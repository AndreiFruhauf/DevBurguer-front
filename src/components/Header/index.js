import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import CartNot from '../../assets/carrinho com notificacao.png'
import Cart from '../../assets/cart.svg'
import Person from '../../assets/person.png'
import { useCart } from '../../hooks/CartContext'
import { useUser } from '../../hooks/UserContext'
import {
  Container,
  ContainerLeft,
  PageLink,
  ContainerRight,
  ContainerText,
  Line
} from './styles'

export function Header() {
  const navigate = useNavigate()
  const pathName = useLocation().pathname
  const { logOut, userData } = useUser()
  const { cartProducts } = useCart()

  const navigateHome = () => {
    navigate('/')
  }

  const navigateProducts = () => {
    navigate('/produtos')
  }

  const navigateCart = () => {
    navigate('/carrinho')
  }

  const logOutUser = () => {
    logOut()
    navigate('/login')
  }

  const { user, setUser } = useUser()

  useEffect(() => {
    const verify = async () => {
      const userData = await localStorage.getItem('codeburguer:userData')
      setUser(userData)
    }

    verify()
  }, [setUser])

  // Verifica se o usuário está nas rotas de Login ou Cadastro
  const isAuthRoute =
    pathName === '/login' ||
    pathName === '/cadastro' ||
    pathName === '/pedidos' ||
    pathName === '/lista-produtos' ||
    pathName === '/editar-produto' ||
    pathName === '/novo-produto'

  // Se estiver em uma rota de Login ou Cadastro, não renderiza nada
  if (isAuthRoute) {
    return
  }

  // Se o usuário não estiver logado, renderiza o cabeçalho não autenticado
  if (!user) {
    return (
      <Container>
        <ContainerLeft>
          <PageLink onClick={navigateHome} isActive={pathName === '/'}>
            Home
          </PageLink>
          <PageLink
            onClick={navigateProducts}
            isActive={pathName.includes('produtos')}
          >
            Ver produtos
          </PageLink>
        </ContainerLeft>
        <ContainerRight>
          <PageLink onClick={navigateCart}>
            {cartProducts && cartProducts.length === 0 ? (
              <img src={Cart} alt="carrinho" />
            ) : (
              <img src={CartNot} alt="carrinho" />
            )}
          </PageLink>
        </ContainerRight>
      </Container>
    )
  }

  // Se o usuário estiver logado, renderiza o cabeçalho autenticado
  return (
    <Container>
      <ContainerLeft>
        <PageLink onClick={navigateHome} isActive={pathName === '/'}>
          Home
        </PageLink>
        <PageLink
          onClick={navigateProducts}
          isActive={pathName.includes('produtos')}
        >
          Ver produtos
        </PageLink>
      </ContainerLeft>
      <ContainerRight>
        <PageLink onClick={navigateCart}>
          {cartProducts && cartProducts.length === 0 ? (
            <img src={Cart} alt="carrinho" />
          ) : (
            <img src={CartNot} alt="carrinho" />
          )}
        </PageLink>

        <Line className="line"></Line>
        <PageLink>
          <img src={Person} alt="logo-pessoa" />
        </PageLink>
        <ContainerText>
          <p>Olá, {userData.name}</p>
          <PageLink className="logout" onClick={logOutUser}>
            Sair
          </PageLink>
        </ContainerText>
      </ContainerRight>
    </Container>
  )
}
