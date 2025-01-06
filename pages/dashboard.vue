<template>
  <div class="flex justify-center items-center h-screen">
    comming soon ...
  </div>
</template>

<script setup lang="ts">
import {titlepage }from '../data/index'

definePageMeta({
  requiresAuth: true,
})

useHead({
  title: ` ${titlepage.Dashboard.title} | Learning Platform`,
  meta: [
    { name: `${titlepage.Dashboard.description}`},
  ],
})
</script>
