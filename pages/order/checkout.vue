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
                class="flex items-center space-x-4 p-4 border-b"
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
            <!-- ที่อยู่ของคุณ -->
            <div class="mt-4 pb-4 border-b">
              <h3 class="font-bold">ที่อยู่ของคุณ</h3>
              <div>
                <label
                  for="address"
                  class="block text-sm font-medium text-gray-700"
                  >เลือกที่อยู่</label
                >
                <select
                  v-model="selectedAddressId"
                  class="mt-1 block w-full p-2 border rounded-md"
                >
                  <option
                    v-for="address in shipment"
                    :key="address.id"
                    :value="address.id"
                  >
                    {{ address.firstname }} {{ address.lastname }} -
                    {{ address.address }}
                  </option>
                </select>
                <button
      class="mt-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
      @click="updateShipment"
    >
      ยืนยันที่อยู่
    </button>
              </div>
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
                class="flex-1 py-2 bg-[#EE973C] hover:bg-[#FD8C35]/70 text-white rounded-lg"
                @click="store.paymentAction = true"
              >
                ชำระเงิน
              </button>
              <button
                class="flex-1 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg"
                @click="updateStatus"
              >
                ยกเลิกสินค้า
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
        <PopupPayment
          :orderId="selectedOrder?.id"
          :paymentId="selectedOrder?.Payment.id"
          :shipmentId="selectedAddressId"
        />
      </div>
    </div>
    <Loading :loading="loading" />
  </div>
</template>

<script setup lang="ts">
import Swal from "sweetalert2";
import { ref, onMounted } from "vue";
import type {
  Order,
  OrderById,
  OrderResShip,
  OrderUpdate,
  OrderUpdateRes,
  OrderUpdateShip,
  Shipment,
} from "~/models/product.model";
import service from "~/service";
import { useIndexStore } from "~/store/main";
import { watch } from "vue";
definePageMeta({
  layout: "user",
});

const orders = ref<Order[]>([]);
const loading = ref(true);
const store = useIndexStore();
const selectedOrder = ref<OrderById | null>(null);
const shipment = ref<Shipment[]>([]);
const selectedAddressMap = ref<{ [key: number]: number }>({});
const selectedAddressId = ref<number>();


const props = defineProps({
  orderId: {
    type: Number,
  },
  paymentId: {
    type: Number,
  },
  shipmentId: {
    type: Number,
  },
});

const orderupdateShip = ref<OrderUpdateShip>({
  id: 0,
  shipment_id: 0,
})

const orderresShip = ref<OrderResShip>({
  id: 0,
  shipment_id: 0,
})


const orderUpdate = ref<OrderUpdate>({
  id: 0,
  status: "cancelled",
});

const orderUpdateRes = ref<OrderUpdateRes>({
  id: 0,
  status: "cancelled",
});

const getOrderpending = async () => {
  loading.value = true;
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
  loading.value = false;
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
        selectedAddressMap.value[orderId] = data.shipment_id;
        getShipment();
      }
    }
  } catch (error) {
    console.error("Error fetching order:", error);
  }
};

const checkOrder = (order: Order) => {
  getOrderById(Number(order.id));
};

const updateStatus = async () => {
  loading.value = true;
  if (selectedOrder.value && selectedAddressId.value !== null) {
    Swal.fire({
      title: "ยืนยันการยกเลิก",
      text: `คุณต้องการยกเลิกคำสั่งซื้อ #${selectedOrder.value.id} หรือไม่?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "ใช่, ยกเลิกเลย",
      cancelButtonText: "ไม่, กลับไป",
    }).then((result) => {
      if (result.isConfirmed) {
        loading.value = true;

        // เรียกใช้ updateOrder เพื่ออัปเดตสถานะคำสั่งซื้อ
        service.product
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
                title: "ยกเลิกสินค้าสำเร็จ",
                text: "ยกเลิกการซื้อสินค้าสำเร็จ",
                icon: "success",
                confirmButtonText: "ตกลง",
              });

              // ลบ order ออกจากรายการ
              orders.value = orders.value.filter(
                (order) => order.id !== selectedOrder.value!.id
              );

              // เคลียร์คำสั่งซื้อที่เลือก
              selectedOrder.value = null;
            }
          })
          .catch((error: any) => {
            console.error("Error updating order status:", error);
          })
          .finally(() => {
            loading.value = false;
          });
      }
    });
  }
};

const updateShipment = async () => {
  loading.value = true;

  console.log("Selected Order ID:", selectedOrder.value?.id);
  console.log("Selected Address ID:", selectedAddressId.value);

  if (!selectedOrder.value?.id || !selectedAddressId.value) {
    console.error("Error: Missing order ID or shipment ID");
    Swal.fire("เกิดข้อผิดพลาด", "โปรดเลือกที่อยู่ก่อนทำการอัปเดต", "error");
    loading.value = false;
    return;
  }

  const orderupdateShip = {
    id: selectedOrder.value.id,
    shipment_id: selectedAddressId.value,
  };

  try {
    const resp = await service.product.updateorderShip(
      selectedOrder.value.id,
      orderupdateShip
    );
    console.log("Response:", resp);

    Swal.fire("สำเร็จ!", "เลือกที่อยู่จัดส่งเรียบร้อยแล้ว", "success");
  } catch (error) {
    console.error("API Error:", error);
    Swal.fire("เกิดข้อผิดพลาด", "ไม่สามารถเลือกที่อยู่ได้", "error");
  } finally {
    loading.value = false;
  }
};


watch(selectedAddressId, (newVal) => {
  console.log("New selected address:", newVal);
});





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
