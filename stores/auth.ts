import { defineStore } from 'pinia'
import axios from 'axios'
import { useRuntimeConfig } from '#imports'

interface User {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  createdAt?: Date;
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    token: null as string | null,
    error: null as string | null
  }),

  getters: {
    isAuthenticated(): boolean {
      return !!this.token
    },
    getUserName(): string {
      return this.user ? this.user.name : ''
    }
  },

  actions: {
    // Login action with improved error handling
    async login(email: string, password: string) {
      const config = useRuntimeConfig()
      this.error = null

      try {
        const response = await axios.post(`${config.public.apiBase}/auth/login`, { 
          email, 
          password 
        })
        
        // Save the token and user info to the store and localStorage
        this.token = response.data.token
        this.user = response.data.user
        this.saveToLocalStorage()

        // Set the authorization header globally
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`

        return response.data
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Login failed'
        console.error('Login failed:', error)
        throw error
      }
    },

    // Register action with comprehensive error handling
    async register(
      name: string, 
      email: string, 
      password: string,
      phone: string,
      role: string,
    ) {
      const config = useRuntimeConfig()
      this.error = null

      try {
        const response = await axios.post(`${config.public.apiBase}/auth/register`, {
          name,
          email,
          password,
          phone
        })

        // Handle successful registration
        this.token = response.data.token
        this.user = response.data.user
        this.saveToLocalStorage()

        return response.data
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Registration failed'
        console.error('Registration failed:', error)
        throw error
      }
    },

    // Logout action
    logout() {
      this.user = null
      this.token = null
      this.error = null
      this.clearFromLocalStorage()
      delete axios.defaults.headers.common['Authorization']
      navigateTo('/auth/login')
    },

    // Clear any stored error
    clearError() {
      this.error = null
    },

    // Save token and user info to localStorage
    saveToLocalStorage() {
      if (process.client) {
        try {
          localStorage.setItem('authToken', this.token ?? '')
          localStorage.setItem('userInfo', JSON.stringify(this.user))
        } catch (error) {
          console.error('Error saving to localStorage:', error)
        }
      }
    },

    // Load token and user info from localStorage
    loadFromLocalStorage() {
      if (process.client) {
        try {
          const token = localStorage.getItem('authToken')
          const userInfo = localStorage.getItem('userInfo')

          if (token) {
            this.token = token
            axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
          }

          if (userInfo) {
            this.user = JSON.parse(userInfo)
          }
        } catch (error) {
          console.error('Error loading from localStorage:', error)
          this.clearFromLocalStorage()
        }
      }
    },

    // Clear token and user info from localStorage
    clearFromLocalStorage() {
      if (process.client) {
        localStorage.removeItem('authToken')
        localStorage.removeItem('userInfo')
      }
    },

    // Fetch current user data
    async fetchUser() {
      const config = useRuntimeConfig()
      this.error = null

      if (this.token) {
        try {
          const response = await axios.get(`${config.public.apiBase}/auth/me`)
          this.user = response.data.user
          return response.data
        } catch (error: any) {
          this.error = error.response?.data?.message || 'Failed to fetch user'
          console.error('Failed to fetch user:', error)
          this.logout()
        }
      }
    }
  }
})

// Initialize the store (load token and user data) on app startup
export const initializeAuthStore = async () => {
  const authStore = useAuthStore()
  authStore.loadFromLocalStorage()
}