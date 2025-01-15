<template>
  <div class="mx-[20px] lg:mx-[50px] grid justify-center">
    <div>
      <img src="/public/images/banner.jpg" class="rounded-b-2xl" />
    </div>
    <div class="grid grid-cols-1 text-center mt-12">
      <h1 class="my-[50px] lg:my-[70px] fontheader">หมวดหมู่สินค้า</h1>
      <div class="flex flex-wrap justify-center">
        <!-- Category Selection -->
        <div
          v-for="cat in category"
          :key="cat.id"
          class="text-center w-[90px] lg:w-[200px] cursor-pointer"
          @click="selectedCategoryId = cat.id"
        >
          <div class="flex justify-center">
            <div
              :class="{
                'border-2 border-[#EE973C]': selectedCategoryId === cat.id,
                'border-2': selectedCategoryId !== cat.id,
              }"
              class="rounded-full p-1 w-[60px] h-[60px] lg:w-[80px] lg:h-[80px]"
            >
              <div class="w-full h-full object-cover place-content-center p-1 bg-slate-300/5">
                <img :src="cat.img" />
              </div>
            </div>
          </div>
          <h1 class="fontsubheader mt-[10px] lg:mt-[20px] lg:text-base">
            {{ cat.name }}
          </h1>
        </div>
      </div>
    </div>

    <!-- Recommended Products -->
    <div class="mt-[50px] lg:mt-[70px] mx-[20px] lg:mx-[50px]">
      <h1 class="fontheader">สินค้าแนะนำ - Recommend</h1>
      <div class="grid gap-5 mt-[10px]">
        <div v-for="cat in category" :key="cat.id">
          <!-- Check Selected Category -->
          <div v-if="selectedCategoryId === cat.id || selectedCategoryId === 0">
            <div class="flex justify-between px-10">
              <h1 class="fontsubheader mt-[3px]">{{ cat.name }}</h1>
              <div class="text-black/40 cursor-pointer">ทั้งหมด -></div>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-5 mt-4">
              <!-- Display Products by Category -->
              <div
                v-for="item in getProductsByCategory(cat.id)"
                :key="item.id"
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
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { Category, Product } from "~/models/product.model";

// Products Data
const products = ref<Product[]>([
  // cate 1
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
    categoryId: 1,
  },
  {
    id: 4,
    name: "เผือกกรอบไส้เสาวรส",
    detail: "บริษัท สวนผึ้งหวาน จำกัด เผือกกรอบไส้เสาวรส",
    price: 58,
    amount: 20,
    img: "https://halal.co.th/storages/products/680694.jpg",
    categoryId: 1,
  },


  // cate 2
  {
    id: 5,
    name: "เครื่องดื่มรังนกสำเร็จรูป",
    detail: "ดอกบัวคู่ เครื่องดื่มรังนกสำเร็จรูป สูตรดั้งเดิม",
    price: 150,
    amount: 5,
    img: "https://halal.co.th/storages/products/679578.jpg",
    categoryId: 2,
  },
  {
    id: 6,
    name: "เครื่องดื่มใบอ่อนข้าวสาลีชนิดผง",
    detail: "กิฟฟารีน วีทกราส (เครื่องดื่มใบอ่อนข้าวสาลีชนิดผง) (ตรากิฟฟารีน)",
    price: 150,
    amount: 3,
    img: "https://halal.co.th/storages/products/p135225.jpg",
    categoryId: 2,
  },
  {
    id: 7,
    name: "เครื่องดื่มน้ำองุ่นขาว",
    detail: "กลูต้า เคอร์คิวมา มินต์ ซี เครื่องดื่มน้ำองุ่นขาว ผสมกลูต้าไธโอนและขมิ้น",
    price: 40,
    amount: 3,
    img: "https://farmfoodsmart.com/upload/products/1634/637982414838759739.png",
    categoryId: 2,
  },
  {
    id: 8,
    name: "เครื่องดื่มสมุนไพรตรีผลา",
    detail: "ชีววิถี เครื่องดื่มสมุนไพรตรีผลา สูตรเข้มข้น รสธรรมชาติ",
    price: 155,
    amount: 3,
    img: "https://obs-ect.line-scdn.net/r/ect/ect/image_1695790690327236876b5788947t124fdd52",
    categoryId: 2,
  },


  // cate 3
  {
    id: 9,
    name: "ครีมบำรุงผิวน้ำนมข้าว",
    detail: "	ผลิตภัณฑ์จากข้าวระยะน้ำนม ช่วยถนอมผิวให้เนียนนุ่ม กระชับ ไม่เกิดความระคายเคือง ด้วยคุณค่าจากธรรมชาติอย่างแท้จริง มีวิตามิน E ช่วยบำรุงผิว มีกลิ่นหอม พร้อมผิวนุ่มชุ่มชื่น",
    price: 350,
    amount: 5,
    img: "https://cx.lnwfile.com/_/cx/_resize/250/333/ua/fr/ep.jpg",
    categoryId: 3,
  },
  {
    id: 10,
    name: "ครีมบำรุงผิว น้ำนมข้าวไรซ์เบอร์รี่",
    detail: "ผลิตภัณฑ์บำรุงผิวกาย ด้วยคุณค่าสารสกัดจากข้าวไรซ์เบอร์รี่ Antocyanin ช่วยบำรุงผิวพรรณอย่างล้ำลึก ปรับสีผิวให้สม่ำเสมอ ทำให้ผิวแลดูอ่อนเยาว์ และยืดหยุ่นอย่างเป็นธรรมชาติ มี Vitamin E ช่วยคืนความสมดุลให้กับผิว ทำให้ผิวเนียนนุ่มชุ่มชื้น ไม่แห้งกร้าน มีส่วนช่วยทำให้ผิวดูอ่อนโยนน่าสัมผัส พร้อมกลิ่นหอมจากธรรมชาติ ",
    price: 250,
    amount: 3,
    img: "https://cx.lnwfile.com/_/cx/_raw/me/be/uu.jpg",
    categoryId: 3,
  },
  {
    id: 11,
    name: "พิมเสนน้ำ",
    detail: "พกพาสะดวก ให้กลิ่นหอม สดชื่น ดมแก้วิงเวียนศีรษะ เมารถ ใช้นวดบรรเทาปวด เมื่อยล้าจากการทำกิจกรรม",
    price: 40,
    amount: 3,
    img: "https://cx.lnwfile.com/_/cx/_raw/vk/e5/12.jpg",
    categoryId: 3,
  },
  {
    id: 12,
    name: "น้ำยาล้างจานกลิ่นตะไคร้หอม",
    detail: "น้ำยาล้างจานกลิ่นตะไคร้หอมและยูคาลิปตัส ขนาด 1,000 มล. (Lemon Grass & Eucalyptus Dishwashing Liquid)",
    price: 155,
    amount: 3,
    img: "https://cx.lnwfile.com/_/cx/_raw/h6/kd/qy.jpg",
    categoryId: 3,
  },


  // cate 4
  {
  id: 13,
  name: "เสื้อยืด I Love PATPAT ",
  detail: "	เสื้อยืด I Love PATPAT จากลายพระหัตถ์ (Upcycling T-shirt) - สีขาว",
  price: 200,
  amount: 10,
  img: "https://cx.lnwfile.com/_/cx/_raw/63/ue/5l.jpg",
  categoryId: 4,
},
{
  id: 14,
  name: "เสื้อโปโลภัทรพัฒน์ สีแดง",
  detail: "เสื้อโปโลภัทรพัฒน์ สีแดง มีทั้งของผู้ชาย และผู้หญิง ผลิตจากผ้า cotton 100% สวมใส่สบาย",
  price: 450,
  amount: 5,
  img: "https://th.kmsupergifts.com/uploads/202339877/ice-silk-polo-shirt0b6dde9e-b771-4ae5-bad2-886041fd6d81.jpg",
  categoryId: 4,
},
{
  id: 15,
  name: "กระเป๋าผ้าพิมพ์ลาย",
  detail: "กระเป๋าผ้าสะพายข้าง พิมพ์ลาย ทนทาน น้ำหนักเบา",
  price: 300,
  amount: 8,
  img: "https://image.makewebcdn.com/makeweb/m_1200x600/7zapn1NU1/Fabric%20Bag/21-Pentagram%20music%20bag.jpg",
  categoryId: 4,
},
{
  id: 16,
  name: "กระเป๋าเป้ลายสก็อตใหญ่",
  detail: "ผลิตภัณฑ์งานหัตถกรรมต่างๆ ถือเป็นภูมิปัญญาของมนุษย์ที่สร้างสรรค์มาจากรุ่นสู่รุ่น บ่งบอกถึงพื้นฐานรากเหง้าของชุมชน",
  price: 550,
  amount: 12,
  img: "https://cx.lnwfile.com/_/cx/_raw/te/ql/5d.png",
  categoryId: 4,
},


// cate 5
{
  id: 17,
  name: "โคมไฟไม้ไผ่",
  detail: "โคมไฟทำจากไม้ไผ่แท้ ให้แสงอบอุ่น เหมาะสำหรับตกแต่งบ้าน",
  price: 600,
  amount: 4,
  img: "https://www.xsxlightfactory.com/uploads/Bamboo-desk-lamp-China.jpg",
  categoryId: 5,
},
{
  id: 18,
  name: "พวงกุญแจช้างอัมพร",
  detail: "พวงกุญแจ สามารถนำไปเป็นของฝาก ใช้ห้อยกระเป๋า ห้อยกุญแจรถ",
  price: 100,
  amount: 6,
  img: "https://cx.lnwfile.com/_/cx/_raw/08/dn/3a.png",
  categoryId: 5,
},
{
  id: 19,
  name: "กล่องฝาพับลายดอกไม้",
  detail: "	กล่องอเนกประสงค์ สินค้าหัตถกรรมจากกลุ่มชุมชน",
  price: 400,
  amount: 3,
  img: "https://cx.lnwfile.com/_/cx/_raw/nw/am/qk.jpg",
  categoryId: 5,
},
{
  id: 20,
  name: "ครอบครัวไก่ เผ่าอาข่า",
  detail: "ตุ๊กตาครอบครัวไก่ ใช้วางตกแต่งบ้าน ร้านค้า ร้านอาหาร",
  price: 275,
  amount: 2,
  img: "https://cx.lnwfile.com/_/cx/_raw/f4/12/hf.png",
  categoryId: 5,
},
]);

// Category Data
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

// Selected Category
const selectedCategoryId = ref(0); // 0 = All categories

// Function to Filter Products by Category
const getProductsByCategory = (categoryId: number): Product[] => {
  return products.value.filter((product) => product.categoryId === categoryId);
};
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
