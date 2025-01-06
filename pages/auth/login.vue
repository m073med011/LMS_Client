<template>
  <div class="flex items-center justify-center mt-10  dark:bg-gray-900">
    <div class="shadow-lg rounded-lg p-8 w-full max-w-md bg-white dark:bg-gray-800">
      <h1 class="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">Login</h1>

      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
          <input
            id="email"
            v-model="email"
            type="email"
            placeholder="Enter your email"
            class="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            required
          />
        </div>
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
          <input
            id="password"
            v-model="password"
            type="password"
            placeholder="Enter your password"
            class="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            required
          />
        </div>
        <button
          type="submit"
          class="w-full h-9 hover:bg-blue-600 dark:hover:bg-blue-700 dark:text-white rounded-sm border dark:border-gray-600"
        >
          Login
        </button>
      </form>

      <div v-if="authStore.error" class="mt-4 p-3 text-sm text-red-700 bg-red-100 dark:bg-red-800 dark:text-red-300 rounded-lg">
        {{ authStore.error }}
      </div>

      <div class="mt-6 text-center">
        <p class="text-sm text-gray-500 dark:text-gray-400">
          Don't have an account?
          <a href="/auth/register" class="text-blue-600 hover:underline dark:text-blue-400">Register</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const authStore = useAuthStore();
const router = useRouter();

const handleLogin = async () => {
  await authStore.login(email.value, password.value);
  if (authStore.isAuthenticated) {
    router.push('/dashboard');
  }
};
</script>

<style>
/* Centering adjustments */
body {
  margin: 0;
  font-family: Arial, sans-serif;
}

/* You can use a toggle button for dark mode in your app, or manage it globally */
html {
  transition: background-color 0.3s ease;
}
</style>
