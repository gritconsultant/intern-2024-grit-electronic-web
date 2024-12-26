<template>
  <div
    class="w-[400px] h-full border-2 flex flex-col gap-2 rounded-[5px] bg-[#FFFFFF] drop-shadow-lg"
  >
    <div class="flex justify-between items-center p-5 border-b-2">
      <h1>ตะกร้าสินค้า ({{ cartItems.length }})</h1>
      <h2 @click="clearCart" class="text-red-500 cursor-pointer ml-28">
        ลบทั้งหมด
      </h2>
      <button @click="closeCart">
        <svg
          class="w-6 h-6 hover:text-red-500"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >       
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18 17.94 6M18 18 6.06 6"
          />
        </svg>
      </button>
    </div>

    <!-- Cart Items -->
    <div class="px-5 max-h-80">
      <div
        v-for="(item, index) in cartItems"
        :key="item.id"
        class="flex justify-between items-center border-b py-2"
      >
        <img
          :src="item.img"
          alt="product"
          class="w-16 h-16 object-cover rounded-md"
        />
        <div class="flex-1 ml-2">
          <div class="flex justify-between">
            <div>
              <p class="text-sm font-medium">{{ item.name }}</p>
            </div>
            <div>
              <button @click="removeItem(index)" class="text-red-500">
                <svg
                  class="w-[17px] h-[17px] hover:text-red-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                  />
                </svg>
              </button>
            </div>
          </div>


          <div class="flex justify-between items-center">
            <div class="flex items-center gap-2 mt-3 border border-1 rounded">
              <button
                @click="decreaseQuantity(index)"
                class="px-2"
              >
                -
              </button>
              <span>{{ item.amount }}</span>
              <button
                @click="increaseQuantity(index)"
                class="px-2"
              >
                +
              </button>
            </div>

            <div class="mt-3">
              <p class="fontsubheader">฿{{ item.price }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="p-4 border-t mt-4 bg-gray-100">
      <div class="flex justify-between font-medium">
        <span>ราคารวม:</span>
        <span class=" text-base">฿{{ totalPrice }}</span>
      </div>
      <button
        @click="checkout"
        class="mt-4 popupbtn"
      >
        สั่งซื้อสินค้า
      </button>
      <button
        @click="closeCart"
        class="w-full mt-2 text-gray-500 text-sm hover:underline"
      >
        เลือกซื้อสินค้าต่อ →
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "auth",
});

import { reactive, computed } from "vue";
import type { Product } from "~/models/product.model";

// State สำหรับสินค้าในตะกร้า
const cartItems = ref<Product[]>([
  {
    id: 1,
    name: "Aspire Go โน๊ตบุ๊ค",
    detail: "Intel Core i3, RAM 8GB",
    price: 13990,
    amount: 1,
    img: "https://via.placeholder.com/50",
  },
  {
    id: 2,
    name: "White - S98 คีย์บอร์ดไร้สาย",
    detail: "Gasket Mechanical Keyboard",
    price: 2990,
    amount: 1,
    img: "https://via.placeholder.com/50",
  },
  {
    id: 3,
    name: "White - S98 คีย์บอร์ดไร้สาย",
    detail: "Gasket Mechanical Keyboard",
    price: 2990,
    amount: 1,
    img: "https://via.placeholder.com/50",
  },
  {
    id: 4,
    name: "White - S98 คีย์บอร์ดไร้สาย",
    detail: "Gasket Mechanical Keyboard",
    price: 2990,
    amount: 1,
    img: "https://via.placeholder.com/50",
  },
]);

// คำนวณราคารวม
const totalPrice = computed(() =>
  cartItems.value.reduce((sum, item) => sum + item.price * item.amount, 0)
);

// เพิ่มจำนวนสินค้า
const increaseQuantity = (index: number) => {
  cartItems.value[index].amount++;
};

// ลดจำนวนสินค้า
const decreaseQuantity = (index: number) => {
  if (cartItems.value[index].amount > 1) {
    cartItems.value[index].amount--;
  }
};

// ลบสินค้าออกจากตะกร้า
const removeItem = (index: number) => {
  cartItems.value.splice(index, 1);
};

// ล้างตะกร้าสินค้า
const clearCart = () => {
  cartItems.value = [];
};

// ปิด Popup
const emit = defineEmits(["close"]);
const closeCart = () => {
  emit("close");
};

// ไปหน้า Checkout
const checkout = () => {
  alert("กำลังไปหน้าชำระเงิน...");
};
</script>

<style scoped></style>
