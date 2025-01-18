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
                  ได้รับภายในวันที่ {{ order.deliveryDate }}
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
            <div class="mt-4 space-y-4 border-b pb-4">
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
                <div v-if="status.isCurrent && status.text === 'การจัดส่งสำเร็จ'">
                  <div class="mt-2">
                    <p class="text-gray-500 text-sm">เลขแทร็ก: <span class="font-bold">{{ trackingNumber }}</span></p>
                    <div class="flex items-center mt-2 space-x-2">
                      <button
                        @click="copyToClipboard(trackingNumber)"
                        class="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                      >
                        คัดลอกเลขแทร็ก
                      </button>
                      <a
                        :href="`https://track.thailandpost.co.th/?trackNumber=${trackingNumber}`"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="text-blue-500 underline flex items-center"
                      >
                        <img
                          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Thailand_Post_Logo.svg/2560px-Thailand_Post_Logo.svg.png"
                          alt="Thailand Post"
                          class="w-6 h-6"
                        />
                        <span class="ml-1">ตรวจสอบ</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- No Order Selected -->
          <div v-else class="text-center text-gray-500">เลือกคำสั่งซื้อ</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { Order } from "~/models/product.model";

// Mock คำสั่งซื้อ
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
    ],
    shippingStatus: [
      {
        text: "การจัดส่งสำเร็จ",
        date: "23 พฤศจิกายน 2566 17:00 น.",
        isCurrent: true,
      },
    ],
    namerecipe: "คมเข้ม คำเกษ 098 765 4321",
    address: "kku เพลส อำเภอเมือง ตำบลในเมือง จังหวัดขอนแก่น 40000",
  },
]);

// คำสั่งซื้อที่เลือก
const selectedOrder = ref<Order | null>(null);

// เลขแทร็กสำหรับตัวอย่าง
const trackingNumber = "1234567890123";

// เลือกคำสั่งซื้อ
const selectOrder = (order: Order) => {
  selectedOrder.value = order;
};

// คัดลอกข้อความไปยังคลิปบอร์ด
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
