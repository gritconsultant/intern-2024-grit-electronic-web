<template>
  <div class="mx-[20px] lg:mx-[50px] grid justify-center">
    <div>
      <img src="/public/images/banner.jpg" class="rounded-b-2xl" />
    </div>
    <div class="grid grid-cols-1 text-center mt-12">
      <h1 class="my-[50px] lg:my-[70px] fontheader">หมวดหมู่สินค้า</h1>
      <div class="flex flex-wrap justify-center">
        <div
          v-for="(data, category) in category"
          :key="category"
          class="text-center w-[90px] lg:w-[200px]"
        >
          <NuxtLink to="/product">
            <div class="flex justify-center">
              <div
                class="border-2 rounded-full p-1 w-[60px] h-[60px] lg:w-[80px] lg:h-[80px]"
              >
                <div
                  class="w-full h-full object-cover place-content-center p-1 bg-slate-300/5"
                >
                  <img :src="data.img" />
                </div>
              </div>
            </div>
            <h1
              class="fontsubheader mt-[10px] lg:mt-[20px] lg:text-base"
            >
              {{ data.name }}
            </h1>
          </NuxtLink>
        </div>
      </div>

      <!-- search -->
      <div class="grid justify-center sm:mt-8 md:mt-10 lg:mt-12">
        <Search />
      </div>
    </div>
    <div class="mt-[50px] lg:mt-[70px] mx-[20px] lg:mx-[50px]">
      <h1 class="fontheader">สินค้าแนะนำ-Recommend</h1>
      <!-- cardcategory -->
      <div class="grid gap-5 mt-[40px]">
        <div v-for="(item, category) in category" :key="category">
          <div class="flex justify-between px-10">
            <h1 class="fontsubheader mt-[3px]">{{ item.name }}</h1>
              <div class=" text-black/40">ทั้งหมด -></div>
          </div>
          <div
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-5 mt-5"
          >
            <!-- cardproduct -->
            <div v-for="(item, i) in products" :key="i" class="flex  justify-center ">
              <NuxtLink to="/product/[id]">
                <div :to="i">
                  <CardProduct :product="item" />
                </div>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Category, Product } from "~/models/product.model";

// Product data
const products = ref<Product[]>([
  {
    id: 1,
    name: "มะขาม 4 รส",
    detail: "มะขาม 4 รส มะขามคลุก (บ้านมะขาม) โดยบริษัทสวนผึ้ง จำกัด",
    price: 62,
    amount: 10,
    img: "https://th-test-11.slatic.net/p/2b0d5f80a00b77d2c6490b09a053a1c0.png",
    categoryId: 1,
  },
  {
    id: 2,
    name: "มะขามคลุกบ๊วย 4 รส",
    detail: "มะขามแกะเปลือก ปรุงรสด้วย นำ้ตาล พริก เกลือ และผงบ๊วย",
    price: 62,
    amount: 13,
    img: "https://halal.co.th/storages/products/343928.png",
    categoryId: 1,
  },
  {
    id: 3,
    name: "เลมอนอบแห้ง รสน้ำผึ้ง",
    detail: "เลมอนอบแห้ง ผสมด้วย ผงน้ำผึ้ง",
    price: 59,
    amount: 10,
    img: "https://halal.co.th/storages/products/390694.jpg",
    categoryId: 2,
  },
  {
    id: 4,
    name: "เผือกกรอบไส้เสาวรส",
    detail: "บริษัท สวนผึ้งหวาน จำกัด เผือกกรอบไส้เสาวรส",
    price: 58,
    amount: 20,
    img: "https://halal.co.th/storages/products/680694.jpg",
    categoryId: 3,
  },
  {
    id: 5,
    name: "กระเป๋าผ้า",
    detail: "กระเป๋าผ้าลายดอกไม้สีสันสดใส",
    price: 250,
    amount: 5,
    img: "https://example.com/bag.png",
    categoryId: 4,
  },
  {
    id: 6,
    name: "แจกันเซรามิก",
    detail: "แจกันเซรามิกสำหรับตกแต่งบ้าน",
    price: 500,
    amount: 3,
    img: "https://example.com/vase.png",
    categoryId: 5,
  },
]);

// Category data
const category = ref<Category[]>([
  { id: 1, name: "อาหาร", img:"" },
  { id: 2, name: "เครื่องดื่ม", img:"" },
  { id: 3, name: "สมุนไพร", img:"" },
  { id: 4, name: "ผ้าและเครื่องแต่งกาย", img:""},
  { id: 5, name: "ของใช้ ของตกแต่ง" , img:""},
]);
</script>

<style scoped>
@media (max-width: 768px) {
  .fontheader {
    font-size: 1.25rem;
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
