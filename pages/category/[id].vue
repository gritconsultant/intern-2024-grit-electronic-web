<template>
    <div>
      <div class="p-[20px] lg:p-[50px]">
        <div class="text-black/40">
          <NuxtLink to="/">หน้าหลัก</NuxtLink>
           > 
          <span class="text-black"> {{ selectedCategory?.name }} </span></div>
        <div class="flex flex-col lg:flex-row gap-2 my-6">
          <h1 class="font-bold text-2xl lg:text-3xl"> {{ selectedCategory?.name }}</h1>
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
                class="mt-[10px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-20"
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
      <Loading :loading="loading" />
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, computed } from "vue";
  import type { Category, Params, Product } from "~/models/product.model";
  import service from "~/service";

  const route = useRoute(); 
  const loading = ref(true); 
  const products = ref<Product[]>([]);
    const categoryId = computed(() => route.params.id);
    const categories = ref<Category[]>([]);
      const search = ref<string>("");
const page = ref<number>(0);
const size = ref<number>(0);
    

const getCategoryList = async () => {
  loading.value = true;
  await service.product
    .getCategoryList()
    .then((resp: any) => {
      const data = resp.data.data;
      categories.value = data.map((e: any) => ({
        id: e.id,    
        name: e.name, 
        img: e.img,   
      }))
    })
    .catch((error: any) => {
      console.error("เกิดข้อผิดพลาดในการดึงหมวดหมู่สินค้า:", error);
    })
    .finally(() => {
      loading.value = false;
    });
};
  
  // ดึงข้อมูลสินค้าทั้งหมด
  const getProductList = async () => {
    loading.value = true;
    const param: Params = {
    page: page.value, // ใช้ .value ในการเข้าถึง currentPage
    size: size.value, // ใช้ .value ในการเข้าถึง size
    search: search.value || "", // ใช้ค่าป้องกันถ้า search เป็น null หรือ undefined
  };
    await service.product.getProductList(param)
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
            image: e.image || "",
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
            is_favorite: e.is_favorite,
          }));
      })
      .catch((error: any) => {
        console.error("Error loading product list:", error);
      })
      .finally(() => {
        loading.value = false;
      });
  };
  // ฟังก์ชันดึงชื่อหมวดหมู่จาก categories
const selectedCategory = computed(() => {
  return categories.value.find(
    (category) => category.id.toString() === categoryId.value
  );
})
  
  const filteredProducts = computed(() => {
  return products.value.filter(
    (product) => product.category.id.toString() === categoryId.value
  );
});

// Watch for changes in page, size, or search
watch([page, size, search], () => {
  // Call getProductList when any of the values change
  getProductList();
});
  onMounted(async () => {
    await getProductList();
    await getCategoryList();
  });
  </script>
  
  <style scoped>
  </style>
  