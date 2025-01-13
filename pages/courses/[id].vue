<template>
  <div class="container mx-auto px-4 py-8 dark:bg-gray-900 dark:text-gray-100">
    <!-- Loading State -->
    <div v-if="courseStore.loading" class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400"></div>
    </div>

    <!-- Error State -->
    <div v-else-if="courseStore.error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded dark:bg-red-900 dark:border-red-700 dark:text-red-200">
      {{ courseStore.error }}
    </div>

    <!-- Course Content -->
    <template v-else-if="course">
      <div class="flex justify-between items-start mb-8">
        <div>
          <h1 class="text-4xl font-bold mb-2 dark:text-white">{{ course.title }}</h1>
          <p class="text-gray-600 dark:text-gray-300">{{ course.description }}</p>
        </div>
        <div class="flex gap-4">
          <template v-if="user?.role === 'instructor' && course.instructor._id === user._id">
            <NuxtLink
              :to="'/courses/' + course._id + '/edit'"
              class="bg-blue-600 dark:text-white px-4 py-2 rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              Edit Course
            </NuxtLink>
            <button
              @click="handleDeleteCourse"
              class="bg-red-600 dark:text-white px-4 py-2 rounded hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600"
            >
              Delete Course
            </button>
          </template>
          <template v-else-if="user?.role === 'student'">
            
          </template>
        </div>
      </div>

      <!-- Course Info -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div class="bg-white p-6 rounded-lg shadow dark:bg-gray-800 dark:shadow-none">
          <h3 class="font-semibold mb-2 dark:text-white">Instructor</h3>
          <div class="flex items-center">
            <img
              :src="'https://ui-avatars.com/api/?name=' + encodeURIComponent(course.instructor.name)"
              :alt="course.instructor.name"
              class="w-10 h-10 rounded-full mr-3"
            />
            <div>
              <p class="font-medium dark:text-white">{{ course.instructor.name }}</p>
              <p class="text-sm text-gray-600 dark:text-gray-300">{{ course.instructor.email }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white p-6 rounded-lg shadow dark:bg-gray-800 dark:shadow-none">
          <h3 class="font-semibold mb-2 dark:text-white">Course Details</h3>
          <div class="space-y-2">
            <p><span class="text-gray-600 dark:text-gray-400">Category:</span> <span class="dark:text-gray-200">{{ course.category }}</span></p>
            <p><span class="text-gray-600 dark:text-gray-400">Duration:</span> <span class="dark:text-gray-200">{{ course.duration }} hours</span></p>
            <p><span class="text-gray-600 dark:text-gray-400">Level:</span> <span class="dark:text-gray-200">{{ course.level }}</span></p>
          </div>
        </div>

        <div class="bg-white p-6 rounded-lg shadow dark:bg-gray-800 dark:shadow-none">
          <h3 class="font-semibold mb-2 dark:text-white">Enrollment</h3>
          <p><span class="text-gray-600 dark:text-gray-400">Students:</span> <span class="dark:text-gray-200">{{ course.enrolledStudents.length }}</span></p>
          <p><span class="text-gray-600 dark:text-gray-400">Status:</span> 
            <span :class="course.isPublished ? 'text-green-600 dark:text-green-400' : 'text-yellow-600 dark:text-yellow-400'">
              {{ course.isPublished ? 'Published' : 'Draft' }}
            </span>
          </p>
        </div>
      </div>

      <!-- Course Materials -->
      <div class="bg-white rounded-lg shadow p-6 dark:bg-gray-800 dark:shadow-none">
        <h2 class="text-2xl font-bold mb-6 dark:text-white">Course Materials</h2>
        <div class="space-y-4">
          <div
            v-for="material in course.materials"
            :key="material._id"
            class="flex items-center justify-between p-4 border rounded hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700"
          >
            <div class="flex items-center">
              <span
                class="mr-4"
                :class="{
                  'text-blue-500 dark:text-blue-400': material.type === 'video',
                  'text-green-500 dark:text-green-400': material.type === 'document',
                  'text-purple-500 dark:text-purple-400': material.type === 'quiz'
                }"
              >
                <i v-if="material.type === 'video'" class="fas fa-video"></i>
                <i v-else-if="material.type === 'document'" class="fas fa-file-alt"></i>
                <i v-else class="fas fa-question-circle"></i>
              </span>
              <div>
                <h3 class="font-medium dark:text-white">{{ material.title }}</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400">{{ material.type }}</p>
              </div>
            </div>
            <a
              v-if="isEnrolled || course.instructor._id === user?._id"
              :href="material.content"
              target="_blank"
              class="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Access Material
            </a>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCourseStore } from '~/stores/course'
import { useAuthStore } from '~/stores/auth'

const route = useRoute()
const router = useRouter()
const courseStore = useCourseStore()
const authStore = useAuthStore()

const courseId = computed(() => route.params.id as string)
const course = computed(() => courseStore.currentCourse)
const user = computed(() => authStore.user)
const isEnrolled = computed(() => {
  if (!user.value || !course.value) return false
  return course.value.enrolledStudents.some(student => student._id === user.value?._id)
})

onMounted(async () => {
  await courseStore.fetchCourse(courseId.value)
})

const handleDeleteCourse = async () => {
  if (confirm('Are you sure you want to delete this course? This action cannot be undone.')) {
    try {
      await courseStore.deleteCourse(courseId.value)
      router.push('/courses')
    } catch (error) {
      // Error is already handled in the store
    }
  }
}
</script>
