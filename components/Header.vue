<template>
  <div>
    <div class="h-[70px] p-4 border-2 border-white border-b-black">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <div class="bg-slate-600 w-full">
          <div class="w-[150px] bg-slate-400">
            <img
              src="https://img2.pic.in.th/pic/-1-21738ab007dd9a7a6.png"
              alt=""
            />
          </div>
        </div>
        <!-- menu -->
        <div class="flex justify-between w-full ">
          <div class="flex gap-5 w-full">
            <div v-for="(data, i) in page" :key="i">
              <NuxtLink :to="data.path">
                {{ data.name }}
              </NuxtLink>
            </div>
          </div>
          <div class="" >
            icon
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
    name: "หมวดหมู่",
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

<style scoped></style>
