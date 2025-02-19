<template>
  <div>
    <div
      class="w-[300px] h-[ุ600px]  border p-5 flex flex-col gap-2 rounded-[5px] bg-[#FFFFFF] drop-shadow-lg hover:bg-[#FCCA81]"
    >
      <div class="flex justify-between h-[30px]">
        <div
          class="flex justify-center items-center rounded-[30px] gap-1 w-[60px] font-semibold text-[#D78D33] bg-[#FFF1E0]"
        >
          <div>
            <i class="fa-solid fa-star"></i>
          </div>
          <p> {{ averageRating }}</p>
        </div>
      </div>

      <div class="flex justify-center items-center h-[300px] w-full overflow-hidden rounded-md">
        <div class="w-full h-full object-cover rounded-md">
          <img
                  :src="product.image"
                  alt=""
                  class="w-full h-full object-cover"
                />
        </div>

      </div>
      <div class="flex justify-between mt-1 h-[80px] ">
        <div>
          <span class="font-bold text-base hyphens-auto  text-multiline  w-[210px] "> {{ product.name }} </span>
        </div>
        <div class="text-red-600 font-bold text-base">฿{{ product.price }}</div>
      </div>
      <div>
        <span class=" font-medium text-sm ">รายละเอียด</span>
        <div
          class="h-[35px] w-full text-xs text-multiline"
        >
          {{ product.description }}
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

const averageRating = computed(() => {
  if (!props.product.Review || props.product.Review.length === 0) return "0";
  const total = props.product.Review.reduce((sum, review) => sum + review.rating, 0);
  return (total / props.product.Review.length).toFixed(1); // ค่าเฉลี่ยทศนิยม 1 ตำแหน่ง
});



</script>

<style scoped>
  .text-ellipsis {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  
  .text-multiline {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2; /* ตัดข้อความที่เกิน 2 บรรทัด */
    line-clamp: 2;
    overflow: hidden;
  }
</style>
