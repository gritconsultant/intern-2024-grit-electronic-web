<template>
  <div class="w-full md:w-[500px] border-2 flex flex-col justify-center gap-2 rounded-[5px] bg-white drop-shadow-lg overflow-hidden">
    <div class="p-4 md:p-5 border-b-2">
      <h1 class="text-xl font-bold mb-4">แก้ไขที่อยู่</h1>
      <div>
        <form @submit.prevent="updateShipment">
          <div class="mb-4">
            <label class="block text-sm font-medium">ชื่อ</label>
            <input v-model="editData.firstname" class="w-full p-2 border rounded" required />
          </div>

          <div class="mb-4">
            <label class="block text-sm font-medium">นามสกุล</label>
            <input v-model="editData.lastname" class="w-full p-2 border rounded" required />
          </div>

          <div class="mb-4">
            <label class="block text-sm font-medium">ที่อยู่</label>
            <textarea v-model="editData.address" class="w-full p-2 border rounded" required></textarea>
          </div>

          <div class="mb-4">
            <label class="block text-sm font-medium">ตำบล/แขวง</label>
            <input v-model="editData.sub_district" class="w-full p-2 border rounded" required />
          </div>

          <div class="mb-4">
            <label class="block text-sm font-medium">อำเภอ/เขต</label>
            <input v-model="editData.district" class="w-full p-2 border rounded" required />
          </div>

          <div class="mb-4">
            <label class="block text-sm font-medium">จังหวัด</label>
            <input v-model="editData.province" class="w-full p-2 border rounded" required />
          </div>

          <div class="mb-4">
            <label class="block text-sm font-medium">รหัสไปรษณีย์</label>
            <input v-model="editData.zip_code" class="w-full p-2 border rounded" required />
          </div>

          <div class="flex justify-between mt-6">
            <button type="button" class="bg-gray-500 text-white px-4 py-2 rounded" @click="cancel">ยกเลิก</button>
            <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">บันทึก </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from "vue";
import type { Shipment } from "~/models/product.model";
import service from "~/service";
import { useIndexStore } from "~/store/main";

const store = useIndexStore();
const emit = defineEmits(["addressUpdated"]);

const props = defineProps<{ shipment: Shipment }>();
const editData = ref<Shipment>({ ...props.shipment });

// อัปเดตข้อมูลที่อยู่
const updateShipment = async () => {
  const updatedData = {
    ...editData.value,
    id: String(editData.value.id), //แปลง id เป็น string
  };

  await service.product
    .updateShipment(updatedData.id, updatedData)
    .then(() => {
      emit("addressUpdated", { ...editData.value });
      alert("แก้ไขที่อยู่สำเร็จ!");
    })
    .catch(() => console.error("เกิดข้อผิดพลาดในการอัปเดตที่อยู่"));
};



// ยกเลิกการแก้ไข
const cancel = () => {
  store.editaddressAction = false;
};
</script>
