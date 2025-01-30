<template>
  <div>
    <div class="p-[20px] lg:p-[50px]">
      <div class="text-black/40">
        <NuxtLink to="/">หน้าหลัก</NuxtLink>
         >  <span class="text-black">อาหาร</span></div>
      <div class="flex flex-col lg:flex-row gap-2 my-6">
        <h1 class="font-bold text-2xl lg:text-3xl">อาหาร</h1>
        <p class="mt-2 lg:mt-[10px] text-black/40">
          (สินค้าทั้งหมด {{ filteredProducts.length }} รายการ)
        </p>
      </div>
      <hr class="mt-[10px] mb-[50px] lg:mb-[100px]" />
      <!-- cardcategory -->
      <div class="grid gap-10 mg lg:gap-20">
        <div class="grid justify-center">
          <div>
            <div
              class="mt-[10px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-32"
            >
              <div
                v-for="(item, index) in filteredProducts"
                :key="index"
                class="flex justify-center"
              >
                <NuxtLink :to="`/product/${item.id}`">
                  <CardProduct :product="item" />
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import type { Product } from "~/models/product.model";
import service from "~/service";

const products = ref<Product[]>([]);

// ดึงข้อมูลสินค้าทั้งหมด
const getProductList = async () => {
  await service.product.getProductList()
    .then((resp: any) => {
      const data = resp.data.data || [];
      products.value = data
        .filter((e: any) => e.is_active) // กรองเฉพาะสินค้า is_active: true
        .map((e: any) => ({
          id: e.id,
          name: e.name,
          price: e.price,
          stock: e.stock,
          description: e.description || "",
          image: {
            id: e.image?.id,
            ref_id: e.image?.ref_id,
            type: e.image?.type,
            description: e.image?.description,
          },
          category: {
            id: e.category?.id,
            name: e.category?.name,
          },
          Review: e.Review?.map((r: any) => ({
            id: r.id,
            rating: r.rating,
            username: r.username,
            description: r.description,
          })) || [],
          is_active: e.is_active,
          created_at: e.created_at,
          updated_at: e.updated_at,
        }));
    })
    .catch((error: any) => {
      console.error("Error loading product list:", error);
    })
    .finally(() => {
    });
};


const filteredProducts = computed(() => {
  return products.value.filter(
    (product) => product.category.id === 3
  );
});

onMounted(async () => {
  await getProductList();
});
</script>

<style scoped>
</style>
