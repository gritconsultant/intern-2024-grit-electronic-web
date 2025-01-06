<template>
  <div class="h-full boxprofile m-9 grid justify-center items-center">
    <div class="flex justify-center items-center border-b pb-4 m-4">
      <div >
        <p class="font-medium text-lg">UserName</p>
      </div>
    </div>
    <div>
      <ul class="space-y-2 mt-4 pl-0 pr-5 pt-5 pb-5">
        <li class="w-[200px]">
          <NuxtLink to="/profile" class="sidebtn" active-class="active-btn">
            <p class="ml-2">บัญชีผู้ใช้</p>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/profile/address" class="sidebtn" active-class="active-btn">
            <p class="ml-2">ที่อยู่</p>
          </NuxtLink>
        </li>

        <li>
          <NuxtLink to="/order/checkout" class="sidebtn" active-class="active-btn">
            <p class="ml-2">คำสั่งซื้อสินค้า</p>
          </NuxtLink>
        </li>

        <li>
          <NuxtLink to="/order/return_order" class="sidebtn" active-class="active-btn">
            <p class="ml-2">คืนสินค้า</p>
          </NuxtLink>
        </li>
      </ul>
    </div>
    <div class="flex justify-center items-end m-5 mt-32">
            <NuxtLink
              to="/login"
              class="flex items-center p-2 gap-2 rounded-full text-red-500 hover:bg-red-100"
            >
              <i class="fas fa-sign-out-alt"></i> ออกจากระบบ
            </NuxtLink>
        </div>
  </div>
</template>

<script setup>
defineProps({});
</script>
