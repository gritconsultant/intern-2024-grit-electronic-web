<template>
  <div>
    <div class=" p-[50px]">
      <h1 class="fontheader ">สินค้าทั้งหมด</h1>

      <div class=" grid grid-cols-4 gap-5 ">
        <div v-for="(item, index) in products" :key="index">
          <div :to="index">
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
