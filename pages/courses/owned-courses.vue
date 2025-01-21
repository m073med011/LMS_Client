<template>
  <div class="container mx-auto px-4 py-8 dark:bg-gray-900 dark:text-gray-100">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold">My Courses</h1>
    </div>

    <!-- Search and Filters -->
    <div class="flex flex-wrap items-center gap-4 mb-8">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search my courses..."
        class="w-full md:w-1/3 px-4 py-2 border rounded dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
      />

      <select
        v-model="selectedLevel"
        class="px-4 py-2 border rounded dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
      >
        <option value="">All Levels</option>
        <option value="beginner">Beginner</option>
        <option value="intermediate">Intermediate</option>
        <option value="advanced">Advanced</option>
      </select>

      <select
        v-model="selectedCategory"
        class="px-4 py-2 border rounded dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
      >
        <option value="">All Categories</option>
        <option v-for="category in uniqueCategories" :key="category" :value="category">
          {{ category }}
        </option>
      </select>

      <button
        @click="toggleViewMode"
        class="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
      >
        Toggle {{ isGridView ? 'List' : 'Grid' }} View
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center py-8">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>

    <!-- Error Message -->
    <div v-else-if="error" class="text-center py-8">
      <p class="text-xl text-gray-600 dark:text-gray-400">{{ error }}</p>
    </div>

    <!-- No Courses Message -->
    <div v-else-if="!filteredCourses.length" class="text-center py-8">
      <p class="text-xl text-gray-600 dark:text-gray-400">You haven't purchased any courses yet.</p>
      <NuxtLink
        to="/courses"
        class="inline-block mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
      >
        Browse Courses
      </NuxtLink>
    </div>

    <!-- Course Grid -->
    <div
      v-else
      :class="{
        'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6': isGridView,
        'space-y-4': !isGridView
      }"
    >
      <div
        v-for="course in filteredCourses"
        :key="course._id"
        class="bg-white rounded-lg shadow-md overflow-hidden dark:bg-gray-800 dark:shadow-none"
      >
        <div class="relative">
          <img 
            :src="course.thumbnail" 
            :alt="course.title"
            class="w-full h-48 object-cover"
            @error="e => (e.target as HTMLImageElement).src = 'https://placehold.co/600x400'"
          />
          <div class="absolute top-2 right-2">
            <span
              :class="{
                'bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-200': course.level === 'beginner',
                'bg-yellow-100 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-200': course.level === 'intermediate',
                'bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-200': course.level === 'advanced'
              }"
              class="px-2 py-1 rounded text-sm"
            >
              {{ course.level }}
            </span>
          </div>
        </div>
        <div class="p-6">
          <div class="flex justify-between items-start mb-4">
            <h2 class="text-xl font-semibold">{{ course.title }}</h2>
          </div>
          <p class="text-gray-600 dark:text-gray-400 mb-4">{{ course.description }}</p>
          
          <div class="flex flex-wrap gap-2 mb-4">
            <span class="px-2 py-1 bg-blue-100 text-blue-800 rounded dark:bg-blue-900 dark:text-blue-200">
              {{ course.category }}
            </span>
            <span class="px-2 py-1 bg-purple-100 text-purple-800 rounded dark:bg-purple-900 dark:text-purple-200">
              {{ course.duration }} hours
            </span>
          </div>

          <div class="flex justify-between items-center">
            <div class="flex items-center">
              <span class="text-yellow-500">★</span>
              <span class="ml-1">{{ course.rating || 'N/A' }}</span>
            </div>
            
            <NuxtLink
              :to="`/courses/${course._id}`"
              class="bg-blue-600 dark:text-white px-4 py-2 rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              Continue Learning
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'

interface Instructor {
  _id: string;
  name: string;
  email: string;
}

interface Course {
  _id: string;
  title: string;
  description: string;
  thumbnail: string;
  level: string;
  category: string;
  duration: number;
  price: number;
  instructor: Instructor;
  rating?: number;
}

const courses = ref<Course[]>([])
const loading = ref(false)
const error = ref<string | null>(null)
const searchQuery = ref('')
const selectedLevel = ref('')
const selectedCategory = ref('')
const isGridView = ref(true)

const uniqueCategories = computed(() => {
  const categories = courses.value.map(course => course.category)
  return [...new Set(categories)].filter(Boolean)
})

const filteredCourses = computed(() => {
  return courses.value.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesLevel = !selectedLevel.value || course.level === selectedLevel.value
    const matchesCategory = !selectedCategory.value || course.category === selectedCategory.value
    
    return matchesSearch && matchesLevel && matchesCategory
  })
})

function toggleViewMode() {
  isGridView.value = !isGridView.value
}

async function fetchMyCourses() {
  loading.value = true
  error.value = null
  
  try {
    const response = await fetch('http://localhost:5000/api/courses/student/my-courses', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      }
    })
    const data = await response.json()
    
    if (data.success) {
      courses.value = data.courses
    } else {
      throw new Error(data.message)
    }
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to fetch courses'
    console.error('Error fetching courses:', err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchMyCourses()
})
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