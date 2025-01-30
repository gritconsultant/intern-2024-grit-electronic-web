<template>
  <div class="flex p-4 h-full overflow-y-auto">
    <!-- Sidebar -->
    <Sidebar />
    <div class="w-full lg:w-3/4 p-6">
      <div class="flex justify-between border-b">
        <h1 class="text-xl font-bold mb-6">ที่อยู่</h1>
        <button class="text-black/50 hover:underline" @click="store.addressAction = !store.addressAction">เพิ่มที่อยู่ใหม่</button>
      </div>

      <div>
        <div class="flex justify-center mt-5">
          <div class="w-[500px]">


            <div
              v-for="(address, index) in addresses"
              :key="index"
              class="mb-4 p-4 border rounded-lg transition-colors"
              :class="{
                'bg-gray-100': address.isDefault,
                'bg-white': !address.isDefault,
              }"
            >

              <h2 class="font-bold text-lg">{{ address.title }}</h2>
              <p>ชื่อ: {{ address.name }}</p>
              <p>บ้านเลขที่: {{ address.houseNo }}</p>
              <p>หมู่: {{ address.village }}</p>
              <p>ตำบล: {{ address.subDistrict }}</p>
              <p>อำเภอ: {{ address.district }}</p>
              <p>จังหวัด: {{ address.province }} <span>รหัสไปรษณีย์: {{ address.postalCode }}</span></p>
              <p>โทรศัพท์: {{ address.phone }}</p>

              <!-- ปุ่มตั้งค่าเริ่มต้น -->
              <div class="mt-4 flex items-center justify-between">
                <button
                  class="text-blue-500 hover:underline"
                  @click="handleEdit(address)"
                >
                  แก้ไข
                </button>
                <button
                  v-if="!address.isDefault"
                  class="text-sm text-gray-700 bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                  @click="setDefaultAddress(index)"
                >
                  ตั้งเป็นค่าเริ่มต้น
                </button>
                <span v-else class="text-sm text-green-500 font-semibold">
                  ค่าเริ่มต้น
                </span>
              </div>
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
        <PopupAddress />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "user",
});

import { reactive } from "vue";
import type { UserInfo } from "~/models/product.model";
import service from "~/service";
import { useIndexStore } from "~/store/main";
const store = useIndexStore();

const addresses = reactive([
  {
    title: "หอพัก",
    name: "kk kub",
    houseNo: "12/34",
    village: "หมู่บ้าน kk condo",
    subDistrict: "ตำบลศิลา",
    district: "อำเภอเมือง",
    province: "จังหวัดขอนแก่น",
    postalCode: "40000",
    phone: "065-094-5399",
    isDefault: true,
  },
  {
    title: "บ้าน",
    name: "สวัสดี ครับ",
    houseNo: "123",
    village: "หมู่บ้าน ABC",
    subDistrict: "ตำบลในเมือง",
    district: "อำเภอเมือง",
    province: "จังหวัดขอนแก่น",
    postalCode: "40000",
    phone: "065-094-5399",
    isDefault: false,
  },
]);

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

function handleEdit(address: typeof addresses[number]) {
  console.log("กำลังแก้ไข:", address);
}

function setDefaultAddress(index: number) {
  addresses.forEach((address, i) => {
    address.isDefault = i === index;
  });
  alert(`ตั้งที่อยู่ "${addresses[index].title}" เป็นค่าเริ่มต้นเรียบร้อยแล้ว`);
}

onMounted(() => {
  getuserinfo();
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
