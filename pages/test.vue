<template>
    <div>
      <div
        class="w-[300px] h-[600px] border p-5 flex flex-col gap-2 rounded-[5px] bg-[#FFFFFF] drop-shadow-lg hover:bg-[#FCCA81]"
      >
        <!-- Rating -->
        <div class="flex justify-between h-[30px]">
          <div
            class="flex justify-center rounded-[30px] gap-2 w-[60px] font-semibold text-[#D78D33] bg-[#FFF1E0]"
          >
            <div>
              <i class="fa-solid fa-star"></i>
            </div>
            <p> {{ averageRating }}</p>
          </div>
        </div>
  
        <!-- รูปภาพสินค้า -->
        <div class="flex justify-center items-center h-[300px] w-full overflow-hidden rounded-md">
          <img
            :src="product.image"
            alt=""
            class="w-full h-full object-cover rounded-md"
          />
        </div>
  
        <!-- ชื่อและราคา -->
        <div class="flex justify-between mt-1 ">
          <span class="font-bold text-base text-ellipsis w-[180px]">{{ product.name }}</span>
          <span class="text-red-600 font-bold text-base ml-3">฿{{ product.price }}</span>
        </div>
  
        <!-- รายละเอียดสินค้า -->
        <div>
          <span class="font-medium text-sm">รายละเอียด</span>
          <div class="h-[35px] w-full text-multiline">
            {{ product.description }}
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import type { PropType } from "vue";
  import type { Product } from "~/models/product.model";
  
  const props = defineProps({
    product: {
      type: Object as PropType<Product>,
      required: true,
    },
  });
  
  // คำนวณค่าเฉลี่ยรีวิว
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
    overflow: hidden;
  }
  </style>
  