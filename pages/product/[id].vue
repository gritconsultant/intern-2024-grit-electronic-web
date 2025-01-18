<template>
  <div v-if="product">
    <div class="p-10">
      <div class="mx-[20px] lg:mx-[50px]">
        <div class="w-full lg:w-3/6 p-2">แท็ก</div>
        <div class="flex flex-col lg:flex-row justify-between gap-4">
          <div class="w-full p-2">
            <div class="p-2 flex justify-center">
              <img
                class="object-cover max-w-full h-auto"
                :src="product.img"
                :alt="product.name"
              />
            </div>
          </div>
          <div class="w-full lg:w-3/6 p-5">
            <h1 class="font-bold text-2xl">{{ product.name }}</h1>
            <div class="my-[20px] font-semibold text-[#FF0808] text-2xl lg:text-4xl">
              ฿{{ product.price }}
            </div>
            <button
              class="bg-[#FCCA81] text-white p-[15px] rounded-[10px] w-full lg:w-[350px] transition hover:bg-[#EE973C]"
              @click="addToCart"
            >
              <div class="flex justify-center gap-4">
                <i class="fa-solid fa-cart-plus"></i>
                เพิ่มใส่ตะกร้า
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>


<script lang="ts" setup>
import { useRoute } from "vue-router";
import { useIndexStore } from "~/store/main";

// เรียกใช้ route และ store
const route = useRoute();
const store = useIndexStore();

// Mock Product Data
const products = [
  {
    id: 1,
    name: "มะขาม 4 รส",
    detail: "มะขาม 4 รส มะขามคลุก (บ้านมะขาม) โดยบริษัทสวนผึ้ง จำกัด",
    price: 62,
    amount: 10,
    img: "https://th-test-11.slatic.net/p/2b0d5f80a00b77d2c6490b09a053a1c0.png",
  },
  {
    id: 2,
    name: "มะขามคลุกบ๊วย 4 รส",
    detail: "มะขามแกะเปลือก ปรุงรสด้วย นำ้ตาล พริก เกลือ และผงบ๊วย",
    price: 62,
    amount: 13,
    img: "https://halal.co.th/storages/products/343928.png",
  },
  {
    id: 3,
    name: "เลมอนอบแห้ง รสน้ำผึ้ง",
    detail: "เลมอนอบแห้ง ผสมด้วย ผงน้ำผึ้ง",
    price: 59,
    amount: 10,
    img: "https://halal.co.th/storages/products/390694.jpg",
  },
];

// ดึงข้อมูลสินค้า
const product = products.find((item) => item.id === Number(route.params.id));

// เพิ่มสินค้าในตะกร้า
const addToCart = () => {
  if (!product) return;
  store.addToCart({ ...product, selectedAmount: 1 });
  alert("เพิ่มสินค้าในตะกร้าสำเร็จ!");
};
</script>


<style scoped>
.photoselect img {
  transition: transform 0.2s;
}
.photoselect img:hover {
  transform: scale(1.1);
}
</style>
