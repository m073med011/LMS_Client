<template>
  <div class="error-container">
    <div class="error-content">
      <h1 class="error-title">404</h1>
      <h2 class="error-subtitle">Page Not Found</h2>
      <p class="error-message">The page you're looking for doesn't exist or has been moved.</p>
      <button class="back-button" @click="router.push('/')">
        Back to Home
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<style scoped>
.error-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: #f8f9fa;
}

.error-content {
  padding: 2rem;
  max-width: 500px;
}

.error-title {
  font-size: 6rem;
  font-weight: bold;
  color: #dc3545;
  margin: 0;
  line-height: 1;
}

.error-subtitle {
  font-size: 2rem;
  color: #343a40;
  margin: 1rem 0;
}

.error-message {
  color: #6c757d;
  margin-bottom: 2rem;
}

.back-button {
  background-color: #0d6efd;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.25rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.back-button:hover {
  background-color: #0b5ed7;
}
</style>