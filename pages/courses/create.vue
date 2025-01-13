<template>
  <div class="container mx-auto px-4 py-8 dark:bg-gray-900">
    <div class="max-w-3xl mx-auto">
      <h1 class="text-3xl font-bold mb-8 dark:text-white">Create New Course</h1>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Basic Information -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-4">
          <h2 class="text-xl font-semibold mb-4 dark:text-white">Basic Information</h2>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
            <input
              v-model="courseData.title"
              type="text"
              required
              class="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Enter course title"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
            <textarea
              v-model="courseData.description"
              required
              rows="4"
              class="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Enter course description"
            ></textarea>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
              <input
                v-model="courseData.category"
                type="text"
                required
                class="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="e.g., Web Development"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Duration (hours)</label>
              <input
                v-model.number="courseData.duration"
                type="number"
                required
                min="1"
                class="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Enter course duration"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Price ($)</label>
              <input
                v-model.number="courseData.price"
                type="number"
                required
                min="0"
                step="0.01"
                class="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Enter course price"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Level</label>
              <select
                v-model="courseData.level"
                required
                class="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            <div class="flex items-center">
              <label class="flex items-center">
                <input
                  v-model="courseData.isPublished"
                  type="checkbox"
                  class="rounded border-gray-300 text-blue-600 dark:border-gray-600 dark:bg-gray-700"
                />
                <span class="ml-2 dark:text-gray-300">Publish course immediately</span>
              </label>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Price</label>
            <input
              v-model.number="courseData.price"
              type="number"
              required
              min="0"
              class="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
        </div>

        <!-- Course Materials -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-semibold dark:text-white">Course Materials</h2>
            <button
              type="button"
              @click="addMaterial"
              class="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
            >
              + Add Material
            </button>
          </div>

          <div v-for="(material, index) in courseData.materials" :key="index" class="space-y-4 mb-6">
            <div class="flex justify-between items-center">
              <h3 class="font-medium dark:text-white">Material {{ index + 1 }}</h3>
              <button
                type="button"
                @click="removeMaterial(index)"
                class="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
              >
                Remove
              </button>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
                <input
                  v-model="material.title"
                  type="text"
                  required
                  class="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Material title"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Type</label>
                <select
                  v-model="material.type"
                  required
                  class="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="video">Video</option>
                  <option value="document">Document</option>
                  <option value="quiz">Quiz</option>
                </select>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Content URL</label>
              <input
                v-model="material.content"
                type="text"
                required
                class="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Enter content URL or quiz data"
              />
            </div>
          </div>
        </div>

        <!-- Submit Button -->
        <div class="flex justify-end">
          <button
            type="submit"
            class="bg-blue-600 dark:text-white px-6 py-2 rounded-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            Create Course
          </button>
        </div>
      </form>
      <p v-if="error" class="text-red-600 dark:text-red-400">{{ error }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCourseStore } from '~/stores/course'

interface Material {
  title: string
  type: 'video' | 'document' | 'quiz'
  content: string
  order: number
}

interface CourseData {
  title: string
  description: string
  category: string
  duration: number
  level: 'beginner' | 'intermediate' | 'advanced'
  isPublished: boolean
  price: number
  materials: Material[]
}

const router = useRouter()
const courseStore = useCourseStore()
const error = ref<string | null>(null)

const courseData = ref<CourseData>({
  title: '',
  description: '',
  category: '',
  duration: 1,
  level: 'beginner',
  isPublished: false,
  price: 9.99,
  materials: []
})

const addMaterial = () => {
  courseData.value.materials.push({
    title: '',
    type: 'video',
    content: '',
    order: courseData.value.materials.length
  })
}

const removeMaterial = (index: number) => {
  courseData.value.materials.splice(index, 1)
  // Update order of remaining materials
  courseData.value.materials.forEach((material, i) => {
    material.order = i
  })
}

const handleSubmit = async () => {
  try {
    error.value = null
    await courseStore.createCourse(courseData.value)
    router.push('/courses')
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to create course'
  }
}
</script>

<style scoped>
/* Add your scoped styles here if needed */
</style>
