<template>
  <div>
    <div class="p-[20px] lg:p-[50px]">
      <div>tack pages</div>
      <div class="flex flex-col lg:flex-row gap-2 my-6">
        <h1 class="font-bold text-2xl lg:text-3xl">สินค้าทั้งหมด</h1>
        <p class="mt-2 lg:mt-[10px] text-black/40">(สินค้าทั้งหมด 120 รายการ)</p>
      </div>
      <!-- select -->
      <div class="flex flex-wrap gap-5 mt-[30px] lg:mt-[50px] pl-3 text-black/40">
        <div>
          ราคา
          <select class="border p-1 rounded">
            <option value="">ทั้งหมด</option>
            <option value="">ต่ำกว่า 10,000 บาท</option>
            <option value="">10,000 - 20,000 บาท</option>
            <option value="">20,000 - 30,000 บาท</option>
            <option value="">มากกว่า 30,000 บาท</option>
          </select>
        </div>
        <div>
          หมวดหมู่
          <select class="border p-1 rounded">
            <option value="">ทั้งหมด</option>
            <option value="">คอมพิวเตอร์</option>
            <option value="">โน๊ตบุ๊ค</option>
            <option value="">อุปกรณ์เสริม</option>
          </select>
        </div>
      </div>
      <hr class="mt-[10px] mb-[50px] lg:mb-[100px]" />
      <!-- cardcategory -->
      <div class="grid gap-10 mg lg:gap-20">
        <div
          v-for="(item, category) in category"
          :key="category"
          class="gap-10"
        >
          <div class="flex justify-between px-1">
            <h1 class="headercategory">{{ item.name }}</h1>
            <!-- -->
            <div class="mt-[10px] mr-[20px] lg:mr-[30px] text-black/40">ทั้งหมด -></div>
          </div>
          <div>
            <div class="mt-[10px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              <div v-for="(item, index) in products.slice(0, 4)" :key="index">
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
    detail: "Wriedsaddddddddd ",
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

const category = ref<Category[]>([
  {
    id: 1,
    name: "หมวดที่ 1",
    img: ""
  },
  {
    id: 2,
    name: "หมวดที่ 2",
    img: ""
  },
  {
    id: 3,
    name: "หมวดที่ 3",
    img: ""
  },
  
]);
</script>

<style scoped>
@media (max-width: 768px) {
  .headercategory {
    font-size: 1.25rem;
  }
}
@media (min-width: 1024px) {
  .headercategory {
    font-size: 1.5rem;
  }
}
</style>
