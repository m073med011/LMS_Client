<template>
  <div class="h-screen flex flex-col">
    <!-- Navigation Bar -->
    <nav class="bg-white dark:bg-gray-800 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16 lg:hidden">
          <div class="flex items-center space-x-4">
            <button 
              @click="toggleSidebar"
              class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
              :aria-label="isSidebarOpen ? 'Close chat list' : 'Open chat list'"
            >
              <svg class="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path v-if="isSidebarOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <div class="flex-1 flex overflow-hidden relative">
      <!-- Overlay -->
      <div 
        v-if="isSidebarOpen" 
        class="absolute inset-0 bg-gray-600 bg-opacity-50 transition-opacity lg:hidden"
        @click="toggleSidebar"
      ></div>

      <!-- Sidebar -->
      <aside 
        class="fixed inset-y-0 left-0 z-40 w-80 bg-white dark:bg-gray-800 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0"
        :class="{'translate-x-0': isSidebarOpen,'-translate-x-full': !isSidebarOpen}">
        <!-- Search -->
        <div class="p-4">
          <div class="relative">
            <input
              type="text"
              placeholder="Search chats..."
              class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
            />
            <svg class="absolute right-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        <!-- Chat List -->
        <div class="flex-1 overflow-y-auto">
          <div
            v-for="chat in chats"
            :key="chat.id"
            class="flex items-center p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
            :class="{ 'bg-blue-50 dark:bg-gray-700': chat.active }"
            @click="selectChat(chat)"
          >
            <img :src="chat.avatar" :alt="chat.name" class="w-12 h-12 rounded-full" />
            <div class="ml-4 flex-1 min-w-0">
              <div class="flex justify-between items-baseline">
                <h3 class="text-sm font-medium text-gray-900 dark:text-white">{{ chat.name }}</h3>
                <span class="text-xs text-gray-500 dark:text-gray-400">{{ chat.time }}</span>
              </div>
              <p class="text-sm text-gray-500 dark:text-gray-400 truncate">{{ chat.lastMessage }}</p>
            </div>
          </div>
        </div>
      </aside>

      <!-- Chat Area -->
      <div class="flex-1 flex flex-col bg-gray-50 dark:bg-gray-900 w-full">
        <!-- Chat Header -->
        <div class="bg-white dark:bg-gray-800 shadow-sm px-6 py-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4">
              <img :src="currentChat.avatar" :alt="currentChat.name" class="w-10 h-10 rounded-full" />
              <div>
                <h2 class="text-lg font-medium text-gray-900 dark:text-white">{{ currentChat.name }}</h2>
                <span class="text-sm text-green-500">Online</span>
              </div>
            </div>
            <div class="flex items-center space-x-2">
              <button class="p-2 text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              <button class="p-2 text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Messages -->
        <div class="flex-1 overflow-y-auto p-6 space-y-4" ref="messagesContainer">
          <template v-for="(message, index) in messages" :key="index">
            <!-- Received Message -->
            <div v-if="!message.isSent" class="flex items-start space-x-4">
              <img :src="message.avatar" :alt="message.sender" class="w-10 h-10 rounded-full" />
              <div class="flex-1 space-y-1">
                <div class="flex items-center space-x-2">
                  <span class="text-sm font-medium text-gray-900 dark:text-white">{{ message.sender }}</span>
                  <span class="text-xs text-gray-500 dark:text-gray-400">{{ message.time }}</span>
                </div>
                <div class="inline-block bg-white dark:bg-gray-800 rounded-lg px-4 py-2 shadow-sm">
                  <p class="text-gray-900 dark:text-white">{{ message.content }}</p>
                </div>
              </div>
            </div>

            <!-- Sent Message -->
            <div v-else class="flex items-start justify-end space-x-4">
              <div class="flex-1 flex justify-end space-y-1">
                <div class="max-w-[70%] space-y-1">
                  <div class="flex items-center justify-end space-x-2">
                    <span class="text-xs text-gray-500 dark:text-gray-400">{{ message.time }}</span>
                    <span class="text-sm font-medium text-gray-900 dark:text-white">You</span>
                  </div>
                  <div class="inline-block bg-blue-600 rounded-lg px-4 py-2 shadow-sm">
                    <p class="text-white">{{ message.content }}</p>
                  </div>
                </div>
              </div>
              <img :src="message.avatar" :alt="message.sender" class="w-10 h-10 rounded-full" />
            </div>
          </template>
        </div>

        <!-- Input Area -->
        <div class="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-6 py-4">
          <form @submit.prevent="sendMessage" class="flex items-center space-x-4">
            <button
              type="button"
              class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
              </svg>
            </button>
            <div class="flex-1 relative">
              <input
                v-model="newMessage"
                type="text"
                placeholder="Type your message..."
                class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
              />
              <button
                type="button"
                class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
            </div>
            <button
              type="submit"
              class="inline-flex items-center  border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Message {
  content: string
  sender: string
  time: string
  avatar: string
  isSent: boolean
}

interface Chat {
  id: number
  name: string
  avatar: string
  lastMessage: string
  time: string
  active: boolean
}

const isSidebarOpen = ref(false)

const handleResize = () => {
  if (typeof window !== 'undefined') {
    if (window.innerWidth >= 1024) {
      isSidebarOpen.value = true
    } else {
      isSidebarOpen.value = false
    }
  }
}

onMounted(() => {
  handleResize()
  if (typeof window !== 'undefined') {
    window.addEventListener('resize', handleResize)
  }
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('resize', handleResize)
  }
})

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

const chats = ref<Chat[]>([
  {
    id: 1,
    name: 'John Doe',
    avatar: 'https://ui-avatars.com/api/?name=John+Doe',
    lastMessage: 'Hello! How can I help you with the course?',
    time: '10:00 AM',
    active: true
  },
  {
    id: 2,
    name: 'Jane Smith',
    avatar: 'https://ui-avatars.com/api/?name=Jane+Smith',
    lastMessage: 'The assignment has been updated.',
    time: 'Yesterday',
    active: false
  },
  {
    id: 3,
    name: 'Course Support',
    avatar: 'https://ui-avatars.com/api/?name=Course+Support',
    lastMessage: 'Please let me know if you need help.',
    time: '2 days ago',
    active: false
  }
])

const currentChat = ref(chats.value[0])

const messages = ref<Message[]>([
  {
    content: 'Hello! How can I help you with the course?',
    sender: 'John Doe',
    time: '10:00 AM',
    avatar: 'https://ui-avatars.com/api/?name=John+Doe',
    isSent: false
  },
  {
    content: 'I have a question about the latest assignment',
    sender: 'You',
    time: '10:05 AM',
    avatar: 'https://ui-avatars.com/api/?name=You',
    isSent: true
  }
])

const newMessage = ref('')
const messagesContainer = ref<HTMLElement | null>(null)

const selectChat = (chat: Chat) => {
  chats.value.forEach(c => c.active = c.id === chat.id)
  currentChat.value = chat
  if (window.innerWidth < 768) {
    isSidebarOpen.value = false
  }
}

const sendMessage = () => {
  if (!newMessage.value.trim()) return

  messages.value.push({
    content: newMessage.value,
    sender: 'You',
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    avatar: 'https://ui-avatars.com/api/?name=You',
    isSent: true
  })

  newMessage.value = ''

  // Scroll to bottom after message is sent
  setTimeout(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  }, 100)
}
</script>

<style scoped>
/* Custom scrollbar for Webkit browsers */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: transparent;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.5);
  border-radius: 3px;
}

.dark .overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.3);
}
</style>