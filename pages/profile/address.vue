<template>
  <div class="flex p-4">
    <!-- Sidebar -->
    <Sidebar />
    <div class="w-full lg:w-3/4 p-6">
      <div class="flex justify-between border-b">
        <h1 class="text-xl font-bold mb-6">ที่อยู่</h1>
        <button class="text-black/50 hover:underline" @click="store.addressAction = !store.addressAction">เพิ่มที่อยู่ใหม่</button>
      </div>

      <div>
        <div class="flex justify-center mt-5">
          <div>
            <div
              v-for="(address, index) in addresses"
              :key="index"
              class="mb-4 p-4 border rounded-lg transition-colors"
              :class="{
                'bg-gray-100': address.isDefault,
                'bg-white': !address.isDefault,
              }"
            >
              <!-- ที่อยู่ -->
              <h2 class="font-bold text-lg">{{ address.title }}</h2>
              <p>{{ address.name }}</p>
              <p>{{ address.address }}</p>
              <p>{{ address.phone }}</p>

              <!-- ปุ่มตั้งค่าเริ่มต้น -->
              <div class="mt-4 flex items-center justify-between">
                <button
                  class="text-blue-500 hover:underline"
                  @click="handleEdit(address)"
                >
                  แก้ไข
                </button>
                <button
                  v-if="!address.isDefault"
                  class="text-sm text-gray-700 bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                  @click="setDefaultAddress(index)"
                >
                  ตั้งเป็นค่าเริ่มต้น
                </button>
                <span v-else class="text-sm text-green-500 font-semibold">
                  ค่าเริ่มต้น
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
        <!-- Payment Popup -->
        <div
      v-if="store.addressAction"
      @click="store.addressAction = !store.addressAction"
      class="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
    >
    <div @click.stop>
      <PopupAddress />
    </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { useIndexStore } from "~/store/main";
const store = useIndexStore();

const addresses = reactive([
  {
    title: "หอพัก",
    name: "kk kub",
    address: "condo kk หมู่ 12 ตำบลศิลา อำเภอเมือง จังหวัดขอนแก่น 40000",
    phone: "0 65 094 5399",
    isDefault: true,
  },
  {
    title: "บ้าน",
    name: "สวัสดี ครับ",
    address: "000/000 โครงการหมู่บ้านเนื้ออาคาร หมู่ 7 ตำบลในเมือง อำเภอเมือง จังหวัดขอนแก่น 40000",
    phone: "0 65 094 5399",
    isDefault: false,
  },
]);

function handleEdit(address: typeof addresses[number]) {
  console.log("กำลังแก้ไข:", address);
}

function setDefaultAddress(index: number) {
  addresses.forEach((address, i) => {
    address.isDefault = i === index;
  });
  alert(`ตั้งที่อยู่ "${addresses[index].title}" เป็นค่าเริ่มต้นเรียบร้อยแล้ว`);
}

</script>

<style scoped>
.bg-gray-100 {
  background-color: #f3f4f6;
}
.bg-white {
  background-color: #ffffff;
}
</style>
