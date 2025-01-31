<template>
  <div class="w-full md:w-[500px] border-2 flex flex-col justify-center bg-white drop-shadow-lg rounded-lg">
    <div class="p-4 border-b">
      <h1 class="text-xl font-bold mb-4">เพิ่มที่อยู่ใหม่</h1>
      <form @submit.prevent="saveAddress">

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
          <label class="block text-sm font-medium">ตำบล</label>
          <input v-model="shipment.sub_district" class="w-full p-2 border rounded" required />
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium">อำเภอ</label>
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
        <div class="mb-4">
          <label class="block text-sm font-medium">สถานะ</label>
          <input v-model="shipment.status" class="w-full p-2 border rounded" required />
        </div>

        <div class="flex justify-between mt-6">
          <button type="button" class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600" @click="cancel">
            ยกเลิก
          </button>
          <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" @click="addShipment">
            บันทึก
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from "vue";
import type { ShipmentCreate, ShipmentRes } from "~/models/product.model";
import service from "~/service";
import { useIndexStore } from "~/store/main";

const store = useIndexStore();
const emit = defineEmits(["addressAdded"]);

const shipment = ref<ShipmentCreate>({
  firstname: "",
  lastname: "",
  address: "",
  zip_code: 0,
  sub_district: "",
  district: "",
  province: "",
  status: "",
})

const shipmentRes = ref<ShipmentRes>({
  firstname: "",
  lastname: "",
  address: "",
  zip_code: 0,
  sub_district: "",
  district: "",
  province: "",
  status: "",
})

const addShipment = async () => {
  await service.product.addShipment(shipment.value)
  .then((resp: any) => {
    console.log(resp.data);

    const data = resp.data.data;
    const shipment: ShipmentRes = {
      firstname: data.firstname,
      lastname: data.lastname,
      address: data.address,
      zip_code: data.zip_code,
      sub_district: data.sub_district,
      district: data.district,
      province: data.province,
      status: data.status,
    }
    shipmentRes.value = shipment;
  })
  .catch((error: any) => {
     console.error(error);
   });
   store.addressAction = false;
}

// บันทึกที่อยู่ใหม่
const saveAddress = () => {
  if (!shipmentRes.value.firstname || !shipmentRes.value.lastname || !shipmentRes.value.address || !shipmentRes.value.zip_code ||
      !shipmentRes.value.sub_district || !shipmentRes.value.district || !shipmentRes.value.province || !shipmentRes.value.status) {
    alert("กรุณากรอกข้อมูลให้ครบถ้วน");
    return;
  }

  console.log("ส่งข้อมูลไปที่ profile/address.vue:", shipmentRes.value);
  emit("addressAdded", shipmentRes.value);
  store.addressAction = false; // ปิด Popup
};

// ยกเลิกการเพิ่มที่อยู่
const cancel = () => {
  store.addressAction = false;
};
</script>
