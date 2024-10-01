import PropTypes from 'prop-types'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const CartContext = createContext({})

export const CartProvider = ({ children }) => {
  const [cartProducts, setCartProducts] = useState([])

  const updateLocalStorage = async products => {
    await localStorage.setItem('codeburguer:cartInfo', JSON.stringify(products))
  }

  const putProductInCart = async product => {
    const cartIndex = cartProducts.findIndex(prd => prd.id === product.id)

    let newCartProducts = []
    try {
      if (cartIndex >= 0) {
        newCartProducts = cartProducts

        newCartProducts[cartIndex].quantity =
          newCartProducts[cartIndex].quantity + 1

        setCartProducts(newCartProducts)
      } else {
        product.quantity = 1
        newCartProducts = [...cartProducts, product]
        setCartProducts(newCartProducts)
      }

      updateLocalStorage(newCartProducts)
      toast.success('Produto adicionado ao carrinho', {
        theme: 'colored'
      })
    } catch (err) {
      toast.error(
        'Falha ao adicionar produto ao carrinho, tente novamente mais tarde',
        {
          theme: 'colored'
        }
      )
    }
  }

  const deleteProduct = async productId => {
    const comfirm = window.confirm(
      'Tem certeza que deseja remover este produto?'
    )

    if (comfirm) {
      const newCart = cartProducts.filter(product => product.id !== productId)

      setCartProducts(newCart)
      updateLocalStorage(newCart)
    }
  }

  const increaseProducts = async productId => {
    const newCart = cartProducts.map(product => {
      return product.id === productId
        ? { ...product, quantity: product.quantity + 1 }
        : product
    })

    setCartProducts(newCart)
    updateLocalStorage(newCart)
  }

  const decreaseProducts = async productId => {
    const cartIndex = cartProducts.findIndex(pd => pd.id === productId)

    if (cartProducts[cartIndex].quantity > 1) {
      const newCart = cartProducts.map(product => {
        return product.id === productId
          ? { ...product, quantity: product.quantity - 1 }
          : product
      })

      setCartProducts(newCart)
      updateLocalStorage(newCart)
    } else {
      deleteProduct(productId)
    }
  }

  useEffect(() => {
    const loadUserData = async () => {
      const clientCartData = await localStorage.getItem('codeburguer:cartInfo')

      if (clientCartData) {
        setCartProducts(JSON.parse(clientCartData))
      }
    }

    loadUserData()
  }, [])

  return (
    <CartContext.Provider
      value={{
        putProductInCart,
        cartProducts,
        setCartProducts,
        increaseProducts,
        decreaseProducts,
        deleteProduct
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error('useCart must be used with UserContext')
  }

  return context
}

CartProvider.propTypes = {
  children: PropTypes.node
}
