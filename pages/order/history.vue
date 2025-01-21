<template>
  <div class="flex p-4">
    <!-- Sidebar -->
    <Sidebar />

    <!-- Content -->
    <div class="w-full lg:w-3/4 p-6">
      <div class="border-b">
        <h1 class="text-xl font-bold mb-6">ประวัติการซื้อ</h1>
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

      <!-- Products in Selected Order -->
      <div class="bg-white p-4 rounded-lg shadow border overflow-y-auto sticky top-0" style="max-height: 48vh">
        <h2 class="font-bold mb-4">สินค้าภายในคำสั่งซื้อ</h2>
        <div v-if="selectedOrder">
          <div
            v-for="product in selectedOrder.products"
            :key="product.id"
            class="flex items-center space-x-4 border-b p-4 cursor-pointer "
            :class="{
              'bg-gray-200': isSelected(product),
            }"
            @click="toggleProductSelection(product)"
          >
            <div class="w-24 h-24">
              <img :src="product.img" alt="product" class="w-full h-full object-cover" />
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

          <!-- Return Button -->
          <div class="mt-6">
            <button
              v-if="selectedProducts.length"
              @click="goToRefundPage"
              class="text-white bg-[#FCCA81] hover:bg-[#EE973C] hover:text-black rounded-lg p-3"
            >
              คืนสินค้า: {{ selectedProducts.length }} รายการ
            </button>
          </div>
        </div>
        <div v-else class="text-gray-500 text-center">กรุณาเลือกคำสั่งซื้อ</div>
      </div>
    </div>
  </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useOrderStore } from "@/store/orderStore";
import { computed, ref } from "vue";
import type { Order, Product } from "~/models/product.model";


definePageMeta({
  layout: "user",
});

const router = useRouter();
const orderStore = useOrderStore();


const orders = ref<Order[]>([
  {
    id: "778231342",
    date: "26 ตุลาคม 2566",
    total: 50878,
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
      {
        text: "การจัดส่งสำเร็จ",
        date: "23 พฤศจิกายน 2566 17:00 น.",
        isCurrent: true,
      },
      {
        text: "อยู่ระหว่างการจัดส่ง",
        date: "23 พฤศจิกายน 2566 16:00 น.",
        isCurrent: false,
      },
      {
        text: "พัสดุอยู่ที่ศูนย์เตรียมสินค้า",
        date: "23 พฤศจิกายน 2566 04:19 น.",
        isCurrent: false,
      },
    ],
    namerecipe: "คมเข้ม คำเกษ 098 765 4321",
    address: "kku เพลส อำเภอเมือง ตำบลในเมือง จังหวัดขอนแก่น 40000",
  },
]);

const selectedOrder = ref<Order | null>(null);
const selectedProducts = ref<Product[]>([]);

// เลือกคำสั่งซื้อ
const selectOrder = (order: Order): void => {
  selectedOrder.value = order;
  selectedProducts.value = [];
};

// ฟังก์ชันเพิ่ม/ลบสินค้าในรายการที่เลือก
const toggleProductSelection = (product: Product): void => {
  const index = selectedProducts.value.findIndex((p) => p.id === product.id);
  if (index === -1) {
    selectedProducts.value.push(product);
  } else {
    selectedProducts.value.splice(index, 1);
  }
};

// เช็คว่าสินค้านั้นถูกเลือกหรือไม่
const isSelected = (product: Product): boolean => {
  return selectedProducts.value.some((p) => p.id === product.id);
};

// ไปหน้าคืนสินค้า
const goToRefundPage = (): void => {
  orderStore.setOrderAndProducts(selectedOrder.value?.id ?? '', selectedProducts.value);
  router.push("/order/refundOrder");
};
</script>

<style scoped>
.sticky {
  position: sticky;
}
</style>
