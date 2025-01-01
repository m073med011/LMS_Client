<template>
    <div class="p-4">
      <h1 class="text-2xl font-bold mb-4">Courses</h1>
  
      <!-- Search Bar -->
      <div class="mb-6">
        <input
          v-model="filter.search"
          type="text"
          placeholder="Search for courses..."
          class="border rounded w-full px-4 py-2"
        />
      </div>
  
      <!-- Filters Section -->
      <div class="flex flex-wrap gap-4 mb-6">
        <!-- Category Filter -->
        <select v-model="filter.category" class="border rounded px-3 py-2">
          <option value="">All Categories</option>
          <option value="programming">Programming</option>
          <option value="design">Design</option>
          <option value="marketing">Marketing</option>
        </select>
  
        <!-- Rating Filter -->
        <select v-model="filter.rating" class="border rounded px-3 py-2">
          <option value="">All Ratings</option>
          <option value="4">4 stars & up</option>
          <option value="3">3 stars & up</option>
          <option value="2">2 stars & up</option>
          <option value="1">1 star & up</option>
        </select>
  
        <!-- Sorting -->
        <select v-model="filter.sort" class="border rounded px-3 py-2">
          <option value="">Sort By</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Rating</option>
        </select>
      </div>
  
      <!-- View Controller -->
      <div class="flex justify-between items-center mb-4">
        <span>Showing {{ filteredCourses.length }} of {{ courses.length }} courses</span>
        <div>
          <button @click="setView('grid')" :class="{ 'bg-gray-200': view === 'grid' }" class="px-4 py-2 rounded">
            Grid
          </button>
          <button @click="setView('list')" :class="{ 'bg-gray-200': view === 'list' }" class="px-4 py-2 rounded">
            List
          </button>
        </div>
      </div>
  
      <!-- Courses Section -->
      <div :class="view === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4' : 'flex flex-col gap-4'">
        <div
          v-for="course in filteredCourses"
          :key="course.id"
          class="border rounded p-4 flex items-center gap-4"
        >
          <!-- Image -->
          <img
            :src="course.image"
            alt="Course Image"
            class="w-12 h-12 object-contain rounded"
          />
          <!-- Course Details -->
          <div>
            <h2 class="text-lg font-semibold">{{ course.title }}</h2>
            <p class="text-sm text-gray-500">{{ course.category }}</p>
            <p class="text-sm text-gray-500">Rating: {{ course.rating }} stars</p>
            <p class="text-sm font-bold text-gray-700">${{ course.price }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { ref, computed } from 'vue';
  
  export default {
    setup() {
      const view = ref('grid');
      const courses = ref([
        {
          id: 1,
          title: 'JavaScript Basics',
          category: 'programming',
          price: 20,
          rating: 4.5,
          image: 'https://via.placeholder.com/150',
          description: 'Learn the basics of JavaScript programming.',
        },
        {
          id: 2,
          title: 'Advanced CSS',
          category: 'design',
          price: 30,
          rating: 3.0,
          image: 'https://via.placeholder.com/150',
          description: 'Master advanced CSS techniques.',
        },
        {
          id: 3,
          title: 'Digital Marketing',
          category: 'marketing',
          price: 25,
          rating: 2.8,
          image: 'https://via.placeholder.com/150',
          description: 'Learn the fundamentals of digital marketing.',
        },
        {
          id: 4,
          title: 'Vue.js Mastery',
          category: 'programming',
          price: 40,
          rating: 1.9,
          image: 'https://via.placeholder.com/150',
          description: 'Become a Vue.js expert with this course.',
        },
      ]);
  
      const filter = ref({
        search: '',
        category: '',
        rating: '',
        sort: '',
      });
  
      const filteredCourses = computed(() => {
        let result = courses.value;
  
        // Filter by search
        if (filter.value.search) {
          const searchQuery = filter.value.search.toLowerCase();
          result = result.filter(
            (course) =>
              course.title.toLowerCase().includes(searchQuery) ||
              course.description.toLowerCase().includes(searchQuery)
          );
        }
  
        // Filter by category
        if (filter.value.category) {
          result = result.filter((course) => course.category === filter.value.category);
        }
  
        // Filter by rating
        if (filter.value.rating) {
          result = result.filter((course) => course.rating >= parseFloat(filter.value.rating));
        }
  
        // Sorting
        if (filter.value.sort === 'price-asc') {
          result = result.sort((a, b) => a.price - b.price);
        } else if (filter.value.sort === 'price-desc') {
          result = result.sort((a, b) => b.price - a.price);
        } else if (filter.value.sort === 'rating') {
          result = result.sort((a, b) => b.rating - a.rating);
        }
  
        return result;
      });
  
      const setView = (newView: string) => {
        view.value = newView;
      };
  
      return { view, courses, filter, filteredCourses, setView };
    },
  };
  </script>
  
  <style>
  /* Add any additional styles here */
  </style>
  