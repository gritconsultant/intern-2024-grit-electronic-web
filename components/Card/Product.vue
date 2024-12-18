<template>
    <div>
        <div
            class="w-[300px] h-[400px] border-2  p-5 flex flex-col gap-2 rounded-[5px]"
          >
            <div class="flex justify-between border-2 h-[30px]">
              <div>star</div>
              <div>like</div>
            </div>
            <div class="object-cover place-content-center border-2 h-[250px]">
              <img
                src="https://blog.bnn.in.th/wp-content/uploads/2024/03/Acer-Aspire-3-A315-59-32GC.jpg"
                alt=""
              />
            </div>
            <div class="flex justify-between">
              <div>
                <span class="fontsubheader">ชื่อ {{ product.name }} </span>
              </div>
              <div class="text-indigo-400  ">฿{{ product.price }}</div>
            </div>
            <div>
              <span class=" fontsubheader">รายละเอียด</span>
              <div class="detail">
                {{ product.detail }}
              </div>
            </div>
          </div>
    </div>
</template>

<script setup lang="ts">
import type { Product } from '~/models/product.model';

const props = defineProps ({
    product: {
        type: Object as PropType<Product>,
        required: true
    }

})

</script>

<style scoped>

</style>