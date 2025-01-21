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
                <p class="text-gray-500 text-sm">
                  จัดส่งแล้ววันที่ {{ order.deliveryDate }}
                </p>
              </div>
              <p class="text-lg font-bold">฿{{ order.total }}</p>
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
                <p class="text-gray-500 text-sm">จำนวน: {{ product.amount }}</p>
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

            <!-- Shipping Status -->
            <div class="mt-4 border-b pb-4">
              <h3 class="font-bold">สถานะการจัดส่ง</h3>
              <div
                v-for="status in selectedOrder.shippingStatus"
                :key="status.text"
                class="flex items-center justify-between"
              >
                <div>
                  <p>{{ status.text }}</p>
                  <p class="text-gray-500 text-sm">{{ status.date }}</p>
                </div>

                <!-- Show Tracking Number -->
                <div
                  v-if="status.isCurrent && status.text === 'การจัดส่งสำเร็จ'"
                  class="mt-4"
                >
                  <label for="trackingNumber" class="block font-medium">
                    เลขแทร็ก
                  </label>
                  <div class="flex items-center mt-2">
                    <input
                      id="trackingNumber"
                      type="text"
                      class="border p-2 rounded-lg w-full mr-2"
                      :value="trackingNumber"
                      readonly
                    />
                    <button
                      @click="copyToClipboard(trackingNumber)"
                      class="text-blue-500 text-xl"
                      title="คัดลอกเลขแทร็ก"
                    >
                      <svg
                        class="w-[22px] h-[22px] text-gray-800 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M9 8v3a1 1 0 0 1-1 1H5m11 4h2a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-7a1 1 0 0 0-1 1v1m4 3v10a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-7.13a1 1 0 0 1 .24-.65L7.7 8.35A1 1 0 0 1 8.46 8H13a1 1 0 0 1 1 1Z"
                        />
                      </svg>
                    </button>
                  </div>
                  <a
                    :href="`https://track.thailandpost.co.th/?trackNumber=${trackingNumber}`"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-blue-500 underline flex items-center mt-2"
                  >
                    <span class="ml-2">ตรวจสอบสถานะ</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div v-else class="text-center text-gray-500">เลือกคำสั่งซื้อ</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { Order } from "~/models/product.model";

definePageMeta({
  layout: "user",
});

const orders = ref<Order[]>([
  {
    id: "778231342",
    date: "26 ตุลาคม 2566",
    total: 124,
    deliveryDate: "26 ตุลาคม 2566",
    products: [
      {
        id: 1,
        name: "มะขาม 4 รส",
        detail: "มะขาม 4 รส มะขามคลุก (บ้านมะขาม) โดยบริษัทสวนผึ้ง จำกัด",
        price: 62,
        amount: 1,
        img: "https://th-test-11.slatic.net/p/2b0d5f80a00b77d2c6490b09a053a1c0.png",
        categoryId: 1,
      },
      {
        id: 2,
        name: "มะขามคลุกบ๊วย 4 รส",
        detail:
          "มะขามแกะเปลือก ปรุงรสด้วย นำ้ตาล พริก เกลือ และผงบ๊วย",
        price: 62,
        amount: 1,
        img: "https://halal.co.th/storages/products/343928.png",
        categoryId: 1,
      },
    ],
    shippingStatus: [
      {
        text: "การจัดส่งสำเร็จ",
        date: "26 พฤศจิกายน 2566 17:00 น.",
        isCurrent: true,
      },
    ],
    namerecipe: "คมเข้ม คำเกษ 098 765 4321",
    address: "kku เพลส อำเภอเมือง ตำบลในเมือง จังหวัดขอนแก่น 40000",
  },
]);

// คำสั่งซื้อที่เลือก
const selectedOrder = ref<Order | null>(null);

// เลขแทร็ก
const trackingNumber = "1234567890123";

// เลือกคำสั่งซื้อ
const selectOrder = (order: Order) => {
  selectedOrder.value = order;
};

// คัดลอกเลขแทร็ก
const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text).then(() => {
    alert("คัดลอกเลขแทร็กเรียบร้อย!");
  });
};
</script>

<style scoped>
.sticky {
  position: sticky;
}
</style>
