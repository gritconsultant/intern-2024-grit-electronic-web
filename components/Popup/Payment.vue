<template>
  <div class="w-[400px] border-2 rounded-lg bg-white shadow-lg p-5">
    <!-- Header -->
    <div class="flex justify-between items-center mb-4">
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
    <div class="flex justify-center mb-4">
      <img
        :src="payment.qrCodeUrl"
        alt="QR Code"
        class="w-[300px] h-[300px] object-cover rounded-lg"
      />
    </div>

    <!-- Bank Info -->
    <div class="text-center mb-4">
      <h2 class="text-lg font-semibold flex items-center justify-center gap-2">
        <span class="border-2">{{ payment.bankName }}</span>
      </h2>
      <p class="text-sm mt-2">
        เลขบัญชี: <span class="font-semibold">{{ payment.accountNumber }}</span>
      </p>
      <p class="text-sm">
        ชื่อบัญชี: <span class="font-semibold">{{ payment.accountName }}</span>
      </p>
    </div>

    <!-- Price -->
    <div class="border-t pt-4 mb-4">
      <div class="flex justify-between text-sm mb-1 font-semibold">
        <span>รวมทั้งสิ้น</span>
        <span>฿{{ payment.totalAmount }}</span>
      </div>
    </div>

    <!-- File Upload -->
    <div class="mb-4">
      <input type="file" class="w-full inputphoto" />
    </div>

    <!-- Actions -->
    <div class="flex justify-center mt-4">
      <button @click="submitPayment" class="popupbtn">ยืนยันคำสั่งซื้อ</button>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "auth",
});

import { ref, defineEmits, onMounted } from "vue";
import type { paymentInfo } from "~/models/product.model";

// การ emit เพื่อปิด Popup
const emit = defineEmits(["close"]);

// State เก็บข้อมูลการชำระเงิน
const payment = ref<paymentInfo>({
  qrCodeUrl:
    "https://www.kasikornbank.com/SiteCollectionDocuments/business/sme/digital-banking/kshop/img-revamp/kplusshop_qr.png", // URL ของ QR Code
  bankName: "กสิกร",
  accountNumber: "10948-23424-232",
  accountName: "กสิกร รักไทย",
  totalAmount: 30490,
});

// ดึงข้อมูลจาก Backend
const fetchPaymentInfo = async () => {
  try {
    const response = await fetch(""); // ใส่api
    const data = await response.json();
    payment.value = data;
  } catch (error) {
    console.error("Failed to fetch payment info:", error);
  }
};


// ส่งสลิป
const submitPayment = () => {
  alert("คำสั่งซื้อสำเร็จ!");
};


// ปิด Popup
const closePayment = () => {
  emit("close");
};

// เรียกข้อมูลการชำระเงินเมื่อ Component โหลดเสร็จ
onMounted(() => {
  fetchPaymentInfo();
});
</script>
