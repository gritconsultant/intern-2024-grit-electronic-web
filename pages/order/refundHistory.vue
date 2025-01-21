<template>
  <div class="flex p-4">
    <!-- Sidebar -->
    <Sidebar />

    <!-- Content -->
    <div class="w-full lg:w-3/4 p-6">
      <div class="border-b">
        <h1 class="text-xl font-bold mb-6">คืนสินค้า</h1>
      </div>

      <!-- Tabs -->
      <div class="mt-5">
        <Tab />
      </div>

      <div>
        <!-- Products in Return History -->
        <div
          class="bg-white p-4 rounded-lg shadow border overflow-y-auto sticky top-0"
          style="max-height: 48vh"
        >
          <h2 class="font-bold mb-4">ประวัติการคืนสินค้า</h2>
          <div
            v-for="(refund, index) in refundHistory"
            :key="index"
            class="bg-white shadow p-4 m-5 rounded-lg border"
          >
            <!-- Refund-->
            <div class="flex justify-between items-center">
              <h2 class="font-bold text-lg">{{ refund.productName }}</h2>
              <p
                class="text-sm font-medium"
                :class="{
                  'text-green-500': refund.status === 'สำเร็จ',
                  'text-red-500': refund.status === 'ไม่สำเร็จ',
                }"
              >
                {{ refund.status }}
              </p>
            </div>

            <!-- Refund Details -->
            <div class="mt-4 text-sm">
              <p><strong>วันที่คืน:</strong> {{ refund.returnDate }}</p>
              <p><strong>เหตุผล:</strong> {{ refund.reason }}</p>
              <p>
                <strong>ช่องทางการคืนเงิน:</strong> {{ refund.paymentMethod }}
              </p>
              <p v-if="refund.paymentMethod === 'บัญชีธนาคาร'">
                <strong>ธนาคาร:</strong> {{ refund.bankName }}<br />
                <strong>เลขบัญชี:</strong> {{ refund.accountNumber }}
              </p>
              <p v-if="refund.paymentMethod === 'พร้อมเพย์'">
                <strong>หมายเลขพร้อมเพย์:</strong> {{ refund.promptPayNumber }}
              </p>
            </div>
          </div>
    <!-- No Refunds -->
    <div v-if="refundHistory.length === 0" class="text-center text-gray-500 mt-10">
      <p>ไม่มีประวัติการคืนสินค้า</p>
    </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

definePageMeta({
  layout: "user",
});


const refundHistory = ref([
  {
    productName: "กระเป๋าผ้า",
    returnDate: "2025-01-10",
    reason: "สินค้าผิดรุ่น",
    paymentMethod: "บัญชีธนาคาร",
    bankName: "ธนาคารกรุงไทย",
    accountNumber: "1234567890",
    status: "สำเร็จ",
  },
  {
    productName: "เลมอนอบแห้ง",
    returnDate: "2025-01-12",
    reason: "สินค้าเสียหาย",
    paymentMethod: "พร้อมเพย์",
    promptPayNumber: "0987654321",
    status: "ไม่สำเร็จ",
  },
]);


</script>

<style scoped>
.text-green-500 {
  color: #10b981;
}
.text-red-500 {
  color: #ef4444;
}
</style>
