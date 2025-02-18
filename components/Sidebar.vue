<template>
  <div class="w-full lg:w-1/4 bg-white border-r flex flex-col max-h-[50vh]">
    <div class="p-6">
      <h2 class="text-lg font-bold">สวัสดี, ยินดีต้อนรับ</h2>
      <p class="text-gray-600"> {{ getinfo.Username }}</p>
    </div>
    <ul class="space-y-10 p-6">
      <li>
        <NuxtLink
          to="/profile"
          class="flex items-center space-x-2"
          :class="{ 'active-btn': isActive(['/profile']) }"
        >
          <i class="fas fa-user"></i>
          <span>จัดการบัญชีผู้ใช้</span>
        </NuxtLink>
      </li>
      <li>
        <NuxtLink
          to="/profile/address"
          class="flex items-center space-x-2"
          :class="{ 'active-btn': isActive(['/profile/address']) }"
        >
          <i class="fas fa-map-marker-alt"></i>
          <span>ที่อยู่ของฉัน</span>
        </NuxtLink>
      </li>
      <li>
        <NuxtLink
          to="/order/checkout"
          class="flex items-center space-x-2"
          :class="{ 'active-btn': isActive(['/order/checkout', '/order/shipping', '/order/receiving', '/order/review', '/order/history', '/order/paid']) }"
        >
          <i class="fas fa-shopping-cart"></i>
          <span>คำสั่งซื้อของฉัน</span>
        </NuxtLink>
      </li>
      <li>
        <NuxtLink
          to="/login"
          class="flex items-center space-x-2 rounded-lg p-2 text-red-500 hover:bg-red-100"
        >
          <i class="fas fa-sign-out-alt"></i>
          <span>ออกจากระบบ</span>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import type { UserInfo } from '~/models/product.model';
import service from '~/service';

definePageMeta({
  layout: "user",
});

const route = useRoute();

// active รองรับหลาย path
const isActive = (paths: string[]) => {
  return paths.includes(route.path);
};

const getinfo = ref<UserInfo>({
  ID: 0,
  FirstName: "",
  LastName: "",
  Username: "",
  Password: "",
  Email: "",
  Phone: 0,
  Shipment: "",
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
        ID: data.id,
        FirstName: data.firstname,
        LastName: data.lastname,
        Username: data.username,
        Password: data.Password,
        Email: data.email,
        Phone: data.phone,
        Shipment: data.shipment,
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

onMounted(() => {
  getuserinfo();
});

</script>

<style scoped>
.active-btn {
  background-color: #fcca81;
  border-radius: 5px;
  padding: 8px;
}
</style>
