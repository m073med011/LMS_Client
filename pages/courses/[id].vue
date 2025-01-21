<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Loading State -->
    <div v-if="pending" class="flex justify-center items-center min-h-[60vh]">
      <div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500 dark:border-blue-400"></div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-12">
      <h2 class="text-2xl font-bold text-red-600 dark:text-red-400">Error loading course</h2>
      <p class="mt-2 text-gray-600 dark:text-gray-300">{{ error.message }}</p>
    </div>

    <!-- Course Content -->
    <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Main Content -->
      <div class="lg:col-span-2">
        <!-- Course Header -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <img :src="course?.thumbnail" :alt="course?.title" class="w-full h-64 object-cover">
          <div class="p-6">
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white">{{ course?.title }}</h1>
            <p class="mt-2 text-gray-600 dark:text-gray-300">{{ course?.description }}</p>
          </div>
        </div>

        <!-- Course Materials -->
        <div class="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Course Materials</h2>
          <div v-if="course?.materials?.length === 0" class="text-center py-8 text-gray-500 dark:text-gray-300">
            No materials available yet
          </div>
          <ul v-else class="space-y-4">
            <li v-for="material in course?.materials" :key="material._id" 
                class="flex items-center p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
              <!-- Material Type Icon -->
              <div class="flex-shrink-0">
                <i v-if="material.type === 'video'" class="fas fa-video text-blue-500 dark:text-blue-400 text-xl"></i>
                <i v-else-if="material.type === 'document'" class="fas fa-file-alt text-green-500 dark:text-green-400 text-xl"></i>
                <i v-else-if="material.type === 'quiz'" class="fas fa-question-circle text-purple-500 dark:text-purple-400 text-xl"></i>
              </div>
              <!-- Material Details -->
              <div class="ml-4 flex-1">
                <h3 class="text-lg font-medium text-gray-900 dark:text-white">{{ material.title }}</h3>
                <p class="text-sm text-gray-500 dark:text-gray-300">Type: {{ material.type }}</p>
              </div>
              <!-- Action Button -->
              <a :href="material.content" target="_blank" 
                 class="ml-4 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-400">
                Access
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="lg:col-span-1">
        <!-- Course Info Card -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Course Information</h2>
          <div class="space-y-4">
            <div class="flex items-center">
              <i class="fas fa-clock text-gray-400 dark:text-gray-300 w-6"></i>
              <span class="ml-2 dark:text-gray-300">Duration: {{ course?.duration }} hours</span>
            </div>
            <div class="flex items-center">
              <i class="fas fa-signal  dark:text-white w-6"></i>
              <span class="ml-2 dark:text-gray-300">Level: {{ course?.level }}</span>
            </div>
            <div class="flex items-center">
              <i class="fas fa-folder  dark:text-gray-300 w-6"></i>
              <span class="ml-2 dark:text-gray-300">Category: {{ course?.category }}</span>
            </div>
            <div class="flex items-center">
              <i class="fas fa-dollar-sign  dark:text-gray-300 w-6"></i>
              <span class="ml-2 dark:text-gray-300">Price: ${{ course?.price }}</span>
            </div>
          </div>
        </div>

        <!-- Instructor Info -->
        <div class="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Instructor</h2>
          <div v-if="course?.instructor" class="flex items-center">
            <img 
              :src="'https://ui-avatars.com/api/?name=' + (typeof course.instructor === 'object' && course.instructor !== null ? course.instructor.name : (typeof course.instructor === 'string' ? course.instructor : 'Unknown')) + '&size=128'" 
              :alt="typeof course.instructor === 'object' && course.instructor !== null ? course.instructor.name : (typeof course.instructor === 'string' ? course.instructor : 'Unknown')"
              class="h-12 w-12 rounded-full">
            <div class="ml-4">
              <h3 class="text-lg font-medium text-gray-900 dark:text-white">Instructor</h3>
              <p class="text-sm text-gray-500 dark:text-gray-300">ID: {{ typeof course.instructor === 'object' && course.instructor !== null ? course.instructor.name : course.instructor || 'Unknown' }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Material {
  _id: string;
  title: string;
  type: 'video' | 'document' | 'quiz';
  content: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

interface Course {
  _id: string;
  title: string;
  description: string;
  thumbnail: string;
  instructor: string | { name: string }; // This is just the ID based on the API response
  materials: Material[];
  category: string;
  duration: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  price: number;
  isPublished: boolean;
  enrolledStudents: string[];
  purchases: any[];
  createdAt: string;
  updatedAt: string;
  slug: string;
  __v: number;
  id: string;
}

interface ApiResponse {
  success: boolean;
  status: string;
  course: Course;
}

const route = useRoute();
const { data, pending, error } = await useFetch<ApiResponse>(`http://localhost:5000/api/courses/${route.params.id}`, {
  key: route.params.id as string
});

const course = computed(() => data.value?.course);
</script>

<style scoped>
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>