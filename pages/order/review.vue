<template>
  <div class=" pt-[90px]">
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
        <div
          class="bg-white p-4 rounded-lg shadow border overflow-y-auto sticky top-0"
          style="max-height: 48vh"
        >
          <h2 class="font-bold mb-4">รายการคำสั่งซื้อ</h2>
          <div v-if="orders.length">
            <div
              v-for="order in orders"
              :key="order.id"
              @click="checkOrder(order)"
              class="cursor-pointer border-b p-4"
              :class="{ 'bg-gray-400': selectedOrder?.id === order.id }"
            >
              <div class="flex justify-between items-center">
                <div>
                  <p>หมายเลขคำสั่งซื้อ #{{ order.id }}</p>
                  <p class="text-gray-500 text-sm">
                    {{ formatDate(order.created_at) }}
                  </p>
                </div>
                <p class="text-lg font-bold">฿{{ order.total_price_ship }}</p>
              </div>
            </div>
          </div>
          <div v-else class="text-center text-gray-500">ไม่มีคำสั่งซื้อ</div>
        </div>

        <!-- Selected Order Details -->
        <div
          class="bg-white p-4 rounded-lg shadow border overflow-y-auto sticky top-0"
          style="max-height: 48vh"
        >
          <h2 class="font-bold mb-4">รายละเอียดคำสั่งซื้อ</h2>
          <div v-if="selectedOrder">
            <h3 class="font-bold">สินค้า</h3>
            <ul>
              <li
                v-for="(product, index) in selectedOrder.products"
                :key="index"
                class="flex items-center space-x-4 p-4 border-b"
              >
                <!-- Product Image -->
                <div class="w-24 h-24">
                  <img
                    :src="product.image || 'https://www.shutterstock.com/image-vector/no-image-available-picture-coming-600nw-2057829641.jpg'"
                    alt="product"
                    class="w-full h-full object-cover rounded-lg"
                  />
                </div>
                                <!-- Product Info -->
                                <div class="flex-grow">
                  <div class="flex justify-between items-center mb-2">
                    <h2 class="font-bold text-lg">
                      {{ product.product_name }}
                    </h2>
                    <p class="text-lg font-bold text-gray-800">
                      ฿{{ product.price }}
                    </p>
                    
                  </div>
                  <div class="flex justify-between">
                    <p class="text-sm text-gray-500">
                    จำนวน: {{ product.total_product_amount }}
                  </p>
                  <button
                  v-if="product.product_name && !product.is_review"
                  class="bg-[#EE973C] hover:bg-[#FD8C35]/70 text-white px-3 py-1 rounded-lg text-sm"
                  @click="openReviewPopup(product)"

                >
                  รีวิว
                </button>
                  </div>
                </div>
              </li>
            </ul>

            <div class="mt-4 pb-4 border-b">
              <h3 class="font-bold">ที่อยู่ของคุณ</h3>
              <p class="text-gray-500 text-sm mt-2">
                ขื่อผู้รับ: {{ selectedOrder.Shipment.firstname }}
                {{ selectedOrder.Shipment.lastname }} <br />
                <span>
                  ที่อยู่:
                  {{ selectedOrder.Shipment?.address || "ไม่มีข้อมูล" }}</span
                >
                ตำบล/แขวง: {{ selectedOrder.Shipment?.sub_district }} อำเภอ/เขต:
                {{ selectedOrder.Shipment?.district }} จังหวัด:
                {{ selectedOrder.Shipment?.province }} รหัสไปรษณีย์:
                {{ selectedOrder.Shipment?.zip_code }}
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
          </div>
          <div v-else class="text-center text-gray-500">เลือกคำสั่งซื้อ</div>
          <!-- <div>
            <button
              class="bg-[#EE973C] hover:bg-[#FD8C35]/70 text-white p-2 rounded-lg mt-5"
              @click="store.reviewAction = true"
            >
              รีวิวสินค้า
            </button>
          </div> -->
        </div>
      </div>
    </div>

    <!-- Review Popup -->
    <div
      v-if="store.reviewAction"
      class="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
      @click="store.reviewAction = !store.reviewAction"
    >
      <div @click.stop>
        <!-- <PopupReview :product="selectedProduct" /> -->
        <PopupReview :productId="selectedProduct?.id ?? 0" />

      </div>
    </div>
    <Loading :loading="loading" />
  </div>
  </div>

</template>

<script setup lang="ts">
definePageMeta({
  layout: "user",
});

import { ref, onMounted } from "vue";
import type { Order, OrderById } from "~/models/product.model";
import service from "~/service";
import { useIndexStore } from "~/store/main";

const store = useIndexStore();
const loading = ref(true);
const orders = ref<Order[]>([]);
const selectedOrder = ref<OrderById >();
  const selectedProduct = ref<{ id: number; product_name: string } | null>(null);


const props = defineProps({
  productId: {
    type: Number,
  },
});

const getOrdersuccess = async () => {
  loading.value = true;
  try {
    const resp = await service.product.getOrderSuccess();
    orders.value = resp.data.data.map((e: any) => ({
      id: e.id,
      user_id: e.user_id,
      username: e.username,
      status: e.status,
      total_amount: e.total_amount,
      total_price: e.total_price,
      total_price_ship: e.total_price_ship,
      shipment_status: e.shipment_status,
      created_at: e.created_at,
      products: e.products || [],
    }));
  } catch (error) {
    console.error("Error fetching orders:", error);
  }
  loading.value = false;
};

const getOrderById = async (orderId: number) => {
  loading.value = true;
  try {
    const resp = await service.product.getOrderById(orderId);
    selectedOrder.value = resp.data.data || null;
  } catch (error) {
    console.error("Error fetching order:", error);
  }
  loading.value = false;
};

const checkOrder = (order: Order) => {
  getOrderById(order.id);
};

const openReviewPopup = (product: { product_id: number; product_name: string }) => {
  loading.value = true;
  if (!product.product_id) {
    console.error("ไม่มี productId");
    return;
  }
  // Rename product_id to id
  selectedProduct.value = {
    id: product.product_id, // Rename here
    product_name: product.product_name
  };
  loading.value = false;
  store.reviewAction = true;
};




const formatDate = (timestamp: number | string): string => {
  const date = new Date(
    typeof timestamp === "string" ? timestamp : timestamp * 1000
  );
  return date.toLocaleDateString("th-TH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

onMounted(getOrdersuccess);
</script>


<style scoped>
.sticky {
  position: sticky;
}
</style>
