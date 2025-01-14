<template>
  <div class="p-4 flex flex-col">
    <div class="flex">
      <!-- Sidebar -->
      <Sidebar />

      <!-- Main Content -->
      <div class="w-full lg:w-3/4 p-6">
        <div class="border-b">
          <h1 class="text-xl font-bold mb-6">คำสั่งซื้อของฉัน</h1>
        </div>

        <!-- Tabs -->
        <div class="mt-5">
          <Tab />
        </div>

        <!-- Content Section -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[65%]">
          <!-- Order List -->
          <div class="bg-white p-4 rounded-lg shadow border overflow-y-auto">
            <h2 class="font-bold mb-4">รายการคำสั่งซื้อ</h2>
            <div
              v-for="order in orders"
              :key="order.id"
              @click="selectOrder(order)"
              class="cursor-pointer border-b p-4"
              :class="{
                'bg-gray-100': selectedOrder && selectedOrder.id === order.id,
              }"
            >
              <div class="flex justify-between items-center">
                <div>
                  <p>หมายเลขคำสั่งซื้อ #{{ order.id }}</p>
                  <p class="text-gray-500 text-sm">{{ order.date }}</p>
                </div>
                <p class="text-lg font-bold">฿{{ order.total }}</p>
              </div>
            </div>
          </div>

          <!-- Selected Order Details -->
          <div class="bg-white p-4 rounded-lg shadow border overflow-y-auto">
            <h2 class="font-bold mb-4">รายละเอียดคำสั่งซื้อ</h2>
            <div v-if="selectedOrder">
              <!-- Products -->
              <div
                v-for="product in selectedOrder.products"
                :key="product.id"
                class="flex items-center space-x-4 border-b pb-4"
              >
                <div class="w-24 h-24">
                  <img
                    :src="product.img"
                    alt="product"
                    class="w-full h-full object-cover"
                  />
                </div>
                <div class="flex-grow">
                  <div class="flex justify-between">
                    <h2 class="font-bold">{{ product.name }}</h2>
                    <p class="text-lg font-bold">฿{{ product.price }}</p>
                  </div>
                  <p class="text-gray-500 text-sm">{{ product.detail }}</p>
                  <p class="text-gray-500 text-sm">
                    จำนวน: {{ product.amount }}
                  </p>
                </div>
              </div>

              <!-- Address -->
              <div class="mt-4 border-b pb-4">
                <h3 class="font-bold">ที่อยู่ของคุณ</h3>
                <p class="text-gray-500 text-sm mt-4">
                  ชื่อผู้รับ : {{ selectedOrder.namerecipe }}
                </p>
                <p class="text-gray-500 text-sm">
                  ที่อยู่ : {{ selectedOrder.address }}
                </p>
              </div>

              <!-- Delivery Method -->
              <div class="mt-4 space-y-4 border-b pb-4">
                <h3 class="font-bold">จัดส่งโดย</h3>
                <div class="border flex items-center rounded-lg">
                  <div class="w-20 h-20 rounded-lg">
                    <img
                      src="https://file.thailandpost.com/upload/content/cs4_New%20logo%20THP%20-04_63bce2f853fe8_63f8243acc06e.jpg"
                      class="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <p class="text-md font-medium">
                    ไปรษณีย์ไทย <br />
                    <span class="text-sm font-normal text-gray-500">
                      จัดส่งโดยไปรษณีย์ไทย (Thailand Post)
                    </span>
                  </p>
                </div>
              </div>

              <!-- Payment -->
              <div class="mt-4 space-y-4">
                <h3 class="font-bold">การชำระเงิน</h3>
                <p class="text-sm font-medium">
                  OR Code Prompt Pay <br />
                  <span class="text-sm font-normal text-gray-500">
                    ชำระเงินด้วย OR Code Prompt Pay หรือ เลขบัญชี
                  </span>
                </p>
              </div>

              <!-- Payment Button -->
              <div class="flex space-x-4 mt-4">
                <button
                  class="flex-1 py-2 bg-[#FCCA81] hover:bg-[#EE973C] text-white rounded-lg"
                  @click="store.paymentAction = true"
                >
                  ชำระเงิน
                </button>
              </div>
            </div>
            <div v-else class="text-center text-gray-500">เลือกคำสั่งซื้อ</div>
          </div>
        </div>
      </div>
      <!-- Payment Popup -->
      <div
        v-if="store.paymentAction"
        class="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
      >
        <PopupPayment />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "user",
});

import { ref } from "vue";
import type { Order } from "~/models/product.model";
import { useIndexStore } from "~/store/main";

const store = useIndexStore();

// Sample orders data
const orders = ref<Order[]>([
  {
    id: "778231342",
    date: "26 ตุลาคม 2566",
    total: 164,
    deliveryDate: "19-26 พฤศจิกายน 2566",
    products: [
      {
        id: 1,
        name: "มะขาม 4 รส",
        detail: "มะขาม 4 รส มะขามคลุก (บ้านมะขาม) โดยบริษัทสวนผึ้ง จำกัด ",
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
    ],
    shippingStatus: [],
    namerecipe: "คมเข้ม คำเกษ 098 765 4321",
    address: "kku เพลส อำเภอเมือง ตำบลในเมือง จังหวัดขอนแก่น 40000",
  },
  {
    id: "10292348935",
    date: "29 ตุลาคม 2566",
    total: 117,
    deliveryDate: "12-19 ธันวาคม 2566",
    products: [
    {
    id: 3,
    name: "เลมอนอบแห้ง รสน้ำผึ้ง",
    detail: "เลมอนอบแห้ง ผสมด้วย ผงน้ำผึ้ง ",
    price: 59,
    amount: 1,
    img: "https://halal.co.th/storages/products/390694.jpg",
  },
  {
    id: 4,
    name: "เผือกกรอบไส้เสาวรส",
    detail: "บริษัท สวนผึ้งหวาน จำกัด เผือกกรอบไส้เสาวรส ",
    price: 58,
    amount: 1,
    img: "https://halal.co.th/storages/products/680694.jpg",
  },
    ],
    shippingStatus: [],
    namerecipe: "คมเข้ม คำเกษ 098 765 4321",
    address: "kku เพลส อำเภอเมือง ตำบลในเมือง จังหวัดขอนแก่น 40000",
  },
]);

const selectedOrder = ref<Order | null>(null);

const selectOrder = (order: Order) => {
  selectedOrder.value = order;
};
</script>

<style scoped>
/* Scrollable content */
.overflow-y-auto {
  max-height: calc(75%); /* Adjust based on layout */
}
</style>
