<template>
  <div class="mt-10 flex items-center justify-center bg-gray-100">
    <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md">
      <h2 class="text-2xl font-bold mb-4 text-center">Register</h2>
      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label for="name" class="block text-gray-700 text-sm font-bold mb-2">Name</label>
          <input
            type="text"
            id="name"
            v-model="form.name"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your name"
          />
          <div v-if="!form.name && submitted" class="text-red-500 text-sm">Name is required</div>
        </div>

        <div class="mb-4">
          <label for="email" class="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input
            type="email"
            id="email"
            v-model="form.email"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your email"
          />
          <div v-if="!form.email && submitted" class="text-red-500 text-sm">Email is required</div>
        </div>

        <div class="mb-4">
          <label for="password" class="block text-gray-700 text-sm font-bold mb-2">Password</label>
          <input
            type="password"
            id="password"
            v-model="form.password"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your password"
          />
          <div v-if="!form.password && submitted" class="text-red-500 text-sm">Password is required</div>
        </div>

        <div class="mb-4">
          <label for="phone" class="block text-gray-700 text-sm font-bold mb-2">Phone Number</label>
          <input
            type="tel"
            id="phone"
            v-model="form.phone"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your phone number"
          />
          <div v-if="!form.phone && submitted" class="text-red-500 text-sm">Phone number is required</div>
        </div>

        <div v-if="authStore.error" class="mb-4 text-red-500 text-sm">{{ authStore.error }}</div>

        <div class="flex items-center justify-between">
          <button
            type="submit"
            :disabled="isSubmitting"
            class="w-full h-9 hover:bg-blue-600 dark:hover:bg-blue-700 dark:text-white rounded-sm border dark:border-gray-600"
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
