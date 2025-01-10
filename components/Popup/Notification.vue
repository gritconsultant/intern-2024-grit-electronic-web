<template>
    <div
      class="w-[500px] h-full border-2 flex flex-col gap-2 rounded-[5px] bg-[#FFFFFF] drop-shadow-lg"
    >
      <div class="flex justify-between items-center p-5 border-b-2">
        <h1>แจ้งเตือน ({{ notificationItems.length }})</h1>
        <button @click="closeNotifications">
          <svg
            class="w-6 h-6 hover:text-red-500"
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
              stroke-width="2"
              d="M6 18 17.94 6M18 18 6.06 6"
            />
          </svg>
        </button>
      </div>
  
      <!-- Notification Items -->
      <div class="px-5">
        <div
          v-for="item in notificationItems"
          :key="item.id"
          class="flex justify-between items-center border-b py-2"
        >
          <img
            :src="item.img"
            alt="notification"
            class="w-16 h-16 object-cover rounded-md"
          />
          <div class="flex-1 ml-2">
            <div class="flex justify-between">
              <div>
                <p class="text-sm font-medium">{{ item.title }}</p>
              </div>
            </div>
  
            <!-- detail -->
            <div class="font-normal text-xs text-black/50">
              <p class="texthide">{{ item.message }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from "vue";
  import { useIndexStore } from "~/store/main";
  
  const store = useIndexStore();
  
  // State สำหรับแจ้งเตือน
  const notificationItems = ref([
    {
      id: 1,
      title: "อัปเดตสถานะคำสั่งซื้อ",
      message: "คำสั่งซื้อ #1234 ได้รับการจัดส่งแล้ว",
      img: "https://via.placeholder.com/50",
    },
    {
      id: 2,
      title: "โปรโมชั่นใหม่!",
      message: "ส่วนลด 20% สำหรับสินค้าทุกชิ้นในหมวดหมู่คอมพิวเตอร์",
      img: "https://via.placeholder.com/50",
    },
    {
      id: 3,
      title: "แจ้งเตือนระบบ",
      message: "มีการเข้าสู่ระบบจากอุปกรณ์ใหม่",
      img: "https://via.placeholder.com/50",
    },
  ]);
  
  
  // ปิด Popup
  const closeNotifications = () => {
    store.notificationAction = false
  };
  </script>
  
  <style scoped></style>
  