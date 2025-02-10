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
        <div
          class="bg-white p-4 rounded-lg shadow border overflow-y-auto sticky top-0"
          style="max-height: 48vh"
        >
          <h2 class="font-bold mb-4">รายการคำสั่งซื้อ</h2>
          <div
            v-for="order in orderById"
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
                <p class="text-gray-500 text-sm">
                  {{ formatDate(order.created_at) }}
                </p>
              </div>
              <p class="text-lg font-bold">฿{{ order.total_price }}</p>
            </div>
          </div>
        </div>

        <!-- Selected Order Details -->
        <div
          class="bg-white p-4 rounded-lg shadow border overflow-y-auto sticky top-0"
          style="max-height: 48vh"
        >
          <h2 class="font-bold mb-4">รายละเอียดคำสั่งซื้อ</h2>
          <div v-if="selectedOrder">
            <!-- Products -->
            <!-- <div
              v-for="product in selectedOrder.products"
              :key="product.id"
              class="flex items-center space-x-4 border-b pb-4 cursor-pointer"
            >
              <div class="w-24 h-24">
                <img
                  src=""
                  alt="product"
                  class="w-full h-full object-cover"
                />
              </div>
              <div class="flex-grow">
                <div class="flex justify-between">
                  <h2 class="font-bold">{{ product.name }}</h2>
                  <p class="text-lg font-bold">฿{{ product.price }}</p>
                </div>
                <div class="flex justify-between mt-2">
                  <div>
                    <p class="text-gray-500 text-sm texthide">
                      {{ product.description }}
                    </p>
                    <p class="text-gray-500 text-sm">
                      จำนวน: {{ product.stock }}
                    </p>
                  </div>
                  <div>
                    <button
                      class="bg-[#EE973C] hover:bg-[#FD8C35]/70 text-white p-2 rounded-lg"
                      @click="openReviewPopup(product)"
                    >
                      รีวิวสินค้า
                    </button>
                  </div>

                </div>
              </div>
            </div> -->

            <!-- Address -->
            <div class="mt-4 border-b pb-4">
              <h3 class="font-bold">ที่อยู่ของคุณ</h3>
              <p class="text-gray-500 text-sm mt-4">
                ชื่อผู้รับ : {{ getinfo.FirstName }}
                <span> {{ getinfo.LastName }}</span>
              </p>
              <p class="text-gray-500 text-sm">ที่อยู่ : {{}}</p>
            </div>
          </div>

          <!-- No Order Selected -->
          <div v-else class="text-center text-gray-500">เลือกคำสั่งซื้อ</div>
          <div>
            <button
              class="bg-[#EE973C] hover:bg-[#FD8C35]/70 text-white p-2 rounded-lg mt-5"
              @click="store.reviewAction = true"
            >
              รีวิวสินค้า
            </button>
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
          <PopupReview />
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
import type {
  OrderById,
  UserInfo,
} from "~/models/product.model";
import service from "~/service";
import { useIndexStore } from "~/store/main";

const store = useIndexStore();
const loading = ref(true);
const orderById = ref<OrderById[]>([]);
const getinfo = ref<UserInfo>({
  ID: 0,
  FirstName: "",
  LastName: "",
  Username: "",
  Password: "",
  Email: "",
  Phone: 0,
  created_at: 0,
  updated_at: 0,
});

const getuserinfo = async () => {
  loading.value = true;
  await service.product
    .getUserInfo()
    .then((resp: any) => {
      console.log(resp);
      const data = resp.data.data;
      const user: UserInfo = {
        ID: data.ID,
        FirstName: data.FirstName,
        LastName: data.LastName,
        Username: data.Username,
        Password: data.Password,
        Email: data.Email,
        Phone: data.Phone,
        created_at: data.created_at,
        updated_at: data.updated_at,
      };
      getinfo.value = user;
    })
    .catch((error: any) => {
      console.log(error);
    })
    .finally(() => {
      loading.value = false;
    });
};

const getOrder = async () => {
  loading.value = true;
  await service.product
    .getOrderById()
    .then((resp: any) => {
      const data = resp.data.data;
      const orderId: OrderById[] = [];
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        const e = data[i];
        const order: OrderById = {
          id: e.id,
          user_id: e.user_id,
          payment_id: e.payment_id,
          shipment_id: e.shipment_id,
          total_amount: e.total_amount,
          total_price: e.total_price,
          status: e.status,
          created_at: e.created_at,
          updated_at: e.updated_at,
          products: [],
        };
        orderId.push(order);
      }
      orderById.value = orderId;
    })
    .catch((error: any) => {
      console.error(error);
    })
    .finally(() => {
      loading.value = false;
    });
};

const selectedOrder = ref<OrderById | null>(null);

const selectOrder = (order: OrderById) => {
  selectedOrder.value = order;
};

const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp * 1000); // คูณด้วย 1000 เพื่อแปลงจาก Unix timestamp เป็น milliseconds
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString("th-TH", options); // ใช้ locale "th-TH" สำหรับวันที่ในภาษาไทย
};

onMounted(async () => {
  await getuserinfo();
  await getOrder();
});
</script>

<style scoped>
.sticky {
  position: sticky;
}
</style>
