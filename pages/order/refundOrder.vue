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

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- รายการคืนสินค้า -->
        <div>
          <div class="bg-white p-4 rounded-lg shadow border overflow-y-auto sticky top-0" style="max-height: 48vh">
            <h2 class="font-bold mb-4">รายละเอียดคำสั่งซื้อ</h2>
            <p>หมายเลขคำสั่งซื้อ: {{ orderId }}</p>

            <div class="mt-4">
              <h2 class="font-bold">รายการคืนสินค้า</h2>
              <div
                v-for="product in selectedProducts"
                :key="product.id"
                class="border-b p-4"
              >
                <h3>ชื่อสินค้า: {{ product.name }}</h3>
                <p>ราคา: ฿{{ product.price }}</p>

                <div class="mt-4">
                  <!-- ช่องกรอกเหตุผลการคืนสินค้า -->
                  <label :for="'reason' + product.id" class="font-bold">เหตุผลในการคืนสินค้า</label>
                  <textarea
                    :id="'reason' + product.id"
                    v-model="product.reason"
                    rows="3"
                    class="w-full border p-2 mt-2 rounded-lg"
                    placeholder="กรุณาใส่เหตุผลสำหรับการคืนสินค้า"
                  ></textarea>

                  <!-- ช่องแนบรูปภาพ -->
                  <label :for="'file' + product.id" class="font-bold mt-4 block">แนบรูปหลักฐานการชำระเงิน</label>
                  <input
                    :id="'file' + product.id"
                    type="file"
                    multiple
                    accept="image/*"
                    @change="handleImageUpload($event, product.id)"
                    class="w-full mt-2 p-2 border rounded-lg"
                  />

                  <!-- ช่องกรอกข้อมูลการคืนเงิน -->
                  <label :for="'paymentMethod' + product.id" class="font-bold mt-4 block">ช่องทางการคืนเงิน</label>
                  <select
                    :id="'paymentMethod' + product.id"
                    v-model="product.paymentMethod"
                    class="w-full border p-2 mt-2 rounded-lg"
                  >
                    <option disabled value="">กรุณาเลือกช่องทางการคืนเงิน</option>
                    <option value="Bank">บัญชีธนาคาร</option>
                    <option value="PromptPay">พร้อมเพย์</option>
                  </select>

                  <!-- ช่องกรอกข้อมูลธนาคาร -->
                  <div v-if="product.paymentMethod === 'Bank'" class="mt-4">
                    <label :for="'bank' + product.id" class="font-bold">ชื่อธนาคาร</label>
                    <input
                      :id="'bank' + product.id"
                      v-model="product.bankName"
                      type="text"
                      class="w-full border p-2 mt-2 rounded-lg"
                      placeholder="กรุณากรอกชื่อธนาคาร"
                    />

                    <label :for="'account' + product.id" class="font-bold mt-4 block">เลขบัญชีธนาคาร</label>
                    <input
                      :id="'account' + product.id"
                      v-model="product.accountNumber"
                      type="text"
                      class="w-full border p-2 mt-2 rounded-lg"
                      placeholder="กรุณากรอกเลขบัญชีธนาคาร"
                    />
                  </div>

                  <!-- ช่องกรอกข้อมูลพร้อมเพย์ -->
                  <div v-if="product.paymentMethod === 'PromptPay'" class="mt-4">
                    <label :for="'promptpay' + product.id" class="font-bold">หมายเลขพร้อมเพย์</label>
                    <input
                      :id="'promptpay' + product.id"
                      v-model="product.promptPayNumber"
                      type="text"
                      class="w-full border p-2 mt-2 rounded-lg"
                      placeholder="กรุณากรอกหมายเลขพร้อมเพย์"
                    />
                  </div>

                  <!-- ปุ่มยืนยัน -->
                  <button
                    class="bg-[#FCCA81] hover:bg-[#EE973C] text-white p-2 rounded-lg mt-4"
                    @click="submitReturn(product.id)"
                  >
                    ยืนยันการคืนสินค้า
                  </button>
                </div>
              </div>

              <p
                v-if="selectedProducts.length === 0"
                class="text-center text-gray-500 mt-6"
              >
                ไม่มีสินค้าในรายการคืนสินค้า
              </p>
            </div>
          </div>
        </div>

        <!-- Products in Return History -->
        <div class="bg-white p-4 rounded-lg shadow border overflow-y-auto sticky top-0" style="max-height: 48vh">
          <h2 class="font-bold mb-4">ประวัติการคืนสินค้า</h2>
          <div v-if="refundProducts.length">
            <div
              v-for="product in refundProducts"
              :key="product.id"
              class="flex items-center space-x-4 border-b p-4"
            >
              <div class="flex items-center space-x-5">
                <img
                  :src="product.img"
                  alt="product"
                  class="w-20 h-20 object-cover border rounded"
                />
                <div>
                  <h3 class="font-bold">{{ product.name }}</h3>
                  <p>ราคา: ฿{{ product.price }}</p>
                  <p class="text-gray-500">เหตุผล: {{ product.reason }}</p>
                  <p class="mt-2 font-bold">สถานะ: 
                    <span
                      :class="{
                        'text-yellow-500': product.status === 'รอดำเนินการ',
                        'text-green-500': product.status === 'สำเร็จ',
                        'text-red-500': product.status === 'ยกเลิก',
                      }"
                    >
                      {{ product.status }}
                    </span>
                  </p>

                  <!-- กรอกเลขแทรค -->
                  <div v-if="product.status === 'สำเร็จ'" class="mt-4">
                    <label :for="'tracking' + product.id" class="font-bold">กรุณาใส่เลขแทร็ก</label>
                    <input
                      :id="'tracking' + product.id"
                      v-model="product.trackingNumber"
                      type="text"
                      class="w-full border p-2 mt-2 rounded-lg"
                      placeholder="ใส่เลขแทร็ก"
                    />
                    <button
                      class="bg-[#FCCA81] hover:bg-[#EE973C] text-white p-2 rounded-lg mt-4"
                      @click="confirmTrackingNumber(product.id)"
                    >
                      ยืนยันเลขแทร็ก
                    </button>
                  </div>

                  <!-- ปุ่มยกเลิก -->
                  <div v-if="product.status === 'รอดำเนินการ'" class="mt-4">
                    <button
                      @click="cancelRefund(product.id)"
                      class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      ยกเลิกการคืนสินค้า
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p v-else class="text-center text-gray-500">ยังไม่มีประวัติการคืนสินค้า</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive } from "vue";
import { useOrderStore } from "@/store/orderStore";

definePageMeta({
  layout: "user",
});

const orderStore = useOrderStore();

// ดึงข้อมูลคำสั่งซื้อและสินค้าที่คืน
const orderId = computed(() => orderStore.selectedOrderId);
const selectedProducts = reactive(
  orderStore.selectedProducts.map((product) => ({
    ...product,
    reason: "",
    paymentMethod: "",
    bankName: "",
    accountNumber: "",
    promptPayNumber: "",
    trackingNumber: "",
  }))
);

// รายการสินค้าที่คืน
const refundProducts = reactive(
  [] as Array<{
    id: number;
    name: string;
    price: number;
    img: string;
    reason: string;
    trackingNumber: string;
    status: string;
  }>
);

// ฟังก์ชันจัดการไฟล์แนบ
const handleImageUpload = (event: Event, productId: number) => {
  const files = (event.target as HTMLInputElement).files;
  console.log("Files uploaded:", files);
};

// ฟังก์ชันส่งคืนสินค้า
const submitReturn = (productId: number) => {
  const productIndex = selectedProducts.findIndex((p) => p.id === productId);
  if (productIndex !== -1) {
    const product = selectedProducts[productIndex];
    refundProducts.push({
      id: product.id,
      name: product.name,
      price: product.price,
      img: product.img,
      reason: product.reason || "ไม่มีเหตุผลระบุ",
      trackingNumber: "",
      status: "รอดำเนินการ",
    });

    selectedProducts.splice(productIndex, 1);
    alert(`คืนสินค้าสำเร็จ: ${product.name}`);
  }
};

// ฟังก์ชันยืนยันเลขแทร็ก
const confirmTrackingNumber = (productId: number) => {
  const product = refundProducts.find((p) => p.id === productId);
  if (product && product.trackingNumber) {
    alert(`เลขแทร็กสำหรับสินค้า ${product.name}: ${product.trackingNumber} ได้รับการยืนยันแล้ว`);
  } else {
    alert("กรุณากรอกเลขแทร็กก่อนยืนยัน");
  }
};

// ฟังก์ชันยกเลิกการคืนสินค้า
const cancelRefund = (productId: number) => {
  const index = refundProducts.findIndex((p) => p.id === productId);
  if (index !== -1 && refundProducts[index].status === "รอดำเนินการ") {
    refundProducts[index].status = "ยกเลิก";
    alert(`การคืนสินค้าสำหรับ ${refundProducts[index].name} ถูกยกเลิกแล้ว`);
  }
};
</script>

<style scoped>
.text-yellow-500 {
  color: #f59e0b;
}
.text-green-500 {
  color: #10b981;
}
.text-red-500 {
  color: #ef4444;
}
.sticky {
  position: sticky;
}
</style>
