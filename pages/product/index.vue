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
      <!-- Filter -->
      <div
        class="flex flex-wrap gap-5 mt-[30px] lg:mt-[50px] pl-3 text-black/40"
      >
        <div>
          หมวดหมู่
          <select class="border p-1 rounded">
            <option value="">ทั้งหมด</option>
          </select>
        </div>
      </div>
      <hr class="mt-[10px] mb-[50px]" />
      <!-- Category Display -->
      <div>
        <div>
          <div class="grid justify-center">
            <div class="flex justify-between">
              <h1 class="headercategory"></h1>
              <div class="mt-[10px] text-black/40 cursor-pointer">
                ทั้งหมด ->
              </div>
            </div>
            <div class="mt-8">
              <!-- Product Grid -->
              <div
                class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-20"
              >
                <!-- Product Card -->
                <NuxtLink
                  v-for="product in filteredProducts"
                  :key="product.id"
                  :to="`/product/${product.id}`"
                  class="block"
                >
                  <CardProduct :product="product" />
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
import { ref, computed, onMounted } from "vue";
import type { Product } from "~/models/product.model";
import service from "~/service";

const products = ref<Product[]>([]);

const getProductList = async () => {
  await service.product
    .getProductList()
    .then((resp: any) => {
      const data = resp.data.data;
      const productlist: Product[] = [];

      for (let i = 0; i < data.length; i++) {
        const e = data[i];
        const product: Product = {
          id: e.id,
          name: e.name,
          price: e.price,
          stock: e.stock,
          description: e.description ?? null,
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
          Review:
            e.review?.map((r: any) => ({
              id: r.id,
              rating: r.rating,
            })) ?? [],
          is_active: e.is_active,
          created_at: e.created_at,
          updated_at: e.updated_at,
        };
        productlist.push(product);
      }
      products.value = productlist;
    })
    .catch((error: any) => {
      console.error("Error loading product list:", error.response || error);
    });
};

onMounted(async () => {
  await getProductList();
});

const filteredProducts = computed(() => {
  return products.value.filter((product) => product.is_active);
});
</script>

<style scoped></style>
