<template>
  <div
    class="w-full md:w-[500px] border-2 flex flex-col justify-center gap-2 rounded-[5px] bg-[#FFFFFF] drop-shadow-lg overflow-hidden"
  >
    <div class="p-4 md:p-5 border-b-2">
      <h1 class="text-xl font-bold mb-4">แก้ไขที่อยู่</h1>
      <div>
        <!-- Title -->
        <div class="mb-4">
          <label for="title" class="block text-sm font-medium"
            >ชื่อที่อยู่</label
          >
          <input
            type="text"
            id="title"
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
            class="w-full p-2 border rounded"
            placeholder="ชื่อผู้รับสินค้า"
            required
          />
        </div>

        <!-- Address -->
        <div class="mb-4">
          <label for="address" class="block text-sm font-medium">ที่อยู่</label>
          <textarea
            id="address"
            rows="3"
            class="w-full p-2 border rounded"
            placeholder="กรอกที่อยู่"
            required
          ></textarea>
        </div>

        <!-- Phone -->
        <div class="mb-4">
          <label for="phone" class="block text-sm font-medium"
            >เบอร์โทรศัพท์</label
          >
          <input
            type="text"
            id="phone"
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
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useIndexStore } from "~/store/main";

const store = useIndexStore();

const router = useRouter();

// ยกเลิกการเพิ่มที่อยู่
const cancel = () => {
  store.addressAction = false;
  router.push("/profile/address");
};
</script>

<style scoped></style>
