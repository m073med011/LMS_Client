<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import '@fortawesome/fontawesome-free/css/all.min.css';

// Define default meta for the application
useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ]
})
</script>

<style>
/* Global styles */
body {
  @apply antialiased;
}
</style>