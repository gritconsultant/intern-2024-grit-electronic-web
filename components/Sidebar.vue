<template>
  <div class="w-full lg:w-1/4 bg-white border-r flex flex-col min-h-screen">
    <div class="p-6">
      <h2 class="text-lg font-bold">สวัสดี, ยินดีต้อนรับ</h2>
      <p class="text-gray-600">aem komkem</p>
    </div>
    <ul class="space-y-10 p-6">
      <li>
        <NuxtLink
          to="/profile"
          class="flex items-center space-x-2"
          :class="{ 'active-btn': isActive(['/profile']) }"
        >
          <i class="fas fa-user"></i>
          <span>จัดการบัญชีผู้ใช้</span>
        </NuxtLink>
      </li>
      <li>
        <NuxtLink
          to="/profile/address"
          class="flex items-center space-x-2"
          :class="{ 'active-btn': isActive(['/profile/address']) }"
        >
          <i class="fas fa-map-marker-alt"></i>
          <span>ที่อยู่ของฉัน</span>
        </NuxtLink>
      </li>
      <li>
        <NuxtLink
          to="/order/checkout"
          class="flex items-center space-x-2"
          :class="{ 'active-btn': isActive(['/order/checkout', '/order/shipping', '/order/receiving', '/order/review']) }"
        >
          <i class="fas fa-shopping-cart"></i>
          <span>คำสั่งซื้อของฉัน</span>
        </NuxtLink>
      </li>
      <li>
        <NuxtLink
          to="/order/return_order"
          class="flex items-center space-x-2"
          :class="{ 'active-btn': isActive(['/order/return_order']) }"
        >
          <i class="fas fa-tag"></i>
          <span>คืนสินค้า</span>
        </NuxtLink>
      </li>
      <li>
        <NuxtLink
          to="/login"
          class="flex items-center space-x-2 rounded-lg p-2 text-red-500 hover:bg-red-100"
        >
          <i class="fas fa-sign-out-alt"></i>
          <span>ออกจากระบบ</span>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute();

// ฟังก์ชันตรวจสอบ active state รองรับหลาย path
const isActive = (paths: string[]) => {
  return paths.includes(route.path);
};
</script>

<style scoped>
.active-btn {
  background-color: #fcca81;
  border-radius: 5px;
  padding: 8px;
}
</style>
