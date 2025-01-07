<template>
  <div class="flex flex-col min-h-screen">
    <!-- เนื้อหาหลัก -->
    <div class="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- คอลัมน์ซ้าย -->
      <div class="border-2 p-5">
        <div class="text-center text-xl font-semibold mb-5">Tack Pages</div>

        <!-- ขั้นตอนการสั่งซื้อ -->
        <div class="bg-red-500 grid justify-center">
          <div class="flex justify-center bg-lime-400 max-w-full md:w-[500px] p-4 rounded-lg">
            <ol class="flex gap-4 md:gap-16 overflow-x-auto">
              <!-- ขั้นตอนที่ 1 -->
              <li class="text-center">
                <span
                  class="flex items-center justify-center w-10 h-10 bg-[#988FD0] text-white rounded-full"
                >
                  <svg
                    class="w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 16 12"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M1 5.917 5.724 10.5 15 1.5"
                    />
                  </svg>
                </span>
                <p class="text-sm mt-4">ตะกร้าสินค้า</p>
              </li>

              <!-- ขั้นตอนที่ 2 -->
              <li class="text-center">
                <span
                  class="flex items-center justify-center w-10 h-10 bg-gray-100 text-gray-500 rounded-full"
                >
                  <svg
                    class="w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 16"
                  >
                    <path
                      d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Z"
                    />
                  </svg>
                </span>
                <p class="text-sm mt-4">รายละเอียดคำสั่งซื้อ</p>
              </li>

              <!-- ขั้นตอนที่ 3 -->
              <li class="text-center">
                <span
                  class="flex items-center justify-center w-10 h-10 bg-gray-100 text-gray-500 rounded-full"
                >
                  <svg
                    class="w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 18 20"
                  >
                    <path
                      d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2ZM7 2h4v3H7V2Zm5.7 8.289-3.975 3.857a1 1 0 0 1-1.393 0L5.3 12.182a1.002 1.002 0 1 1 1.4-1.436l1.328 1.289 3.28-3.181a1 1 0 1 1 1.392 1.435Z"
                    />
                  </svg>
                </span>
                <p class="text-sm mt-4">ชำระเงิน</p>
              </li>
            </ol>
          </div>
        </div>

        <!-- ที่อยู่ -->
        <div class="mt-5">
          <div class="bg-pink-500 p-3 flex justify-between items-center border-2">
            <p>ที่อยู่ของคุณ</p>
            <p
              class="text-xs text-black/50 hover:underline cursor-pointer"
            >
              เปลี่ยนที่อยู่
            </p>
          </div>
          <div class="border-2 mt-3 p-3">
            <p>ที่อยู่ของร้านค้า</p>
          </div>
        </div>
      </div>

      <!-- คอลัมน์ขวา -->
      <div class="border-2 p-5">
        <h3 class="text-lg font-semibold">คำสั่งซื้อของคุณ</h3>
        <ul class="mt-3">
          <li v-for="(item, index) in orderItems" :key="index" class="flex justify-between border-b py-2">
            <span>{{ item.name }}</span>
            <span>฿ {{ item.price }}</span>
          </li>
        </ul>

        <div class="mt-5">
          <input
            type="text"
            placeholder="กรอกโค้ดส่วนลด"
            v-model="discountCode"
            class="border p-2 w-full rounded mb-3"
          />
          <button @click="applyDiscount" class="bg-blue-500 text-white px-4 py-2 rounded w-full">
            ใช้โค้ด
          </button>
        </div>

        <div class="mt-5 text-right">
          <p>รวม: ฿ {{ total }}</p>
          <p>ส่วนลด: ฿ {{ discount }}</p>
          <p>ค่าส่ง: ฿ {{ shippingCost }}</p>
          <p class="font-bold">รวมทั้งหมด: ฿ {{ grandTotal }}</p>
        </div>

        <button class="bg-green-500 text-white px-4 py-2 rounded w-full mt-3">ชำระเงิน</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

// ข้อมูลสินค้าในคำสั่งซื้อ
const orderItems = ref([
  { name: "แหวนแพซชนาเกตต์ 47 — ทองคำขาว 9k", price: 24999 },
  { name: "แหวนแพซชนาเกตต์ 47 — ทองคำขาว 9k", price: 24999 },
]);

// โค้ดส่วนลด
const discountCode = ref("");
const discount = ref(0);

// ค่าขนส่ง
const shippingCost = ref(180);

// คำนวณรวมทั้งหมด
const total = computed(() =>
  orderItems.value.reduce((sum, item) => sum + item.price, 0)
);
const grandTotal = computed(() => total.value - discount.value + shippingCost.value);

// ฟังก์ชันใช้โค้ดส่วนลด
function applyDiscount() {
  if (discountCode.value === "SALE20") {
    discount.value = 1000;
  } else {
    discount.value = 0;
    alert("โค้ดส่วนลดไม่ถูกต้อง");
  }
}
</script>

<style scoped>
</style>
