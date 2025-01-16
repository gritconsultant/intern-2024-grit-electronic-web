<template>
    <div class="flex p-4">
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
  
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Order List -->
          <div class="bg-white p-4 rounded-lg shadow border overflow-y-auto sticky top-0" style="max-height: 48vh">
            <h2 class="font-bold mb-4">รายการคำสั่งซื้อ</h2>
            <div
              v-for="order in orders"
              :key="order.id"
              @click="selectOrder(order)"
              class="cursor-pointer border-b p-4"
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
          <div class="bg-white p-4 rounded-lg shadow border overflow-y-auto sticky top-0" style="max-height: 48vh">
            <h2 class="font-bold mb-4">รายละเอียดคำสั่งซื้อ</h2>
            <div v-if="selectedOrder">
              <!-- Products -->
              <div
                v-for="product in selectedOrder.products"
                :key="product.id"
                class="flex items-center space-x-4 border-b pb-4 cursor-pointer"
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
                  <p class="text-gray-500 text-sm">จำนวน: {{ product.amount }}</p>
                </div>
              </div>
  
              <!-- Address -->
              <div class="mt-4 border-b pb-4">
                <h3 class="font-bold">ที่อยู่ของคุณ</h3>
                <p class="text-gray-500 text-sm mt-4">ชื่อผู้รับ : {{ selectedOrder.namerecipe }}</p>
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
  definePageMeta({
  layout: "user",
});

  import { ref } from "vue";
  import type { Order } from "~/models/product.model";
  import { useIndexStore } from "~/store/main";
  
  const store = useIndexStore();
  
  const orders = ref<Order[]>([
  {
    id: "778231342",
    date: "26 ตุลาคม 2566",
    total: 124,
    deliveryDate: "17-20 พฤศจิกายน 2566",
    products: [
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
        detail:
          "กิฟฟารีน วีทกราส (เครื่องดื่มใบอ่อนข้าวสาลีชนิดผง) (ตรากิฟฟารีน)",
        price: 150,
        amount: 3,
        img: "https://halal.co.th/storages/products/p135225.jpg",
        categoryId: 2,
      },
      {
        id: 3,
        name: "เครื่องดื่มรังนกสำเร็จรูป",
        detail: "ดอกบัวคู่ เครื่องดื่มรังนกสำเร็จรูป สูตรดั้งเดิม",
        price: 150,
        amount: 5,
        img: "https://halal.co.th/storages/products/679578.jpg",
        categoryId: 2,
      },
      {
        id: 4,
        name: "เครื่องดื่มใบอ่อนข้าวสาลีชนิดผง",
        detail:
          "กิฟฟารีน วีทกราส (เครื่องดื่มใบอ่อนข้าวสาลีชนิดผง) (ตรากิฟฟารีน)",
        price: 150,
        amount: 3,
        img: "https://halal.co.th/storages/products/p135225.jpg",
        categoryId: 2,
      },
    ],
    shippingStatus: [
      { text: "การจัดส่งสำเร็จ", date: "23 พฤศจิกายน 2566 17:00 น.", isCurrent: true },
      { text: "อยู่ระหว่างการจัดส่ง", date: "23 พฤศจิกายน 2566 16:00 น.", isCurrent: false },
      { text: "พัสดุอยู่ที่ศูนย์เตรียมสินค้า", date: "23 พฤศจิกายน 2566 04:19 น.", isCurrent: false },
    ],
    namerecipe: "คมเข้ม คำเกษ 098 765 4321",
    address: "kku เพลส อำเภอเมือง ตำบลในเมือง จังหวัดขอนแก่น 40000",
  },
  {
    id: "137782342",
    date: "26 ตุลาคม 2566",
    total: 124,
    deliveryDate: "17-20 พฤศจิกายน 2566",
    products: [
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
        detail:
          "กิฟฟารีน วีทกราส (เครื่องดื่มใบอ่อนข้าวสาลีชนิดผง) (ตรากิฟฟารีน)",
        price: 150,
        amount: 3,
        img: "https://halal.co.th/storages/products/p135225.jpg",
        categoryId: 2,
      },
      {
        id: 3,
        name: "เครื่องดื่มรังนกสำเร็จรูป",
        detail: "ดอกบัวคู่ เครื่องดื่มรังนกสำเร็จรูป สูตรดั้งเดิม",
        price: 150,
        amount: 5,
        img: "https://halal.co.th/storages/products/679578.jpg",
        categoryId: 2,
      },
      {
        id: 4,
        name: "เครื่องดื่มใบอ่อนข้าวสาลีชนิดผง",
        detail:
          "กิฟฟารีน วีทกราส (เครื่องดื่มใบอ่อนข้าวสาลีชนิดผง) (ตรากิฟฟารีน)",
        price: 150,
        amount: 3,
        img: "https://halal.co.th/storages/products/p135225.jpg",
        categoryId: 2,
      },
    ],
    shippingStatus: [
      { text: "การจัดส่งสำเร็จ", date: "23 พฤศจิกายน 2566 17:00 น.", isCurrent: true },
      { text: "อยู่ระหว่างการจัดส่ง", date: "23 พฤศจิกายน 2566 16:00 น.", isCurrent: false },
      { text: "พัสดุอยู่ที่ศูนย์เตรียมสินค้า", date: "23 พฤศจิกายน 2566 04:19 น.", isCurrent: false },
    ],
    namerecipe: "คมเข้ม คำเกษ 098 765 4321",
    address: "kku เพลส อำเภอเมือง ตำบลในเมือง จังหวัดขอนแก่น 40000",
  },
  {
    id: "342778231",
    date: "26 ตุลาคม 2566",
    total: 124,
    deliveryDate: "17-20 พฤศจิกายน 2566",
    products: [
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
        detail:
          "กิฟฟารีน วีทกราส (เครื่องดื่มใบอ่อนข้าวสาลีชนิดผง) (ตรากิฟฟารีน)",
        price: 150,
        amount: 3,
        img: "https://halal.co.th/storages/products/p135225.jpg",
        categoryId: 2,
      },
      {
        id: 3,
        name: "เครื่องดื่มรังนกสำเร็จรูป",
        detail: "ดอกบัวคู่ เครื่องดื่มรังนกสำเร็จรูป สูตรดั้งเดิม",
        price: 150,
        amount: 5,
        img: "https://halal.co.th/storages/products/679578.jpg",
        categoryId: 2,
      },
      {
        id: 4,
        name: "เครื่องดื่มใบอ่อนข้าวสาลีชนิดผง",
        detail:
          "กิฟฟารีน วีทกราส (เครื่องดื่มใบอ่อนข้าวสาลีชนิดผง) (ตรากิฟฟารีน)",
        price: 150,
        amount: 3,
        img: "https://halal.co.th/storages/products/p135225.jpg",
        categoryId: 2,
      },
    ],
    shippingStatus: [
      { text: "การจัดส่งสำเร็จ", date: "23 พฤศจิกายน 2566 17:00 น.", isCurrent: true },
      { text: "อยู่ระหว่างการจัดส่ง", date: "23 พฤศจิกายน 2566 16:00 น.", isCurrent: false },
      { text: "พัสดุอยู่ที่ศูนย์เตรียมสินค้า", date: "23 พฤศจิกายน 2566 04:19 น.", isCurrent: false },
    ],
    namerecipe: "คมเข้ม คำเกษ 098 765 4321",
    address: "kku เพลส อำเภอเมือง ตำบลในเมือง จังหวัดขอนแก่น 40000",
  },
  {
    id: "177823342",
    date: "26 ตุลาคม 2566",
    total: 124,
    deliveryDate: "17-20 พฤศจิกายน 2566",
    products: [
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
        detail:
          "กิฟฟารีน วีทกราส (เครื่องดื่มใบอ่อนข้าวสาลีชนิดผง) (ตรากิฟฟารีน)",
        price: 150,
        amount: 3,
        img: "https://halal.co.th/storages/products/p135225.jpg",
        categoryId: 2,
      },
      {
        id: 3,
        name: "เครื่องดื่มรังนกสำเร็จรูป",
        detail: "ดอกบัวคู่ เครื่องดื่มรังนกสำเร็จรูป สูตรดั้งเดิม",
        price: 150,
        amount: 5,
        img: "https://halal.co.th/storages/products/679578.jpg",
        categoryId: 2,
      },
      {
        id: 4,
        name: "เครื่องดื่มใบอ่อนข้าวสาลีชนิดผง",
        detail:
          "กิฟฟารีน วีทกราส (เครื่องดื่มใบอ่อนข้าวสาลีชนิดผง) (ตรากิฟฟารีน)",
        price: 150,
        amount: 3,
        img: "https://halal.co.th/storages/products/p135225.jpg",
        categoryId: 2,
      },
    ],
    shippingStatus: [
      { text: "การจัดส่งสำเร็จ", date: "23 พฤศจิกายน 2566 17:00 น.", isCurrent: true },
      { text: "อยู่ระหว่างการจัดส่ง", date: "23 พฤศจิกายน 2566 16:00 น.", isCurrent: false },
      { text: "พัสดุอยู่ที่ศูนย์เตรียมสินค้า", date: "23 พฤศจิกายน 2566 04:19 น.", isCurrent: false },
    ],
    namerecipe: "คมเข้ม คำเกษ 098 765 4321",
    address: "kku เพลส อำเภอเมือง ตำบลในเมือง จังหวัดขอนแก่น 40000",
  },
  {
    id: "998231342",
    date: "26 ตุลาคม 2566",
    total: 124,
    deliveryDate: "17-20 พฤศจิกายน 2566",
    products: [
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
        detail:
          "กิฟฟารีน วีทกราส (เครื่องดื่มใบอ่อนข้าวสาลีชนิดผง) (ตรากิฟฟารีน)",
        price: 150,
        amount: 3,
        img: "https://halal.co.th/storages/products/p135225.jpg",
        categoryId: 2,
      },
      {
        id: 3,
        name: "เครื่องดื่มรังนกสำเร็จรูป",
        detail: "ดอกบัวคู่ เครื่องดื่มรังนกสำเร็จรูป สูตรดั้งเดิม",
        price: 150,
        amount: 5,
        img: "https://halal.co.th/storages/products/679578.jpg",
        categoryId: 2,
      },
      {
        id: 4,
        name: "เครื่องดื่มใบอ่อนข้าวสาลีชนิดผง",
        detail:
          "กิฟฟารีน วีทกราส (เครื่องดื่มใบอ่อนข้าวสาลีชนิดผง) (ตรากิฟฟารีน)",
        price: 150,
        amount: 3,
        img: "https://halal.co.th/storages/products/p135225.jpg",
        categoryId: 2,
      },
    ],
    shippingStatus: [
      { text: "การจัดส่งสำเร็จ", date: "23 พฤศจิกายน 2566 17:00 น.", isCurrent: true },
      { text: "อยู่ระหว่างการจัดส่ง", date: "23 พฤศจิกายน 2566 16:00 น.", isCurrent: false },
      { text: "พัสดุอยู่ที่ศูนย์เตรียมสินค้า", date: "23 พฤศจิกายน 2566 04:19 น.", isCurrent: false },
    ],
    namerecipe: "คมเข้ม คำเกษ 098 765 4321",
    address: "kku เพลส อำเภอเมือง ตำบลในเมือง จังหวัดขอนแก่น 40000",
  },
]);
  
  const selectedOrder = ref<Order | null>(null);
  
  // Function to select an order
  const selectOrder = (order: Order): void => {
    selectedOrder.value = order;
  };
  </script>
  
  <style scoped>
.sticky {
  position: sticky;
}
  </style>
  