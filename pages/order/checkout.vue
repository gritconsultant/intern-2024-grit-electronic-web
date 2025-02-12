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
                v-for="(product, index) in selectedOrder.product"
                :key="index"
                class="text-gray-700"
              >
                - {{ product }}
              </li>
            </ul>

            <div class="mt-4 pb-4 border-b">
              <h3 class="font-bold">ที่อยู่ของคุณ</h3>
              <select
                v-model="selectedAddressMap[selectedOrder.id]"
                @change="updateSelectedAddress(selectedOrder.id)"
              >
                <option
                  v-for="addr in shipment"
                  :key="addr.id"
                  :value="addr.id"
                >
                  {{ addr.firstname }} {{ addr.lastname }} - {{ addr.address }}
                  {{ addr.sub_district }} {{ addr.district }}
                  {{ addr.province }} {{ addr.zip_code }}
                </option>
              </select>
              <p class="text-gray-500 text-sm mt-2">
                ที่อยู่ปัจจุบัน:
                {{
                  getSelectedShipment(selectedOrder.id)?.address ||
                  "ไม่มีข้อมูล"
                }}
                {{ getSelectedShipment(selectedOrder.id)?.district }}
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

        <!-- Noti Popup -->
        <div
      v-if="store.paymentAction"
      @click="store.paymentAction = !store.paymentAction"
      class="fixed inset-0 bg-black/50 flex justify-end z-50"
    >
      <div @click.stop>
        <PopupPayment />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Swal from "sweetalert2";
import { ref, onMounted } from "vue";
import type { Order, OrderById, Shipment } from "~/models/product.model";
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

const getSelectedShipment = (orderId: number) => {
  const addressId = selectedAddressMap.value[orderId];
  return shipment.value.find((addr) => addr.id === addressId) || null;
};

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
        product: Array.isArray(data.product) ? data.product : [],
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
  const order = selectedOrder.value; // เก็บค่าก่อน
  if (order && order.id === orderId) {
    Swal.fire({
      title: "ยืนยันการยกเลิก",
      text: `คุณต้องการยกเลิกคำสั่งซื้อ #${order.id} หรือไม่?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "ใช่, ยกเลิกเลย",
      cancelButtonText: "ไม่, กลับไป",
    }).then((result) => {
      if (result.isConfirmed) {
        order.status = "cancelled"; // ใช้ค่าที่เก็บไว้ ไม่ใช่ selectedOrder.value โดยตรง
        orders.value = orders.value.filter(o => o.id !== orderId);

        Swal.fire("ลบสำเร็จ!", "คำสั่งซื้อถูกยกเลิกและลบออกเรียบร้อยแล้ว", "success");
        selectedOrder.value = null;
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

const updateSelectedAddress = (orderId: number) => {
  if (selectedOrder.value && selectedOrder.value.id === orderId) {
    selectedOrder.value.Shipment =
      getSelectedShipment(orderId) ?? ({} as Shipment);
  }
};

onMounted(() => {
  getOrderpending();
  getShipment();
});
</script>
