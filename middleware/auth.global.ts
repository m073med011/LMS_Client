import { useAuthStore } from '@/stores/auth'

export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore()

  // Prevent logged-in users from accessing auth pages
  if (authStore.user && (to.path === '/auth/login' || to.path === '/auth/register')) {
    return navigateTo('/dashboard') // Change to your dashboard path
  }
})
