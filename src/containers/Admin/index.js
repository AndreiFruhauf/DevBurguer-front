import PropTypes from 'prop-types'
import React from 'react'
import { useLocation } from 'react-router-dom'

import { SideMenuAdmin } from '../../components'
import paths from '../../constants/path'
import EditProduct from './EditProduct'
import ListProducts from './ListProducts'
import NewProduct from './NewProduct'
import Orders from './Orders'
import { Container, ContainerItems } from './styles'

export function Admin() {
  const pathName = useLocation().pathname

  return (
    <Container>
      <SideMenuAdmin path={pathName} />
      <ContainerItems>
        {pathName === paths.Order && <Orders />}
        {pathName === paths.Products && <ListProducts />}
        {pathName === paths.NewProduct && <NewProduct />}
        {pathName === paths.EditProducts && <EditProduct />}
      </ContainerItems>
    </Container>
  )
}
