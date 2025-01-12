<template>
    <div class="w-[800px] relative flex items-center border border-gray-300 rounded-md bg-white shadow-sm">
      <!-- ช่องค้นหา -->
      <input
        type="text"
        placeholder="ค้นหา"
        class="p-2 w-full rounded-md outline-none text-sm text-gray-600"
      />
      <!-- ไอคอน -->
      <button class="absolute right-2">
        <svg
          class="w-5 h-5 text-gray-600 cursor-pointer"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 10-14 0 7 7 0 0014 0z"
          />
        </svg>
      </button>
    </div>
  </template>
  
  <script setup lang="ts">
  definePageMeta({
    layout: "auth",
  });
  </script>
  
  <style scoped>
  /* Optional: Add some margin or padding */
  </style>
  