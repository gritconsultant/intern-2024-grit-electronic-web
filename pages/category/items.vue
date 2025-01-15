<template>
  <div>
    <div class="p-[20px] lg:p-[50px]">
      <div>tack pages</div>
      <div class="flex flex-col lg:flex-row gap-2 my-6">
        <h1 class="font-bold text-2xl lg:text-3xl">ของใช้ ของตกแต่ง</h1>
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

// Product data
const products = ref<Product[]>([
  {
  id: 1,
  name: "โคมไฟไม้ไผ่",
  detail: "โคมไฟทำจากไม้ไผ่แท้ ให้แสงอบอุ่น เหมาะสำหรับตกแต่งบ้าน",
  price: 600,
  amount: 4,
  img: "https://www.xsxlightfactory.com/uploads/Bamboo-desk-lamp-China.jpg",
  categoryId: 5,
},
{
  id: 2,
  name: "พวงกุญแจช้างอัมพร",
  detail: "พวงกุญแจ สามารถนำไปเป็นของฝาก ใช้ห้อยกระเป๋า ห้อยกุญแจรถ",
  price: 100,
  amount: 6,
  img: "https://cx.lnwfile.com/_/cx/_raw/08/dn/3a.png",
  categoryId: 5,
},
{
  id: 3,
  name: "กล่องฝาพับลายดอกไม้",
  detail: "	กล่องอเนกประสงค์ สินค้าหัตถกรรมจากกลุ่มชุมชน",
  price: 400,
  amount: 3,
  img: "https://cx.lnwfile.com/_/cx/_raw/nw/am/qk.jpg",
  categoryId: 5,
},
{
  id: 4,
  name: "ครอบครัวไก่ เผ่าอาข่า",
  detail: "ตุ๊กตาครอบครัวไก่ ใช้วางตกแต่งบ้าน ร้านค้า ร้านอาหาร",
  price: 275,
  amount: 2,
  img: "https://cx.lnwfile.com/_/cx/_raw/f4/12/hf.png",
  categoryId: 5,
},



{
  id: 5,
  name: "เทียนหอมกลิ่นดอกไม้",
  detail: "เทียนหอมกลิ่นดอกไม้ ให้ความรู้สึกผ่อนคลาย",
  price: 300,
  amount: 20,
  img: "https://inwfile.com/s-fv/869pmk.jpg",
  categoryId: 5,
},
{
  id: 6,
  name: "หมอนอิงลายไทย",
  detail: "หมอนอิงลายไทย เหมาะสำหรับตกแต่งห้อง",
  price: 450,
  amount: 15,
  img: "https://lh5.googleusercontent.com/proxy/Lr2_R5KKpzULxN_bzczkvYBVnRR168UW5JJ6undIXcPCPyo9B_TjGsNJNcGpP5ojAm_A_X4kVloy7DW8PqfGRhu2oDc0dn-6jwH38jld",
  categoryId: 5,
},
{
  id: 7,
  name: "ที่ใส่ช้อนส้อมไม้ไผ่",
  detail: "ที่ใส่ช้อนส้อมทำจากไม้ไผ่ ทนทาน",
  price: 200,
  amount: 12,
  img: "https://media.indexlivingmall.com/media/catalog/product/1/7/170129560_pf_DOYAR_NT.jpg",
  categoryId: 5,
},
{
  id: 8,
  name: "ตะกร้าหวายสำหรับผลไม้",
  detail: "ตะกร้าหวายทรงกลม เหมาะสำหรับใส่ผลไม้",
  price: 350,
  amount: 10,
  img: "https://s.alicdn.com/@sc04/kf/U9dfff19506684e08b9835f853726ef61s.jpg_720x720q50.jpg",
  categoryId: 5,
},

]);

// Category data
const category = ref<Category[]>([
  { id: 1, name: "อาหาร", img: "" },
  { id: 2, name: "เครื่องดื่ม", img: "" },
  { id: 3, name: "สมุนไพร", img: "" },
  { id: 4, name: "ผ้าและเครื่องแต่งกาย", img: "" },
  { id: 5, name: "ของใช้ ของตกแต่ง", img: "" },
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
