<template>
  <div class="flex p-4 h-full overflow-y-auto">
    <Sidebar />
    <div class="w-full lg:w-3/4 p-6">
      <div class="flex justify-between border-b">
        <h1 class="text-xl font-bold mb-6">ที่อยู่</h1>
        <!-- ✅ ปุ่มเพิ่มที่อยู่ใหม่ -->
        <button class="text-black/50 hover:underline" @click="store.addressAction = true">
          เพิ่มที่อยู่ใหม่
        </button>
      </div>

      <div>
        <div class="flex justify-center mt-5">
          <div class="w-[500px]">
            <!-- ✅ วนลูปแสดงที่อยู่ทั้งหมด -->
            <div v-if="shipments.length > 0">
              <div
                v-for="(shipment, index) in shipments"
                :key="shipment.id"
                class="mb-4 p-4 border rounded-lg transition-colors"
              >
                <h2 class="font-bold text-lg">ที่อยู่ {{ index + 1 }}</h2>
                <p>ชื่อ: {{ shipment.firstname }} {{ shipment.lastname }}</p>
                <p>บ้านเลขที่: {{ shipment.address }}</p>
                <p>ตำบล: {{ shipment.sub_district }}</p>
                <p>อำเภอ: {{ shipment.district }}</p>
                <p>
                  จังหวัด: {{ shipment.province }}
                  <span>รหัสไปรษณีย์: {{ shipment.zip_code }}</span>
                </p>
                <p>โทรศัพท์: {{ getinfo.Phone }}</p>

                <!-- ปุ่มแก้ไข -->
                <div class="mt-4 flex items-center justify-between">
                  <button class="text-blue-500 hover:underline">แก้ไข</button>
                </div>
              </div>
            </div>

            <!-- ถ้าไม่มีที่อยู่ให้ขึ้นข้อความแจ้งเตือน -->
            <div v-else class="text-center text-gray-500 mt-6">
              ไม่พบข้อมูลที่อยู่
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ✅ Popup เพิ่มที่อยู่ -->
    <div v-if="store.addressAction" @click="store.addressAction = false" class="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div @click.stop>
        <PopupAddress @addressAdded="handleAddressAdded" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "user",
});

import { ref, onMounted } from "vue";
import type { Shipment, UserInfo } from "~/models/product.model";
import service from "~/service";
import { useIndexStore } from "~/store/main";

const store = useIndexStore();

// ✅ เก็บข้อมูลผู้ใช้
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

// ✅ เก็บที่อยู่ของ userId
const shipments = ref<Shipment[]>([]);

// ✅ ดึงข้อมูลผู้ใช้
const getuserinfo = async () => {
  await service.product
    .getUserInfo()
    .then((resp: any) => {
      const data = resp.data.data;
      getinfo.value = {
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

      // ✅ ดึงที่อยู่ของ userId
      getShipmentList(data.ID);
    })
    .catch((error: any) => {
      console.log("Error fetching user info:", error);
    });
};

// ✅ ดึงรายการที่อยู่ทั้งหมดของ userId
const getShipmentList = async (userId?: number) => {
  const id = userId || store.$state.userId;
  if (!id) {
    console.error("ไม่มี userId สำหรับดึงข้อมูลที่อยู่");
    return;
  }

  await service.product
    .getShipmentList()
    .then((resp: any) => {
      console.log("ที่อยู่ทั้งหมดที่ได้จาก API:", resp);
      const data = resp.data.data;
      shipments.value = data.filter((item: any) => item.userId === id) // ✅ กรองเฉพาะของ userId
        .map((item: any) => ({
          id: item.id,
          firstname: item.firstname,
          lastname: item.lastname,
          address: item.address,
          zip_code: item.zip_code,
          sub_district: item.sub_district,
          district: item.district,
          province: item.province,
          status: item.status,
          created_at: item.created_at,
          updated_at: item.updated_at,
        }));
    })
    .catch((error: any) => {
      console.error("เกิดข้อผิดพลาดในการดึงที่อยู่:", error);
    });
};

// ✅ อัปเดตที่อยู่ใหม่เมื่อเพิ่มจาก Popup
const handleAddressAdded = (newAddress: Shipment) => {
  console.log("ที่อยู่ใหม่ที่เพิ่ม:", newAddress);
  shipments.value.push(newAddress);
  store.addressAction = false; // ปิด Popup
};

// ✅ ดึงข้อมูลเมื่อหน้าโหลด
onMounted(() => {
  getuserinfo();
});
</script>

<style scoped>
.overflow-hidden { overflow: hidden; }
.overflow-y-auto { overflow-y: auto; }
</style>
