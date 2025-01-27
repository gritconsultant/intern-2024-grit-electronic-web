<template>
  <div
    class="w-full md:w-[500px] border-2 flex flex-col justify-center gap-2 rounded-[5px] bg-[#FFFFFF] drop-shadow-lg overflow-hidden "
  >
    <div class="p-4 md:p-5 border-b-2">
      <h1 class="text-xl font-bold mb-4">เพิ่มที่อยู่ใหม่</h1>
      <form @submit.prevent="saveAddress">
        <!-- Title -->
        <div class="mb-4">
          <label for="title" class="block text-sm font-medium">ชื่อที่อยู่</label>
          <input
            type="text"
            id="title"
            v-model="form.title"
            class="w-full p-2 border rounded"
            placeholder="ตัวอย่าง: บ้าน, ออฟฟิศ"
            required
          />
        </div>

        <!-- Name -->
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium">ชื่อผู้รับ</label>
          <input
            type="text"
            id="name"
            v-model="form.name"
            class="w-full p-2 border rounded"
            placeholder="ชื่อผู้รับสินค้า"
            required
          />
        </div>

        <!-- Address Fields -->
        <div class="mb-4">
          <label for="houseNo" class="block text-sm font-medium">บ้านเลขที่</label>
          <input
            type="text"
            id="houseNo"
            v-model="form.houseNo"
            class="w-full p-2 border rounded"
            placeholder="บ้านเลขที่"
            required
          />
        </div>
        <div class="mb-4">
          <label for="village" class="block text-sm font-medium">หมู่บ้าน/อาคาร</label>
          <input
            type="text"
            id="village"
            v-model="form.village"
            class="w-full p-2 border rounded"
            placeholder="หมู่บ้าน/อาคาร"
          />
        </div>
        <div class="mb-4">
          <label for="subDistrict" class="block text-sm font-medium">ตำบล</label>
          <input
            type="text"
            id="subDistrict"
            v-model="form.subDistrict"
            class="w-full p-2 border rounded"
            placeholder="ตำบล"
            required
          />
        </div>
        <div class="mb-4">
          <label for="district" class="block text-sm font-medium">อำเภอ</label>
          <input
            type="text"
            id="district"
            v-model="form.district"
            class="w-full p-2 border rounded"
            placeholder="อำเภอ"
            required
          />
        </div>
        <div class="mb-4">
          <label for="province" class="block text-sm font-medium">จังหวัด</label>
          <input
            type="text"
            id="province"
            v-model="form.province"
            class="w-full p-2 border rounded"
            placeholder="จังหวัด"
            required
          />
        </div>
        <div class="mb-4">
          <label for="postalCode" class="block text-sm font-medium">รหัสไปรษณีย์</label>
          <input
            type="text"
            id="postalCode"
            v-model="form.postalCode"
            class="w-full p-2 border rounded"
            placeholder="รหัสไปรษณีย์"
            required
          />
        </div>

        <!-- Phone -->
        <div class="mb-4">
          <label for="phone" class="block text-sm font-medium">เบอร์โทรศัพท์</label>
          <input
            type="text"
            id="phone"
            v-model="form.phone"
            class="w-full p-2 border rounded"
            placeholder="กรอกเบอร์โทรศัพท์"
            required
          />
        </div>

        <!-- Actions -->
        <div class="flex justify-between mt-6">
          <button
            type="button"
            class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            @click="cancel"
          >
            ยกเลิก
          </button>
          <button
            type="submit"
            class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            บันทึก
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useIndexStore } from "~/store/main";

const store = useIndexStore();

const router = useRouter();

const form = ref({
  title: "",
  name: "",
  houseNo: "",
  village: "",
  subDistrict: "",
  district: "",
  province: "",
  postalCode: "",
  phone: "",
});

// บันทึกที่อยู่ใหม่
const saveAddress = () => {
  // Validation หรือการตรวจสอบข้อมูล
  if (
    !form.value.title ||
    !form.value.name ||
    !form.value.houseNo ||
    !form.value.subDistrict ||
    !form.value.district ||
    !form.value.province ||
    !form.value.postalCode ||
    !form.value.phone
  ) {
    alert("กรุณากรอกข้อมูลให้ครบถ้วน");
    return;
  }

  // เพิ่มที่อยู่ใน store (ตัวอย่าง)
  console.log("ที่อยู่ใหม่ที่เพิ่ม:", form.value);

  alert("เพิ่มที่อยู่ใหม่สำเร็จ!");
  store.addressAction = false;
  router.push("/profile/address"); // เปลี่ยนเส้นทางกลับไปยังหน้ารายการที่อยู่
};

// ยกเลิกการเพิ่มที่อยู่
const cancel = () => {
  store.addressAction = false;
  router.push("/profile/address");
};
</script>

<style scoped></style>
