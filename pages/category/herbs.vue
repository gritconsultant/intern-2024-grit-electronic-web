<template>
  <div>
    <div class="p-[20px] lg:p-[50px]">
      <div>tack pages</div>
      <div class="flex flex-col lg:flex-row gap-2 my-6">
        <h1 class="font-bold text-2xl lg:text-3xl">สมุนไพร</h1>
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
    name: "ครีมบำรุงผิวน้ำนมข้าว",
    detail: "	ผลิตภัณฑ์จากข้าวระยะน้ำนม ช่วยถนอมผิวให้เนียนนุ่ม กระชับ ไม่เกิดความระคายเคือง ด้วยคุณค่าจากธรรมชาติอย่างแท้จริง มีวิตามิน E ช่วยบำรุงผิว มีกลิ่นหอม พร้อมผิวนุ่มชุ่มชื่น",
    price: 350,
    amount: 5,
    img: "https://cx.lnwfile.com/_/cx/_resize/250/333/ua/fr/ep.jpg",
    categoryId: 3,
  },
  {
    id: 2,
    name: "ครีมบำรุงผิว น้ำนมข้าวไรซ์เบอร์รี่",
    detail: "ผลิตภัณฑ์บำรุงผิวกาย ด้วยคุณค่าสารสกัดจากข้าวไรซ์เบอร์รี่ Antocyanin ช่วยบำรุงผิวพรรณอย่างล้ำลึก ปรับสีผิวให้สม่ำเสมอ ทำให้ผิวแลดูอ่อนเยาว์ และยืดหยุ่นอย่างเป็นธรรมชาติ มี Vitamin E ช่วยคืนความสมดุลให้กับผิว ทำให้ผิวเนียนนุ่มชุ่มชื้น ไม่แห้งกร้าน มีส่วนช่วยทำให้ผิวดูอ่อนโยนน่าสัมผัส พร้อมกลิ่นหอมจากธรรมชาติ ",
    price: 250,
    amount: 3,
    img: "https://cx.lnwfile.com/_/cx/_raw/me/be/uu.jpg",
    categoryId: 3,
  },
  {
    id: 3,
    name: "พิมเสนน้ำ",
    detail: "พกพาสะดวก ให้กลิ่นหอม สดชื่น ดมแก้วิงเวียนศีรษะ เมารถ ใช้นวดบรรเทาปวด เมื่อยล้าจากการทำกิจกรรม",
    price: 40,
    amount: 3,
    img: "https://cx.lnwfile.com/_/cx/_raw/vk/e5/12.jpg",
    categoryId: 3,
  },
  {
    id: 4,
    name: "น้ำยาล้างจานกลิ่นตะไคร้หอม",
    detail: "น้ำยาล้างจานกลิ่นตะไคร้หอมและยูคาลิปตัส ขนาด 1,000 มล. (Lemon Grass & Eucalyptus Dishwashing Liquid)",
    price: 155,
    amount: 3,
    img: "https://cx.lnwfile.com/_/cx/_raw/h6/kd/qy.jpg",
    categoryId: 3,
  },



  {
  id: 5,
  name: "ยาหม่องสมุนไพร",
  detail: "ยาหม่องสมุนไพร บรรเทาอาการปวดเมื่อย",
  price: 90,
  amount: 15,
  img: "https://www.otopchiangmai.com/uploads/1b1a4eb03a867cc46ecda54228a4af72.jpg",
  categoryId: 3,
},
{
  id: 6,
  name: "สบู่สมุนไพรมะขาม",
  detail: "สบู่สมุนไพรมะขาม ช่วยให้ผิวเนียนใส",
  price: 85,
  amount: 30,
  img: "https://st.bigc-cs.com/cdn-cgi/image/format=webp,quality=90/public/media/catalog/product/43/88/8850784043043/8850784043043-20240805161704-.jpg",
  categoryId: 3,
},
{
  id: 7,
  name: "สมุนไพรอบแห้ง",
  detail: "สมุนไพรอบแห้งสำหรับต้มน้ำดื่ม บำรุงร่างกาย",
  price: 150,
  amount: 12,
  img: "https://vanusnun.com/cdn/shop/products/100-326949.jpg?v=1705151977&width=533",
  categoryId: 3,
},
{
  id: 8,
  name: "น้ำมันนวดสมุนไพร",
  detail: "น้ำมันนวดสมุนไพร บรรเทาอาการปวดเมื่อย",
  price: 180,
  amount: 8,
  img: "https://inwfile.com/s-dw/aw73c2.jpg",
  categoryId: 3,
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
