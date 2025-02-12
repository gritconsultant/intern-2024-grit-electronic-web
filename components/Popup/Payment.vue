<template>
  <div
    class="absolute inset-0 flex items-center justify-center bg-black/50 z-50"
  >
    <div
      class="w-full md:w-[500px] h-auto border-2 flex flex-col rounded-[5px] bg-[#FFFFFF] drop-shadow-lg overflow-hidden"
    >
      <div class="flex justify-between items-center p-4 md:p-5 border-b-2">
        <h1 class="text-sm md:text-base font-bold">สรุปราคาสินค้า</h1>
        <button @click="store.paymentAction = !store.paymentAction">
          <svg
            class="w-6 h-6 hover:text-red-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <div v-for="i in system" :key="i.id" class="flex flex-col items-center justify-center py-6 px-4 md:px-8">
        <!-- QR Code -->
        <div class="w-[80%] max-w-[300px] mb-6">
          <img
            :src="i.image"
            alt="QR Code"
            class="w-full h-auto object-cover rounded-lg"
          />
        </div>

        <!-- Bank Info -->
        <div class="text-center mb-6">
          <h2 class="text-lg font-semibold">{{ i.bank_name }}</h2>
          <p class="text-sm mt-3">
            เลขบัญชี: <span class="font-semibold">{{ i.account_number }}</span>
          </p>
          <p class="text-sm">
            ชื่อบัญชี: <span class="font-semibold">{{ i.account_name }}</span>
          </p>
        </div>
      </div>

      <div class="border-t p-4 px-5 bg-gray-100 flex justify-between items-center">
        <span class="text-sm font-semibold">รวมทั้งสิ้น</span>
        <span class="text-sm font-semibold">฿{{ order?.total_price }}</span>
      </div>

      <!-- Date and Time -->
      <div class="px-4 mt-5">
        <label for="date-time" class="block text-sm font-medium text-gray-700">วันที่และเวลาที่โอน</label>
        <input
          id="transfer-datetime"
          type="datetime-local"
          class="w-full border rounded-md p-2 text-sm"
          required
        />
      </div>

      <!-- Actions -->
      <div class="flex justify-center mt-4 px-4 pb-6">
        <button
          class="popupbtn w-full md:w-auto py-2 px-4 bg-[#EE973C] hover:bg-[#FD8C35]/70 text-white rounded-md"
          @click="confirmOrder"
        >
          ยืนยันคำสั่งซื้อ
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: "auth" });

import Swal from "sweetalert2";
import { useRouter } from "vue-router";
import type { OrderById, SystemBank } from "~/models/product.model";
import service from "~/service";
import { useIndexStore } from "~/store/main";

const router = useRouter();
const route = useRoute();
const store = useIndexStore();
const system = ref<SystemBank[]>([]);
const order = ref<OrderById | null>(null); // เปลี่ยนเป็นเก็บแค่ออเดอร์เดียว

const getSystemBank = async () => {
  await service.product
    .getSystemBank()
    .then((resp: any) => {
      const data = resp.data.data;
      system.value = data.map((e: any) => ({
        id: e.id,
        bank_name: e.bank_name,
        account_name: e.account_name,
        account_number: e.account_number,
        description: e.description,
        image: e.image,
        is_active: e.is_active,
        created_at: e.created_at,
        updated_at: e.updated_at,
      }));
    })
    .catch((error: any) => {
      console.error(error);
    })
    .finally(() => {
      console.log("getSystemBank completed");
    });
};

const getOrder = async (orderId: number) => {
  await service.product
    .getOrderById(orderId)
    .then((resp: any) => {
      const data = resp.data.data;
      if (data) {
        order.value = {
          id: data.id,
          User: data.User,
          Payment: data.Payment,
          SystemBank: data.SystemBank,
          Shipment: data.Shipment,
          total_amount: data.total_amount,
          total_price: data.total_price,
          status: data.status,
          created_at: data.created_at,
          updated_at: data.updated_at,
          tracking_number: data.tracking_number,
          product: Array.isArray(data.product) ? data.product : [],
        };
      }
    })
    .catch((error: any) => {
      console.error(error);
    })
    .finally(() => {
      console.log("getOrder completed");
    });
};

const confirmOrder = () => {
  if (order.value) {
    Swal.fire({
      title: "ยืนยันการชำระเงิน",
      text: "หากยืนยันการชำระเงินแล้วจะไม่สามารถยกเลิกสินค้าได้!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "ใช่, ชำระเลย",
      cancelButtonText: "ไม่, กลับไป",
    }).then((result) => {
      if (result.isConfirmed) {
        router.push("/order/shipping");
      }
    });
  }
};

onMounted(async () => {
  await getSystemBank();
  const orderId = route.params.orderId ? Number(route.params.orderId) : null;
  if (orderId) {
    await getOrder(orderId);
  } else {
    console.error("❌ ไม่พบ orderId ใน route params");
  }
});

</script>
