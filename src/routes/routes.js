import React from 'react'
import {
  Routes,
  Route,
  BrowserRouter as Router,
  Navigate
} from 'react-router-dom'

import { Header } from '../components'
import paths from '../constants/path'
import { Home, Products, Register, Login, Cart, Admin } from '../containers'
import PrivateRoute from './private-route'

function MyRoutes() {
  const user = localStorage.getItem('codeburguer:userData')

  const isAdmin = user && JSON.parse(user).admin

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/produtos" element={<Products />} />
        <Route path="/carrinho" element={<PrivateRoute element={<Cart />} />} />
        <Route
          path={paths.Order}
          element={
            isAdmin ? <PrivateRoute element={<Admin />} /> : <Navigate to="/" />
          }
        />
        <Route
          path={paths.Products}
          element={
            isAdmin ? <PrivateRoute element={<Admin />} /> : <Navigate to="/" />
          }
        />
        <Route
          path={paths.NewProduct}
          element={
            isAdmin ? <PrivateRoute element={<Admin />} /> : <Navigate to="/" />
          }
        />
        <Route
          path={paths.EditProducts}
          element={
            isAdmin ? <PrivateRoute element={<Admin />} /> : <Navigate to="/" />
          }
        />
      </Routes>
    </Router>
  )
}

export default MyRoutes
