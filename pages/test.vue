<template>
  <div>
    <div class="p-[20px] lg:p-[50px]">
      <div>tack pages</div>
      <div class="flex flex-col lg:flex-row gap-2 my-6">
        <h1 class="font-bold text-2xl lg:text-3xl">สินค้าทั้งหมด</h1>
        <p class="mt-2 lg:mt-[10px] text-black/40">
          (สินค้าทั้งหมด {{ products.length }} รายการ)
        </p>
      </div>

      <!-- Product List -->
      <div class="gap-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-4 px-20 ml-10">
        <div v-for="item in products" :key="item.id">
          <CardProduct :product="item" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { Product } from "~/models/product.model";
import service from "~/service";

const products = ref<Product[]>([]);

const getProductList = async () => {
  try {
    const response = await service.product.getProductList();
    products.value = response.data.map((e: any) => ({
      id: e.id,
      name: e.name,
      price: e.price,
      amount: e.stock,
      detail: e.description,
      img: e.Image?.description,
      categoryId: e.category.id,
    }));
  } catch (error) {
    console.error("Error fetching product list:", error);
  }
};

onMounted(async () => {
  await getProductList();
});
</script>
