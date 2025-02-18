<template>
  <div>
    <div>
      <div class="relative group">
        <!-- ปุ่ม User -->
        <button class="flex items-center text-black" type="button">
          <svg
            class="w-[30px] h-[30px] text-gray-800 dark:text-white"
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
        <div class="bg-white rounded-lg border shadow hidden group-hover:block absolute -right-0 w-56">
          <ul class="py-2 text-sm text-gray-700">
            <li v-if="!isLoggedIn">
              <NuxtLink to="/login" class="block px-4 py-2 hover:bg-gray-100">เข้าสู่ระบบ</NuxtLink>
            </li>
            <li v-if="isLoggedIn">
              <div class="block px-4 py-2">👤 {{ getinfo?.FirstName || "ไม่มีชื่อ" }}</div>
            </li>
            <li v-if="isLoggedIn">
              <NuxtLink to="/profile" class="block px-4 py-2 hover:bg-gray-100">บัญชีผู้ใช้</NuxtLink>
            </li>
            <li v-if="isLoggedIn">
              <NuxtLink to="/profile/address" class="block px-4 py-2 hover:bg-gray-100">ที่อยู่</NuxtLink>
            </li>
            <li v-if="isLoggedIn">
              <NuxtLink to="/order/checkout" class="block px-4 py-2 hover:bg-gray-100">คำสั่งซื้อ</NuxtLink>
            </li>
            <li v-if="isLoggedIn">
              <div @click="logout" class="block px-4 py-2 hover:bg-gray-100 cursor-pointer">ออกจากระบบ</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { useIndexStore } from "~/store/main";
import { useRouter } from "vue-router";
import { ref, computed, watch, onMounted } from "vue";
import type { UserInfo } from "~/models/product.model";
import service from "~/service";

// ใช้ Pinia store และ Router
const store = useIndexStore();
const router = useRouter();
const loading = ref(false);

// เก็บข้อมูลผู้ใช้
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

// ตรวจสอบว่าผู้ใช้เข้าสู่ระบบหรือไม่
const isLoggedIn = computed(() => !!store.$state.token);

// ฟังก์ชันดึงข้อมูลผู้ใช้
const getuserinfo = async () => {
  if (!isLoggedIn.value) return; // ถ้าไม่ได้เข้าสู่ระบบ ไม่ต้องดึงข้อมูล

  loading.value = true;
  try {
    const resp = await service.product.getUserInfo();
    console.log(resp);
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
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};

// 🔥 บันทึก Token ลง localStorage เมื่อมีการเปลี่ยนแปลง
watch(() => store.$state.token, (newToken) => {
  if (newToken) {
    localStorage.setItem("token", newToken);
    getuserinfo(); // โหลดข้อมูลผู้ใช้
  }
});

// 🔥 โหลด Token จาก localStorage เมื่อเปิดหน้าใหม่
onMounted(() => {
  const savedToken = localStorage.getItem("token");
  if (savedToken) {
    store.$state.token = savedToken;
    getuserinfo(); // โหลดข้อมูลผู้ใช้
  }
});

// ฟังก์ชัน Logout
const logout = () => {
  // ลบข้อมูลใน store
  store.$state.token = "";
  store.$state.userId = "";

  // ลบ Token จาก localStorage และ sessionStorage
  sessionStorage.removeItem("token");
  localStorage.removeItem("token");

  // ลบคุกกี้ที่ชื่อว่า 'token'
  document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

  // เปลี่ยนเส้นทางไปหน้าล็อกอิน
  router.push("/login");
};
</script>


<style scoped></style>
