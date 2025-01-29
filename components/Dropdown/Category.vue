<template>
  <div>
    <div>
      <div class="relative group">
        <button
          class="flex items-center text-black hover:text-[#EE973C]"
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
                to="/category/food"
                class="block px-4 py-2 hover:bg-gray-100"
              >
                อาหาร
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/category/drink"
                class="block px-4 py-2 hover:bg-gray-100"
              >
                เครื่องดื่ม
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/category/herbs"
                class="block px-4 py-2 hover:bg-gray-100"
              >
                ผลไม้
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/category/cloth"
                class="block px-4 py-2 hover:bg-gray-100"
              >
                ผ้าและเครื่องแต่งกาย
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/category/items"
                class="block px-4 py-2 hover:bg-gray-100"
              >
                ของใช้ ของตกแต่ง
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
