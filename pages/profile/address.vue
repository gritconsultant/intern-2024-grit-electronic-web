<template>
  <div class="flex p-4 h-full">
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
        <div
          class="flex justify-center mt-5 overflow-y-auto sticky top-0"
          style="max-height: 56vh"
        >
          <div class="w-[500px]">
            <div
              v-for="(i, index) in shipment"
              :key="i.id"
              class="mb-4 p-4 border rounded-lg transition-colors"
            >
              <h2 class="font-bold text-lg">ที่อยู่ {{ index + 1 }}</h2>
              <p>ชื่อ: {{ i.firstname }} {{ i.lastname }}</p>
              <p>บ้านเลขที่: {{ i.address }}</p>
              <p>หมู่: {{ i.address }}</p>
              <p>ตำบล: {{ i.sub_district }}</p>
              <p>อำเภอ: {{ i.district }}</p>
              <p>
                จังหวัด: {{ i.province }}
                <span>รหัสไปรษณีย์: {{ i.zip_code }}</span>
              </p>
              <p>โทรศัพท์: {{ }}</p>

              <!-- ปุ่มตั้งค่าเริ่มต้น -->
              <div class="mt-4 flex items-center justify-between">
                <button
                  class="text-blue-500 hover:underline"
                  @click="store.editaddressAction = !store.editaddressAction"
                >
                  แก้ไข
                </button>
              </div>
            </div>

            <!-- ถ้าไม่มีข้อมูลที่อยู่ -->
            <div
              v-if="shipment.length === 0"
              class="text-center text-gray-500 mt-6"
            >
              ไม่พบข้อมูลที่อยู่
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Popup -->
    <div
      v-if="store.addressAction"
      @click="store.addressAction = !store.addressAction"
      class="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
    >
      <div @click.stop>
        <PopupAddress />
      </div>
    </div>

    <div
      v-if="store.editaddressAction"
      @click="store.editaddressAction = !store.editaddressAction"
      class="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
    >
      <div @click.stop>
        <PopupEditAddress />
      </div>
    </div>

    <Loading :loading="loading" />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "user",
});

import type { Shipment, ShipmentId, UserInfo } from "~/models/product.model";
import service from "~/service";
import { useIndexStore } from "~/store/main";
const store = useIndexStore();
const loading = ref(false);

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

const shipment = ref<ShipmentId[]>([]);

const getuserinfo = async () => {
  loading.value = true;
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
    .finally(() => {
      loading.value = false;
    });
};

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

onMounted(() => {
  getuserinfo();
  getShipment();
});
</script>

<style scoped>
.sticky {
  position: sticky;
}
.overflow-hidden {
  overflow: hidden;
}

.overflow-y-auto {
  overflow-y: auto;
}
</style>
