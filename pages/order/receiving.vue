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
              :class="{ 'bg-gray-300': selectedOrder?.id === order.id }"
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
                  <p class="text-sm text-gray-500">
                    จำนวน: {{ product.total_product_amount }}
                  </p>
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

            <!-- Tracking Number -->
            <div class="mt-4 space-x-4">
              <label for="trackingNumber" class="block font-medium"
                >เลขแทร็ก</label
              >
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
                    class="w-[22px] h-[22px] text-gray-800"
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

            <!-- Confirm Received Button -->
            <div
              v-if="selectedOrder && selectedOrder.status !== 'success'"
              class="mt-4"
            >
              <button
                @click="updateStatus"
                class="bg-green-500 text-white px-4 py-2 rounded-lg w-full hover:bg-green-600 transition"
              >
                ยืนยันได้รับสินค้าแล้ว
              </button>
            </div>
          </div>
          <div v-else class="text-center text-gray-500">เลือกคำสั่งซื้อ</div>
        </div>
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

import Swal from "sweetalert2";
import { ref } from "vue";
import type {
  Order,
  OrderById,
  OrderUpdate,
  OrderUpdateRes,
} from "~/models/product.model";
import service from "~/service";

const loading = ref(true);
const router = useRouter();
const orders = ref<Order[]>([]);
const selectedOrder = ref<OrderById | null>(null);

const orderUpdate = ref<OrderUpdate>({
  id: 0,
  status: "success",
});

const orderUpdateRes = ref<OrderUpdateRes>({
  id: 0,
  status: "success",
});

const getOrdership = async () => {
  loading.value = true;
  await service.product
    .getOrderShip()
    .then((resp: any) => {
      const data = resp.data.data;
      const orderList: Order[] = [];
      console.log(data);

      for (let i = 0; i < data.length; i++) {
        const e = data[i];
        const order: Order = {
          id: e.id,
          user_id: e.user_id,
          username: e.username,
          status: e.status,
          total_amount: e.total_amount,
          total_price: e.total_price,
          system_bank_id: e.system_bank_id,
          payment_price: e.payment_price,
          bank_name: e.bank_name,
          account_name: e.account_name,
          account_number: e.account_number,
          payment_status: e.payment_status,
          firstname: e.firstname,
          lastname: e.lastname,
          address: e.address,
          zip_code: e.zip_code,
          sub_district: e.sub_district,
          district: e.district,
          province: e.province,
          shipment_status: e.shipment_status,
          created_at: e.created_at,
          updated_at: e.updated_at,
          selectedOrder: e.selectedOrder,
          total_price_ship: e.total_price_ship,
        };
        orderList.push(order);
      }
      orders.value = orderList;
    })
    .catch((error: any) => {
      console.error(error);
    })
    .finally(() => {
      loading.value = false;
    });
};

const getOrderById = async (orderId: number) => {
  loading.value = true;
  try {
    selectedOrder.value = null;
    const resp = await service.product.getOrderById(orderId);
    const data = resp.data.data;
    if (data) {
      selectedOrder.value = {
        ...data,
        products: Array.isArray(data.products) ? data.products : [],
      };
    }
  } catch (error) {
    console.error("Error fetching order:", error);
  }
  finally {
    loading.value = false;
  }
};

const updateStatus = async () => {
  Swal.fire({
    title: "คุณแน่ใจหรือไม่?",
    text: "คุณต้องการยืนยันการรับสินค้าหรือไม่?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "ใช่, ยืนยัน",
    cancelButtonText: "ยกเลิก",
  }).then(async (result) => {
    if (result.isConfirmed) {
      loading.value = true;
      await service.product
        .updateOrder(selectedOrder.value?.id, orderUpdate.value)
        .then((resp: any) => {
          console.log(resp);
          const data = resp.data;
          const orderUpdate: OrderUpdateRes = {
            id: data.id,
            status: data.status,
          };
          orderUpdateRes.value = orderUpdate;

          if (resp.status == 200) {
            Swal.fire({
              title: "รับสินค้าสำเร็จ",
              text: "การยืนยันได้รับสินค้าสำเร็จ",
              icon: "success",
              confirmButtonText: "ตกลง",
            })
            .then(() => {
        router
            .push({ path: "/order/receiving" })
            .then(() => window.location.reload());
      });
          }
        })
        .catch((error: any) => {
          console.error("Error updating order status:", error);
        })
        .finally(() => {
          orderUpdate.value = {
            id: orderUpdate.value.id,
            status: "success",
          };
          loading.value = false;
        });
    }
  });
};


const checkOrder = (order: Order) => {
  getOrderById(Number(order.id));
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

// เลขแทร็ก
const trackingNumber = computed(
  () => selectedOrder.value?.tracking_number || "ไม่มีเลขแทร็ก"
);

// คัดลอกเลขแทร็ก
const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text).then(() => {
    alert("คัดลอกเลขแทร็กเรียบร้อย!");
  });
};

// const confirmReceived = async () => {
//   if (!selectedOrder.value) return;
//   try {
//     await service.product.updateOrderStatus(selectedOrder.value.id, "delivered");
//     alert("ยืนยันได้รับสินค้าแล้ว!");
//     selectedOrder.value.status = "delivered";
//   } catch (error) {
//     console.error("Error updating order status:", error);
//     alert("เกิดข้อผิดพลาด กรุณาลองใหม่!");
//   }
// };

onMounted(async () => {
  await getOrdership();
});
</script>

<style scoped>
.sticky {
  position: sticky;
}
</style>
