<template>
  <div>
    <div class="p-[20px] lg:p-[50px]">
      <div>tack pages</div>
      <div class="flex flex-col lg:flex-row gap-2 my-6">
        <h1 class="font-bold text-2xl lg:text-3xl">สินค้าทั้งหมด</h1>
        <p class="mt-2 lg:mt-[10px] text-black/40">(สินค้าทั้งหมด รายการ)</p>
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
      <hr class="mt-[10px] mb-[50px] lg:mb-[100px]" />
      <!-- Category Display -->
      <div class="grid gap-10 lg:gap-20">
        <div>
          <div class="grid justify-center">
            <div class="flex justify-between">
              <h1 class="headercategory"></h1>
              <div class="mt-[10px] text-black/40 cursor-pointer">
                ทั้งหมด ->
              </div>
            </div>
            <div>
              <div
                class="mt-[10px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-32"
              >
                <div
                  v-for="(item, index) in products" :key="index"
                  class="flex justify-center"
                >
                  <CardProduct :product="item" />
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
import { errorMessages } from "vue/compiler-sfc";
import type { Product } from "~/models/product.model";
import service from "~/service";

const products = ref<Product[]>([
  {
    id: 0,
    name: "",
    price: 0,
    stock: 0,
    description: "",
    Image: {
      id: 0,
      ref_id: 0,
      type: "",
      description: "",
    }, // ถูกต้อง
    category: { id: 0, name: "" },
    Review: [],
    is_active: true,
    created_at: 0,
    updated_at: 0,
  },
]);

const getProductList = async () => {
  await service.product.getProductList()
    .then((resp: any) => {
      const data = resp.data;
      console.log(resp.data);

      
      const productList: Product[] = [];

      console.log(data);

      for (let i = 0; i < data.length; i++) {
        const product = data[i];
        productList.push({
          id: product.id,
          name: product.name,
          price: product.price,
          stock: product.stock,
          description: product.description,
          Image: {
            id: product.image.id,
            ref_id: product.image.ref_id,
            type: product.image.type,
            description: product.image.description,
          },
          category: { id: product.category.id, name: product.category.name },
          Review: product.review,
          is_active: product.is_active,
          created_at: product.created_at,
          updated_at: product.updated_at,
        });
        products.value = productList;
      }
    })
    .catch((error: any) => {
      console.log(errorMessages);
    })
    .finally(() => {});
};

onMounted(async () => {
  await getProductList();
});
</script>

<style scoped></style>
