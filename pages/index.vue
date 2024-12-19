<template>
  <div class="mx-[50px]">
    <div class="border-[2px] h-[10rem]">Posters</div>
    <div class="grid grid-cols-1 text-center">
      <div class="mt-[15px]">
        <h1 class="mb-[10px]">หมวดหมู่สินค้า</h1>
        <div class="flex justify-center gap-3">
          <div>คอมพิวเตอร์</div>
          <div>โน๊ตบุ๊ค</div>
          <div>อุปกรณ์เสริม</div>
        </div>
      </div>
    </div>
    <div class="mt-[30px] mx-[100px]">
      <h1 class="fontheader">สินค้าแนะนำ-Recommend</h1>
      <div class="grid grid-cols-4 gap-5 my-5">
        <!-- cardproduct -->
        <div v-for="(item, i) in products" :key="i">
          <div :to="i">
            <CardProduct :product="item" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from "~/models/product.model";

const products = ref<Product[]>([
  {
    id: 1,
    name: "AULA",
    detail: "Wried Mechanical KEYBOARD ",
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
  {
    id: 5,
    name: "AULA",
    detail: "Wried Mechanical KEYBOARD ",
    price: 5000,
    amount: 30,
    img: "https://aulathailand.com/wp-content/uploads/2023/06/1.png",
  },
  {
    id: 6,
    name: "AULA",
    detail: "Wried Mechanical KEYBOARD ",
    price: 6000,
    amount: 40,
    img: "https://aulathailand.com/wp-content/uploads/2023/06/1.png",
  },
]);
</script>

<style scoped></style>
