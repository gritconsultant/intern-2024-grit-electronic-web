<template>
  <div>
    <div class="p-[20px] lg:p-[50px]">
      <div>tack pages</div>
      <div class="flex flex-col lg:flex-row gap-2 my-6">
        <h1 class="font-bold text-2xl lg:text-3xl">เครื่องดื่ม</h1>
        <p class="mt-2 lg:mt-[10px] text-black/40">
          (สินค้าทั้งหมด 120 รายการ)
        </p>
      </div>
      <hr class="mt-[10px] mb-[50px] lg:mb-[100px]" />
      <!-- cardcategory -->
      <div class="grid gap-10 mg lg:gap-20">
        <div
          v-for="(item, category) in category.slice(3, 4)"
          :key="category"
          class="gap-10"
        >
          <div class="grid justify-center">
            <div>
              <h1 class="headercategory">{{ item.name }}</h1>
            </div>

            <div>
              <div
                class="mt-[10px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-32"
              >
                <div
                  v-for="(item, index) in products"
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
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { Category, Product } from "~/models/product.model";
import service from "~/service";

const products = ref<Product[]>([]);
const category = ref<Category[]>([]);

const getProductList = async () => {
  await service.product.getProductList()
    .then((resp: any) => {
      const data = resp.data.data || [];
      products.value = data.map((e: any) => ({
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
        reviews: e.review?.map((r: any) => ({
          id: r.id,
          rating: r.rating,
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


onMounted(async () => {
  await getCategoryList();
  await getProductList();
});
</script>

<style scoped>

</style>
