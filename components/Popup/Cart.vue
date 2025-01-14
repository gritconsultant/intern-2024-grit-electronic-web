<template>
  <div
    class="w-full md:w-[500px] h-full border-2 flex flex-col gap-2 rounded-[5px] bg-[#FFFFFF] drop-shadow-lg overflow-hidden"
  >
    <!-- Header -->
    <div class="flex justify-between items-center p-4 md:p-5 border-b-2">
      <h1 class="text-sm md:text-base font-bold">
        ตะกร้าสินค้า ({{ cartItems.length }})
      </h1>
      <h2
        @click="clearCart"
        class="text-red-500 cursor-pointer text-xs md:text-sm ml-auto"
      >
        ลบทั้งหมด
      </h2>
      <button @click="closeCart">
        <svg
          class="w-5 h-5 md:w-6 md:h-6 hover:text-red-500"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
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
    <div class="px-4 md:px-5 flex-grow overflow-y-auto">
      <div
        v-for="(item, index) in cartItems"
        :key="item.id"
        class="flex justify-between items-center border-b py-2"
      >
        <img
          :src="item.img"
          alt="product"
          class="w-[50px] h-[50px] md:w-[75px] md:h-[75px] object-cover rounded-md"
        />
        <div class="flex-1 ml-2 md:ml-4">
          <div class="flex justify-between">
            <div>
              <p class="text-sm md:text-md font-normal">{{ item.name }}</p>
              <div class="font-normal text-xs text-black/50">
                <p class="texthide">{{ item.detail }}</p>
              </div>
            </div>
            <div>
              <button @click="removeItem(index)" class="text-red-500">
                <svg
                  class="w-[15px] h-[15px] md:w-[17px] md:h-[17px] hover:text-red-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
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
            <div class="flex items-center gap-2 mt-2 md:mt-3 border border-1 rounded">
              <button @click="decreaseQuantity(index)" class="px-2 text-xs md:text-sm">
                -
              </button>
              <span class="text-sm md:text-base">{{ item.amount }}</span>
              <button @click="increaseQuantity(index)" class="px-2 text-xs md:text-sm">
                +
              </button>
            </div>

            <div class="mt-2 md:mt-3">
              <p class="font-semibold text-sm md:text-lg">฿{{ item.price }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="p-4 border-t mt-4 bg-gray-100">
      <div class="flex justify-between font-medium">
        <span class="text-sm md:text-base">ราคารวม:</span>
        <span class="text-sm md:text-base">฿{{ totalPrice }}</span>
      </div>
      <div class="flex flex-col items-center mt-5 md:mt-10">
        <button
          @click="checkout"
          class="popupbtn w-full mb-2 text-sm md:text-base py-2"
        >
          สั่งซื้อสินค้า
        </button>
        <button
          @click="closeCart"
          class="w-full text-gray-500 text-xs md:text-sm hover:underline mt-2 md:mt-5"
        >
          เลือกซื้อสินค้าต่อ →
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "auth",
});

import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useIndexStore } from "~/store/main";
import type { Product } from "~/models/product.model";

const store = useIndexStore();
const router = useRouter();

// State สำหรับสินค้าในตะกร้า
const cartItems = ref<Product[]>([
  {
    id: 1,
    name: "มะขาม 4 รส",
    detail:
      "มะขาม 4 รส มะขามคลุก (บ้านมะขาม) โดยบริษัทสวนผึ้ง จำกัด ",
    price: 62,
    amount: 1,
    img: "https://th-test-11.slatic.net/p/2b0d5f80a00b77d2c6490b09a053a1c0.png",
  },
  {
    id: 2,
    name: "มะขามคลุกบ๊วย 4 รส",
    detail: "มะขามแกะเปลือก ปรุงรสด้วย นำ้ตาล พริก เกลือ และผงบ๊วย ",
    price: 62,
    amount: 1,
    img: "https://halal.co.th/storages/products/343928.png",
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
const closeCart = () => {
  store.cartAction = false;
};

// ไปหน้า test.vue
const checkout = () => {
  closeCart();
  router.push("/order/checkout");
};
</script>

<style scoped>
/* Responsive styling */
@media (max-width: 768px) {
  .popupbtn {
    font-size: 12px;
    padding: 8px;
  }
}
</style>
