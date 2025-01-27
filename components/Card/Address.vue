<template>
  <div>
    <div class="flex justify-between border-b-2 m-4 p-3">
      <div>
        <!-- ชื่อที่อยู่ -->
        <div class="mb-3 font-semibold text-lg">
          <h3>{{ address.title }}</h3>
        </div>
        
        <!-- รายละเอียดผู้รับ -->
        <p><span class="text-black/70">ชื่อผู้รับ: </span>{{ address.name }}</p>
        <p>
          <span class="text-black/70">ที่อยู่: </span>
          บ้านเลขที่ {{ address.houseNo }},
          หมู่บ้าน {{ address.village }},
          ตำบล {{ address.subDistrict }},
          อำเภอ {{ address.district }},
          จังหวัด {{ address.province }},
          {{ address.postalCode }}
        </p>
        <p><span class="text-black/70">เบอร์โทร: </span>{{ address.phone }}</p>
      </div>
      
      <!-- ไอคอนแก้ไข -->
      <div class="flex items-center mx-10">
        <svg
          class="w-6 h-6 text-gray-800 dark:text-white cursor-pointer"
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
            d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Address } from "~/models/product.model";

// กำหนด props
defineProps({
  address: {
    type: Object as PropType<Address>,
    required: true,
  },
});
</script>

<style scoped></style>
