import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { useCart } from '../../hooks/CartContext'
import api from '../../services/api'
import formatCurrency from '../../utils/formatCurrecy'
import { Button } from '../Button'
import { Container } from './styles'

export function CartResume() {
  const { cartProducts, setCartProducts } = useCart()
  const [finalQuatity, setFinalQuantity] = useState(0)
  const [finalPrice, setFinalPrice] = useState(0)

  useEffect(() => {
    const sumAllItems = cartProducts.reduce((acc, current) => {
      return current.price * current.quantity + acc
    }, 0)

    const sumAllQuantities = cartProducts.reduce((acc, current) => {
      return current.quantity + acc
    }, 0)

    setFinalQuantity(sumAllQuantities)
    setFinalPrice(formatCurrency(sumAllItems))
  }, [cartProducts])

  const submitOrder = async () => {
    try {
      const order = cartProducts.map(product => {
        return { id: product.id, quantity: product.quantity }
      })

      await api.post('orders', { products: order })
      setCartProducts([])
      toast.success('Pedido realizado com sucesso!', {
        theme: 'colored'
      })
    } catch (err) {
      toast.error(
        'Não foi possível realizar o pedido, tente novamente mais tarde.',
        {
          theme: 'colored'
        }
      )
    }
  }

  return (
    <div>
      <Container>
        <div className="container-top">
          <h2 className="title">Resumo do Pedido</h2>
          <p className="quantity">Quantidade de Produtos</p>
          <p className="quantity-number">{finalQuatity}</p>
        </div>
        <div className="container-bottom">
          <p className="total">Total</p>
          <p className="total-price">{finalPrice}</p>
        </div>
      </Container>
      <Button
        onClick={submitOrder}
        style={{ width: '100%', marginTop: '30px' }}
      >
        Finalizar Pedido
      </Button>
    </div>
  )
}
