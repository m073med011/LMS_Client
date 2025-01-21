<template>
  <div class="create-course p-8 min-h-screen dark:bg-gray-900">
    <div class="max-w-2xl mx-auto">
      <h2 class="text-3xl font-bold mb-8 dark:text-white">Create New Course</h2>
      
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Title -->
        <div class="form-group">
          <label for="title" class="form-label">Title</label>
          <input
            type="text"
            id="title"
            v-model="courseData.title"
            class="form-input"
            :class="{ 'border-red-500': validationErrors.title }"
            maxlength="100"
            required
          />
          <span v-if="validationErrors.title" class="text-sm text-red-500">{{ validationErrors.title }}</span>
        </div>

        <!-- Description -->
        <div class="form-group">
          <label for="description" class="form-label">Description</label>
          <textarea
            id="description"
            v-model="courseData.description"
            rows="4"
            class="form-input"
            :class="{ 'border-red-500': validationErrors.description }"
            required
          ></textarea>
          <span v-if="validationErrors.description" class="text-sm text-red-500">{{ validationErrors.description }}</span>
        </div>

        <!-- Category -->
        <div class="form-group">
          <label for="category" class="form-label">Category</label>
          <select
            id="category"
            v-model="courseData.category"
            class="form-select"
            :class="{ 'border-red-500': validationErrors.category }"
            required
          >
            <option value="">Select a category</option>
            <option v-for="category in categories" :key="category" :value="category">
              {{ category }}
            </option>
          </select>
          <span v-if="validationErrors.category" class="text-sm text-red-500">{{ validationErrors.category }}</span>
        </div>

        <!-- Price and Duration -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="form-group">
            <label for="price" class="form-label">Price</label>
            <div class="relative">
              <span class="absolute left-3 top-2 dark:text-gray-400">$</span>
              <input
                type="number"
                id="price"
                v-model="courseData.price"
                step="0.01"
                min="0"
                class="form-input pl-8"
                :class="{ 'border-red-500': validationErrors.price }"
                required
              />
            </div>
            <span v-if="validationErrors.price" class="text-sm text-red-500">{{ validationErrors.price }}</span>
          </div>

          <div class="form-group">
            <label for="duration" class="form-label">Duration (hours)</label>
            <input
              type="number"
              id="duration"
              v-model="courseData.duration"
              min="1"
              class="form-input"
              :class="{ 'border-red-500': validationErrors.duration }"
              required
            />
            <span v-if="validationErrors.duration" class="text-sm text-red-500">{{ validationErrors.duration }}</span>
          </div>
        </div>

        <!-- Level -->
        <div class="form-group">
          <label for="level" class="form-label">Level</label>
          <select
            id="level"
            v-model="courseData.level"
            class="form-select"
            :class="{ 'border-red-500': validationErrors.level }"
            required
          >
            <option value="">Select a level</option>
            <option v-for="level in levels" :key="level" :value="level">
              {{ level.charAt(0).toUpperCase() + level.slice(1) }}
            </option>
          </select>
          <span v-if="validationErrors.level" class="text-sm text-red-500">{{ validationErrors.level }}</span>
        </div>

        <!-- Thumbnail -->
        <div class="form-group">
          <label for="thumbnail" class="form-label">Thumbnail</label>
          <div class="flex items-center justify-center w-full">
            <label
              class="flex flex-col w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 dark:border-gray-600"
              :class="{'border-indigo-600': isDragging, 'border-red-500': validationErrors.thumbnail}"
              @dragenter.prevent="isDragging = true"
              @dragleave.prevent="isDragging = false"
              @dragover.prevent
              @drop.prevent="handleFileDrop"
            >
              <div class="flex flex-col items-center justify-center pt-5 pb-6">
                <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span class="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p class="text-xs text-gray-500 dark:text-gray-400">PNG, JPG or JPEG (MAX. 800x400px)</p>
              </div>
              <input
                type="file"
                id="thumbnail"
                @change="handleFileChange"
                accept="image/*"
                class="hidden"
                required
              />
            </label>
          </div>
          <div v-if="thumbnailPreview" class="mt-4">
            <img :src="thumbnailPreview" alt="Thumbnail preview" class="h-32 w-auto object-cover rounded-lg shadow-md" />
          </div>
          <span v-if="validationErrors.thumbnail" class="text-sm text-red-500">{{ validationErrors.thumbnail }}</span>
        </div>

        <!-- Publish Toggle -->
        <div class="form-group">
          <label class="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              v-model="courseData.isPublished"
              class="sr-only peer"
            />
            <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-offset-2 peer-focus:ring-indigo-500 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
            <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Publish immediately</span>
          </label>
        </div>

        <!-- Submit Buttons -->
        <div class="flex justify-end space-x-4">
          <button
            type="button"
            @click="navigateTo('/courses')"
            class="btn-secondary"
          >
            Cancel
          </button>
          <button
            type="submit"
            :disabled="isLoading"
            class="btn-primary"
          >
            <span v-if="isLoading" class="flex items-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Creating...
            </span>
            <span v-else>Create Course</span>
          </button>
        </div>

        <!-- Error Message -->
        <div v-if="error" class="p-4 bg-red-50 dark:bg-red-900/50 text-red-700 dark:text-red-200 rounded-lg">
          {{ error }}
        </div>
        <div v-if="success" class="p-4 bg-green-50 dark:bg-green-900/50 text-green-700 dark:text-green-200 rounded-lg">
          {{ success }}
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isLoading = ref(false)
const error = ref('')
const success = ref('')
const thumbnailPreview = ref('')
const isDragging = ref(false)

// Form validation
const validationErrors = reactive({
  title: '',
  description: '',
  category: '',
  price: '',
  duration: '',
  level: '',
  thumbnail: ''
})

// Constants
const categories = [
  'Programming',
  'Web Development',
  'Mobile Development',
  'Data Science',
  'Design',
  'Business',
  'Marketing',
  'Music',
  'Photography',
  'Other'
]

const levels = ['beginner', 'intermediate', 'advanced']

const courseData = reactive({
  title: '',
  description: '',
  category: '',
  price: '',
  duration: '',
  level: '',
  isPublished: false,
})

// Validation functions
const validateForm = () => {
  let isValid = true
  validationErrors.title = ''
  validationErrors.description = ''
  validationErrors.category = ''
  validationErrors.price = ''
  validationErrors.duration = ''
  validationErrors.level = ''
  validationErrors.thumbnail = ''

  // Title validation
  if (!courseData.title) {
    validationErrors.title = 'Title is required'
    isValid = false
  } else if (courseData.title.length > 100) {
    validationErrors.title = 'Title must be less than 100 characters'
    isValid = false
  }

  // Description validation
  if (!courseData.description) {
    validationErrors.description = 'Description is required'
    isValid = false
  }

  // Category validation
  if (!courseData.category) {
    validationErrors.category = 'Category is required'
    isValid = false
  }

  // Price validation
  if (!courseData.price) {
    validationErrors.price = 'Price is required'
    isValid = false
  } else if (parseFloat(courseData.price) < 0) {
    validationErrors.price = 'Price cannot be negative'
    isValid = false
  }

  // Duration validation
  if (!courseData.duration) {
    validationErrors.duration = 'Duration is required'
    isValid = false
  } else if (parseInt(courseData.duration) <= 0) {
    validationErrors.duration = 'Duration must be greater than 0'
    isValid = false
  }

  // Level validation
  if (!courseData.level) {
    validationErrors.level = 'Level is required'
    isValid = false
  }

  // Thumbnail validation
  if (!document.getElementById('thumbnail').files[0]) {
    validationErrors.thumbnail = 'Thumbnail is required'
    isValid = false
  }

  return isValid
}

const handleFileChange = (event) => {
  const file = event.target.files[0]
  handleFile(file)
}

const handleFileDrop = (event) => {
  isDragging.value = false
  const file = event.dataTransfer.files[0]
  handleFile(file)
}

const handleFile = (file) => {
  validationErrors.thumbnail = ''
  if (file && file.type.startsWith('image/')) {
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      validationErrors.thumbnail = 'Image size should be less than 5MB'
      return
    }
    thumbnailPreview.value = URL.createObjectURL(file)
  } else {
    validationErrors.thumbnail = 'Please upload a valid image file'
  }
}

const handleSubmit = async () => {
  try {
    if (!validateForm()) {
      error.value = 'Please fix the validation errors'
      return
    }

    isLoading.value = true
    error.value = ''

    const formData = new FormData()
    const thumbnailFile = document.getElementById('thumbnail').files[0]
    formData.append('thumbnail', thumbnailFile)
    
    // Append all course data
    Object.keys(courseData).forEach(key => {
      formData.append(key, courseData[key])
    })

    const response = await fetch('http://localhost:5000/api/courses/create', {
      method: 'POST',
      body: formData,
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      }
    })

    const data = await response.json()

    if (data.success) {
      success.value = 'Course created successfully!'
      // Wait for 2 seconds to show the success message before redirecting
      setTimeout(() => {
        router.push('/courses')
      }, 2000)
    } else {
      throw new Error(data.message || 'Failed to create course')
    }
  } catch (err) {
    error.value = err.response?.data?.message || err.message || 'An error occurred while creating the course'
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.form-group {
  @apply space-y-2;
}

.form-label {
  @apply block text-sm font-medium text-gray-700 dark:text-gray-200;
}

.form-input {
  @apply mt-1 block w-full rounded-lg border-gray-300 shadow-sm 
         focus:border-indigo-500 focus:ring-indigo-500
         dark:bg-gray-800 dark:border-gray-600 dark:text-white
         dark:focus:border-indigo-500;
}

.form-select {
  @apply mt-1 block w-full rounded-lg border-gray-300 shadow-sm 
         focus:border-indigo-500 focus:ring-indigo-500
         dark:bg-gray-800 dark:border-gray-600 dark:text-white
         dark:focus:border-indigo-500;
}

.btn-primary {
  @apply px-6 py-2.5 border border-transparent rounded-lg shadow-sm text-sm font-medium 
         text-white bg-indigo-600 hover:bg-indigo-700 
         focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 
         disabled:opacity-50 disabled:cursor-not-allowed
         dark:bg-indigo-500 dark:hover:bg-indigo-600
         dark:focus:ring-offset-gray-900;
}

.btn-secondary {
  @apply px-6 py-2.5 border border-gray-300 rounded-lg shadow-sm text-sm font-medium 
         text-gray-700 bg-white hover:bg-gray-50 
         focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
         dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200 
         dark:hover:bg-gray-700 dark:focus:ring-offset-gray-900;
}
</style>
