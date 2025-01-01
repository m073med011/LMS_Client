<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900">
    <div class="flex flex-col lg:flex-row min-h-screen">
      <!-- Sidebar for mobile (above Navbar) -->
      <Sidebar 
        v-if="isSidebarOpen && authStore.user"
        :isSidebarOpen="isSidebarOpen" 
        :menu="menu"
        @toggle-sidebar="toggleSidebar"
        class="lg:hidden fixed inset-0 z-50"
      />

      <!-- Main content wrapper -->
      <div class="flex-1 flex flex-col min-h-screen">
        <!-- Navbar -->
        <Navbar 
          :isSidebarOpen="isSidebarOpen"
          @toggle-sidebar="toggleSidebar" 
          class="z-40"
        />

        <!-- Desktop Sidebar (only visible if authenticated) -->
        <Sidebar 
          v-if="authStore.user"
          :isSidebarOpen="isSidebarOpen" 
          :menu="menu"
          @toggle-sidebar="toggleSidebar"
          class="hidden lg:block"
        />

        <!-- Main Content -->
        <main 
          :class="[
            'flex-1 transition-all duration-300 ease-in-out p-6 pt-[calc(57px+1.5rem)] overflow-auto',
            { 'lg:ml-64': isSidebarOpen && authStore.user, 'ml-0': !isSidebarOpen || !authStore.user }
          ]"
        >
          <div class="container mx-auto">
            <slot />
          </div>
        </main>
      </div>
    </div>

    <!-- Mobile Overlay -->
    <div
      v-if="isSidebarOpen"
      @click="toggleSidebar"
      class="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import Navbar from '../components/Navbar.vue';
import Sidebar from '../components/Sidebar.vue';
import { useAuthStore } from '@/stores/auth';

interface MenuItem {
  title: string;
  route: string;
  name?: string;
  items?: Array<{ 
    title: string; 
    route: string; 
    icon?: string 
  }>;
}

const menu: MenuItem[] = [
  { title: "Dashboard", route: "/dashboard", name: 'hugeicons:dashboard-square-02' },
  { title: "My Courses", route: "/courses", name: 'hugeicons:bookshelf-03' },
  { title: "My Organisation", route: "/organisation", name: 'hugeicons:building-05' },
  { title: "My Schedule", route: "/schedule", name: 'hugeicons:tablet-pen' },
  { title: "My Chat", route: "/chat", name: 'hugeicons:message-01' },
  { title: "Store", route: "/store", name: 'hugeicons:store-add-02' },
];

const isSidebarOpen = ref(false);
const authStore = useAuthStore();

const handleResize = () => {
  isSidebarOpen.value = window.innerWidth >= 1024 && authStore.user !== null;
};

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

onMounted(() => {
  handleResize();
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});
</script>
