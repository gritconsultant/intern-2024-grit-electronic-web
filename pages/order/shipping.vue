<template>
  <div class="flex p-4">
    <!-- Sidebar -->
    <Sidebar />

    <!-- Content -->
    <div class="w-full lg:w-3/4 p-6 ">
      <div class="border-b">
        <h1 class="text-xl font-bold mb-6">คำสั่งซื้อของฉัน</h1>
      </div>

      <!-- Tabs -->
      <div class="mt-5">
        <Tab />
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Order List -->
        <div class="bg-white p-4 rounded-lg shadow border overflow-y-auto sticky top-0" style="max-height: 48vh">
          <h2 class="font-bold mb-4">รายการคำสั่งซื้อ</h2>
          <div
            v-for="order in orders"
            :key="order.id"
            @click="selectOrder(order)"
            class="cursor-pointer border-b p-4"
            :class="{ 'bg-gray-100': selectedOrder && selectedOrder.id === order.id }"
          >
            <div class="flex justify-between items-center">
              <div>
                <p>หมายเลขคำสั่งซื้อ #{{ order.id }}</p>
                <p class="text-gray-500 text-sm">{{ formatDate(order.created_at) }}</p>
              </div>
              <p class="text-lg font-bold">฿{{ order.payment_price
               }}</p>
            </div>
          </div>
        </div>

        <!-- Selected Order Details -->
        <div class="bg-white p-4 rounded-lg shadow border overflow-y-auto sticky top-0" style="max-height: 48vh">
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
                <p class="text-gray-500 text-sm">{{ product.description }}</p>
                <p class="text-gray-500 text-sm">จำนวน: {{ product.stock }}</p>
              </div>
            </div> -->

            <!-- Address -->
            <div class="mt-4 border-b pb-4">
              <h3 class="font-bold">ที่อยู่ของคุณ</h3>
              <p class="text-gray-500 text-sm mt-4">ชื่อผู้รับ : {{ getinfo.FirstName }} <span> {{  getinfo.LastName }}</span></p>
              <p class="text-gray-500 text-sm">ที่อยู่ : {{  }}</p>
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
                    จัดส่งภายในวันที่ {{  }}
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
                  ทำการชำระเงินด้วย OR Code Prompt Pay
                </span>
              </p>
            </div>

            <!-- Cancel Order Button -->
            <div class="mt-6 text-center">
              <button
                @click="cancelOrder"
                class="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
              >
                ยกเลิกคำสั่งซื้อ
              </button>
            </div>
          </div>

          <div v-else class="text-center text-gray-500">
            เลือกคำสั่งซื้อ
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { Order, UserInfo } from "~/models/product.model";
import service from "~/service";
definePageMeta({
  layout: "user",
});

const orders = ref<Order[]>([]);
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
    .finally(() => {});
};

const getOrderList = async () => {
  await service.product
    .getOrderList()
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
    .finally(() => {});
};

const selectedOrder = ref<Order | null>(null);

const selectOrder = (order: Order): void => {
  selectedOrder.value = order;
};

const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp * 1000); // คูณด้วย 1000 เพื่อแปลงจาก Unix timestamp เป็น milliseconds
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return date.toLocaleDateString('th-TH', options); // ใช้ locale "th-TH" สำหรับวันที่ในภาษาไทย
};

const cancelOrder = (): void => {
  if (selectedOrder.value) {
    // Confirm cancellation
    const confirmCancel = confirm(`คุณต้องการยกเลิกคำสั่งซื้อ #${selectedOrder.value.id} หรือไม่?`);
    if (confirmCancel) {
      // Remove the order from the list
      orders.value = orders.value.filter(order => order.id !== selectedOrder.value!.id);
      alert("คำสั่งซื้อถูกยกเลิกเรียบร้อยแล้ว");
      selectedOrder.value = null; // Clear the selected order
    }
  }
};

onMounted(async () => {
  await getOrderList();
  await getuserinfo();
});
</script>

<style scoped>
.sticky {
  position: sticky;
}
</style>
