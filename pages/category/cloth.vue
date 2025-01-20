<template>
  <div>
    <div class="p-[20px] lg:p-[50px]">
      <div>tack pages</div>
      <div class="flex flex-col lg:flex-row gap-2 my-6">
        <h1 class="font-bold text-2xl lg:text-3xl">ผ้าและเครื่องแต่งกาย</h1>
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
          v-for="(item, category) in category.slice(1, 2)"
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
                  <CardProduct :product="item" />
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
  name: "เสื้อยืด I Love PATPAT ",
  detail: "	เสื้อยืด I Love PATPAT จากลายพระหัตถ์ (Upcycling T-shirt) - สีขาว",
  price: 200,
  amount: 10,
  img: "https://cx.lnwfile.com/_/cx/_raw/63/ue/5l.jpg",
  categoryId: 4,
},
{
  id: 2,
  name: "เสื้อโปโลภัทรพัฒน์ สีแดง",
  detail: "เสื้อโปโลภัทรพัฒน์ สีแดง มีทั้งของผู้ชาย และผู้หญิง ผลิตจากผ้า cotton 100% สวมใส่สบาย",
  price: 450,
  amount: 5,
  img: "https://th.kmsupergifts.com/uploads/202339877/ice-silk-polo-shirt0b6dde9e-b771-4ae5-bad2-886041fd6d81.jpg",
  categoryId: 4,
},
{
  id: 3,
  name: "กระเป๋าผ้าพิมพ์ลาย",
  detail: "กระเป๋าผ้าสะพายข้าง พิมพ์ลาย ทนทาน น้ำหนักเบา",
  price: 300,
  amount: 8,
  img: "https://image.makewebcdn.com/makeweb/m_1200x600/7zapn1NU1/Fabric%20Bag/21-Pentagram%20music%20bag.jpg",
  categoryId: 4,
},
{
  id: 4,
  name: "กระเป๋าเป้ลายสก็อตใหญ่",
  detail: "ผลิตภัณฑ์งานหัตถกรรมต่างๆ ถือเป็นภูมิปัญญาของมนุษย์ที่สร้างสรรค์มาจากรุ่นสู่รุ่น บ่งบอกถึงพื้นฐานรากเหง้าของชุมชน",
  price: 550,
  amount: 12,
  img: "https://cx.lnwfile.com/_/cx/_raw/te/ql/5d.png",
  categoryId: 4,
},



{
  id: 5,
  name: "ผ้าพันคอไหมไทย",
  detail: "ผ้าพันคอไหมไทยทอมือ ลวดลายเอกลักษณ์",
  price: 450,
  amount: 8,
  img: "https://www.sureepondthaisilk.com/wp-content/uploads/%E0%B9%82%E0%B8%A5%E0%B9%82%E0%B8%81%E0%B9%89-%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B9%80%E0%B8%81%E0%B8%A9%E0%B8%95%E0%B8%A3-%E0%B9%84%E0%B8%AD%E0%B8%84%E0%B8%AD%E0%B8%99%E0%B8%95%E0%B9%89%E0%B8%99%E0%B9%84%E0%B8%A1%E0%B9%89-%E0%B8%AA%E0%B8%B5%E0%B9%80%E0%B8%82%E0%B8%B5%E0%B8%A2%E0%B8%A7%E0%B9%80%E0%B8%82%E0%B9%89%E0%B8%A1-512-x-512-px-28-1.png",
  categoryId: 4,
},
{
  id: 6,
  name: "เสื้อพื้นเมือง",
  detail: "เสื้อพื้นเมืองผ้าฝ้าย เนื้อเบาสบาย",
  price: 600,
  amount: 10,
  img: "https://www.otopchiangmai.com/uploads/a6272e2a9eeaeb4139db4003b9166202.jpg",
  categoryId: 4,
},
{
  id: 7,
  name: "กางเกงเลผ้าไทย",
  detail: "กางเกงเลผ้าไทยเหมาะสำหรับทุกโอกาส",
  price: 350,
  amount: 12,
  img: "https://cdn.jing-shop.in.th/5268-home_default/%E0%B8%81%E0%B8%B2%E0%B8%87%E0%B9%80%E0%B8%81%E0%B8%87%E0%B9%80%E0%B8%A5-%E0%B8%9C%E0%B9%89%E0%B8%B2%E0%B8%97%E0%B8%AD%E0%B8%AB%E0%B8%A5%E0%B8%B2%E0%B8%81%E0%B8%AA%E0%B8%B5.jpg",
  categoryId: 4,
},
{
  id: 8,
  name: "กระเป๋าผ้าทอลายดอกไม้",
  detail: "กระเป๋าผ้าทอลายดอกไม้ สีสันสดใส",
  price: 300,
  amount: 5,
  img: "https://assets.central.co.th//adobe/dynamicmedia/deliver/dm-aid--d5479cdc-d8a1-4c90-adf3-09e484be9985/centrallovetheearth-nylonshoppingbagflowerspatternbloomingbluelightblue-cds82091330-1.jpg?quality=85&preferwebp=true&width=550",
  categoryId: 4,
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
