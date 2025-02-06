<template>
  <div class="absolute inset-0 flex items-center justify-center bg-black/50 z-50">
    <div class="w-full md:w-[500px] h-auto border-2 flex flex-col rounded-[5px] bg-[#FFFFFF] drop-shadow-lg overflow-hidden">

      <div class="flex justify-between items-center p-4 md:p-5 border-b-2">
        <h1 class="text-sm md:text-base font-bold">สรุปราคาสินค้า</h1>
        <button @click="store.paymentAction = !store.paymentAction">
          <svg class="w-6 h-6 hover:text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <div class="flex flex-col items-center justify-center py-6 px-4 md:px-8">
        <!-- QR Code -->
        <div class="w-[80%] max-w-[300px] mb-6">
          <img src="https://www.kasikornbank.com/SiteCollectionDocuments/business/sme/digital-banking/kshop/img-revamp/kplusshop_qr.png" 
               alt="QR Code" class="w-full h-auto object-cover rounded-lg"/>
        </div>

        <!-- Bank Info -->
        <div v-for="i in system" :key="i.id" class="text-center mb-6">
          <h2 class="text-lg font-semibold">{{ i.bank_name }}</h2>
          <p class="text-sm mt-3">เลขบัญชี: <span class="font-semibold">{{ i.account_number }}</span></p>
          <p class="text-sm">ชื่อบัญชี: <span class="font-semibold">{{ i.account_name }}</span></p>
        </div>
      </div>

      <!-- Price (แสดงเฉพาะออเดอร์เดียว) -->
      <div v-if="order" class="border-t p-4 px-5 bg-gray-100 flex justify-between items-center">
        <span class="text-sm font-semibold">รวมทั้งสิ้น</span>
        <span class="text-sm font-semibold">฿{{ order.total_price }}</span>
      </div>

      <!-- File Upload -->
      <div class="px-4 mt-5">
        <label for="transfer-proof" class="block text-sm font-medium text-gray-700">อัปโหลดหลักฐานการโอน</label>
        <input id="transfer-proof" type="file" class="w-full border rounded-md p-2 text-sm" accept="image/*"/>
      </div>

      <!-- Actions -->
      <div class="flex justify-center mt-4 px-4 pb-6">
        <button class="popupbtn w-full md:w-auto py-2 px-4 bg-[#EE973C] hover:bg-[#FD8C35]/70 text-white rounded-md"
                @click="confirmOrder">
          ยืนยันคำสั่งซื้อ
        </button>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: "auth" });

import { useRouter } from "vue-router";
import type { OrderById, SystemBank } from "~/models/product.model";
import service from "~/service";
import { useIndexStore } from "~/store/main";

const router = useRouter();
const store = useIndexStore();
const system = ref<SystemBank[]>([]);
const order = ref<OrderById | null>(null); // ✅ เปลี่ยนเป็นเก็บแค่ออเดอร์เดียว

const getSystemBank = async () => {
  await service.product.getSystemBank()
  .then((resp: any) => {
    const data = resp.data.data;
    system.value = data.map((e: any) => ({
      id: e.id,
      bank_name: e.bank_name,
      account_name: e.account_name,
      account_number: e.account_number,
      description: e.description,
      ImageSystemBank: e.ImageSystemBank,
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
}

const getOrder = async () => {
  await service.product.getOrderById()
  .then((resp: any) => {
    const data = resp.data.data;
    if (data.length > 0) {
      order.value = {
        id: data[0].id, // ✅ เอาออเดอร์ตัวแรกมาใช้
        user_id: data[0].user_id,
        payment_id: data[0].payment_id,
        shipment_id: data[0].shipment_id,
        total_amount: data[0].total_amount,
        total_price: data[0].total_price,
        status: data[0].status,
        created_at: data[0].created_at,
        updated_at: data[0].updated_at,
      };
    }
  })
  .catch((error: any) => {
    console.error(error);
  })
  .finally(() => {
    console.log("getOrder completed");
  });
}

const confirmOrder = () => {
  store.paymentAction = false;
  router.push("/order/shipping"); // ไปที่หน้า shipping
};

onMounted(async () => {
  await getSystemBank();
  await getOrder();
});
</script>
