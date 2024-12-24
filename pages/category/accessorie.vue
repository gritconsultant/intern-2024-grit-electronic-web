<template>
    <div>
      <div class="p-[50px]">
        <div>tack pages</div>
        <div class="flex gap-2 my-6">
          <h1 class="font-bold text-3xl">อุปกรณ์เสริม</h1>
          <p class="mt-[10px] text-black/40">(สินค้าทั้งหมด 120 รายการ)</p>
        </div>
        <!-- select -->
        <div class="flex gap-5 mt-[50px] pl-3 text-black/40">
          <div>
            ราคา
            <select name="" id=""></select>
          </div>
          <div>
            หมวดหมู่
            <select name="" id=""></select>
          </div>
        </div>
        <hr class="mt-[10px] mb-[100px]" />
        <!-- cardcategory -->
        <div class="grid gap-20">
          <div
            v-for="(item, category) in category.slice(2, 3)"
            :key="category"
            class="gap-10"
          >
            <div class="flex justify-between px-1">
              <h1 class="headercategory">{{ item.name }}</h1>
            </div>
            <div>
              <div class="mt-[10px] grid grid-cols-4 gap-5">
                <div v-for="(item, index) in products" :key="index">
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
    {
      id: 7,
      name: "AULA",
      detail: "Wried Mechanical KEYBOARD ",
      price: 5000,
      amount: 30,
      img: "https://aulathailand.com/wp-content/uploads/2023/06/1.png",
    },
    {
      id: 8,
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
      name: "คอมพิวเตอร์",
      img: "",
    },
    {
      id: 2,
      name: "โน๊ตบุ๊ค",
      img: "",
    },
    {
      id: 3,
      name: "อุปกรณ์เสริม",
      img: "",
    },
  ]);
  </script>
  
  <style scoped></style>
  