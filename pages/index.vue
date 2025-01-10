<template>
  <div class="mx-[20px] lg:mx-[50px]">
    <div class="border-[2px] h-[10rem]">Posters</div>
    <div class="grid grid-cols-1 text-center">
      <h1 class="my-[50px] lg:my-[70px] fontheader">หมวดหมู่สินค้า</h1>
      <div class="flex flex-wrap justify-center gap-5">
        <div
          v-for="(data, category) in category"
          :key="category"
          class="text-center"
        >
          <div class="border-2 rounded-[50px] p-1">
            <div
              class="w-[60px] h-[60px] lg:w-[80px] lg:h-[80px] object-cover place-content-center rounded-[10px] p-1 bg-slate-300/5"
            >
              <img :src="data.img" alt="" />
            </div>
          </div>
          <h1 class="fontsubheader mt-[10px] lg:mt-[20px] text-sm lg:text-base">
            {{ data.name }}
          </h1>
        </div>
      </div>

      <!-- search -->
      <div class="grid justify-center mt-8">
        <Search />
      </div>
    </div>
    <div class="mt-[50px] lg:mt-[70px] mx-[20px] lg:mx-[50px]">
      <h1 class="fontheader">สินค้าแนะนำ-Recommend</h1>
      <!-- cardcategory -->
      <div class="grid gap-5 mt-[20px]">
        <div v-for="(item, category) in category" :key="category">
          <div class="flex justify-between px-1">
            <h1 class="fontsubheader mt-[3px]">{{ item.name }}</h1>
            <div class="mr-[20px] lg:mr-[30px] text-black/40">ทั้งหมด -></div>
          </div>
          <div
            class="max-[1000px]: grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 my-2"
          >
            <!-- cardproduct -->
            <div v-for="(item, i) in products" :key="i">
              <div :to="i">
                <CardProduct :product="item" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Category, Product } from "~/models/product.model";

const products = ref<Product[]>([
  {
    id: 1,
    name: "AULA",
    detail:
      "Wried Mechanical KEYBOARDbgfnfdgdfsbsdfhsdfhfsdhhdsfhdfdfsfhdfdcxzcxzcf ",
    price: 1000,
    amount: 0,
    img: "https://aulathailand.com/wp-content/uploads/2023/06/1.png",
  },
  {
    id: 2,
    name: "AULA",
    detail: "Wried Mechanical KEYBOARD ",
    price: 2000,
    amount: 3,
    img: "https://aulathailand.com/wp-content/uploads/2023/06/1.png",
  },
  {
    id: 3,
    name: "AULA",
    detail: "Wried Mechanical KEYBOARD ",
    price: 3000,
    amount: 10,
    img: "https://aulathailand.com/wp-content/uploads/2023/06/1.png",
  },
  {
    id: 4,
    name: "AULA",
    detail: "Wried Mechanical KEYBOARD ",
    price: 4000,
    amount: 20,
    img: "https://aulathailand.com/wp-content/uploads/2023/06/1.png",
  },
]);
const category = ref<Category[]>([
  {
    id: 1,
    name: "หมวดที่ 1",
    img: "https://www.brandlogopng.com/files/png/computer/green-pc-icon-png-hd-computer-circle-icons-68wl.png",
  },
  {
    id: 2,
    name: "หมวดที่ 2",
    img: "https://images.vexels.com/content/158669/preview/notebook-illustration-laptop-f57f36.png",
  },
  {
    id: 3,
    name: "หมวดที่ 3",
    img: "https://pngimg.com/d/keyboard_PNG101839.png",
  },
]);
</script>

<style scoped>
@media (max-width: 768px) {
  .fontheader {
    font-size: 1.25rem;
  }
  .fontsubheader {
    font-size: 1rem;
  }
}
@media (min-width: 1024px) {
  .fontheader {
    font-size: 2rem;
  }
  .fontsubheader {
    font-size: 1.125rem;
  }
}
</style>
