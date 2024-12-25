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
        <h2 class="text-lg font-semibold text-green-600 flex items-center justify-center gap-2">
          <img src="/images/kbank-logo.png" alt="Bank Logo" class="w-6 h-6" />
          {{ payment.bankName }}
        </h2>
        <p class="text-sm">เลขบัญชี: <span class="font-semibold">{{ payment.accountNumber }}</span></p>
        <p class="text-sm">ชื่อบัญชี: <span class="font-semibold">{{ payment.accountName }}</span></p>
      </div>
  
      <!-- Pricing -->
      <div class="border-t pt-4 mb-4">
        <div class="flex justify-between text-sm mb-1">
          <span>รวม</span>
          <span>฿{{ payment.totalAmount }}</span>
        </div>
      </div>
  
      <!-- File Upload -->
      <div class="mb-4">
        <input
          type="file"
          @change="handleFileUpload"
          class="w-full border rounded-md p-1"
        />
      </div>
  
      <!-- Actions -->
      <div class="flex flex-col gap-2">
        <button
          @click="submitPayment"
          class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          ส่งสลิป
        </button>
        <button
          @click="confirmOrder"
          class="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700"
        >
          ยืนยันคำสั่งซื้อ
        </button>
      </div>
    </div>
  </template>
  
  ---
  
  ### 📚 **3. Script Setup**
  
  ```ts
  <script setup lang="ts">
  import { ref, defineEmits, onMounted } from "vue";
import type { paymentInfo } from "~/models/product.model";
  
  // การ emit เพื่อปิด Popup
  const emit = defineEmits(["close"]);
  
  // State เก็บข้อมูลการชำระเงิน
  const payment = ref<paymentInfo>({
    qrCodeUrl: "", // URL ของ QR Code
    bankName: "",
    accountNumber: "",
    accountName: "",
    totalAmount: 0,

  });
  
  // ดึงข้อมูลจาก Backend
  const fetchPaymentInfo = async () => {
    try {
      const response = await fetch("/api/payment-info"); // เปลี่ยนเป็น endpoint จริง
      const data = await response.json();
      payment.value = data;
    } catch (error) {
      console.error("Failed to fetch payment info:", error);
    }
  };
  
  // อัพโหลดสลิป
  const handleFileUpload = (event: Event) => {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      console.log("Uploaded file:", file);
    }
  };
  
  // ส่งสลิป
  const submitPayment = () => {
    alert("ส่งสลิปเรียบร้อยแล้ว!");
  };
  
  // ยืนยันคำสั่งซื้อ
  const confirmOrder = () => {
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
  