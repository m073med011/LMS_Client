<template>
  <div class="container mx-auto px-4 py-8 dark:bg-gray-900 dark:text-gray-100">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold">Available Courses</h1>
    </div>

    <!-- Search and Filters -->
    <div class="flex flex-wrap items-center gap-4 mb-8">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search courses..."
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

      <NuxtLink
        v-if="user?.role !== 'student'"
        to="/courses/create"
        class="bg-blue-600 py-2 px-7 rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 border dark:border-gray-700"
      >
        Create Course
      </NuxtLink>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded dark:bg-red-700 dark:border-red-600 dark:text-red-100">
      {{ error }}
    </div>

    <!-- Course List/Grid -->
    <div
      :class="{
        'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6': isGridView,
        'space-y-6': !isGridView
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
            @error="handleImageError"
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

          <p class="text-gray-600 dark:text-gray-300 mb-4">{{ course.description }}</p>

          <div class="flex items-center mb-4">
            <img
              :src="'https://ui-avatars.com/api/?name=' + encodeURIComponent(course.instructor.name)"
              :alt="course.instructor.name"
              class="w-8 h-8 rounded-full mr-2"
            />
            <span class="text-sm text-gray-600 dark:text-gray-400">{{ course.instructor.name }}</span>
          </div>

          <div class="flex items-center justify-between text-sm text-gray-600 mb-4 dark:text-gray-400">
            <span>{{ course.duration }} hours</span>
            <span>{{ course.price }}$</span>
          </div>

          <div class="flex justify-between items-center">
            <NuxtLink
              :to="'./courses/' + course._id"
              class="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-500"
            >
              View Details
            </NuxtLink>
            <button
              v-if="!isEnrolled(course)"
              @click="buyCourse(course._id)"
              class="bg-blue-600 dark:text-white px-4 py-2 rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
              :disabled="loading"
            >
              Enroll Now
              <span v-if="course.price > 0" class="ml-1">${{ course.price }}</span>
              <span v-else class="ml-1">Free</span>
            </button>
            <span
              v-else-if="user?.role === 'student' && isEnrolled(course)"
              class="text-green-600 dark:text-green-400 px-4 py-2"
            >
              ✓ Enrolled
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'

interface Instructor {
  _id: string
  name: string
  email: string
}

interface Student {
  _id: string
  name: string
  email: string
}

interface Course {
  _id: string
  title: string
  description: string
  slug: string
  price: number
  duration: number
  level: 'beginner' | 'intermediate' | 'advanced'
  category: string
  thumbnail: string
  instructor: Instructor
  enrolledStudents?: Student[]
  isPublished: boolean
  createdAt: string
  updatedAt: string
}

interface User {
  _id: string
  name: string
  email: string
  role: 'student' | 'instructor' | 'admin'
}

interface ApiResponse<T> {
  success: boolean
  message?: string
  courses?: T[]
  user?: T
}

const courses = ref<Course[]>([])
const loading = ref<boolean>(false)
const error = ref<string>('')
const user = ref<User | null>(null)
const searchQuery = ref<string>('')
const selectedLevel = ref<string>('')
const selectedCategory = ref<string>('')
const isGridView = ref<boolean>(true)

const filteredCourses = computed<Course[]>(() => {
  return courses.value.filter(course => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesLevel = selectedLevel.value ? course.level === selectedLevel.value : true
    const matchesCategory = selectedCategory.value ? course.category === selectedCategory.value : true
    return matchesSearch && matchesLevel && matchesCategory
  })
})

const uniqueCategories = computed<string[]>(() => {
  return [...new Set(courses.value.map(course => course.category))]
})

const toggleViewMode = (): void => {
  isGridView.value = !isGridView.value
}

onMounted(async () => {
  await fetchCourses()
  await fetchCurrentUser()
})

async function fetchCourses(): Promise<void> {
  try {
    loading.value = true
    error.value = ''
    const response = await fetch('http://localhost:5000/api/courses', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    const data: ApiResponse<Course> = await response.json()
    if (data.success && data.courses) {
      courses.value = data.courses
    } else {
      throw new Error(data.message || 'Failed to fetch courses')
    }
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'An error occurred while fetching courses'
  } finally {
    loading.value = false
  }
}

async function fetchCurrentUser(): Promise<void> {
  try {
    const token = localStorage.getItem('token')
    if (!token) return

    const response = await fetch('http://localhost:5000/api/users/me', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    const data: ApiResponse<User> = await response.json()
    if (data.success && data.user) {
      user.value = data.user
    }
  } catch (err) {
    console.error('Failed to fetch user:', err instanceof Error ? err.message : 'Unknown error')
  }
}

async function buyCourse(courseId: string): Promise<void> {
  try {
    const response = await fetch(`http://localhost:5000/api/courses/${courseId}/buy`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      }
    })
    const data: ApiResponse<null> = await response.json()
    if (data.success) {
      await fetchCourses() // Refresh the course list
      alert('Successfully enrolled! You can now access the course from My Courses.')
    } else {
      throw new Error(data.message)
    }
  } catch (error) {
    alert(error instanceof Error ? error.message : 'Failed to enroll in course')
  }
}

function isEnrolled(course: Course): boolean {
  return course.enrolledStudents?.some(student => student._id === user.value?._id) || false
}

function handleImageError(e: Event): void {
  const target = e.target as HTMLImageElement
  target.src = 'https://placehold.co/600x400'
}
</script>
