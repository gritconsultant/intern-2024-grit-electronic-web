<template>
  <div>
    <div>
      <div class="relative group">
        <button
          class="flex items-center text-black hover:text-indigo-500"
          type="button"
        >
        <img
              class="icons w-6 md:w-8"
              src="https://cdn-icons-png.flaticon.com/256/268/268441.png"
              alt="User"
            />
        </button>

        <!-- Dropdown Menu -->
        <div
          class="absolute bg-white rounded-lg border shadow w-44 hidden group-hover:block"
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
                ที่อยู่ผู้ใช้
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

<style scoped></style>
