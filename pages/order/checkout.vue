<template>
  <div class="flex p-4">
    <Sidebar />
    <div class="w-full lg:w-3/4 p-6">
      <div class="border-b">
        <h1 class="text-xl font-bold mb-6">คำสั่งซื้อของฉัน</h1>
      </div>

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
                <p class="text-lg font-bold">฿{{ order.total_price }}</p>
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
    class="flex items-center space-x-4 p-4 border-b "
  >
    <!-- Product Image -->
    <div class="w-24 h-24">
      <img
        :src="product.image"
        alt="product"
        class="w-full h-full object-cover rounded-lg"
      />
    </div>

    <!-- Product Info -->
    <div class="flex-grow">
      <div class="flex justify-between items-center mb-2">
        <h2 class="font-bold text-lg">{{ product.product_name }}</h2>
        <p class="text-lg font-bold text-gray-800">฿{{ product.price }}</p>
      </div>
      <p class="text-sm text-gray-500">จำนวน: {{ product.total_product_amount }}</p>
    </div>
  </li>
</ul>


            <div class="mt-4 pb-4 border-b">
              <h3 class="font-bold">ที่อยู่ของคุณ</h3>
              <p class="text-gray-500 text-sm mt-2">
                ขื่อผู้รับ: {{ selectedOrder.Shipment.firstname }} {{ selectedOrder.Shipment.lastname }} <br>
                <span>{{ selectedOrder.Shipment?.address || "ไม่มีข้อมูล" }}</span>
                {{ selectedOrder.Shipment?.district }}
                {{ selectedOrder.Shipment?.sub_district }}
                {{ selectedOrder.Shipment?.province }}
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
                class="flex-1 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg"
                @click="cancelOrder(selectedOrder.id)"
              >
                ยกเลิกสินค้า
              </button>
              <button
                class="flex-1 py-2 bg-[#EE973C] hover:bg-[#FD8C35]/70 text-white rounded-lg"
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

        <!--  Popup -->
        <div
      v-if="store.paymentAction"
      class="fixed inset-0 bg-black/50 flex justify-end z-50"
            @click="store.paymentAction = !store.paymentAction"
    >
      <div @click.stop>
        <PopupPayment  :orderId="selectedOrder?.id" :paymentId="selectedOrder?.Payment.id" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Swal from "sweetalert2";
import { ref, onMounted } from "vue";
import type { Order, OrderById, OrderCreate, OrderRes, Shipment } from "~/models/product.model";
import service from "~/service";
import { useIndexStore } from "~/store/main";
definePageMeta({
  layout: "user",
});

const orders = ref<Order[]>([]);
const store = useIndexStore();
const selectedOrder = ref<OrderById | null>(null);
const shipment = ref<Shipment[]>([]);
const selectedAddressMap = ref<{ [key: number]: number }>({});


const props = defineProps({
  orderId: {
    type: Number,
  },
  paymentId: {
    type: Number,
  }
})


const getOrderpending = async () => {
  try {
    const resp = await service.product.getOrderPending();
    orders.value = resp.data.data.map((e: any) => ({
      id: e.id,
      total_price: Number(e.total_price),
      created_at: e.created_at,
    }));
  } catch (error) {
    console.error(error);
  }
};

const getShipment = async () => {
  try {
    const resp = await service.product.getShipmentId();
    shipment.value = resp.data.data;
  } catch (error) {
    console.error(error);
  }
};

const getOrderById = async (orderId: number) => {
  try {
    selectedOrder.value = null;
    const resp = await service.product.getOrderById(orderId);
    const data = resp.data.data;
    if (data) {
      selectedOrder.value = {
        ...data,
        products: Array.isArray(data.products) ? data.products : [],
      };

      if (!selectedAddressMap.value[orderId]) {
        selectedAddressMap.value[orderId] =
          shipment.value.length > 0 ? shipment.value[0].id : 0;
      }
    }
  } catch (error) {
    console.error("Error fetching order:", error);
  }
};

const checkOrder = (order: Order) => {
  getOrderById(Number(order.id));
};

const cancelOrder = (orderId: number): void => {
  if (selectedOrder.value) {
    Swal.fire({
      title: "ยืนยันการยกเลิก",
      text: `คุณต้องการยกเลิกคำสั่งซื้อ #${selectedOrder.value.id} หรือไม่?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "ใช่, ยกเลิกเลย",
      cancelButtonText: "ไม่, กลับไป",
    }).then((result) => {
      if (result.isConfirmed) {
        // ลบ order ออกจากรายการ
        orders.value = orders.value.filter(order => order.id !== selectedOrder.value!.id);
        
        Swal.fire("ลบสำเร็จ!", "คำสั่งซื้อถูกยกเลิกและลบออกเรียบร้อยแล้ว", "success");
        selectedOrder.value = null; // เคลียร์คำสั่งซื้อที่เลือก
      }
    });
  }
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

onMounted(() => {
  getOrderpending();
  getShipment();
});
</script>
