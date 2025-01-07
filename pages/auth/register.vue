<template>
  <div class=" flex items-center justify-center  dark:bg-gray-900 min-h-screen">
    <div class="bg-white dark:bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md">
      <h2 class="text-2xl font-bold mb-4 text-center text-gray-900 dark:text-gray-100">Register</h2>
      <form @submit.prevent="handleSubmit">
        <!-- Name Field -->
        <div class="mb-4">
          <label for="name" class="block  dark:text-gray-300 text-sm font-bold mb-2">Name</label>
          <input
            type="text"
            id="name"
            v-model="form.name"
            class="shadow-sm w-full py-2 px-3  dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your name"
          />
          <div v-if="!form.name && submitted" class="text-red-500 text-sm">Name is required</div>
        </div>

        <!-- Email Field -->
        <div class="mb-4">
          <label for="email" class="block  dark:text-gray-300 text-sm font-bold mb-2">Email</label>
          <input
            type="email"
            id="email"
            v-model="form.email"
            class="shadow-sm w-full py-2 px-3  dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
          />
          <div v-if="!form.email && submitted" class="text-red-500 text-sm">Email is required</div>
        </div>

        <!-- Password Field -->
        <div class="mb-4">
          <label for="password" class="block  dark:text-gray-300 text-sm font-bold mb-2">Password</label>
          <input
            type="password"
            id="password"
            v-model="form.password"
            class="shadow-sm w-full py-2 px-3  dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
          />
          <div v-if="!form.password && submitted" class="text-red-500 text-sm">Password is required</div>
        </div>

        <div class="mb-4">
          <label for="role" class="block  dark:text-gray-300 text-sm font-bold mb-2">Role</label>
          <select
            id="role"
            v-model="form.role"
            class="shadow-sm w-full py-2 px-3  dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="student">student</option>
            <option value="freelancer">freelancer</option>
            <option value="organizer">organizer</option>
            <option value="instructor">instructor</option>
          </select>
        </div>

        <div class="mb-4">
          <label for="phone" class="block  dark:text-gray-300 text-sm font-bold mb-2">Phone Number</label>
          <input
            type="tel"
            id="phone"
            v-model="form.phone"
            class="shadow-sm w-full py-2 px-3  dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your phone number"
          />
          <div v-if="!form.phone && submitted" class="text-red-500 text-sm">Phone number is required</div>
        </div>

        <div v-if="authStore.error" class="mb-4 text-red-500 text-sm">{{ authStore.error }}</div>

        <div class="flex items-center justify-between">
          <button
            type="submit"
            :disabled="isSubmitting"
            class="w-full h-9  dark:text-white border rounded-sm shadow-sm  focus:ring-blue-500"
          >
            <span v-if="isSubmitting">Registering...</span>
            <span v-else>Register</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>


<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useAuthStore } from '../../stores/auth';
import { useRouter } from 'vue-router';

const form = reactive({
  name: '',
  email: '',
  password: '',
  phone: '',
  role: 'student'
});

const submitted = ref(false);
const isSubmitting = ref(false);

const authStore = useAuthStore();
const router = useRouter();

const handleSubmit = async () => {
  submitted.value = true;

  if (!form.name || !form.email || !form.password || !form.phone) {
    return;
  }

  isSubmitting.value = true;
  try {
    const result = await authStore.register(
      form.name, 
      form.email, 
      form.password,
      form.phone,
      form.role,
    );
    
    if (result.success) {
      router.push('/dashboard');
    }
  } catch (error) {
    console.error('Registration failed:', error);
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
/* Add custom styles here if needed */
</style>
