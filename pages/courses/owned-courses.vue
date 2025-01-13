
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
    <div v-if="courseStore.loading" class="flex justify-center items-center py-8">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
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
            :src="course.image" 
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
            <button
              v-if="user?.role === 'instructor' && course.instructor._id === user._id"
              @click="handleDeleteCourse(course._id)"
              class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600"
            >
              Delete Course
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useCourseStore } from '../../stores/course'
import { useAuthStore } from '../../stores/auth'

const courseStore = useCourseStore()
const authStore = useAuthStore()
const user = computed(() => authStore.user)

const searchQuery = ref('')
const selectedLevel = ref('')
const selectedCategory = ref('')
const isGridView = ref(true)

const uniqueCategories = computed(() => {
  const categories = courseStore.courses.map(course => course.category)
  return [...new Set(categories)].filter(Boolean)
})

const filteredCourses = computed(() => {
  return courseStore.courses
    .filter(course => {
      // Only show courses where the user is enrolled
      if (!course.enrolledStudents?.some(student => student._id === user.value?._id)) {
        return false
      }

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

async function handleDeleteCourse(courseId: string) {
  if (!confirm('Are you sure you want to delete this course? This action cannot be undone.')) {
    return
  }
  
  try {
    await courseStore.deleteCourse(courseId)
    await courseStore.fetchMyCourses() // Refresh the courses list
  } catch (error: unknown) {
    alert((error as Error).message || 'Failed to delete course')
  }
}

onMounted(async () => {
  await courseStore.fetchMyCourses()
})
</script>