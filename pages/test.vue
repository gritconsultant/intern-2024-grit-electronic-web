<template>
  <div class="flex p-4">
    <!-- Sidebar -->
    <Sidebar />

    <!-- Content -->
    <div class="w-full lg:w-3/4 p-6 ">
      <div class="border-b">
        <h1 class="text-xl font-bold mb-6">คืนสินค้า</h1>
      </div>

      <!-- Tabs -->
      <div class="mt-5">
        <Tab />
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[50%]">
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
              </div>
              <p class="text-lg font-bold">฿{{ order.total }}</p>
            </div>
          </div>
        </div>

        <!-- Selected Order Details -->
        <div class="bg-white p-4 rounded-lg shadow border  overflow-y-auto">
          <h2 class="font-bold mb-4">รายละเอียดคำสั่งซื้อ</h2>
          <div v-if="selectedOrder">
            <!-- Products -->
            <div
              v-for="product in selectedOrder.products"
              :key="product.id"
              class="flex items-center space-x-4 border-b pb-4"
              :class="{ 'bg-gray-100': selectedProduct && selectedProduct.id === product.id }"
              @click="selectProduct(product)"
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
              <p class="text-gray-500 text-sm mt-4">ชื่อผู้รับ : {{ selectedOrder.namerecipe }}</p>
              <p class="text-gray-500 text-sm">ที่อยู่ : {{ selectedOrder.address }}</p>
            </div>

            <!-- Return Button -->
            <div class="mt-6">
              <button
                v-if="selectedProduct"
                @click="goToReturnPage"
                class="text-white bg-[#FCCA81] hover:bg-[#EE973C] hover:text-black rounded-lg p-3"
              >
                คืนสินค้า: {{ selectedProduct.name }}
              </button>
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
import type { Order, Product } from "~/models/product.model";
import { useRouter } from "vue-router";

definePageMeta({
  layout: "user",
});

const router = useRouter();

const orders = ref<Order[]>([
  {
    id: "778231342",
    date: "26 ตุลาคม 2566",
    deliveryDate: "17-20 พฤศจิกายน 2566",
    total: 124,
    products: [
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
    ],
    shippingStatus: [],
    namerecipe: "คมเข้ม คำเกษ",
    address: "KKU เพลส อำเภอเมือง ตำบลในเมือง จังหวัดขอนแก่น 40000",
  },
]);

const selectedOrder = ref<Order | null>(null);
const selectedProduct = ref<Product | null>(null);

const selectOrder = (order: Order): void => {
  selectedOrder.value = order;
  selectedProduct.value = null; // Reset selected product when new order is selected
};

const selectProduct = (product: Product): void => {
  selectedProduct.value = product;
};

const goToReturnPage = (): void => {
  if (selectedOrder.value && selectedProduct.value) {
    router.push({
      name: "ReturnOrder",
      params: {
        orderId: selectedOrder.value.id,
        productId: selectedProduct.value.id,
      },
    });
  }
};
</script>


<style scoped>
/* Scrollable content */
.overflow-y-auto {
  max-height: calc(75%); /* Adjust based on layout */
}
</style>
