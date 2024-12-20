<template>
  <div>
    <div
      class="w-[300px] h-[500px] border-2 border-[#A6A6A6] p-5 flex flex-col gap-2 rounded-[5px] bg-[#FFFFFF]"
    >
      <div class="flex justify-between border-2 h-[30px]">
        <div class="flex justify-center rounded-[30px] gap-2 w-[60px]  font-semibold text-[#D78D33]    bg-[#FFF1E0]">
          star
          <p>4</p>
        </div>

        <div>like</div>
      </div>
      <div class="object-cover place-content-center border-2 h-[350px]">
        <img
          src="https://blog.bnn.in.th/wp-content/uploads/2024/03/Acer-Aspire-3-A315-59-32GC.jpg"
          alt=""
        />
      </div>
      <div class="flex justify-between">
        <div>
          <span class="fontsubheader">ชื่อ {{ product.name }} </span>
        </div>
        <div class="text-indigo-400">฿{{ product.price }}</div>
      </div>
      <div>
        <span class="fontsubheader">รายละเอียด</span>
        <div class="detail truncate">
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

<style scoped></style>
