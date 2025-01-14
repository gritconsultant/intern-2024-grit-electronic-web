<template>
  <div class="flex p-4">
    <!-- Sidebar -->
    <Sidebar />
    <div class="w-full lg:w-3/4 p-6">
      <div class="flex justify-between border-b">
        <h1 class="text-xl font-bold mb-6">ที่อยู่</h1>
        <button class="text-black/50 hover:underline" @click="addNewAddress">เพิ่มที่อยู่ใหม่</button>
      </div>

      <div>
        <div class="flex justify-center mt-5">
          <div>
            <div>
              <CardAddress
                v-for="(address, index) in addresses"
                :key="index"
                :address="address"
                @edit="handleEdit"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

definePageMeta({
  layout: "user",
});

import type { Address } from '~/models/product.model';

// Mock ข้อมูลสำหรับตัวอย่าง
const addresses: Address[] = [
  {
    title: 'หอพัก',
    name: 'kk kub',
    address: 'condo kk หมู่ 12 ตำบลศิลา อำเภอเมือง จังหวัดขอนแก่น 40000',
    phone: '0 65 094 5399',
  },
  {
    title: 'บ้าน',
    name: 'สวัสดี ครับ',
    address: '000/000 โครงการหมู่บ้านเนื้ออาคาร หมู่ 7 ตำบลในเมือง อำเภอเมือง จังหวัดขอนแก่น 40000',
    phone: '0 65 094 5399',
  },
];

// ฟังก์ชันแก้ไข
function handleEdit(address: Address) {
  console.log('กำลังแก้ไข:', address);
}

function addNewAddress() {
  alert("ฟอร์มเพิ่มที่อยู่ใหม่");
}
</script>

<style scoped></style>
