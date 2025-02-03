<template>
  <div class="flex p-4 h-full overflow-y-auto">
    <Sidebar />
    <div class="w-full lg:w-3/4 p-6">
      <div class="flex justify-between border-b">
        <h1 class="text-xl font-bold mb-6">ที่อยู่</h1>
        <button class="text-black/50 hover:underline" @click="store.addressAction = true">
          เพิ่มที่อยู่ใหม่
        </button>
      </div>

      <div class="overflow-y-auto sticky" style="max-height: 60vh">
        <div class="flex justify-center mt-5">
          <div class="w-[500px]">
            <!-- เช็คว่ามีที่อยู่หรือไม่ -->
            <div v-if="shipments.length > 0">
              <div v-for="(shipment, index) in shipments" :key="shipment.id" class="mb-4 p-4 border rounded-lg transition-colors">
                <h2 class="font-bold text-lg">ที่อยู่ {{ index + 1 }}</h2>
                <p>ชื่อ: {{ shipment.firstname }} {{ shipment.lastname }}</p>
                <p>บ้านเลขที่: {{ shipment.address }}</p>
                <p>ตำบล/แขวง: {{ shipment.sub_district }}</p>
                <p>อำเภอ/เขต: {{ shipment.district }}</p>
                <p>จังหวัด: {{ shipment.province }}</p>
                <p>รหัสไปรษณีย์: {{ shipment.zip_code }}</p>

                <!-- ปุ่มแก้ไข -->
                <div class="mt-4 flex items-center justify-between">
                  <button class="text-blue-500 hover:underline" @click="editShipment(shipment)">แก้ไข</button>
                </div>
              </div>
            </div>

            <div v-else class="text-center text-gray-500 mt-6">
              ไม่พบข้อมูลที่อยู่
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Popup เพิ่มที่อยู่ -->
    <div v-if="store.addressAction" @click="store.addressAction = false" class="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div @click.stop>
        <PopupAddress @addressAdded="handleAddressAdded" />
      </div>
    </div>

    <!-- Popup แก้ไขที่อยู่ -->
    <div v-if="store.editaddressAction && selectedShipment" @click="store.editaddressAction = false" class="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div @click.stop>
        <PopupEditAddress :shipment="selectedShipment ?? defaultShipment" @addressUpdated="handleAddressUpdated" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { Shipment } from "~/models/product.model";
import service from "~/service";
import { useIndexStore } from "~/store/main";

const store = useIndexStore();
const shipments = ref<Shipment[]>([]);

// ค่าเริ่มต้นของ selectedShipment
const defaultShipment: Shipment = {
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
};

// ใช้ ref และกำหนดค่าเริ่มต้นให้ไม่เป็น null
const selectedShipment = ref<Shipment>(defaultShipment);

// ดึงข้อมูลที่อยู่ทั้งหมดของผู้ใช้
const getShipmentList = async () => {
  await service.product
    .getShipmentList()
    .then((resp: any) => {
      shipments.value = resp.data.data;
    })
    .catch(() => console.error("เกิดข้อผิดพลาดในการดึงที่อยู่"));
};

// กด "แก้ไข" แล้วเปิด Popup
const editShipment = (shipment: Shipment) => {
  selectedShipment.value = { ...shipment };
  store.editaddressAction = true;
};

// เพิ่มที่อยู่ใหม่
const handleAddressAdded = (newAddress: Shipment) => {
  shipments.value.push(newAddress);
  store.addressAction = false;
};

// อัปเดตข้อมูลที่อยู่ใหม่
const handleAddressUpdated = (updatedShipment: Shipment) => {
  const index = shipments.value.findIndex((s) => s.id === updatedShipment.id);
  if (index !== -1) {
    shipments.value[index] = { ...updatedShipment };
  }
  store.editaddressAction = false;
};

onMounted(() => {
  getShipmentList();
});
</script>

<style scoped>
.overflow-hidden {
  overflow: hidden;
}
.overflow-y-auto {
  overflow-y: auto;
}
.sticky {
  position: sticky;
}
</style>
