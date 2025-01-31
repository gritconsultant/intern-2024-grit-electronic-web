<template>
  <div class="flex p-4 h-full overflow-y-auto">
    <!-- Sidebar -->
    <Sidebar />
    <div class="w-full lg:w-3/4 p-6">
      <div class="flex justify-between border-b">
        <h1 class="text-xl font-bold mb-6">ที่อยู่</h1>
        <button
          class="text-black/50 hover:underline"
          @click="store.addressAction = !store.addressAction"
        >
          เพิ่มที่อยู่ใหม่
        </button>
      </div>

      <div>
        <div class="flex justify-center mt-5">
          <div class="w-[500px]">
            <div
              v-if="shipment.id !== 0"
              class="mb-4 p-4 border rounded-lg transition-colors"

            >
              <h2 class="font-bold text-lg">{{ shipment.id }}</h2>
              <p>ชื่อ: {{ shipment.firstname }} {{ shipment.lastname }}</p>
              <p>บ้านเลขที่: {{ shipment.address }}</p>
              <p>หมู่: {{ shipment.address }}</p>
              <p>ตำบล: {{ shipment.sub_district}}</p>
              <p>อำเภอ: {{ shipment.district }}</p>
              <p>
                จังหวัด: {{ shipment.province }}
              </p>
              <p>รหัสไปรษณีย์:  {{ shipment.zip_code }}</p>

              <!-- ปุ่มตั้งค่าเริ่มต้น -->
              <div class="mt-4 flex items-center justify-between">
                <button
                  class="text-blue-500 hover:underline"
                >
                  แก้ไข
                </button>
              </div>
            </div>

            <div v-else class="text-center text-gray-500 mt-6">
              ไม่พบข้อมูลที่อยู่
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
        <PopupAddress @click="handleAddressAdded" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "user",
});

import { reactive } from "vue";
import type { Shipment, UserInfo } from "~/models/product.model";
import service from "~/service";
import { useIndexStore } from "~/store/main";
import { useRoute } from "vue-router";
const store = useIndexStore();
const route = useRoute();


const getinfo = ref<UserInfo>({
  ID: 0,
  FirstName: "",
  LastName: "",
  Username: "",
  Password: "",
  Email: "",
  Phone: 0,
  created_at: 0,
  updated_at: 0,
});

const shipment = ref<Shipment>({
  id: 0,
    firstname: "",
    lastname: "",
    address: "",
    zip_code: 0,
    sub_district: "",
    district: "",
    province: "",
    status: "",
    created_at: 0,
    updated_at: 0,
})

const getuserinfo = async () => {
  await service.product
    .getUserInfo()
    .then((resp: any) => {
      console.log(resp);
      const data = resp.data.data;
      const user: UserInfo = {
        ID: data.ID,
        FirstName: data.FirstName,
        LastName: data.LastName,
        Username: data.Username,
        Password: data.Password,
        Email: data.Email,
        Phone: data.Phone,
        created_at: data.created_at,
        updated_at: data.updated_at,
      };
      getinfo.value = user;
    })
    .catch((error: any) => {
      console.log(error);
    })
    .finally(() => {});
};

const getShipmentId = async () => {
  await service.product
   .getShipmentId(store.$state.userId)
   .then((resp: any) => {
      console.log(resp);
      const data = resp.data.data;
      const shipmentlist: Shipment = {
        id: data.id,
        firstname: data.firstname,
        lastname: data.lastname,
        address: data.address,
        zip_code: data.zip_code,
        sub_district: data.sub_district,
        district: data.district,
        province: data.province,
        status: data.status,
        created_at: data.created_at,
        updated_at: data.updated_at,
      }
      shipment.value = shipmentlist;
    })
   .catch((error: any) => {
      console.log(error);
    })
   .finally(() => {});
}

const handleAddressAdded = (newAddress: Shipment) => {
  console.log("ได้รับที่อยู่ใหม่:", newAddress); // ✅ ตรวจสอบค่าที่ได้รับ
  shipment.value = newAddress;
};
// const getshipmentlist =async () => {
//   await service.product.getShipmentList()
//   .then((resp: any) => {
//     console.log(resp);
//     const data = resp.data.data;
//     const shipmentlist: Shipment = {
//       id: data[0].id,
//       firstname: data[0].firstname,
//       lastname: data[0].lastname,
//       address: data[0].address,
//       zip_code: data[0].zip_code,
//       sub_district: data[0].sub_district,
//       district: data[0].district,
//       province: data[0].province,
//       status: data[0].status,
//       created_at: data[0].created_at,
//       updated_at: data[0].updated_at,
//     }
//     shipment.value = shipmentlist;
//   })
//   .catch((error: any) => {
//     console.log(error);
//   })
//   .finally(() => {});
// }




onMounted(() => {
  getuserinfo();
  // getshipmentlist();
  getShipmentId();
});
</script>

<style scoped>
.overflow-hidden {
  overflow: hidden;
}

.overflow-y-auto {
  overflow-y: auto;
}
</style>
