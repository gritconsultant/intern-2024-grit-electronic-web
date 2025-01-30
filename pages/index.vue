<template>
  <div class="mx-[20px] lg:mx-[50px] grid justify-center">
    <!-- Banner -->
    <div>
      <img src="/images/banner.jpg" class="rounded-b-2xl" />
    </div>

    <!-- Categories -->
    <div class="grid grid-cols-1 text-center mt-12">
      <h1 class="my-[50px] lg:my-[70px] fontheader">หมวดหมู่สินค้า</h1>
      <div class="flex flex-wrap justify-center">
        <div
          v-for="cate in category"
          :key="cate.id"
          class="text-center w-[90px] lg:w-[200px] cursor-pointer"
          @click="selectedCategoryId = cate.id"
        >
          <div class="flex justify-center">
            <div
              :class="{
                'border-2 border-[#EE973C]': selectedCategoryId === cate.id,
                'border-2': selectedCategoryId !== cate.id,
              }"
              class="rounded-full p-1 w-[60px] h-[60px] lg:w-[80px] lg:h-[80px]"
            >
              <div class="w-full h-full object-cover rounded-full">
                {{ cate.img }}
              </div>
            </div>
          </div>
          <h1 class="fontsubheader mt-[10px] lg:mt-[20px] lg:text-base">
            {{ cate.name }}
          </h1>
        </div>
      </div>
    </div>

    <!-- Products -->
    <div class="mt-[20px] lg:mt-[70px] mx-[20px] lg:mx-[50px]">
      <h1 class="fontheader">สินค้าแนะนำ - Recommend</h1>
      <div class="grid gap-5 mt-[10px]">
        <div v-for="cate in category" :key="cate.id">
          <div v-if="selectedCategoryId === cate.id || selectedCategoryId === 0">
            <div class="flex justify-between px-10">
              <h1 class="fontsubheader mt-[3px]">{{ cate.name }}</h1>
              <div class="text-black/40 cursor-pointer">
                ทั้งหมด -></div>
            </div>
            <div class="grid grid-cols-4 my-5">
              <div
                v-for="item in getProductsByCategory(cate.id).slice(0, 4)"
                :key="item.id"
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
import { ref, onMounted } from "vue";
import type { Category, Product } from "~/models/product.model";
import service from "~/service";

const products = ref<Product[]>([]);
const category = ref<Category[]>([]);
const selectedCategoryId = ref(0); // 0 = All categories

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
    });
};

// ดึงข้อมูลหมวดหมู่สินค้า
const getCategoryList = async () => {
  await service.product.getCategoryList()
    .then((resp: any) => {
      const data = resp.data.data;
      category.value = data.map((e: any) => ({
        id: e.id,
        name: e.name,
        img: e.img,
      }));
    })
    .catch((error: any) => {
      console.error("Error loading category list:", error);
    });
};

// ฟังก์ชันกรองสินค้าในหมวดหมู่
const getProductsByCategory = (categoryId: number): Product[] => {
  return products.value.filter(
    (product) =>
      product.is_active && // เฉพาะ is_active: true
      (product.category.id === categoryId || categoryId === 0) // กรองตาม category
  );
};

onMounted(async () => {
  await getCategoryList();
  await getProductList();
});
</script>



<style scoped>
</style>
