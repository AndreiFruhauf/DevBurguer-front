import PropTypes from 'prop-types'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const UserContext = createContext({})

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({})
  const [user, setUser] = useState([])

  const putUserData = async userInfo => {
    setUserData(userInfo)

    await localStorage.setItem('codeburguer:userData', JSON.stringify(userInfo))
  }

  const logOut = async () => {
    try {
      await localStorage.removeItem('codeburguer:userData')
      setUser(localStorage.getItem('codeburguer:userData'))
      toast.success('Saiu!', {
        theme: 'colored'
      })
    } catch (err) {
      toast.error('Falha ao sair, tente novamente mais tarde', {
        theme: 'colored'
      })
    }
  }

  useEffect(() => {
    const loadUserData = async () => {
      const clientInfo = await localStorage.getItem('codeburguer:userData')

      if (clientInfo) {
        setUserData(JSON.parse(clientInfo))
      }
    }

    loadUserData()
  }, [])

  return (
    <UserContext.Provider
      value={{ putUserData, userData, logOut, user, setUser }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const context = useContext(UserContext)

  if (!context) {
    throw new Error('useUser must be used with UserContext')
  }

  return context
}

UserProvider.propTypes = {
  children: PropTypes.node
}
