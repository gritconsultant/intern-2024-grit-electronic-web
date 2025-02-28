<template>
  <div class="mx-[20px] lg:mx-[50px] grid justify-center pt-[90px]">
    <!-- Banner -->
    <div class="w-[1400px] max-lg:w-[760px] max-md:w-[380px] h-[300px] max-lg:h-[200px]  max-md:h-[100px] mt-10 swiper-container">
      <swiper
        :modules="[Autoplay]"
        :space-between="50"
        :slides-per-view="1"
        :loop="true"
        :autoplay="{ delay: 5000 }"
        class="rounded-2xl w-full h-full"
      >
        <swiper-slide v-for="(item, index) in banner" :key="index">
          <img
            :src="item.banner || '/public/images/Bangkok brand.jpg'"
            class="w-full h-full object-cover rounded-2xl"
            alt="Banner Image"
          />
        </swiper-slide>
      </swiper>
    </div>

    <!-- Search Bar -->
    <div class="mt-6 flex justify-end relative">
      <input
        v-model="search"
        type="text"
        placeholder="ค้นหาสินค้า..."
        class="border border-black/40 p-2 pr-10 rounded-lg w-full max-w-[300px]"
      />
      <svg
        class="w-[22px] h-[22px] text-gray-800 dark:text-white absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-width="1"
          d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
        />
      </svg>
    </div>

    <!-- cate -->
    <div class="grid grid-cols-1 text-center mt-12">
      <h1 class="my-[40px] lg:my-[70px] fontheader">หมวดหมู่สินค้า</h1>
      <div class="flex justify-center items-center gap-4 w-full">
        <!-- ปุ่มย้อนกลับ -->
        <button
          @click="prevPage"
          :disabled="currentPage === 1"
          class="py-2 disabled:opacity-50 flex justify-center w-[20px]"
        >
          <svg
            class="w-[22px] h-[22px] text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="m15 19-7-7 7-7"
            />
          </svg>
        </button>

        <!-- หมวดหมู่สินค้า -->
        <div
          class="flex flex-wrap justify-center gap-6 w-[1200px]"
        >
          <div
            v-for="cate in paginatedCategories"
            :key="cate.id"
            class="text-center w-[90px] lg:w-[200px] cursor-pointer"
            @click="toggleCategory(cate.id)"
          >
            <div class="flex justify-center">
              <div
                :class="{
                  'border-2 border-[#EE973C]': selectedCategoryId === cate.id,
                  'border-2': selectedCategoryId !== cate.id,
                }"
                class="rounded-full p-1 w-[90px] h-[90px] lg:w-[100px] lg:h-[100px]"
              >
                <div
                  class="w-full h-full object-cover rounded-full overflow-hidden"
                >
                  <img
                    :src="
                      cate.image ||
                      'https://www.shutterstock.com/image-vector/no-image-available-picture-coming-600nw-2057829641.jpg'
                    "
                    alt=""
                    class="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
            <h1 class="fontsubheader mt-[10px] lg:mt-[20px] lg:text-base">
              {{ cate.name }}
            </h1>
          </div>
        </div>

        <!-- ปุ่มถัดไป -->
        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="py-2 disabled:opacity-50 flex justify-center  w-[20px]"
        >
          <svg
            class="w-[22px] h-[22px] text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="m9 5 7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>

    <!-- Products -->
    <div class="mt-[20px] lg:mt-[70px] mx-[20px] lg:mx-[50px]">
      <h1 class="fontheader mt-10">สินค้าแนะนำ - Recommend</h1>
      <div class="grid gap-5 mt-[10px]">
        <div v-for="cate in category" :key="cate.id">
          <div
            v-if="selectedCategoryId === cate.id || selectedCategoryId === 0"
          >
            <div class="flex justify-between w-full mt-10">
              <h1 class="font-bold text-xl">{{ cate.name }}</h1>
              <div class="text-black/40 cursor-pointer">
                <router-link
                  v-if="cate.id"
                  :to="`/category/${cate.id}`"
                  class="text-base font-normal text-black/40 cursor-pointer hover:text-[#FD8C35]/70"
                >
                  ทั้งหมด ->
                </router-link>
              </div>
            </div>
            <div class="grid grid-cols-4 max-md:grid-cols-2 my-5 gap-8">
              <div
                v-for="item in getRandomProducts(cate.id)"
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

    <Loading :loading="loading" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { Banner, Category, Params, Product } from "~/models/product.model";
import service from "~/service";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import { Autoplay } from "swiper/modules"; // ✅ ใช้ named export (ถูกต้อง)

// definePageMeta({
//   middleware: "auth",
// });

const products = ref<Product[]>([]);
const category = ref<Category[]>([]);
const search = ref<string>("");
const page = ref<number>(0);
const size = ref<number>(0);
const selectedCategoryId = ref(0); // 0 = All categories
const loading = ref(true);
const banner = ref<any[]>([]); // เปลี่ยนจาก Banner เป็นอาร์เรย์

const getbanners = async () => {
  loading.value = true;
  try {
    const resp = await service.product.getBanner();
    banner.value = resp.data.data;
  } catch (error) {
    console.error("Error loading banners:", error);
  }
  loading.value = false;
};

// Pagination
const currentPage = ref(1);
const itemsPerPage = ref(5); // จำนวนหมวดหมู่ที่ต้องการแสดงต่อหน้า

// คำนวณรายการหมวดหมู่ที่ต้องแสดง
const paginatedCategories = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return category.value.slice(start, end);
});

// จำนวนหน้าทั้งหมด
const totalPages = computed(() =>
  Math.ceil(category.value.length / itemsPerPage.value)
);

const goToPage = (page: number) => {
  currentPage.value = page;
  // เรียกใช้ getProductList หรือการกระทำอื่น ๆ ที่จำเป็น
  getProductList();
};

// เปลี่ยนหน้า
const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};
const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};

// ดึงข้อมูลสินค้าทั้งหมด
const getProductList = async () => {
  loading.value = true;
  const param: Params = {
    page: page.value, // ใช้ .value ในการเข้าถึง currentPage
    size: size.value, // ใช้ .value ในการเข้าถึง size
    search: search.value || "", // ใช้ค่าป้องกันถ้า search เป็น null หรือ undefined
  };
  console.log(param);
  await service.product
    .getProductList(param)
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
          Review:
            e.Review?.map((r: any) => ({
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

// ดึงข้อมูลหมวดหมู่สินค้า
const getCategoryList = async () => {
  loading.value = true;
  await service.product
    .getCategoryList()
    .then((resp: any) => {
      const data = resp.data.data;
      category.value = data
        .map((e: any) => ({
          id: e.id,
          name: e.name,
          image: e.image,
        }))
        .sort((a: any, b: any) => a.id - b.id); // เรียงข้อมูลตาม id
    })
    .catch((error: any) => {
      console.error("Error loading category list:", error);
    })
    .finally(() => {});
};
// ฟังก์ชันสุ่มสินค้าในหมวดหมู่
const getRandomProducts = (categoryId: number): Product[] => {
  const filteredProducts = getProductsByCategory(categoryId);

  // หากมีสินค้าภายในหมวดหมู่จะทำการจัดเรียงตามเรตติ้ง
  if (filteredProducts.length > 0) {
    const sortedProducts = filteredProducts.sort(
      (a: any, b: any) => b.rating - a.rating
    ); // เรียงจากดาวมากไปน้อย
    return sortedProducts.slice(0, 4); // แสดงสินค้า 4 ตัวแรก
  }

  return [];
};

// ฟังก์ชันกรองสินค้าในหมวดหมู่
const getProductsByCategory = (categoryId: number): Product[] => {
  return products.value.filter(
    (product) =>
      product.is_active && // เฉพาะ is_active: true
      (product.category.id === categoryId || categoryId === 0) // กรองตาม category
  );
};

const toggleCategory = (categoryId: number) => {
  if (selectedCategoryId.value === categoryId) {
    selectedCategoryId.value = 0; // รีเซ็ตการเลือกหมวดหมู่เมื่อกดหมวดหมู่เดิม
  } else {
    selectedCategoryId.value = categoryId;
  }
};

// Watch for changes in page, size, or search
watch([page, size, search], () => {
  // Call getProductList when any of the values change
  getProductList();
});

onMounted(async () => {
  await getCategoryList();
  await getProductList();
  await getbanners();
});
</script>

<style scoped></style>
