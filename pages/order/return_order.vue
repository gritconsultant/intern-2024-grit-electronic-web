<template>
  <div class="p-6">
    <h1 class="text-xl font-bold mb-4">คืนสินค้า</h1>
    <div class="bg-white p-4 rounded-lg shadow border">
      <h2 class="font-bold">รายละเอียดคำสั่งซื้อ</h2>
      <p>หมายเลขคำสั่งซื้อ: {{ orderId }}</p>

      <div class="mt-4">
        <h2 class="font-bold">รายการคืนสินค้า</h2>
        <!-- รายการสินค้า -->
        <div v-for="product in selectedProducts" :key="product.id" class="border-b p-4">
          <h3>ชื่อสินค้า: {{ product.name }}</h3>
          <p>ราคา: ฿{{ product.price }}</p>

          <!-- ฟอร์มสำหรับแต่ละสินค้า -->
          <div class="mt-4">
            <label :for="'reason-' + product.id" class="font-bold">เหตุผลในการคืนสินค้า</label>
            <textarea
              :id="'reason-' + product.id"
              v-model="product.reason"
              rows="3"
              class="w-full border p-2 mt-2 rounded-lg"
              placeholder="กรุณาใส่เหตุผลสำหรับการคืนสินค้า"
            ></textarea>

            <label :for="'file-' + product.id" class="font-bold mt-4 block">แนบรูปภาพ</label>
            <input
              :id="'file-' + product.id"
              type="file"
              multiple
              accept="image/*"
              @change="handleImageUpload($event, product.id)"
              class="w-full mt-2 p-2 border rounded-lg"
            />

            <!-- แสดงไฟล์ที่แนบ -->
            <div class="mt-4" v-if="product.files.length">
              <h4 class="font-bold">รูปภาพที่แนบ:</h4>
              <ul>
                <li v-for="file in product.files" :key="file.name">
                  {{ file.name }} ({{ (file.size / 1024).toFixed(2) }} KB)
                </li>
              </ul>
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

        <!-- ไม่มีสินค้า -->
        <p v-if="selectedProducts.length === 0" class="text-center text-gray-500 mt-6">
          ไม่มีสินค้าในรายการคืนสินค้า
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive } from "vue";
import { useOrderStore } from "@/store/orderStore";

// ดึง Store
const orderStore = useOrderStore();

// ดึงข้อมูลออเดอร์และสินค้าที่เลือก
const orderId = computed(() => orderStore.selectedOrderId);
const selectedProducts = reactive(
  orderStore.selectedProducts.map((product) => ({
    ...product,
    reason: "", // เพิ่มฟิลด์สำหรับเหตุผลการคืนสินค้า
    files: [] as File[], // กำหนดชนิดข้อมูลเป็น File[]
  }))
);

// ฟังก์ชันจัดการไฟล์แนบ (เฉพาะรูปภาพ)
const handleImageUpload = (event: Event, productId: number) => {
  const files = (event.target as HTMLInputElement).files;
  const product = selectedProducts.find((p) => p.id === productId);
  if (files && product) {
    const imageFiles = Array.from(files).filter((file) =>
      file.type.startsWith("image/")
    ); // กรองเฉพาะไฟล์ที่เป็นรูปภาพ
    product.files = imageFiles;
  }
};

// ฟังก์ชันส่งคืนสินค้า
const submitReturn = (productId: number) => {
  const productIndex = selectedProducts.findIndex((p) => p.id === productId);
  if (productIndex !== -1) {
    alert(`คืนสินค้าสำเร็จ: ${selectedProducts[productIndex].name}`);
    selectedProducts.splice(productIndex, 1); // ลบสินค้าที่ส่งคืนออกจากรายการ
  }
};
</script>

<style scoped>
textarea {
  resize: none;
}
</style>
