<template>
  <header class="w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 fixed top-0 z-50">
    <div class="px-4 py-3 flex items-center justify-between">
      <!-- Left Section -->
      <div class="flex items-center gap-4">
        <!-- Sidebar Toggle Button -->
        <button 
        v-if="authStore.user"

          @click="toggleSidebar"
          class="p-2 text-sm text-gray-500 rounded-lg dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 transition-colors"
        >
          <span class="sr-only">Toggle sidebar</span>
          <Icon
            :name="'heroicons:bars-3-bottom-left'"
            class="w-6 h-6"
          />
        </button>

        <NuxtLink
          :to="isAuthenticated ? '/dashboard' : '/'"
          class="text-xl font-semibold dark:text-white hover:opacity-80 transition-opacity"
        >
          My App
        </NuxtLink>
      </div>

      <!-- Right Section -->
      <div class="flex items-center gap-2">
        <!-- Dark Mode Toggle Button -->
        <button
          @click="toggleTheme"
          class="p-2 text-sm text-gray-500 rounded-lg  dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 transition-colors"
        >
          <span class="sr-only">Toggle Dark Mode</span>
          <Icon
            :name="theme === 'light' ? 'heroicons:sun' : 'heroicons:moon'"
            class="w-6 h-6"
          />
        </button>

        <!-- User Profile Section -->
        <div v-if="isAuthenticated" class="relative">
          <button
            @click="toggleDropdown"
            class="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border bg-background"
          >
            <img
              :src="userProfilePicture"
              alt="User Profile"
              class="h-full w-full object-cover"
            />
          </button>
          <div
            v-if="isDropdownOpen"
            class="absolute right-0 z-50 mt-3 w-48 rounded-md border bg-white dark:bg-gray-800 shadow-lg"
          >
            <div class="border-b px-3 py-1.5 text-sm dark:text-gray-300">
              <p class="font-semibold">Hello, {{ userName }}</p>
              <p class="leading-none text-gray-500 dark:text-gray-400">{{ userEmail }}</p>
            </div>
            <div class="p-1">
              <template v-for="(option, index) in profileMenuOptions" :key="index">
                <NuxtLink :to="option.title"
                  v-if="!option.divider"
                  @click="option.action"
                  class="w-full block text-left p-2 text-sm font-medium rounded hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-300"
                >
                  {{ option.title }}
                </NuxtLink>
                <hr v-if="option.divider" class="my-1 border-gray-300 dark:border-gray-600" />
              </template>
            </div>
          </div>
        </div>

        <!-- Login/Register Links -->
        <div class="dark:text-white" v-else >
          <NuxtLink to="/auth/login" class="text-sm font-medium hover:underline">
            Login
          </NuxtLink>
          <NuxtLink
            to="/auth/register"
            class="text-sm font-medium hover:underline ml-4"
          >
            Register
          </NuxtLink>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, defineEmits } from 'vue';
import { useTheme } from '~/composables/useTheme';
import { useAuthStore } from '~/stores/auth';

// Emits
const emit = defineEmits(['toggle-sidebar']);

// Sidebar toggle
const toggleSidebar = () => {
  emit('toggle-sidebar');
};

// Theme toggle
const { theme, toggleTheme } = useTheme();

// Auth Store
const authStore = useAuthStore();
const isAuthenticated = computed(() => authStore.isAuthenticated);
const userName = computed(() => authStore.user?.name || '');
const userEmail = computed(() => authStore.user?.email || '');
const userProfilePicture = computed(() => {
  return 'https://randomuser.me/api/portraits/med/men/75.jpg';
});

// Dropdown toggle
const isDropdownOpen = ref(false);
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

// Profile menu options
const profileMenuOptions = [
  { title: 'Profile', action: () => console.log('Navigate to Profile') },
  { title: 'Settings', action: () => console.log('Navigate to Settings') },
  { divider: true },
  { title: 'Logout', action: () => authStore.logout() },
];
</script>
