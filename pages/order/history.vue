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
        <label for="filter" class="block text-sm font-medium text-gray-700">กรองคำสั่งซื้อ</label>
        <select
          id="filter"
          v-model="filterStatus"
          class="w-full\ lg:w-1/3 border p-2 rounded-lg mt-1"
        >
          <option value="">ทั้งหมด</option>
          <option value="completed">สำเร็จ</option>
          <option value="cancelled">ยกเลิก</option>
        </select>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Order List -->
        <div class="bg-white p-4 rounded-lg shadow border overflow-y-auto sticky top-0" style="max-height: 48vh">
          <h2 class="font-bold mb-4">รายการคำสั่งซื้อ</h2>
          <div
            v-for="order in filteredOrders"
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

        <!-- Products in Selected Order -->
        <div class="bg-white p-4 rounded-lg shadow border overflow-y-auto sticky top-0" style="max-height: 48vh">
          <h2 class="font-bold mb-4">สินค้าภายในคำสั่งซื้อ</h2>
          <div v-if="selectedOrder">
            <!-- <div
              v-for="product in selectedOrder.products"
              :key="product.id"
              class="flex items-center space-x-4 border-b p-4 cursor-pointer "
              :class="{
                'bg-gray-200': isSelected(product),
              }"
              @click="toggleProductSelection(product)"
            > -->
              <!-- <div class="w-24 h-24">
                <img :src="product.image.description" alt="product" class="w-full h-full object-cover" />
              </div>
              <div class="flex-grow">
                  <div class="flex justify-between">
                    <h2 class="font-bold">{{ product.name }}</h2>
                    <p class="text-lg font-bold">฿{{ product.price }}</p>
                  </div>
                  <p class="text-gray-500 text-sm">{{ product.description }}</p>
                  <p class="text-gray-500 text-sm">จำนวน: {{ product.stock }}</p>
                </div> -->
            </div>

            <!-- Return Button -->
            <!-- <div class="mt-6">
              <button
                v-if="selectedProducts.length"
                @click="goToRefundPage"
                class="text-white bg-[#FCCA81] hover:bg-[#EE973C] hover:text-black rounded-lg p-3"
              >
                คืนสินค้า: {{ selectedProducts.length }} รายการ
              </button>
            </div> -->
            <div v-else class="text-gray-500 text-center">กรุณาเลือกคำสั่งซื้อ</div>
          </div>
          
        </div>
      </div>
    </div>


</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { computed, ref } from "vue";
import type { OrderById, Product, UserInfo } from "~/models/product.model";
import service from "~/service";

definePageMeta({
  layout: "user",
});


const router = useRouter();
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


const getOrder = async() => {
  loading.value = true;
  await service.product.getOrderById().then((resp: any) => {
    const data = resp.data.data;
    const orderId: OrderById[] = [];
    console.log(data);
    for (let i =0; i < data.length; i++){
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
      }
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
}

const selectedOrder = ref<OrderById | null>(null);


const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp * 1000); // คูณด้วย 1000 เพื่อแปลงจาก Unix timestamp เป็น milliseconds
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString("th-TH", options); // ใช้ locale "th-TH" สำหรับวันที่ในภาษาไทย
};



const filterStatus = ref<string>("");

const filteredOrders = computed(() =>
  filterStatus.value
    ? orderById.value.filter((order) => order.status === filterStatus.value)
    : orderById.value
);

const selectedProducts = ref<Product[]>([]);

const selectOrder = (order: OrderById): void => {
  selectedOrder.value = order;
  selectedProducts.value = [];
};

const toggleProductSelection = (product: Product): void => {
  const index = selectedProducts.value.findIndex((p) => p.id === product.id);
  if (index === -1) {
    selectedProducts.value.push(product);
  } else {
    selectedProducts.value.splice(index, 1);
  }
};

const isSelected = (product: Product): boolean =>
  selectedProducts.value.some((p) => p.id === product.id);

const goToRefundPage = (): void => {
  router.push("/order/refundOrder");
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
