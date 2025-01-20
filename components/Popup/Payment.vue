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

      <div class="flex flex-col items-center justify-center py-6 px-4 md:px-8">
        <!-- QR Code -->
        <div class="w-[80%] max-w-[300px] mb-6">
          <img
            :src="payment.qrCodeUrl"
            alt="QR Code"
            class="w-full h-auto object-cover rounded-lg"
          />
        </div>

        <!-- Bank Info -->
        <div class="text-center mb-6">
          <h2 class="text-lg font-semibold">
            <span>{{ payment.bankName }}</span>
          </h2>
          <p class="text-sm mt-3">
            เลขบัญชี: <span class="font-semibold">{{ payment.accountNumber }}</span>
          </p>
          <p class="text-sm">
            ชื่อบัญชี: <span class="font-semibold">{{ payment.accountName }}</span>
          </p>
        </div>
      </div>

      <!-- Price -->
      <div class="border-t p-4 px-5 bg-gray-100 flex justify-between items-center">
        <span class="text-sm font-semibold">รวมทั้งสิ้น</span>
        <span class="text-sm font-semibold">฿{{ payment.price }}</span>
      </div>

      <!-- File Upload -->
      <div class="px-4 mt-5">
        <label for="transfer-proof" class="block text-sm font-medium text-gray-700">อัปโหลดหลักฐานการโอน</label>
        <input
          id="transfer-proof"
          type="file"
          class="w-full border rounded-md p-2 text-sm"
          accept="image/*"
        />
      </div>

      <!-- Date and Time -->
      <div class="px-4 mt-5">
        <label for="transfer-datetime" class="block text-sm font-medium text-gray-700 ">
          วันที่และเวลาที่โอน
        </label>
        <input
          id="transfer-datetime"
          type="datetime-local"
          v-model="payment.transferDateTime"
          class="w-full border rounded-md p-2 text-sm"
        />
      </div>

      <!-- Actions -->
      <div class="flex justify-center mt-4 px-4 pb-6">
        <button
          class="popupbtn w-full md:w-auto py-2 px-4 bg-[#FCCA81] hover:bg-[#EE973C] text-white rounded-md"
          @click="confirmOrder"
        >
          ยืนยันคำสั่งซื้อ
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "auth",
});

import { ref } from "vue";
import { useRouter } from "vue-router";
import { useIndexStore } from "~/store/main";

// Router สำหรับเปลี่ยนหน้า
const router = useRouter();
const store = useIndexStore();

const payment = ref({
  qrCodeUrl:
    "https://www.kasikornbank.com/SiteCollectionDocuments/business/sme/digital-banking/kshop/img-revamp/kplusshop_qr.png",
  bankName: "กสิกร",
  accountNumber: "10948-23424-232",
  accountName: "กสิกร รักไทย",
  price: 198,
  transferDateTime: "", //  สำหรับวันที่และเวลาการโอน
});



// ฟังก์ชันยืนยันคำสั่งซื้อ
const confirmOrder = () => {
  if (!payment.value.transferDateTime) {
    alert("กรุณาเลือกวันที่และเวลาที่โอน");
    return;
  }
  store.paymentAction = false;
  router.push("/order/shipping"); // ไปที่หน้า shipping
};
</script>

<style scoped>
</style>
