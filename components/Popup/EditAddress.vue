<template>
  <div class="w-full md:w-[500px] border-2 flex flex-col justify-center gap-2 rounded-[5px] bg-white drop-shadow-lg overflow-hidden">
    <div class="p-4 md:p-5 border-b-2">
      <h1 class="text-xl font-bold mb-4">แก้ไขที่อยู่</h1>
      <div>
        <form @submit.prevent="updateShipments">
          <div class="mb-4">
            <label class="block text-sm font-medium">ชื่อ</label>
            <input v-model="shipmentUpdate.firstname" class="w-full p-2 border rounded" required />
          </div>

          <div class="mb-4">
            <label class="block text-sm font-medium">นามสกุล</label>
            <input v-model="shipmentUpdate.lastname" class="w-full p-2 border rounded" required />
          </div>

          <div class="mb-4">
            <label class="block text-sm font-medium">ที่อยู่</label>
            <textarea v-model="shipmentUpdate.address" class="w-full p-2 border rounded" required></textarea>
          </div>

          <div class="mb-4">
            <label class="block text-sm font-medium">ตำบล/แขวง</label>
            <input v-model="shipmentUpdate.sub_district" class="w-full p-2 border rounded" required />
          </div>

          <div class="mb-4">
            <label class="block text-sm font-medium">อำเภอ/เขต</label>
            <input v-model="shipmentUpdate.district" class="w-full p-2 border rounded" required />
          </div>

          <div class="mb-4">
            <label class="block text-sm font-medium">จังหวัด</label>
            <input v-model="shipmentUpdate.province" class="w-full p-2 border rounded" required />
          </div>

          <div class="mb-4">
            <label class="block text-sm font-medium">รหัสไปรษณีย์</label>
            <input v-model="shipmentUpdate.zip_code" class="w-full p-2 border rounded" required />
          </div>

          <div class="flex justify-between mt-6">
            <button type="button" class="bg-gray-500 text-white px-4 py-2 rounded" @click="cancel">ยกเลิก</button>
            <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">บันทึก</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineProps } from "vue";
import Swal from "sweetalert2";
import service from "~/service";
import type { ShipmentUpdate } from "~/models/product.model";
import { useIndexStore } from "~/store/main";

const store = useIndexStore();

const props = defineProps({
  addressData: Object as () => ShipmentUpdate | null, // รับค่า addressData จาก props
});

const shipmentUpdate = ref<ShipmentUpdate>({
  id: 0,
  firstname: "",
  lastname: "",
  address: "",
  sub_district: "",
  district: "",
  province: "",
  zip_code: 0,
});

// อัปเดตข้อมูลเมื่อ props เปลี่ยนแปลง
watch(
  () => props.addressData,
  (newVal) => {
    if (newVal) {
      shipmentUpdate.value = { ...newVal };
    }
  },
  { immediate: true }
);

const updateShipments = async () => {
  try {
    const resp = await service.product.updateShipment(
      shipmentUpdate.value.id.toString(), // 🔹 แปลง id เป็น string ก่อนส่ง
      shipmentUpdate.value
    );
    const data = resp.data.data;

    if (data) {
      Swal.fire({
        title: "แก้ไขที่อยู่สำเร็จ!",
        text: "ที่อยู่ของคุณได้แก้ไขแล้ว!",
        icon: "success",
        confirmButtonText: "Okay",
      });
    }
  } catch (error) {
    console.error("Update Error:", error);
  }
};


// ยกเลิกการแก้ไข
const cancel = () => {
  store.editaddressAction = false;
};
</script>
