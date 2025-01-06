<template>
  <div class="p-6 flex flex-col lg:flex-row gap-9 text-black border-t-2 border-gray-400">
    <!-- Logo and Address -->
    <div class="ml-0 lg:ml-7 flex flex-col items-center lg:items-start">
      <img src="/images/logo.ico" class="w-[150px]" />

      <p class="mt-5 text-center lg:text-left detail">
        88/8 หมู่ 12 ตำบลศิลา อำเภอเมือง จังหวัดขอนแก่น 40000
      </p>
    </div>

    <!-- Menu -->
    <div class="grid grid-cols-1 md:grid-cols-3 w-full detail mt-5 lg:mt-2 lg:ml-10 px-0 lg:px-32">
      <!-- Categories -->
      <div class="mb-6 md:mb-0">
        <div class="fontsubheader mb-4">หมวดหมู่</div>
        <div
          v-for="(data, i) in page.slice(0, 3)"
          :key="i"
          class="hover:text-indigo-500 mt-1"
        >
          <NuxtLink :to="data.path">
            {{ data.name }}
          </NuxtLink>
        </div>
      </div>

      <!-- Help -->
      <div class="mb-6 md:mb-0">
        <div class="fontsubheader mb-4">ช่วยเหลือ</div>
        <div
          v-for="(data, i) in page.slice(3, 6)"
          :key="i"
          class="hover:text-indigo-500 mt-1"
        >
          <NuxtLink :to="data.path">
            {{ data.name }}
          </NuxtLink>
        </div>
      </div>

      <!-- Contact -->
      <div>
        <div class="fontsubheader mb-4">ช่องทางการติดต่อ</div>
        <div>
          <p>อีเมล : GritElectronic@gmail.com</p>
          <p class="mt-1">โทรศัพท์ : 061 - 532 - 9130</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Page } from "~/models/page.model";

const page = ref<Page[]>([
  {
    name: "โน๊ตบุ๊ค",
    path: "/category/laptop",
    active: false,
  },
  {
    name: "คอมพิวเตอร์",
    path: "/category/computer",
    active: false,
  },
  {
    name: "อุปกรณ์เสริม",
    path: "/category/accessorie",
    active: false,
  },
  {
    name: "ชำระเงิน",
    path: "/order/checkout",
    active: false,
  },
  {
    name: "คืนสินค้า",
    path: "/order/return_order",
    active: false,
  },
]);
</script>

<style scoped>
</style>
