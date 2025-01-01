<template>
  <div>
    <!-- Hero Section -->
    <section class="py-2 px-5">
      <div class="container mx-auto grid md:grid-cols-2 items-center">
        <div>
          <h1 class="text-4xl md:text-5xl  mb-5">Grow your skills,</h1>
          <h1 class="text-4xl md:text-4xl  mb-5"> Build your <span class="text-blue-500">future</span></h1>
          <p class="text-lg md:text-xl mb-6">
            We collaborate to ensure every student achieves academic, social, and
            emotional success through innovative learning tools.
          </p>
          <div class="flex gap-4">
            <nuxt-link
              to="/register"
              class="bg-blue-500 text-white hover:bg-blue-100 font-medium py-3 px-6 rounded shadow-md transition"
            >
              Get Started
            </nuxt-link>
            <nuxt-link
              to="/watch-video"
              class="bg-transparent border border-blue-500 hover:bg-blue-500 hover:text-white font-medium py-3 px-6 rounded transition"
            >
              Watch Video
            </nuxt-link>
          </div>
        </div>
        <div class="relative flex justify-end">
          <img src="../assets/image/caracter.png" alt="Hero Image" class="rounded-lg shadow-lg w-full max-w-md" />
          <div class="absolute bottom-4 right-4 bg-white text-blue-500 p-4 rounded shadow-lg">
            <p class="font-bold text-lg">123K+ Active Students</p>
            <p>270+ Instructors</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section class="py-16 px-5 bg-gray-100">
      <div class="container mx-auto text-center">
        <h2 class="text-3xl font-bold mb-6">Our Best Services</h2>
        <p class="text-lg mb-8">Discover the features that make our platform stand out.</p>
        <div class="grid md:grid-cols-4 gap-8">
          <div class="p-6 bg-white shadow-lg rounded-lg text-center">
            <div class="mb-4 text-blue-500">
              <i class="fas fa-chalkboard-teacher text-4xl"></i>
            </div>
            <h3 class="text-xl font-semibold mb-2">Expert Instructor</h3>
            <p>Learn from industry-leading professionals.</p>
          </div>
          <div class="p-6 bg-white shadow-lg rounded-lg text-center">
            <div class="mb-4 text-yellow-500">
              <i class="fas fa-headset text-4xl"></i>
            </div>
            <h3 class="text-xl font-semibold mb-2">24/7 Support</h3>
            <p>Get help whenever you need it with our round-the-clock support.</p>
          </div>
          <div class="p-6 bg-white shadow-lg rounded-lg text-center">
            <div class="mb-4 text-green-500">
              <i class="fas fa-infinity text-4xl"></i>
            </div>
            <h3 class="text-xl font-semibold mb-2">Lifetime Access</h3>
            <p>Access your courses anytime, anywhere.</p>
          </div>
          <div class="p-6 bg-white shadow-lg rounded-lg text-center">
            <div class="mb-4 text-red-500">
              <i class="fas fa-mobile-alt text-4xl"></i>
            </div>
            <h3 class="text-xl font-semibold mb-2">Learn Anywhere</h3>
            <p>Study on any device with our mobile-friendly platform.</p>
          </div>
        </div>
      </div>
    </section>

   
  </div>
</template>

<script setup>
// No additional script needed for this example
</script>

<style>
/* Custom styles if needed */
</style>
