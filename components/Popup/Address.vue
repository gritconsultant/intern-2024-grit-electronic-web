<template>
  <div class="w-full md:w-[500px] border-2 flex flex-col justify-center bg-white drop-shadow-lg rounded-lg">
    <div class="p-4 border-b">
      <h1 class="text-xl font-bold mb-4">เพิ่มที่อยู่ใหม่</h1>
      <form @submit.prevent="addShipment">

        <div class="mb-4">
          <label class="block text-sm font-medium">ชื่อผู้รับ</label>
          <input v-model="shipment.firstname" class="w-full p-2 border rounded mt-2" placeholder="ชื่อ" required />
          <input v-model="shipment.lastname" class="w-full p-2 border rounded mt-2" placeholder="นามสกุล" required />
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium">บ้านเลขที่</label>
          <input v-model="shipment.address" class="w-full p-2 border rounded" required />
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium">ตำบล/แขวง</label>
          <input v-model="shipment.sub_district" class="w-full p-2 border rounded" required />
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium">อำเภอ/เขต</label>
          <input v-model="shipment.district" class="w-full p-2 border rounded" required />
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium">จังหวัด</label>
          <input v-model="shipment.province" class="w-full p-2 border rounded" required />
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium">รหัสไปรษณีย์</label>
          <input v-model="shipment.zip_code" class="w-full p-2 border rounded" required />
        </div>

        <div class="flex justify-between mt-6">
          <button type="button" class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600" @click="cancel">
            ยกเลิก
          </button>
          <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            บันทึก
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import Swal from "sweetalert2";
import { ref, defineEmits, onMounted } from "vue";
import type { ShipmentCreate, ShipmentRes } from "~/models/product.model";
import service from "~/service";
import { useIndexStore } from "~/store/main";

const store = useIndexStore();

// กำหนดค่า shipment ให้เป็นค่าเริ่มต้น
const shipment = ref<ShipmentCreate>({
  id: 0,
  firstname: "",
  lastname: "",
  address: "",
  zip_code: 0,
  sub_district: "",
  district: "",
  province: "",
});

const shipmentRes = ref<ShipmentRes>({
  id: 0,
  firstname: "",
  lastname: "",
  address: "",
  zip_code: 0,
  sub_district: "",
  district: "",
  province: "",
});
// เมื่อแอดที่อยู่ใหม่ให้เรียกฟังก์ชันนี้
const addShipment = async () => {
  // ตรวจสอบข้อมูล
  if (!shipment.value.firstname || !shipment.value.lastname || !shipment.value.address || !shipment.value.zip_code ||
      !shipment.value.sub_district || !shipment.value.district || !shipment.value.province) {
    Swal.fire({
      title: "กรุณากรอกข้อมูลให้ครบถ้วน",
      text: "กรุณากรอกข้อมูลทั้งหมดก่อนบันทึก",
      icon: "error",
      confirmButtonText: "ตกลง",
    });
    return;
  }

  // ตรวจสอบรหัสไปรษณีย์
  if (isNaN(shipment.value.zip_code) || shipment.value.zip_code <= 0) {
    Swal.fire({
      title: "รหัสไปรษณีย์ไม่ถูกต้อง",
      text: "กรุณากรอกรหัสไปรษณีย์ที่ถูกต้อง",
      icon: "error",
      confirmButtonText: "ตกลง",
    });
    return;
  }

  // ส่งข้อมูลที่อยู่ใหม่ไปยัง API
  await service.product.addShipment(shipment.value)
    .then((resp: any) => {
      const data = resp.data.data;
      if (data) {
        Swal.fire({
          title: "เพิ่มที่อยู่สำเร็จ!",
          text: "ที่อยู่ของคุณได้ถูกเพิ่มแล้ว!",
          icon: "success",
          confirmButtonText: "ตกลง",
        });
        // ปิด Popup และรีเซ็ตค่าที่อยู่
        store.addressAction = false;
      }
      // อัพเดทข้อมูล shipmentRes
      shipmentRes.value = {
        id: data.id,
        firstname: data.firstname,
        lastname: data.lastname,
        address: data.address,
        zip_code: data.zip_code,
        sub_district: data.sub_district,
        district: data.district,
        province: data.province,
      };
    })
    .catch((error: any) => {
      console.error(error);
      Swal.fire({
        title: "เกิดข้อผิดพลาด!",
        text: "ไม่สามารถเพิ่มที่อยู่ได้ กรุณาลองใหม่",
        icon: "error",
        confirmButtonText: "ตกลง",
      });
    });
};

// ฟังก์ชันยกเลิก
const cancel = () => {
  store.addressAction = false; // ปิด Popup
};

onMounted(() => {
  // กรณีที่มีการโหลดข้อมูลที่อยู่ (ถ้าจำเป็น)
  console.log("Component loaded");
});
</script>

<style scoped>
/* คุณสามารถเพิ่มสไตล์เพิ่มเติมที่นี่ */
</style>
