import PropTypes from 'prop-types'
import React from 'react'
import { Navigate } from 'react-router-dom'

function PrivateRoute({ element, ...rest }) {
  const user = localStorage.getItem('codeburguer:userData')

  if (!user) {
    return <Navigate to="/login" />
  }

  return element
}

export default PrivateRoute

PrivateRoute.propTypes = {
  element: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
  isAdmin: PropTypes.bool
}
