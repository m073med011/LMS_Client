import { initializeAuthStore } from '@/stores/auth'

export default defineNuxtPlugin(async () => {
  await initializeAuthStore() // Load token and fetch user data
})
