<template>
  <div class="min-h-screen bg-gray-10">
    <!-- Main Container -->
    <div
      class=" bg-white rounded-sm shadow-md overflow-hidden p-6"
    >
      <!-- User Info Section -->
      <div class="flex flex-col sm:flex-row items-center text-center sm:text-left my-4 justify-between">
        <div class=" capitalize lg:text-left black lg:flex justify-center text-center items-center">
        <img src="https://bootdey.com/img/Content/avatar/avatar7.png"
          alt="Profile Image"
          class="w-32 h-32 rounded-full border-4 border-gray-300 m-auto"/>
        <div class="m-4 sm:mt-0">
          <h2 class="text-2xl font-semibold">
            {{ userData.name || "Loading..." }}
          </h2>
          <p class="text-gray-600">Full Stack Developer</p>
          <p class="text-gray-500">Bay Area, San Francisco, CA</p>
        </div>
      </div>
      <div class="items-center justify-center flex gap-2 flex-wrap">
          <button @click="openandCloseModal" class="w-full bg-btn px-4 py-2 rounded-sm hover:bg-green-600 lg:w-[150px]">
            Edit
          </button>
          <button @click="openandCloseModal" class="w-full bg-btn  px-4 py-2 rounded-sm hover:bg-green-600 lg:w-[150px]">
            Follow
          </button>
          <button @click="openandCloseModal" class="w-full bg-blue text-white px-4 py-2 rounded-sm hover:bg-green-600 lg:w-[150px]">
            Massage
          </button>
        </div>
      </div>

      <hr />
      <!-- User Details -->
      <div class="flex flex-wrap justify-between gap-4 p-4">
  <div class="border rounded-lg  flex flex-col justify-center items-center flex-1 lg:h-24 min-h-24 bg-white">
    <div class=" font-semibold text-primary text-xl">5</div>
    <p class="lg:text-xl font-semibold text-primary text-[10px]">Courses</p>
  </div>
  <div class="border rounded-lg  flex flex-col justify-center items-center flex-1 lg:h-24 min-h-24 bg-white">
    <div class=" font-semibold text-primary text-xl">5</div>
    <p class="lg:text-xl font-semibold text-primary text-[10px]">Students</p>
  </div>
  <div class="border rounded-lg  flex flex-col justify-center items-center flex-1 lg:h-24 min-h-24 bg-white">
    <div class=" font-semibold text-primary text-xl">5</div>
    <p class="lg:text-xl font-semibold text-primary text-[10px]">Followers</p>
  </div>
</div>




      <!-- bio section -->
      <div class="p-4">
        <h3 class="text-lg font-semibold mb-2">Bio</h3>
        <p class="text-gray-600">
          I am a passionate Full Stack Developer with expertise in both front-end and back-end development. With a strong
          background in web development, I have honed my skills in creating dynamic and user-friendly web applications.
          My expertise in front-end technologies such as HTML, CSS, and JavaScript allows me to build visually appealing
          and interactive interfaces that enhance user experience. On the back-end, I have experience with server-side
          technologies like Node.js, Express.js, and MongoDB, enabling me to develop robust and scalable web services.
          Additionally, I have a solid understanding of database management and SQL, allowing me to design and manage
          efficient databases for efficient data storage and retrieval.
        </p>
      </div>  



      <!-- Courses and Organizations Section -->
      <div class="container mx-auto p-6">

<!-- Course List -->
<div class="space-y-6 mb-12">
  <!-- Course 1 -->
  <div class="bg-white rounded-lg shadow-lg p-4 flex flex-col sm:flex-row">
    <img src="https://via.placeholder.com/150" alt="Course 1 Image" class=" w-full h-24 object-cover rounded-lg mb-4 sm:mb-0 sm:mr-4 sm:w-32 sm:h-32">
    <div class="flex-1">
      <h4 class="text-lg font-semibold text-gray-800 mb-2">Course 1</h4>
      <p class="text-gray-600 mb-4">Description of the course goes here. This is a brief summary of the course content.</p>
      <a href="#" class="text-blue-500 hover:underline">View Course</a>
    </div>
  </div>

  <!-- Course 2 -->
  <div class="bg-white rounded-lg shadow-lg p-4 flex flex-col sm:flex-row">
    <img src="https://via.placeholder.com/150" alt="Course 2 Image" class="w-full h-24 object-cover rounded-lg mb-4 sm:mb-0 sm:mr-4 sm:w-32 sm:h-32">
    <div class="flex-1">
      <h4 class="text-lg font-semibold text-gray-800 mb-2">Course 2</h4>
      <p class="text-gray-600 mb-4">Description of the course goes here. This is a brief summary of the course content.</p>
      <a href="#" class="text-blue-500 hover:underline">View Course</a>
    </div>
  </div>

  <!-- Course 3 -->
  <div class="bg-white rounded-lg shadow-lg p-4 flex flex-col sm:flex-row">
    <img src="https://via.placeholder.com/150" alt="Course 3 Image" class="w-full h-24 object-cover rounded-lg mb-4 sm:mb-0 sm:mr-4 sm:w-32 sm:h-32">
    <div class="flex-1">
      <h4 class="text-lg font-semibold text-gray-800 mb-2">Course 3</h4>
      <p class="text-gray-600 mb-4">Description of the course goes here. This is a brief summary of the course content.</p>
      <a href="#" class="text-blue-500 hover:underline">View Course</a>
    </div>
  </div>
</div>

<!-- Organization List -->
<div class="space-y-6">
  <!-- Organization 1 -->
  <div class="bg-white rounded-lg shadow-lg p-4 flex flex-col sm:flex-row">
    <img src="https://via.placeholder.com/150" alt="Organization 1 Image" class="w-full h-24 object-cover rounded-lg mb-4 sm:mb-0 sm:mr-4 sm:w-32 sm:h-32">
    <div class="flex-1">
      <h4 class="text-lg font-semibold text-gray-800 mb-2">Organization 1</h4>
      <p class="text-gray-600 mb-4">Brief information about the organization, its mission, or its main focus.</p>
      <a href="#" class="text-blue-500 hover:underline">Learn More</a>
    </div>
  </div>

  <!-- Organization 2 -->
  <div class="bg-white rounded-lg shadow-lg p-4 flex flex-col sm:flex-row">
    <img src="https://via.placeholder.com/150" alt="Organization 2 Image" class="w-full h-24 object-cover rounded-lg mb-4 sm:mb-0 sm:mr-4 sm:w-32 sm:h-32">
    <div class="flex-1">
      <h4 class="text-lg font-semibold text-gray-800 mb-2">Organization 2</h4>
      <p class="text-gray-600 mb-4">Brief information about the organization, its mission, or its main focus.</p>
      <a href="#" class="text-blue-500 hover:underline">Learn More</a>
    </div>
  </div>

  <!-- Organization 3 -->
  <div class="bg-white rounded-lg shadow-lg p-4 flex flex-col sm:flex-row">
    <img src="https://via.placeholder.com/150" alt="Organization 3 Image" class="w-full h-24 object-cover rounded-lg mb-4 sm:mb-0 sm:mr-4 sm:w-32 sm:h-32">
    <div class="flex-1">
      <h4 class="text-lg font-semibold text-gray-800 mb-2">Organization 3</h4>
      <p class="text-gray-600 mb-4">Brief information about the organization, its mission, or its main focus.</p>
      <a href="#" class="text-blue-500 hover:underline">Learn More</a>
    </div>
  </div>
</div>


<!-- social media links -->
<div class="p-6 border  mt-4 border-gray-200 bg-white rounded-lg shadow-lg items-center flex flex-col">
  <h3 class="lg:text-xl text-sm font-semibold text-gray-800 mb-4">Contact Information</h3>
  <ul class="space-y-4 text-gray-700 flex flex-wrap gap-10 items-center justify-center text-center">
    <li>
      <a href="https://www.facebook.com" target="_blank" class="flex items-center space-x-2 hover:text-blue-500">
        <Icon 
            name="mdi:facebook" 
            class="h-5 w-5 text-gray-500 dark:text-gray-400" 
          />
        <span class="text-blue-600">Facebook</span>
        
      </a>
    </li>
    <li>
      <a href="https://twitter.com" target="_blank" class="flex items-center space-x-2 hover:text-blue-500">
        <Icon 
            name="mdi:twitter" 
            class="h-5 w-5 text-gray-500 dark:text-gray-400" 
          />
        <span class="text-blue-600">Twitter</span>
      </a>
    </li>
    <li>
      <a href="https://www.instagram.com" target="_blank" class="flex items-center space-x-2 hover:text-blue-500">
        <Icon 
            name="mdi:instagram" 
            class="h-5 w-5 text-gray-500 dark:text-gray-400" 
          />
        <span class="text-blue-600">Instagram</span>
      </a>
    </li>
    <li>
      <a href="https://www.linkedin.com" target="_blank" class="flex items-center space-x-2 hover:text-blue-500">
        <Icon 
            name="mdi:linkedin" 
            class="h-5 w-5 text-gray-500 dark:text-gray-400" 
          />
        <span class="text-blue-600">LinkedIn</span>
      </a>
    </li>
    <!-- New sections for phone, Gmail, and website -->
    <li>
      <a href="tel:+1234567890" class="flex items-center space-x-2 text-green-600 hover:text-green-500">
        <Icon 
        name="mdi:phone" 
        class="h-5 w-5 text-gray-500 dark:text-gray-400" 
        />
        <span>Phone</span>
      </a>
    </li>
    <li>
      <a href="mailto:someone@example.com" class="flex items-center space-x-2 text-red-600 hover:text-red-500">
        <Icon 
            name="mdi:email" 
            class="h-5 w-5 text-gray-500 dark:text-gray-400" 
          />
        <span>Email</span>
      </a>
    </li>
    <li>
      <a href="https://www.example.com" target="_blank" class="flex items-center space-x-2 text-blue-700 hover:text-blue-600">
        <Icon 
            name="mdi:web" 
            class="h-5 w-5 text-gray-500 dark:text-gray-400" 
          />
        <span>Website</span>
      </a>
    </li>
  </ul>
</div>

</div>


    </div>

    <!-- Modal edit info -->
    <div
      v-if="isModalOpen"
      class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex items-center justify-center z-50"
    >
      <div class="bg-white p-8 rounded-lg w-full max-w-md shadow-lg">
        <h3 class="text-lg font-semibold mb-4">Edit Profile</h3>
        <form @submit.prevent="openandCloseModal">
          <label class="block mb-2">Full Name</label>
          <input
            type="text"
            class="w-full p-2 mb-4 border rounded"
            placeholder="Enter full name"
          />
          <label class="block mb-2">Email</label>
          <input
            type="email"
            class="w-full p-2 mb-4 border rounded"
            placeholder="Enter email"
          />
          <div class="flex justify-end">
            <button
              type="button"
              @click="openandCloseModal"
              class="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";

useHead({
  title: 'Profile | Learning Platform',
  meta: [
    { name: 'description', content: 'This is the profile page of the learning platform' },
  ],
})

const isModalOpen = ref(false);
const userData = ref({
  id: "",
  name: "",
  email: "",
});
const loading = ref(true);
const error = ref<string | null>(null);

const openandCloseModal = () => {
      isModalOpen.value = !isModalOpen.value;
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
        Authorization: `Bearer ${token}`,
      },
    });

    userData.value = response.data.user;
  } catch (err) {
    if (err instanceof Error) {
      error.value = err.message;
    } else {
      error.value = "An error occurred while fetching user data";
    }
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchUserData();
});
</script>
