<template>
  <div>
    <div class="p-[20px] lg:p-[50px]">
      <div>tack pages</div>
      <div class="flex flex-col lg:flex-row gap-2 my-6">
        <h1 class="font-bold text-2xl lg:text-3xl">เครื่องดื่ม</h1>
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
    name: "เครื่องดื่มรังนกสำเร็จรูป",
    detail: "ดอกบัวคู่ เครื่องดื่มรังนกสำเร็จรูป สูตรดั้งเดิม",
    price: 150,
    amount: 5,
    img: "https://halal.co.th/storages/products/679578.jpg",
    categoryId: 2,
  },
  {
    id: 2,
    name: "เครื่องดื่มใบอ่อนข้าวสาลีชนิดผง",
    detail: "กิฟฟารีน วีทกราส (เครื่องดื่มใบอ่อนข้าวสาลีชนิดผง) (ตรากิฟฟารีน)",
    price: 150,
    amount: 3,
    img: "https://halal.co.th/storages/products/p135225.jpg",
    categoryId: 2,
  },
  {
    id: 3,
    name: "เครื่องดื่มน้ำองุ่นขาว",
    detail: "กลูต้า เคอร์คิวมา มินต์ ซี เครื่องดื่มน้ำองุ่นขาว ผสมกลูต้าไธโอนและขมิ้น",
    price: 40,
    amount: 3,
    img: "https://farmfoodsmart.com/upload/products/1634/637982414838759739.png",
    categoryId: 2,
  },
  {
    id: 4,
    name: "เครื่องดื่มสมุนไพรตรีผลา",
    detail: "ชีววิถี เครื่องดื่มสมุนไพรตรีผลา สูตรเข้มข้น รสธรรมชาติ",
    price: 155,
    amount: 3,
    img: "https://obs-ect.line-scdn.net/r/ect/ect/image_1695790690327236876b5788947t124fdd52",
    categoryId: 2,
  },



  {
  id: 5,
  name: "น้ำใบเตย",
  detail: "น้ำใบเตยหอมหวาน ดื่มแล้วสดชื่น",
  price: 45,
  amount: 20,
  img: "https://images.mango-prod.siammakro.cloud/SOURCE/2ec9b71eddbd47949789abb9c9131e5b",
  categoryId: 2,
},
{
  id: 6,
  name: "น้ำเก๊กฮวย",
  detail: "น้ำเก๊กฮวยรสชาติกลมกล่อม ช่วยบำรุงสุขภาพ",
  price: 40,
  amount: 18,
  img: "https://www.seasunzone.com/wp-content/uploads/2024/04/1114.jpg",
  categoryId: 2,
},
{
  id: 7,
  name: "น้ำกระเจี๊ยบ",
  detail: "น้ำกระเจี๊ยบรสเปรี้ยวอมหวาน มีประโยชน์",
  price: 55,
  amount: 12,
  img: "https://www.cofethai.com/wp-content/uploads/2024/11/240mL-HibiscusDrink.jpg",
  categoryId: 2,
},
{
  id: 8,
  name: "น้ำส้มคั้นสด",
  detail: "น้ำส้มคั้นสดแท้ 100% ไม่มีน้ำตาล",
  price: 70,
  amount: 25,
  img: "https://cdn8.devgodigit.net/wp-content/uploads/2021/09/30200115/051411283_P.jpg",
  categoryId: 2,
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
