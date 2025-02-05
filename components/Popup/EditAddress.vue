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
            <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">บันทึก </button>
          </div>
        </form>
      </div>
    </div>
    <Loading :loading="loading" />
  </div>
</template>

<script setup lang="ts">
import Swal from "sweetalert2";
import type { Shipment, ShipmentId, ShipmentRes, ShipmentUpdate } from "~/models/product.model";
import service from "~/service";
import { useIndexStore } from "~/store/main";

const store = useIndexStore();
const route = useRoute();
const loading = ref(false);
const shipment = ref<ShipmentId[]>([]);
const shipmentUpdate = ref<ShipmentUpdate>({
  id: 0,
  firstname: "",
  lastname: "",
  address: "",
  sub_district: "",
  district: "",
  province: "",
  zip_code: 0,
})

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

const getShipment = async () => {
  loading.value = true;
  await service.product
    .getShipmentId()
    .then((resp: any) => {
      const data = resp.data.data;
      const shipmentlist: Shipment[] = [];
      console.log(data);

      for (let i = 0; i < data.length; i++) {
        const e = data[i];
        const shipments: Shipment = {
          id: e.id,
          firstname: e.firstname,
          lastname: e.lastname,
          address: e.address,
          zip_code: e.zip_code,
          sub_district: e.sub_district,
          district: e.district,
          province: e.province,
          status: e.status,
          created_at: e.created_at,
          updated_at: e.updated_at,
        };
        shipmentlist.push(shipments);
      }
      shipment.value = shipmentlist;
    })
    .catch((error: any) => {
      console.log(error);
    })
    .finally(() => {
      loading.value = false;
    });
};

const updateShipments = async() => {
  await service.product.updateShipment(route.params.id, shipmentUpdate.value)
  .then((resp: any) => {
    const data = resp.data.data;

    if (data) {
        Swal.fire({
          title: "แก้ไขที่อยู่สำเร็จ!",
          text: "ที่อยู่ของคุณได้แก้ไขแล้ว!",
          icon: "success",
          confirmButtonText: "Okay",
        });
      }

      const shipment: ShipmentRes = {
        id: data.id,
        firstname: data.firstname,
        lastname: data.lastname,
        address: data.address,
        zip_code: data.zip_code,
        sub_district: data.sub_district,
        district: data.district,
        province: data.province,
      };
      shipmentRes.value = shipment;
  })
  .catch((error: any) => {
    console.error(error.response);
  })
  .finally(() => {
  });
}


// ยกเลิกการแก้ไข
const cancel = () => {
  store.editaddressAction = false;
};

onMounted(() => {
  getShipment();
});
</script>
