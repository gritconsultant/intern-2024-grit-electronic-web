<template>
  <div>
    <div>
      <div class="relative group">
        <button
          class="flex items-center text-black hover:text-indigo-500"
          type="button"
        >
          <p>หมวดหมู่สินค้า</p>
          <svg
            class="w-2.5 h-2.5 ml-1.5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 3"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>

        <!-- Dropdown Menu -->
        <div
          class="absolute bg-white rounded-lg border shadow w-44 hidden group-hover:block"
        >
          <ul class="py-2 text-sm text-gray-700">
            <li>
              <NuxtLink
                to="/category/computer"
                class="block px-4 py-2 hover:bg-gray-100"
              >
                คอมพิวเตอร์
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/category/laptop"
                class="block px-4 py-2 hover:bg-gray-100"
              >
                โน๊ตบุ๊ค
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/category/accessorie"
                class="block px-4 py-2 hover:bg-gray-100"
              >
                อุปกรณ์เสริม
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
