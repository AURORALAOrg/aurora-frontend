"use client"

import { createContext, useContext, useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import logger from "@/lib/logger"

const API_BASE_URL = "http://localhost:8000/api/v1"

const AuthContext = createContext({
  user: null,
  isAuthenticated: false,
  isLoadingUser: true,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
  error: null,
})

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)
  const [isLoadingUser, setIsLoadingUser] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    logger.auth("Executing AuthProvider useEffect")

    const token = localStorage.getItem("authenticationToken")
    if (token) {
      logger.auth("Token found in localStorage")

      axios
        .get(`${API_BASE_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          const user = res.data.data.user
          setUser(user)
          logger.auth("User loaded from /me", user)
        })
        .catch((err) => {
          logger.error("Error loading /me", err)
          localStorage.removeItem("authenticationToken")
          setUser(null)
        })
        .finally(() => setIsLoadingUser(false))
    } else {
      logger.auth("No token found in localStorage")
      setIsLoadingUser(false)
    }
  }, [])

  const login = async (email, password) => {
    try {
      setError(null)
      const res = await axios.post(`${API_BASE_URL}/auth/login`, {
        email,
        password,
      })

      const { token, user } = res.data.data

      if (token) {
        localStorage.setItem("authenticationToken", token)
        setUser(user)
        logger.auth("Login successful - token saved")
        logger.auth("User set", user)
      }
    } catch (err) {
      logger.error("Login error", err)
      setError(err.response?.data?.message || "Failed to login. Please try again.")
      throw err
    }
  }

  const register = async (userData) => {
    try {
      setError(null)
      await axios.post(`${API_BASE_URL}/auth/register`, userData)
      navigate("/verify-email", { state: { email: userData.email } })
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.")
      throw err
    }
  }

  const logout = () => {
    localStorage.removeItem("authenticationToken")
    setUser(null)
    navigate("/login")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoadingUser,
        login,
        register,
        logout,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
