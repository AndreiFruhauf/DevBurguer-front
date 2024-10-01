import CancelIcon from '@mui/icons-material/Cancel'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import paths from '../../../constants/path'
import api from '../../../services/api'
import formatCurrency from '../../../utils/formatCurrecy'
import { Container, ProductImage, IconEdit } from './styles'

function ListProducts() {
  const [products, setProducts] = useState()
  const navigate = useNavigate()

  useEffect(() => {
    async function loadOrders() {
      const { data } = await api.get('products')

      setProducts(data)
    }

    loadOrders()
  }, [])

  function isOffer(offer) {
    if (offer) {
      return <CheckBoxIcon style={{ color: '#228822' }} />
    }

    return <CancelIcon style={{ color: '#FD0000' }} />
  }

  function editProduct(product) {
    navigate(paths.EditProducts, { state: { product } })
  }

  return (
    <Container>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Preço</TableCell>
              <TableCell align="center">Produto em oferta</TableCell>
              <TableCell align="center"></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products &&
              products.map(product => (
                <TableRow
                  key={product.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell
                    style={{ width: '250px' }}
                    component="th"
                    scope="row"
                  >
                    {product.name}
                  </TableCell>
                  <TableCell>{formatCurrency(product.price)}</TableCell>
                  <TableCell align="center">{isOffer(product.offer)}</TableCell>
                  <TableCell align="center">
                    <ProductImage src={product.url} alt="imagem do produto" />
                  </TableCell>
                  <TableCell>
                    <IconEdit onClick={() => editProduct(product)} />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}

export default ListProducts
