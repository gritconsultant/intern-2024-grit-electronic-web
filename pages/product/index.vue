<template>
  <div>
    <div class="p-[20px] lg:p-[50px]">
      <div class="text-black/40">
        <NuxtLink to="/">หน้าหลัก</NuxtLink>
         > 
         <span class="text-black">สินค้าทั้งหมด</span></div>
      <div class="flex flex-col lg:flex-row gap-2 my-6">
        <h1 class="font-bold text-2xl lg:text-3xl">สินค้าทั้งหมด</h1>
        <p class="mt-2 lg:mt-[10px] text-black/40">
          (สินค้าทั้งหมด {{ products.length }} รายการ)
        </p>
      </div>
      <!-- Filter -->
      <div class="flex flex-wrap gap-5 mt-[30px] lg:mt-[50px] pl-3 text-black/40">
        <div>
          หมวดหมู่
          <select v-model="selectedCategoryId" class="border p-1 rounded">
            <option :value="null">ทั้งหมด</option>
            <option v-for="cate in categories" :key="cate.id" :value="cate.id">
              {{ cate.name }}
            </option>
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
import type { Category, Product } from "~/models/product.model";
import service from "~/service";

const products = ref<Product[]>([]);
  const categories = ref<Category[]>([]);
    const selectedCategoryId = ref<number | null>(null); // ใช้ `null` เพื่อแสดงทั้งหมด

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
            e.Review?.map((r: any) => ({
              id: r.id,
              rating: r.rating,
              username: r.username,
              description: r.description,
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
    })
    .finally(() => {});
};

// ดึงข้อมูลหมวดหมู่ทั้งหมด
const getCategoryList = async () => {
  await service.product
    .getCategoryList()
    .then((resp: any) => {
      const data = resp.data.data;
      categories.value = data.map((e: any) => ({
        id: e.id,
        name: e.name,
      }));
    })
    .catch((error: any) => {
      console.error("Error loading category list:", error);
    });
};

// ฟิลเตอร์สินค้าตามหมวดหมู่ที่เลือก
const filteredProducts = computed(() => {
  return selectedCategoryId.value
    ? products.value.filter((product) => product.category.id === selectedCategoryId.value)
    : products.value;
});

onMounted(async () => {
  getProductList();
  getCategoryList();
});
</script>

<style scoped></style>
