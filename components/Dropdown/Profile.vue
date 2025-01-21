<template>
    <div>
      <div>
        <div class="relative group">
          <!-- ปุ่ม User -->
          <button
            class="flex items-center text-black "
            type="button"
          >
          <svg class="w-[30px] h-[30px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.3" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
</svg>

          </button>
  
          <!-- Dropdown Menu -->
          <div
            class=" bg-white rounded-lg border shadow  hidden group-hover:block absolute -right-0 w-56 "
          >
            <ul class="py-2 text-sm text-gray-700">
              <li>
                <NuxtLink
                  to="/profile"
                  class="block px-4 py-2 hover:bg-gray-100"
                >
                  บัญชีผู้ใช้
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  to="/profile/address"
                  class="block px-4 py-2 hover:bg-gray-100"
                >
                  ที่อยู่
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  to="/order/checkout"
                  class="block px-4 py-2 hover:bg-gray-100"
                >
                  คำสั่งซื้อ
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  to="/login"
                  class="block px-4 py-2 hover:bg-gray-100"
                >
                  ออกจากระบบ
                </NuxtLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts"></script>
  
  <style scoped>
  </style>
  