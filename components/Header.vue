<template>
  <div>
    <div class="h-[60px] pt-[5px] border-2 border-white border-b-black">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <NuxtLink to="/" class="pl-[30px]">
          <img class="w-[150px]" src="/images/logo.ico" alt="Logo" />
        </NuxtLink>

        <!-- Navigation and Icons -->
        <div class="flex items-center justify-between w-full">
          <!-- Navigation Menu -->
          <div class="hidden md:flex items-center fonsubtheader mt-3">
            <div class="mx-4">
              <NuxtLink to="/product" class="hover:underline">สินค้าทั้งหมด</NuxtLink>
            </div>
            <!-- Dropdown -->
            <div class="relative group">
              <button class="flex items-center" type="button">
                <p>หมวดหมู่สินค้า</p>
                <svg
                  class="w-2.5 h-2.5 ml-1.5"
                  aria-hidden="true"
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
                class="absolute bg-white rounded-lg border-2 shadow w-44 hidden group-hover:block"
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

          <!-- Icons -->
          <div class="flex items-center gap-4 md:gap-6 mt-3 mx-3 md:mx-5">
            <img
              class="icons w-6 md:w-8"
              src="https://cdn-icons-png.flaticon.com/256/152/152536.png"
              alt="Search"
            />
            <img
              class="icons w-6 md:w-8"
              src="https://cdn-icons-png.flaticon.com/256/88/88032.png"
              alt="Shopping Cart"
            />
            <img
              class="icons w-6 md:w-8"
              src="https://cdn-icons-png.flaticon.com/256/157/157990.png"
              alt="Favorites"
            />
            <img
              class="icons w-6 md:w-8"
              src="https://cdn-icons-png.flaticon.com/256/388/388652.png"
              alt="Notifications"
            />
            <img
              class="icons w-6 md:w-8"
              src="https://cdn-icons-png.flaticon.com/256/268/268441.png"
              alt="User"
            />
          </div>

          <!-- Mobile Menu -->
          <button
            class="block md:hidden text-black hover:text-gray-700 focus:outline-none"
            @click="toggleMobileMenu"
          >
            <svg
              class="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Dropdown Menu -->
      <div
        v-if="mobileMenuOpen"
        class="md:hidden bg-white border-t border-gray-200 py-2"
      >
        <ul>
          <li class="px-4 py-2">
            <NuxtLink to="/product" class="block text-black hover:underline">
              สินค้าทั้งหมด
            </NuxtLink>
          </li>
          <li class="px-4 py-2">
            <NuxtLink to="/category" class="block text-black hover:underline">
              หมวดหมู่สินค้า
            </NuxtLink>
          </li>
          <li class="px-4 py-2">
            <NuxtLink to="/contact" class="block text-black hover:underline">
              ติดต่อเรา
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const mobileMenuOpen = ref(false);

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
};
</script>

<style scoped>
.icons {
  transition: transform 0.2s;
}
.icons:hover {
  transform: scale(1.1);
}
</style>
