<template>
    <div class="flex">
      <!-- Sidebar -->
      <Sidebar />
  
      <!-- Content -->
      <div class="w-full lg:w-3/4 p-6">
        <div class="border-b">
          <h1 class="text-xl font-bold mb-6">คำสั่งซื้อของฉัน</h1>
        </div>

  
        <!-- Tabs -->
        <div class="mt-5">
          <Tab />
        </div>
  
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[600px]">
          <!-- Order List -->
          <div class="bg-white p-4 rounded-lg shadow border overflow-y-auto">
            <h2 class="font-bold mb-4">รายการคำสั่งซื้อ</h2>
            <div
              v-for="order in orders"
              :key="order.id"
              @click="selectOrder(order)"
              class="cursor-pointer border-b p-4 mb-4"
              :class="{ 'bg-gray-100': selectedOrder && selectedOrder.id === order.id }"
            >
            <div class="flex justify-between items-center">
              <div>
                <p>หมายเลขคำสั่งซื้อ #{{ order.id }}</p>
                <p class="text-gray-500 text-sm">{{ order.date }}</p>
                <p class="text-gray-500 text-sm">ได้รับภายในวันที่ {{ order.deliveryDate }}</p>
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
                <div class="w-[170px] h-[120px]">
                  <img
                    :src="product.img"
                    alt="product"
                    class="w-full h-full object-cover"
                  />
                </div>
                <div class="w-full">
                  <div class="flex justify-between">
                    <h2 class="font-bold">{{ product.name }}</h2>
                    <p class="text-lg font-bold">฿{{ product.price }}</p>
                  </div>
                  <p class="text-gray-500 text-sm">{{ product.detail }}</p>
                  <p class="text-gray-500 text-sm">จำนวน: {{ product.amount }}</p>
                </div>
              </div>
  
              <!-- Address -->
              <div class="mt-4 border-b pb-4">
                <h3 class="font-bold">ที่อยู่ของคุณ</h3>
                <p class="text-gray-500 text-sm mt-4">ที่อยู่ : {{ selectedOrder.namerecipe }}</p>
                <p class="text-gray-500 text-sm">ที่อยู่ : {{ selectedOrder.address }}</p>
              </div>
            <!-- Shipping Status -->
            <div class="mt-4 space-y-4 border-b pb-4">
              <h3 class="font-bold">สถานะการจัดส่ง</h3>
              <div v-for="status in selectedOrder.shippingStatus" :key="status.text" class="flex items-center">
                <input
                  type="radio"
                  :checked="status.isCurrent"
                  class="mr-2"
                  disabled
                />
                <div>
                  <p>{{ status.text }}</p>
                  <p class="text-gray-500 text-sm">{{ status.date }}</p>
                </div>
              </div>
            </div>
  
            </div>
  
            <!-- No Order Selected -->
            <div v-else class="text-center text-gray-500">
              เลือกคำสั่งซื้อ
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from "vue";
  import type { Order } from "~/models/product.model";
  import { useIndexStore } from "~/store/main";
  
  const store = useIndexStore();
  
  const orders = ref<Order[]>([
  {
    id: "778231342",
    date: "26 ตุลาคม 2566",
    total: 50878,
    deliveryDate: "17-20 พฤศจิกายน 2566",
    products: [
      {
        id: 1,
        name: "แหวนเพชรบาเกตต์",
        detail: "47 — ทองคำขาว 9k",
        price: 24999,
        amount: 1,
        img: "https://via.placeholder.com/100",
      },
      {
        id: 2,
        name: "แหวนเพชรบาเกตต์",
        detail: "47 — ทองคำขาว 9k",
        price: 24999,
        amount: 1,
        img: "https://via.placeholder.com/100",
      },
    ],
    shippingStatus: [
      { text: "การจัดส่งสำเร็จ", date: "23 พฤศจิกายน 2566 17:00 น.", isCurrent: true },
      { text: "อยู่ระหว่างการจัดส่ง", date: "23 พฤศจิกายน 2566 16:00 น.", isCurrent: false },
      { text: "พัสดุอยู่ที่ศูนย์เตรียมสินค้า", date: "23 พฤศจิกายน 2566 04:19 น.", isCurrent: false },
    ],
    namerecipe: "คมเข้ม คำเกษ",
    address: "ที่อยู่คำเกษ",
  },
]);
  
  const selectedOrder = ref<Order | null>(null);
  
  // Function to select an order
  const selectOrder = (order: Order): void => {
    selectedOrder.value = order;
  };
  </script>
  
  <style scoped>
  .cursor-pointer.bg-gray-100 {
    transition: background-color 0.3s ease-in-out;
  }
  </style>
  