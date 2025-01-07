<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
    <div class="bg-white dark:bg-gray-800 rounded-sm shadow-md overflow-hidden p-6">
      <div class="flex flex-col sm:flex-row items-center text-center sm:text-left my-4 justify-between">
        <div class="capitalize lg:text-left dark:text-gray-100 lg:flex justify-center text-center items-center">
          <img
            src="https://bootdey.com/img/Content/avatar/avatar7.png"
            alt="Profile Image"
            class="w-32 h-32 rounded-full border-4 border-gray-300 dark:border-gray-700 m-auto"
          />
          <div class="m-4 sm:mt-0">
            <h2 class="text-2xl font-semibold dark:text-white">{{ userData.name || "Loading..." }}</h2>
            <p class="text-gray-600 dark:text-gray-400"> Role: {{ userData.role }}</p>
            <p class="text-gray-500 dark:text-gray-400">phone : {{ userData.phone }}</p>
          </div>
        </div>
        <div class="items-center justify-center flex gap-2 flex-wrap">
          <button @click="openandCloseModal" class="w-full bg-btn px-4 py-2 rounded-sm hover:bg-green-600 dark:bg-green-700 dark:hover:bg-green-600 lg:w-[150px]">
            Edit
          </button>
          <button @click="openandCloseModal" class="w-full bg-btn px-4 py-2 rounded-sm hover:bg-green-600 dark:bg-green-700 dark:hover:bg-green-600 lg:w-[150px]">
            Follow
          </button>
          <button @click="openandCloseModal" class="w-full bg-blue text-white px-4 py-2 rounded-sm hover:bg-green-600 dark:hover:bg-green-500 lg:w-[150px]">
            Message
          </button>
        </div>
      </div>

      <hr class="border-gray-300 dark:border-gray-700" />

      <div class="flex flex-wrap justify-between gap-4 p-4">
        <div class="border rounded-lg flex flex-col justify-center items-center flex-1 lg:h-24 min-h-24 bg-white dark:bg-gray-800 dark:border-gray-700">
          <div class="font-semibold text-primary text-xl">5</div>
          <p class="lg:text-xl font-semibold text-primary text-[10px] dark:text-gray-400">Courses</p>
        </div>
        <div class="border rounded-lg flex flex-col justify-center items-center flex-1 lg:h-24 min-h-24 bg-white dark:bg-gray-800 dark:border-gray-700">
          <div class="font-semibold text-primary text-xl">5</div>
          <p class="lg:text-xl font-semibold text-primary text-[10px] dark:text-gray-400">Students</p>
        </div>
        <div class="border rounded-lg flex flex-col justify-center items-center flex-1 lg:h-24 min-h-24 bg-white dark:bg-gray-800 dark:border-gray-700">
          <div class="font-semibold text-primary text-xl">5</div>
          <p class="lg:text-xl font-semibold text-primary text-[10px] dark:text-gray-400">Followers</p>
        </div>
      </div>

      <div class="p-4">
        <h3 class="text-lg font-semibold mb-2 dark:text-white">Bio</h3>
        <p class="text-gray-600 dark:text-gray-400">
          I am a passionate Full Stack Developer with expertise in both front-end and back-end development...
        </p>
      </div>

      <div class="container mx-auto p-6">
        <div class="space-y-6 mb-12">
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 flex flex-col sm:flex-row">
            <img src="https://via.placeholder.com/150" alt="Course 1 Image" class="w-full h-24 object-cover rounded-lg mb-4 sm:mb-0 sm:mr-4 sm:w-32 sm:h-32">
            <div class="flex-1">
              <h4 class="text-lg font-semibold text-gray-800 dark:text-white mb-2">Course 1</h4>
              <p class="text-gray-600 dark:text-gray-400 mb-4">Description of the course goes here...</p>
              <a href="#" class="text-blue-500 dark:text-blue-400 hover:underline">View Course</a>
            </div>
          </div>
        </div>

        
        <div class="space-y-6">
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 flex flex-col sm:flex-row">
            <img src="https://via.placeholder.com/150" alt="Organization 1 Image" class="w-full h-24 object-cover rounded-lg mb-4 sm:mb-0 sm:mr-4 sm:w-32 sm:h-32">
            <div class="flex-1">
              <h4 class="text-lg font-semibold text-gray-800 dark:text-white mb-2">Organization 1</h4>
              <p class="text-gray-600 dark:text-gray-400 mb-4">Brief information about the organization...</p>
              <a href="#" class="text-blue-500 dark:text-blue-400 hover:underline">Learn More</a>
            </div>
          </div>
        </div>
      </div>

      <div class="p-6 border mt-4 border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700 rounded-lg shadow-lg items-center flex flex-col">
  <h3 class="lg:text-xl text-sm font-semibold text-gray-800 dark:text-gray-200 mb-4">Contact Information</h3>
  <ul class="space-y-4 text-gray-700 dark:text-gray-300 flex flex-wrap gap-10 items-center justify-center text-center">
    <li>
      <a href="https://www.facebook.com" target="_blank" class="flex items-center space-x-2 hover:text-blue-500 dark:hover:text-blue-400">
        <Icon name="mdi:facebook" class="h-5 w-5 text-gray-500 dark:text-gray-400" />
        <span class="text-blue-600 dark:text-blue-400">Facebook</span>
      </a>
    </li>
    <li>
      <a href="https://twitter.com" target="_blank" class="flex items-center space-x-2 hover:text-blue-500 dark:hover:text-blue-400">
        <Icon name="mdi:twitter" class="h-5 w-5 text-gray-500 dark:text-gray-400" />
        <span class="text-blue-600 dark:text-blue-400">Twitter</span>
      </a>
    </li>
    <li>
      <a href="https://www.instagram.com" target="_blank" class="flex items-center space-x-2 hover:text-blue-500 dark:hover:text-blue-400">
        <Icon name="mdi:instagram" class="h-5 w-5 text-gray-500 dark:text-gray-400" />
        <span class="text-blue-600 dark:text-blue-400">Instagram</span>
      </a>
    </li>
    <li>
      <a href="https://www.linkedin.com" target="_blank" class="flex items-center space-x-2 hover:text-blue-500 dark:hover:text-blue-400">
        <Icon name="mdi:linkedin" class="h-5 w-5 text-gray-500 dark:text-gray-400" />
        <span class="text-blue-600 dark:text-blue-400">LinkedIn</span>
      </a>
    </li>
    <li>
      <a href="tel:+1234567890" class="flex items-center space-x-2 text-green-600 dark:text-green-400 hover:text-green-500 dark:hover:text-green-300">
        <Icon name="mdi:phone" class="h-5 w-5 text-gray-500 dark:text-gray-400" />
        <span>Phone</span>
      </a>
    </li>
    <li>
      <a href="mailto:someone@example.com" class="flex items-center space-x-2 text-red-600 dark:text-red-400 hover:text-red-500 dark:hover:text-red-300">
        <Icon name="mdi:email" class="h-5 w-5 text-gray-500 dark:text-gray-400" />
        <span>Email</span>
      </a>
    </li>
    <li>
      <a href="https://www.example.com" target="_blank" class="flex items-center space-x-2 text-blue-700 dark:text-blue-500 hover:text-blue-600 dark:hover:text-blue-400">
        <Icon name="mdi:web" class="h-5 w-5 text-gray-500 dark:text-gray-400" />
        <span>Website</span>
      </a>
    </li>
  </ul>
</div>

    </div>

    <div v-if="isModalOpen" class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex items-center justify-center z-50">
      <div class="bg-white dark:bg-gray-800 p-8 rounded-lg w-full max-w-md shadow-lg">
        <h3 class="text-lg font-semibold mb-4 dark:text-white">Edit Profile</h3>
        <form @submit.prevent="openandCloseModal">
          <label class="block mb-2 dark:text-gray-300">Full Name</label>
          <input type="text" class="w-full p-2 mb-4 border rounded dark:bg-gray-700 dark:text-white" placeholder="Enter full name" />
          <label class="block mb-2 dark:text-gray-300">Email</label>
          <input type="email" class="w-full p-2 mb-4 border rounded dark:bg-gray-700 dark:text-white" placeholder="Enter email" />
          <div class="flex justify-end">
            <button type="button" @click="openandCloseModal" class="bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-white px-4 py-2 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 mr-2">
              Cancel
            </button>
            <button type="submit" class="bg-green-500 dark:bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-600 dark:hover:bg-green-500">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from '~/stores/auth'

const authStore = useAuthStore()
const userData = ref({
  name: '',
  email: '',
  phone: '',
  role:''
})

const isModalOpen = ref(false)

const fetchUserData = async () => {
  try {
    await authStore.fetchUser()
    if (authStore.user) {
      userData.value = {
        name: authStore.user.name,
        email: authStore.user.email,
        phone: authStore.user.phone,
        role: authStore.user.role,
      }
    }
  } catch (error) {
    console.error('Error fetching user data:', error)
  }
}

onMounted(() => {
  fetchUserData()
})

const openandCloseModal = () => {
  isModalOpen.value = !isModalOpen.value
}
</script>