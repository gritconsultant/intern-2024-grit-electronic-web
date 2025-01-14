<template>
    <div>
      <div class="p-[50px]">
        <div>tack pages</div>
        <div class="flex gap-2 my-6">
          <h1 class="font-bold text-3xl">ของใช้ ของตกแต่ง</h1>
          <p class="mt-[10px] text-black/40">(สินค้าทั้งหมด 120 รายการ)</p>
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
        <hr class="mt-[10px] mb-[100px]" />
        <!-- cardcategory -->
        <div class="grid gap-20">
          <div
            v-for="(item, category) in category.slice(4, 5)"
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
    name: "มะขาม 4 รส",
    detail:
      "มะขาม 4 รส มะขามคลุก (บ้านมะขาม) โดยบริษัทสวนผึ้ง จำกัด ",
    price: 62,
    amount: 10,
    img: "https://th-test-11.slatic.net/p/2b0d5f80a00b77d2c6490b09a053a1c0.png",
  },
  {
    id: 6,
    name: "มะขามคลุกบ๊วย 4 รส",
    detail: "มะขามแกะเปลือก ปรุงรสด้วย นำ้ตาล พริก เกลือ และผงบ๊วย ",
    price: 62,
    amount: 13,
    img: "https://halal.co.th/storages/products/343928.png",
  },
  {
    id: 7,
    name: "เลมอนอบแห้ง รสน้ำผึ้ง",
    detail: "เลมอนอบแห้ง ผสมด้วย ผงน้ำผึ้ง ",
    price: 59,
    amount: 10,
    img: "https://halal.co.th/storages/products/390694.jpg",
  },
  {
    id: 8,
    name: "เผือกกรอบไส้เสาวรส",
    detail: "บริษัท สวนผึ้งหวาน จำกัด เผือกกรอบไส้เสาวรส ",
    price: 58,
    amount: 20,
    img: "https://halal.co.th/storages/products/680694.jpg",
  },
  ]);
  
  const category = ref<Category[]>([
    {
    id: 1,
    name: "อาหาร",
    img: "https://static.vecteezy.com/system/resources/previews/046/496/668/non_2x/a-plate-with-various-types-of-food-on-it-png.png",
  },
  {
    id: 2,
    name: "เครื่องดื่ม",
    img: "https://static.vecteezy.com/system/resources/previews/026/755/602/large_2x/fresh-and-cold-soft-drinks-ai-generative-free-png.png",
  },
  {
    id: 3,
    name: "สมุนไพร",
    img: "https://static.vecteezy.com/system/resources/previews/054/055/909/non_2x/herbal-collection-in-wooden-mortar-and-pestle-png.png",
  },
  {
    id: 4,
    name: "ผ้าและเครื่องแต่งกาย",
    img: "https://static.vecteezy.com/system/resources/previews/046/822/472/non_2x/a-wicker-laundry-basket-overflowing-with-clean-clothes-next-to-a-stack-of-freshly-laundered-and-folded-garments-isolated-on-a-transparent-background-free-png.png",
  },
  {
    id: 5,
    name: "ของใช้ ของตกแต่ง",
    img: "https://static.vecteezy.com/system/resources/previews/034/630/935/non_2x/rustic-home-decor-items-including-ceramic-vases-wooden-branches-antique-books-candle-and-woven-basket-on-transparent-background-interior-accessories-cut-out-vintage-style-ai-generated-png.png",
  },
  ]);
  </script>
  
  <style scoped></style>
  