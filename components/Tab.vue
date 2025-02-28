<template>
    <div>
      <div class="flex border-b mb-6">
        <NuxtLink
          to="/order/checkout"
          class="py-2 max-lg:w-[90px] text-center max-lg:text-[15px]  px-4 max-lg:px-[2px] text-gray-600 hover:text-[#EE973C]"
          :class="isActive('/order/checkout') ? 'border-b-2 border-[#EE973C] text-[#EE973C]' : ''"
        >
          ที่ต้องชำระ
        </NuxtLink>

        <NuxtLink
          to="/order/paid"
          class="py-2 max-lg:w-[90px] text-center max-lg:text-[15px]  px-4 max-lg:px-[2px] text-gray-600 hover:text-[#EE973C]"
          :class="isActive('/order/paid') ? 'border-b-2 border-[#EE973C] text-[#EE973C]' : ''"
        >
          ชำระแล้ว
        </NuxtLink>
  
        <NuxtLink
          to="/order/shipping"
          class="py-2 max-lg:w-[90px] text-center max-lg:text-[15px]  px-4 max-lg:px-[2px] text-gray-600 hover:text-[#EE973C]"
          :class="isActive('/order/shipping') ? 'border-b-2 border-[#EE973C] text-[#EE973C]' : ''"
        >
          ที่ต้องจัดส่ง
        </NuxtLink>
  
        <NuxtLink
          to="/order/receiving"
          class="py-2 max-lg:w-[90px] text-center max-lg:text-[15px]  px-4 max-lg:px-[2px] text-gray-600 hover:text-[#EE973C]"
          :class="isActive('/order/receiving') ? 'border-b-2 border-[#EE973C] text-[#EE973C]' : ''"
        >
          ที่ต้องได้รับ
        </NuxtLink>
  
        <NuxtLink
          to="/order/review"
          class="py-2 max-lg:w-[90px] text-center max-lg:text-[15px]  px-4 max-lg:px-[2px] text-gray-600 hover:text-[#EE973C]"
          :class="isActive('/order/review') ? 'border-b-2 border-[#EE973C] text-[#EE973C]' : ''"
        >
          ที่ต้องรีวิว
        </NuxtLink>
  
        <NuxtLink
          to="/order/history"
          class="py-2 max-lg:w-[90px] text-center max-lg:text-[15px]  px-4 max-lg:px-[2px] text-gray-600 hover:text-[#EE973C]"
          :class="isActive('/order/history') ? 'border-b-2 border-[#EE973C] text-[#EE973C]' : ''"
        >
          ประวัติการซื้อ
        </NuxtLink>

        <!-- <NuxtLink
          to="/order/refundOrder"
          class="py-2  px-4 text-gray-600 hover:text-[#EE973C]"
          :class="isActive('/order/refundOrder') ? 'border-b-2 border-[#EE973C] text-[#EE973C]' : ''"
        >
          คืนสินค้า
        </NuxtLink> -->

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
  