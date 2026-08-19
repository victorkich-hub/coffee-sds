import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext(null)

const STORAGE_KEY = 'coffee_seedlings_user'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem(STORAGE_KEY)

      return savedUser
        ? JSON.parse(savedUser)
        : null
    } catch {
      return null
    }
  })

  useEffect(() => {
    if (user) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(user)
      )
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
  }, [user])

  const login = async (email, password) => {
    if (!email || !password) {
      throw new Error(
        'Email and password are required.'
      )
    }

    /*
      Temporary frontend authentication.

      Replace this with your backend API later.
    */

    const loggedInUser = {
      id: 'user-1',
      name: email.split('@')[0],
      email,
      role: email
        .toLowerCase()
        .includes('admin')
        ? 'admin'
        : 'customer',
    }

    setUser(loggedInUser)

    return loggedInUser
  }

  const register = async ({
    name,
    email,
    password,
  }) => {
    if (!name || !email || !password) {
      throw new Error(
        'All fields are required.'
      )
    }

    const newUser = {
      id: `user-${Date.now()}`,
      name,
      email,
      role: 'customer',
    }

    setUser(newUser)

    return newUser
  }

  const logout = () => {
    setUser(null)
  }

  const value = {
    user,

    isAuthenticated: Boolean(user),

    isAdmin: user?.role === 'admin',

    login,

    register,

    logout,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthContext() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error(
      'useAuthContext must be used inside AuthProvider'
    )
  }

  return context
}