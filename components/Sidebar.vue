<template>
  <aside
    :class="{
      'transform -translate-x-full': !isSidebarOpen,
      'shadow-lg': isSidebarOpen,
      'top-0 h-screen': !isDesktop,
      'top-[57px] h-[calc(100vh-57px)]': isDesktop
    }"
    class="fixed left-0 bg-white border-r dark:bg-gray-800 dark:border-gray-700 w-64 transition-all duration-300 ease-in-out overflow-y-auto"
  >
    <!-- Close button for mobile -->
    <button
      @click="$emit('toggle-sidebar')"
      class="absolute top-4 right-4 p-2 rounded-lg text-gray-500 hover:bg-gray-100 lg:hidden"
    >
      <Icon name="heroicons:x-mark" class="w-6 h-6" />
    </button>

    <nav class="h-full py-4">
      <!-- Add padding-top on mobile to account for close button -->
      <div class="space-y-1 pt-14 lg:pt-0">
        <NuxtLink
          v-for="item in menu"
          :key="item.route"
          :to="item.route"
          class="flex items-center gap-4 px-4 py-3 text-[15px] text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          :class="{ 'bg-gray-100 dark:bg-gray-700': isCurrentRoute(item.route) }"
        >
          <Icon 
            v-if="item.name" 
            :name="item.name" 
            class="h-5 w-5 text-gray-500 dark:text-gray-400" 
          />
          <span class="truncate">{{ item.title }}</span>
        </NuxtLink>
      </div>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const props = defineProps<{
  isSidebarOpen: boolean;
  menu: Array<{
    title: string;
    route: string;
    name?: string;
    items?: Array<{ title: string; route: string; name?: string }>;
  }>;
}>();

defineEmits(['toggle-sidebar']);

const route = useRoute();
const isDesktop = ref(false);

const isCurrentRoute = (path: string) => {
  return route.path === path;
};

onMounted(() => {
  isDesktop.value = window.innerWidth >= 1024;
  window.addEventListener('resize', () => {
    isDesktop.value = window.innerWidth >= 1024;
  });
});
</script>