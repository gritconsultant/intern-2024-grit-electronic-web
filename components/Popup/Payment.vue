<template>
  <div
    class="w-[400px] h-full border-2 flex flex-col gap-2 rounded-[5px] bg-[#FFFFFF] drop-shadow-lg"
  >
    <!-- Header -->
    <div class="flex justify-between items-center p-5 border-b-2">
      <h1 class="text-lg font-bold">สรุปราคาสินค้า</h1>
      <button @click="closePayment">
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

    <!-- QR Code -->
    <div class="flex justify-center mt-[95px] mb-5">
      <img
        :src="payment.qrCodeUrl"
        alt="QR Code"
        class="w-full h-[300px] object-cover rounded-lg"
      />
    </div>

    <!-- Bank Info -->
    <div class="text-center mb-5">
      <h2 class="text-lg font-semibold flex items-center justify-center gap-2">
        <span>{{ payment.bankName }}</span>
      </h2>
      <p class="text-sm mt-3">
        เลขบัญชี: <span class="font-semibold">{{ payment.accountNumber }}</span>
      </p>
      <p class="text-sm">
        ชื่อบัญชี: <span class="font-semibold">{{ payment.accountName }}</span>
      </p>
    </div>

    <!-- Price -->
    <div class="border-t pt-4 items-center px-5 mt-3">
      <div class="flex justify-between text-sm mb-1 font-semibold">
        <span>รวมทั้งสิ้น</span>
        <span>฿{{ payment.totalAmount }}</span>
      </div>
    </div>

    <!-- File Upload -->
    <div class="mb-2 px-4 mt-5">
      <input type="file" class="w-full inputphoto" />
    </div>

    <!-- Actions -->
    <div class="flex justify-center mt-4">
      <button class="popupbtn" @click="confirmOrder">ยืนยันคำสั่งซื้อ</button>
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

// Store หลัก
const store = useIndexStore();

// State เก็บข้อมูลการชำระเงิน
const payment = ref({
  qrCodeUrl:
    "https://www.kasikornbank.com/SiteCollectionDocuments/business/sme/digital-banking/kshop/img-revamp/kplusshop_qr.png",
  bankName: "กสิกร",
  accountNumber: "10948-23424-232",
  accountName: "กสิกร รักไทย",
  totalAmount: 30490,
});

// ฟังก์ชันปิด Popup
const closePayment = () => {
  store.paymentAction = false;
};

// ฟังก์ชันยืนยันคำสั่งซื้อ
const confirmOrder = () => {
  closePayment();
  // Logic การยืนยันคำสั่งซื้อสามารถเพิ่มได้
  router.push("/order/shipping"); // ไปที่หน้า shipping
};
</script>

<style scoped>
/* เพิ่มสไตล์ถ้าต้องการ */
</style>
