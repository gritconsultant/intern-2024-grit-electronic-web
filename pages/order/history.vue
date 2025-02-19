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

      <!-- Filter Dropdown -->
      <div class="my-4">
        <label for="filter" class="block text-sm font-medium text-gray-700"
          >กรองคำสั่งซื้อ</label
        >
        <select
          id="filter"
          v-model="filterStatus"
          class="w-full\ lg:w-1/3 border p-2 rounded-lg mt-1"
        >
          <option value="">ทั้งหมด</option>
          <option value="success">สำเร็จ</option>
          <option value="cancelled">ยกเลิก</option>
          <option value="failed">ชำระล้มเหลว</option>
        </select>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Order List -->
        <div
          class="bg-white p-4 rounded-lg shadow border overflow-y-auto sticky top-0"
          style="max-height: 41vh"
        >
          <h2 class="font-bold mb-4">รายการคำสั่งซื้อ</h2>
          <div v-if="filteredOrders.length">
            <div
              v-for="order in filteredOrders"
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

        <!-- Products in Selected Order -->
        <div
          class="bg-white p-4 rounded-lg shadow border overflow-y-auto sticky top-0"
          style="max-height: 41vh"
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
        </div>
      </div>
    </div>
    <Loading :loading="loading" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import type {
  Order,
  OrderById,
  Product,
  Shipment,
} from "~/models/product.model";
import service from "~/service";
definePageMeta({
  layout: "user",
});

const loading = ref(true);
const orders = ref<Order[]>([]);
const selectedOrder = ref<OrderById | null>(null);
const shipment = ref<Shipment[]>([]);
const selectedAddressMap = ref<{ [key: number]: number }>({});

const getOrderhistory = async () => {
  loading.value = true;
  await service.product
    .getOrderHistory()
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

      if (!selectedAddressMap.value[orderId]) {
        selectedAddressMap.value[orderId] =
          shipment.value.length > 0 ? shipment.value[0].id : 0;
      }
    }
  } catch (error) {
    console.error("Error fetching order:", error);
  }
  loading.value = false;
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

const filterStatus = ref<string>("");

const filteredOrders = computed(() =>

  filterStatus.value
    ? orders.value.filter((order) => order.status === filterStatus.value)
    : orders.value
);

watch(filterStatus, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    loading.value = true;
    setTimeout(() => {
      loading.value = false;
    }, 500); // ปรับเวลาให้เหมาะสม (เช่น 500ms)
  }
})

onMounted(async () => {
  await getOrderhistory();
});
</script>

<style scoped>
.sticky {
  position: sticky;
}
</style>
