<template>
  <div>
    <div class="h-[60px] pt-[5px] border-2 border-white border-b-black">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <NuxtLink to="/" class=" pl-[30px] ">
            <img
              class="w-[150px]"
              src="/images/logo.ico"
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
          <div class="flex justify-center pl-40 gap-[60px] w-full" >
            <div>
              <!-- search -->
              <img class="icons" src="/public/image/icon/search.png">
            </div>
            <div>
              <!-- shopping cart -->
              <img class="icons" src="/public/image/icon/shopping-cart.png">
            </div>
            <div>
              <!-- fav -->
              <img class="icons" src="/public/image/icon/heart.png">
            </div>
            <div>
              <!-- notification -->
              <img class="icons" src="/public/image/icon/bell.png">
            </div>
            <div>
              <!-- user -->
              <img class="icons" src="/public/image/icon/user.png">
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