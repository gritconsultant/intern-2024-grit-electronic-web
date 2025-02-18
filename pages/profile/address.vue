<template>
  <div class="flex p-4 h-full">
    <Sidebar />
    <div class="w-full md:w-3/4 p-6">
      <div class="border-b flex justify-between">
        <h1 class="text-xl font-bold mb-6">ที่อยู่</h1>
        <button
          class="text-black/50 hover:underline"
          @click="addressAction = !addressAction"
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
              class="mb-4 p-4 rounded-lg transition-colors border"
            >
              <h2 class="font-bold text-lg">ที่อยู่ {{ index + 1 }}</h2>
              <span>ชื่อ: {{ i.firstname }} {{ i.lastname }}</span>
              <p>
                บ้านเลขที่: {{ i.address }} <span class="px-2">หมู่: {{ i.address }}</span>
                <span class="px-1" >ตำบล/แขวง: {{ i.sub_district }}</span>               <span class="px-1">อำเภอ/เขต: {{ i.district }}</span>
              </p>


              <p>
                จังหวัด: {{ i.province }}
                <span class="px-1">รหัสไปรษณีย์: {{ i.zip_code }}</span>
              </p>

              <!-- ปุ่มแก้ไขที่อยู่ -->
              <div class="mt-4 flex items-center justify-end">
                <button
                  class="text-blue-500 hover:underline"
                  @click="editAddress(i)"
                >
                  แก้ไขที่อยู่
                </button>
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
    </div>

    <!-- Popup สำหรับเพิ่มและแก้ไขที่อยู่ -->
    <div
      v-if="addressAction"
      @click="addressAction = !addressAction"
      class="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
    >
      <div @click.stop>
        <PopupAddress />
      </div>
    </div>

    <div
      v-if="editaddressAction"
      @click="editaddressAction = !editaddressAction"
      class="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
    >
      <div @click.stop>
        <PopupEditAddress :addressData="editingAddressData" />
      </div>
    </div>

    <Loading :loading="loading" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { Shipment } from "~/models/product.model";
import service from "~/service";

definePageMeta({
  layout: "user",
});

definePageMeta({
  middleware: 'auth'
})


const shipment = ref<Shipment[]>([]);
const addressAction = ref(false);
const editaddressAction = ref(false);
const loading = ref(false);
const editingAddressData = ref<Shipment | null>(null);

const editAddress = (address: Shipment) => {
  editingAddressData.value = { ...address };
  editaddressAction.value = true;
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
      console.log(shipment.value)
      console.log(error);
    })
    .finally(() => {
      loading.value = false;
    });
};

onMounted(() => {
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
