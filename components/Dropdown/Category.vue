<template>
  <div>
    <div>
      <div class="relative group">
        <button
          class="flex items-center text-black hover:text-[#EE973C]"
          type="button"
        >
          <p>หมวดหมู่สินค้า</p>
          <svg
            class="w-2.5 h-2.5 ml-1.5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 3"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>

        <!-- Dropdown Menu -->
        <div
          class="absolute bg-white rounded-lg border shadow w-44 hidden group-hover:block"
        >
          <ul class="py-2 text-sm text-gray-700">
            <li v-for="cate in categories" :key="cate.id">
              <NuxtLink
                :to="`/category/${cate.id}`"
                class="block px-4 py-2 hover:bg-gray-100"
              >
                {{ cate.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { Category } from "~/models/product.model";
import service from "~/service";

const categories = ref<Category[]>([]);

const getCategoryList = async () => {
  await service.product
    .getCategoryList()
    .then((resp: any) => {
      const data = resp.data.data;
      categories.value = data.map((e: any) => ({
        id: e.id,    
        name: e.name, 
        image: e.image,   
      }));
    })
    .catch((error: any) => {
      console.error("เกิดข้อผิดพลาดในการดึงหมวดหมู่สินค้า:", error);
    });
};

onMounted(() => {
  getCategoryList();
});
</script>

<style scoped></style>
