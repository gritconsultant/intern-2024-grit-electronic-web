<template>
  <div class="flex p-4">
    <!-- Sidebar -->
    <Sidebar />
    <div class="w-full lg:w-3/4 p-6">
      <div class="flex justify-between border-b">
        <h1 class="text-xl font-bold mb-6">ที่อยู่</h1>
        <button class="text-black/50 hover:underline" @click="openAddPopup">
          เพิ่มที่อยู่ใหม่
        </button>
      </div>

      <div>
        <div class="flex justify-center mt-5">
          <div>
            <div
              v-for="(address, index) in addresses"
              :key="index"
              class="mb-4 p-4 border rounded-lg transition-colors"
              :class="{
                'bg-gray-100': address.isDefault,
                'bg-white': !address.isDefault,
              }"
            >
              <!-- Address Details -->
              <h2 class="font-bold text-lg">{{ address.title }}</h2>
              <p>{{ address.name }}</p>
              <p>{{ address.address }}</p>
              <p>{{ address.phone }}</p>

              <!-- Buttons -->
              <div class="mt-4 flex items-center justify-between">
                <button
                  class="text-blue-500 hover:underline"
                  @click="openEditPopup(address, index)"
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

    <!-- Popup -->
    <Popup v-if="isPopupVisible" @close="closePopup">
      <form @submit.prevent="handleSave">
        <h2 class="text-xl font-bold mb-4">
          {{ isEditing ? "แก้ไขที่อยู่" : "เพิ่มที่อยู่ใหม่" }}
        </h2>
        <div class="mb-4">
          <label class="block font-medium">ชื่อที่อยู่</label>
          <input
            v-model="form.title"
            type="text"
            class="w-full border p-2 rounded"
            placeholder="เช่น บ้าน, หอพัก"
            required
          />
        </div>
        <div class="mb-4">
          <label class="block font-medium">ชื่อผู้รับ</label>
          <input
            v-model="form.name"
            type="text"
            class="w-full border p-2 rounded"
            placeholder="ชื่อผู้รับ"
            required
          />
        </div>
        <div class="mb-4">
          <label class="block font-medium">รายละเอียดที่อยู่</label>
          <textarea
            v-model="form.address"
            class="w-full border p-2 rounded"
            placeholder="รายละเอียดที่อยู่"
            required
          ></textarea>
        </div>
        <div class="mb-4">
          <label class="block font-medium">เบอร์โทรศัพท์</label>
          <input
            v-model="form.phone"
            type="text"
            class="w-full border p-2 rounded"
            placeholder="เบอร์โทรศัพท์"
            required
          />
        </div>
        <button
          type="submit"
          class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          บันทึก
        </button>
      </form>
    </Popup>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";

const addresses = reactive([
  {
    title: "หอพัก",
    name: "kk kub",
    address: "condo kk หมู่ 12 ตำบลศิลา อำเภอเมือง จังหวัดขอนแก่น 40000",
    phone: "0 65 094 5399",
    isDefault: true,
  },
  {
    title: "บ้าน",
    name: "สวัสดี ครับ",
    address: "000/000 โครงการหมู่บ้านเนื้ออาคาร หมู่ 7 ตำบลในเมือง อำเภอเมือง จังหวัดขอนแก่น 40000",
    phone: "0 65 094 5399",
    isDefault: false,
  },
]);

const isPopupVisible = ref(false);
const isEditing = ref(false);
const editingIndex = ref<number | null>(null);
const form = reactive({
  title: "",
  name: "",
  address: "",
  phone: "",
});

// Open Add Popup
function openAddPopup() {
  resetForm();
  isEditing.value = false;
  isPopupVisible.value = true;
}

// Open Edit Popup
function openEditPopup(address: typeof addresses[number], index: number) {
  form.title = address.title;
  form.name = address.name;
  form.address = address.address;
  form.phone = address.phone;
  isEditing.value = true;
  editingIndex.value = index;
  isPopupVisible.value = true;
}

// Save Address (Add or Edit)
function handleSave() {
  if (isEditing.value && editingIndex.value !== null) {
    // Edit Existing Address
    addresses[editingIndex.value] = { ...form, isDefault: addresses[editingIndex.value].isDefault };
    alert("แก้ไขที่อยู่สำเร็จ!");
  } else {
    // Add New Address
    addresses.push({ ...form, isDefault: false });
    alert("เพิ่มที่อยู่ใหม่สำเร็จ!");
  }
  closePopup();
}

// Reset Form
function resetForm() {
  form.title = "";
  form.name = "";
  form.address = "";
  form.phone = "";
}

// Close Popup
function closePopup() {
  isPopupVisible.value = false;
  resetForm();
}

// Set Default Address
function setDefaultAddress(index: number) {
  addresses.forEach((address, i) => {
    address.isDefault = i === index;
  });
  alert(`ตั้งที่อยู่ "${addresses[index].title}" เป็นค่าเริ่มต้นเรียบร้อยแล้ว`);
}
</script>

<style scoped>
.bg-gray-100 {
  background-color: #f3f4f6;
}
</style>
