<template>
  <div>
    <div
      class="w-[300px] h-[500px] border p-5 flex flex-col gap-2 rounded-[5px] bg-[#FFFFFF] drop-shadow-lg hover:bg-[#FCCA81]"
    >
      <div class="flex justify-between h-[30px]">
        <div
          class="flex justify-center rounded-[30px] gap-2 w-[60px] font-semibold text-[#D78D33] bg-[#FFF1E0]"
        >
          <div>
            <i class="fa-solid fa-star"></i>
          </div>
          <p>4</p>
        </div>
        <div class="text-[#878787]">
          <i class="fa-regular fa-heart"></i>
        </div>
      </div>
      <!-- กรอบรูปภาพ -->
      <div class="flex justify-center items-center h-[300px] w-full overflow-hidden rounded-md">
        <!-- ใช้ object-contain เพื่อไม่ตัดส่วนใดส่วนหนึ่งของภาพ -->
        <img :src="product.img" alt="Product Image" class="w-full h-full object-cover rounded-md "/>
      </div>
      <div class="flex justify-between mt-1">
        <div>
          <span class="font-bold text-base"> {{ product.name }} </span>
        </div>
        <div class="text-red-600 font-bold text-base">฿{{ product.price }}</div>
      </div>
      <div>
        <span class=" font-medium text-sm ">รายละเอียด</span>
        <div
          class="h-[35px] w-full detail truncate break-words text-wrap"
        >
          {{ product.detail }}
        </div>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import type { Product } from "~/models/product.model";

const props = defineProps({
  product: {
    type: Object as PropType<Product>,
    required: true,
  },
});
</script>

<style scoped>
</style>
