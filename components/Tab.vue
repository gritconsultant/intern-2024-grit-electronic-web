<template>
    <div>
      <div class="flex border-b mb-6">
        <NuxtLink
          to="/order/checkout"
          class="py-2 px-4 text-gray-600 hover:text-[#FCCA81]"
          :class="isActive('/order/checkout') ? 'border-b-2 border-[#EE973C] text-[#EE973C]' : ''"
        >
          ที่ต้องชำระ
        </NuxtLink>
  
        <NuxtLink
          to="/order/shipping"
          class="py-2 px-4 text-gray-600 hover:text-[#FCCA81]"
          :class="isActive('/order/shipping') ? 'border-b-2 border-[#EE973C] text-[#EE973C]' : ''"
        >
          ที่ต้องจัดส่ง
        </NuxtLink>
  
        <NuxtLink
          to="/order/receiving"
          class="py-2 px-4 text-gray-600 hover:text-[#FCCA81]"
          :class="isActive('/order/receiving') ? 'border-b-2 border-[#EE973C] text-[#EE973C]' : ''"
        >
          ที่ต้องได้รับ
        </NuxtLink>
  
        <NuxtLink
          to="/order/review"
          class="py-2 px-4 text-gray-600 hover:text-[#FCCA81]"
          :class="isActive('/order/review') ? 'border-b-2 border-[#EE973C] text-[#EE973C]' : ''"
        >
          ที่ต้องรีวิว
        </NuxtLink>
  
        <NuxtLink
          to="/order/history"
          class="py-2 px-4 text-gray-600 hover:text-[#FCCA81]"
          :class="isActive('/order/history') ? 'border-b-2 border-indigo-600 text-indigo-600' : ''"
        >
          ประวัติการซื้อ
        </NuxtLink>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useRoute } from 'vue-router';
  
  const route = useRoute();
  
  // ฟังก์ชันตรวจสอบเส้นทางปัจจุบัน
  const isActive = (path: string) => route.path === path;
  </script>
  
  <style scoped></style>
  