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
            <option value="">ต่ำกว่า 1,000 บาท</option>
            <option value="">1,000 - 2,000 บาท</option>
            <option value="">2,000 - 3,000 บาท</option>
            <option value="">มากกว่า 3,000 บาท</option>
          </select>
        </div>
        <div>
          หมวดหมู่
          <select class="border p-1 rounded">
            <option value="">ทั้งหมด</option>
            <option value="">อาหาร</option>
            <option value="">เครื่องดื่ม</option>
            <option value="">สมุนไพร</option>
            <option value="">ผ้าและเครื่องแต่งกาย</option>
            <option value="">ของใช้ ของตกแต่ง</option>
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
    name: "มะขาม 4 รส",
    detail:
      "มะขาม 4 รส มะขามคลุก (บ้านมะขาม) โดยบริษัทสวนผึ้ง จำกัด ",
    price: 62,
    amount: 10,
    img: "https://th-test-11.slatic.net/p/2b0d5f80a00b77d2c6490b09a053a1c0.png",
  },
  {
    id: 2,
    name: "มะขามคลุกบ๊วย 4 รส",
    detail: "มะขามแกะเปลือก ปรุงรสด้วย นำ้ตาล พริก เกลือ และผงบ๊วย ",
    price: 62,
    amount: 13,
    img: "https://halal.co.th/storages/products/343928.png",
  },
  {
    id: 3,
    name: "เลมอนอบแห้ง รสน้ำผึ้ง",
    detail: "เลมอนอบแห้ง ผสมด้วย ผงน้ำผึ้ง ",
    price: 59,
    amount: 10,
    img: "https://halal.co.th/storages/products/390694.jpg",
  },
  {
    id: 4,
    name: "เผือกกรอบไส้เสาวรส",
    detail: "บริษัท สวนผึ้งหวาน จำกัด เผือกกรอบไส้เสาวรส ",
    price: 58,
    amount: 20,
    img: "https://halal.co.th/storages/products/680694.jpg",
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
