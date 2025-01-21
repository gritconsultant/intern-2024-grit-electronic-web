<template>
  <div>
    <div class="p-[20px] lg:p-[50px]">
      <div>tack pages</div>
      <div class="flex flex-col lg:flex-row gap-2 my-6">
        <h1 class="font-bold text-2xl lg:text-3xl">อาหาร</h1>
        <p class="mt-2 lg:mt-[10px] text-black/40">
          (สินค้าทั้งหมด 120 รายการ)
        </p>
      </div>
      <!-- select -->
      <div
        class="flex flex-wrap gap-5 mt-[30px] lg:mt-[50px] pl-3 text-black/40"
      >
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
          v-for="(item, category) in category.slice(0, 1)"
          :key="category"
          class="gap-10"
        >
          <div class="grid justify-center">
            <div>
              <h1 class="headercategory">{{ item.name }}</h1>
            </div>

            <div>
              <div
                class="mt-[10px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-32"
              >
                <div
                  v-for="(item, index) in products"
                  :key="index"
                  class="flex justify-center"
                >
                <NuxtLink :to="`/product/${item.id}`">
                  <CardProduct :product="item" />
                </NuxtLink>
                </div>
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
    name: "ข้าวหอมปทุมธานี 1",
    detail: "ข้าวที่มีความหอม นุ่ม คล้ายข้าวหอมมะลิ",
    price: 250,
    amount: 5,
    img: "https://cx.lnwfile.com/_/cx/_raw/d7/ft/u6.png",
    categoryId: 4,
  },
  {
    id: 6,
    name: "หมูยอใบตอง",
    detail: "หมูยอห่อใบตองสูตรต้นตำรับ หอมกลิ่นสมุนไพร สดใหม่ทุกวัน",
    price: 120,
    amount: 3,
    img: "https://thaiinnofood.com/wp-content/uploads/2017/11/%E0%B8%AB%E0%B8%A1%E0%B8%B9%E0%B8%A2%E0%B8%AD%E0%B8%AB%E0%B9%88%E0%B8%AD%E0%B9%83%E0%B8%9A%E0%B8%95%E0%B8%AD%E0%B8%87.jpg",
    categoryId: 5,
  },
  {
    id: 7,
    name: "กล้วยอบน้ำผึ้ง",
    detail: "กล้วยอบน้ำผึ้ง หวานธรรมชาติ ไม่ใส่น้ำตาล",
    price: 80,
    amount: 5,
    img: "https://down-th.img.susercontent.com/file/th-11134207-7r98t-lrsoy0wc69bxac",
    categoryId: 4,
  },
  {
    id: 8,
    name: "น้ำพริกเผากุ้งเสียบ",
    detail: "น้ำพริกเผาสูตรกุ้งเสียบ หอมเผ็ดหวานกำลังดี",
    price: 80,
    amount: 3,
    img: "https://www.thaimanee-goodday.com/cdn/shop/products/TM1-0167-02_2048x.png?v=1619158250",
    categoryId: 5,
  },
]);


const category = ref<Category[]>([
  { id: 1, name: "อาหาร", img: "" },
  { id: 2, name: "เครื่องดื่ม", img: "" },
  { id: 3, name: "สมุนไพร", img: "" },
  { id: 4, name: "ผ้าและเครื่องแต่งกาย", img: "" },
  { id: 5, name: "ของใช้ ของตกแต่ง", img: "" },
]);
</script>

<style scoped>

</style>
