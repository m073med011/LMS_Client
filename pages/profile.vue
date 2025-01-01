<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Main Container -->
    <div class="max-w-6xl mx-auto bg-white rounded-lg shadow-md overflow-hidden p-6">
      <!-- User Info Section -->
      <div class="flex flex-col sm:flex-row items-center text-center sm:text-left my-4">
        <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Profile Image"
          class="w-32 h-32 rounded-full border-4 border-gray-300" />
        <div class="ml-6 mt-4 sm:mt-0">
          <h2 class="text-2xl font-semibold">{{ userData.name || 'Loading...' }}</h2>
          <p class="text-gray-600">Full Stack Developer</p>
          <p class="text-gray-500">Bay Area, San Francisco, CA</p>
        </div>
      </div>

<hr>
      <!-- User Details -->
      <div class="my-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <h3 class="text-lg font-semibold">Email</h3>
          <p class="text-gray-600">{{ userData.email || 'Loading...' }}</p>
        </div>

        <div class="items-center justify-end sm:justify-start">
          <h6 class="py-1 text-red-500 text-sm">*Edit Email and Password</h6>
          <button @click="openModal" class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
            Edit
          </button>
        </div>
      </div>

      <div class="border p-4 ">


       <div class="grid  sm:grid-cols-2  grid-cols-1  gap-6">


       <div>
          <h5 class="text-lg font-semibold">Phone</h5>
          <p class="text-gray-600">(239) 816-9029</p>
        </div>
        <div>
          <h5 class="text-lg font-semibold">Email</h5>
          <p class="text-gray-600">Email@email.com</p>
        </div>
         <div>
          <h5 class="text-lg font-semibold">linkedin</h5>
          <p class="text-gray-600">this is linkedin</p>
        </div>
         <div>
          <h5 class="text-lg font-semibold">FaceBook</h5>
          <p class="text-gray-600">this is faceBook</p>
        </div>


        </div>

      </div>

      <!-- Courses and Organizations Section -->
      <div class="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Courses Section -->
        <div class="bg-blue-50 p-4 rounded-lg shadow">
          <h3 class="text-lg font-semibold text-blue-800 mb-4">Courses</h3>
          <div class="space-y-3">
            <div>
              <h4 class="font-semibold">Web Design</h4>
              <p class="text-sm text-gray-600">Progress: 70%</p>
            </div>
            <div>
              <h4 class="font-semibold">Website Markup</h4>
              <p class="text-sm text-gray-600">Progress: 50%</p>
            </div>
            <div>
              <h4 class="font-semibold">One Page</h4>
              <p class="text-sm text-gray-600">Progress: 40%</p>
            </div>
          </div>
        </div>

        <!-- Organizations Section -->
        <div class="bg-green-50 p-4 rounded-lg shadow">
          <h3 class="text-lg font-semibold text-green-800 mb-4">Organizations</h3>
          <div class="space-y-3">
            <div>
              <h4 class="font-semibold">Mobile Template</h4>
              <p class="text-sm text-gray-600">Progress: 60%</p>
            </div>
            <div>
              <h4 class="font-semibold">Backend API</h4>
              <p class="text-sm text-gray-600">Progress: 80%</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="isModalOpen"
      class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex items-center justify-center z-50">
      <div class="bg-white p-8 rounded-lg w-full max-w-md shadow-lg">
        <h3 class="text-lg font-semibold mb-4">Edit Profile</h3>
        <form @submit.prevent="closeModal">
          <label class="block mb-2">Full Name</label>
          <input type="text" class="w-full p-2 mb-4 border rounded" placeholder="Enter full name" />
          <label class="block mb-2">Email</label>
          <input type="email" class="w-full p-2 mb-4 border rounded" placeholder="Enter email" />
          <div class="flex justify-end">
            <button type="button" @click="closeModal"
              class="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 mr-2">
              Cancel
            </button>
            <button type="submit" class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const isModalOpen = ref(false);
const userData = ref({
  id: "",
  name: "",
  email: ""
});
const loading = ref(true);
const error = ref(null);

const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

// Fetch user data from the API
const fetchUserData = async () => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) {
      throw new Error("No token found in local storage");
    }

    const response = await axios.get("http://localhost:5000/api/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    userData.value = response.data.user;
  } catch (err) {
    error.value = err.message || "An error occurred while fetching user data";
  } finally {
    loading.value = false;
  }
};

// Fetch user data on component mount
onMounted(() => {
  fetchUserData();
});
</script>
