<template>
  <div>
    <div class="h-[60px] pt-[5px] border-2 border-white border-b-black">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <NuxtLink to="/" class=" pl-[30px] ">
            <img
              class="w-[150px]"
              src="https://img2.pic.in.th/pic/-1-21738ab007dd9a7a6.png"
              alt=""
            />
          </nuxtlink>
        <!-- menu -->
      <div class="flex justify-between  pt-[15px] w-full ">
          <div class="flex gap-5 w-full pl-[40px]">
            <div v-for="(data, i) in page" :key="i">
              <NuxtLink :to="data.path">
                {{ data.name }}
              </NuxtLink>
            </div>
          </div>
          <div class="flex justify-center pl-40   gap-[70px] w-full  " >
            <div class="flex h-">
              <img class="icons" src="https://cdn-icons-png.freepik.com/512/598/598170.png" alt="">
            </div>
            <div>
              <img class="icons" src="https://cdn-icons-png.freepik.com/512/8459/8459233.png" alt="">
            </div>
            <div>
              <img class="icons" src="https://cdn-icons-png.freepik.com/512/3920/3920260.png" alt="">
            </div>
            <div>
              <img class="icons" src="https://cdn-icons-png.freepik.com/512/1827/1827422.png" alt="">
            </div>
            <div>
              <img class="icons" src="https://cdn-icons-png.freepik.com/512/456/456283.png" alt="">
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

<style scoped></style>