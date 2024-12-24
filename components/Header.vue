<template>
  <div>
    <div class="h-[60px] pt-[5px] border-2 border-white border-b-black">
      <div class="flex items-center">
        <!-- Logo -->
        <NuxtLink to="/" class="pl-[30px]">
          <img class="w-[150px]" src="/images/logo.ico" alt="Logo" />
        </NuxtLink>

        <div class="flex justify-between w-full">
          <div class="flex items-center fonsubtheader mt-3">
            <div class="mx-4">
              <NuxtLink to="/product">สินค้าทั้งหมด</NuxtLink>
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
                  <NuxtLink
                    to="/category/accessorie"
                    class="block px-4 py-2 hover:bg-gray-100"
                  >
                    อุปกรณ์เสริม
                  </NuxtLink>
                </ul>
              </div>
            </div>
          </div>
          <!-- icon -->
          <div class="flex items-center mt-3 gap-10 mx-5 ">
            <div>
              <!-- search -->
              <img
                class="icons"
                src="https://cdn-icons-png.flaticon.com/256/152/152536.png"
              />
            </div>

            <div>
              <!-- shopping cart -->
              <img
                class="icons"
                src="https://cdn-icons-png.flaticon.com/256/88/88032.png"
              />
            </div>
            <div>
              <!-- fav -->
              <img
                class="icons"
                src="https://cdn-icons-png.flaticon.com/256/157/157990.png"
              />
            </div>
            <div>
              <!-- notification -->
              <img
                class="icons"
                src="https://cdn-icons-png.flaticon.com/256/388/388652.png"
              />
            </div>
            <div>
              <!-- user -->
              <img
                class="icons"
                src="https://cdn-icons-png.flaticon.com/256/268/268441.png"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Page } from "~/models/page.model";

const page = ref<Page[]>([
  {
    name: "สินค้าทั้งหมด",
    path: "/product",
    active: false,
  },
  {
    name: "หมวดหมู่ ",
    path: "/category",
    active: false,
  },
  {
    name: "ติดต่อเรา",
    path: "/contact",
    active: false,
  },
]);
</script>

<style scoped>
.dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px;
  min-width: 150px;
  z-index: 10;
}

.dropdown-item {
  padding: 8px 12px;
  display: block;
  color: #333;
}

.dropdown-item:hover {
  background-color: #f0f0f0;
}

.group:hover .group-hover\:block {
  display: block;
}
</style>
