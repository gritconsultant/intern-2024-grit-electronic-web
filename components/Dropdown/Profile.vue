<template>
  <div class="relative z-50">
    <!-- ปุ่ม User -->
    <button
      @click="toggleDropdown"
      class="flex items-center text-black focus:outline-none"
    >
      <svg
        class="w-[32px] h-[32px] text-gray-800 dark:text-white"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.3"
          d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
        />
      </svg>
    </button>

    <!-- Dropdown Menu -->
    <div
      v-show="dropdownOpen"
      class="dropdown-menu absolute mt-2 w-[700px] bg-white rounded-lg shadow-lg border transition-all duration-300 ease-in-out"
    >
      <ul class="py-2 text-sm text-gray-700">
        <li>
          <NuxtLink to="/profile" class="dropdown-item">บัญชีผู้ใช้</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/profile/address" class="dropdown-item">ที่อยู่</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/order/checkout" class="dropdown-item">คำสั่งซื้อ</NuxtLink>
        </li>
        <li>
          <div @click="logout" class="dropdown-item cursor-pointer text-red-500">
            ออกจากระบบ
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useIndexStore } from "~/store/main";
import { useRouter } from "vue-router";

// ใช้ Pinia store
const store = useIndexStore();
const router = useRouter();

const dropdownOpen = ref(false);

// ฟังก์ชันเปิด/ปิด Dropdown
const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value;

};

// ปิด Dropdown เมื่อคลิกข้างนอก
const closeDropdown = (event) => {
  if (!event.target.closest(".relative")) {
    dropdownOpen.value = false;
  }
};

// เพิ่ม event listener เมื่อ component โหลด
onMounted(() => {
  document.addEventListener("click", closeDropdown);
});

// ลบ event listener เมื่อ component ถูกทำลาย
onUnmounted(() => {
  document.removeEventListener("click", closeDropdown);
});

// ฟังก์ชัน logout
const logout = () => {
  store.$state.token = "";
  store.$state.userId = "";

  sessionStorage.removeItem("token");
  localStorage.removeItem("token");

  document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

  router.push("/login");
};
</script>

<style scoped>
/* ปรับ Dropdown ให้แสดงที่ตำแหน่งเหมาะสม */
.dropdown-menu {
  right: 0;
}

/* Mobile Responsive */
@media (max-width: 640px) {
  .dropdown-menu {
    left: 50%;
    transform: translateX(-50%);
    width: 90%; /* ป้องกันล้นจอ */
    text-align: center;
  }
}

/* Dropdown Item */
.dropdown-item {
  display: block;
  padding: 10px 15px;
  transition: background 0.3s ease-in-out;
}
.dropdown-item:hover {
  background: #f3f4f6;
}
</style>
