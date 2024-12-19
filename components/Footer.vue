<template>
  <div class="p-6 flex gap-9 text-black border-t-2 border-gray-400">
    <!-- logo n ad -->
    <div class="ml-7">
      <img src="/images/logo.ico" class="w-[150px] flex" />

      <p class="mt-5 ml-4 text-xs">
        88/8 หมู่ 12 ตำบลศิลา อำเภอเมือง จังหวัดขอนแก่น 40000
      </p>
    </div>

    <!-- menu -->
    <div class="grid grid-cols-3 w-full text-xs mt-2 ml-10 px-32">
      <div>
        <div class="font-semibold mb-4">หมวดหมู่</div>
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

      <div>
        <div class="font-semibold mb-4">ช่วยเหลือ</div>
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

      <div>
        <div class="font-semibold mb-4">ช่องทางการติดต่อ</div>
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
    path: "/laptop",
    active: false,
  },
  {
    name: "คอมพิวเตอร์",
    path: "/computer",
    active: false,
  },
  {
    name: "อุปกรณ์เสริม",
    path: "/accessory",
    active: false,
  },
  {
    name: "ชำระเงิน",
    path: "/help",
    active: false,
  },
  {
    name: "คืนสินค้า",
    path: "/help",
    active: false,
  },
]);
</script>

<style scoped>
</style>
