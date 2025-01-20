<template>
  <div v-if="product">
    <div class="p-10">
      <div class="mx-[20px] lg:mx-[50px]">
        <!-- Product Details -->
        <div class="flex flex-col lg:flex-row justify-between gap-4">
          <div class="w-full p-2 flex justify-center">
            <img
              class="object-cover max-w-full w-[650px] h-[650px]"
              :src="product.img"
              :alt="product.name"
            />
          </div>
          <div class="w-full lg:w-3/6 p-5">
            <h1 class="font-bold text-2xl">{{ product.name }}</h1>
            <div class="mt-2 flex gap-5">
              <div>จำนวนดาว</div>
              <div>ถูกใจ</div>
            </div>
            <div class="text-[#FF0808] font-semibold text-4xl mt-10">
              ฿{{ product.price }}
            </div>
            <div class="mt-10">
              <h1 class="font-medium text-base">รายละเอียด</h1>
              <div
                class="h-[350px] w-full p-4 overflow-y-auto border rounded-md mt-4"
              >
                <p>{{ product.detail }}</p>
              </div>
            </div>
            <button
              class="bg-[#FCCA81] text-white p-4 rounded-lg w-full lg:w-[350px] mt-10 hover:bg-[#EE973C] transition"
              @click="addToCart"
            >
              เพิ่มใส่ตะกร้า
            </button>
          </div>
        </div>

        <hr class="my-10" />

        <!-- Review -->
        <div>
          <h1 class="text-2xl font-bold">รีวิวสินค้า</h1>
          <div class="flex gap-5 mt-4">
            <p>จำนวนรีวิวทั้งหมด: {{ reviews.length }}</p>
          </div>

          <div class="flex justify-center gap-20 mt-10">
            <!-- Reviews -->
            <div
              v-for="review in paginatedReviews"
              :key="review.id"
              class="border rounded-lg p-4 w-[480px]"
            >
              <div class="flex justify-between">
                <div>
                  <h2 class="font-bold text-xl">{{ review.name }}</h2>
                  <p class="text-sm text-gray-500">{{ review.date }}</p>
                </div>
                <div class="flex flex-col items-center gap-2 w-1/4">
                  <div class="subheader">{{ review.rating }}</div>
                  <div class="icons flex justify-center">
                    <img
                      v-for="star in review.rating"
                      :key="star"
                      src="https://cdn-icons-png.flaticon.com/256/15853/15853959.png"
                      alt="star"
                    />
                  </div>
                </div>
              </div>
              <p class="mt-4 h-[100px] p-2 overflow-y-auto">
                {{ review.detail }}
              </p>
              <div class="mt-4 flex flex-wrap gap-2">
                <img
                  v-for="(image, index) in review.images.slice(0, 4)"
                  :key="index"
                  :src="image"
                  class="w-[80px] h-[80px] object-cover rounded-md"
                  alt="Review Image"
                />
              </div>
            </div>
          </div>

          <!-- Pagination -->
          <div class="flex justify-center mt-6">
            <button
              v-for="page in totalPages"
              :key="page"
              @click="changePage(page)"
              :class="{
                'bg-[#FCCA81] text-white': page === currentPage,
                'bg-gray-200': page !== currentPage,
              }"
              class="px-4 py-2 mx-1 rounded"
            >
              {{ page }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="p-[20px] lg:p-[40px] bg-[#FCCA81]/30">
      <div>
        <h1 class="text-2xl flex justify-center font-bold">สินค้าใกล้เคียง</h1>
        <div class="flex justify-center gap-20 mt-10">
          <div v-for="(item, index) in products.slice(0, 4)" :key="index">
            <CardProduct :product="item" />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import { useIndexStore } from "~/store/main";

const products = [
  {
    id: 1,
    name: "มะขาม 4 รส",
    detail: "มะขาม 4 รส มะขามคลุก (บ้านมะขาม) โดยบริษัทสวนผึ้ง จำกัด",
    price: 62,
    amount: 10,
    img: "https://th-test-11.slatic.net/p/2b0d5f80a00b77d2c6490b09a053a1c0.png",
    categoryId: 1,
  },
  {
    id: 2,
    name: "มะขามคลุกบ๊วย 4 รส",
    detail: "มะขามแกะเปลือก ปรุงรสด้วย นำ้ตาล พริก เกลือ และผงบ๊วย",
    price: 62,
    amount: 13,
    img: "https://halal.co.th/storages/products/343928.png",
    categoryId: 1,
  },
  {
    id: 3,
    name: "มะขาม 4 รส",
    detail: "มะขาม 4 รส มะขามคลุก (บ้านมะขาม) โดยบริษัทสวนผึ้ง จำกัด",
    price: 62,
    amount: 10,
    img: "https://th-test-11.slatic.net/p/2b0d5f80a00b77d2c6490b09a053a1c0.png",
    categoryId: 1,
  },
  {
    id: 4,
    name: "มะขามคลุกบ๊วย 4 รส",
    detail: "มะขามแกะเปลือก ปรุงรสด้วย นำ้ตาล พริก เกลือ และผงบ๊วย",
    price: 62,
    amount: 13,
    img: "https://halal.co.th/storages/products/343928.png",
    categoryId: 1,
  },
];

const reviews = ref([
  {
    id: 1,
    name: "John",
    date: "2025-01-01",
    rating: 4,
    detail: "Good product!",
    images: [
      "https://halal.co.th/storages/products/343928.png",
      "https://halal.co.th/storages/products/343928.png",
    ],
  },
  {
    id: 2,
    name: "Jane",
    date: "2025-01-02",
    rating: 5,
    detail: "Excellent quality!",
    images: [
      "https://halal.co.th/storages/products/343928.png",
      "https://halal.co.th/storages/products/343928.png",
      "https://halal.co.th/storages/products/343928.png",
      "https://halal.co.th/storages/products/343928.png",
    ],
  },
  {
    id: 3,
    name: "Alex",
    date: "2025-01-03",
    rating: 3,
    detail: "It's okay.",
    images: [],
  },
  {
    id: 4,
    name: "Alex",
    date: "2025-01-03",
    rating: 3,
    detail: "It's okay.",
    images: [],
  },
  {
    id: 5,
    name: "Alex",
    date: "2025-01-03",
    rating: 3,
    detail: "It's okay.",
    images: [],
  },
  {
    id: 6,
    name: "Alex",
    date: "2025-01-03",
    rating: 3,
    detail: "It's okay.",
    images: [],
  },
]);

// Paginate
const reviewsPerPage = 3;
const currentPage = ref(1);
const paginatedReviews = computed(() => {
  const start = (currentPage.value - 1) * reviewsPerPage;
  return reviews.value.slice(start, start + reviewsPerPage);
});
const totalPages = computed(() =>
  Math.ceil(reviews.value.length / reviewsPerPage)
);
const changePage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

// Product
const route = useRoute();
const store = useIndexStore();
const product = products.find((item) => item.id === Number(route.params.id));
const addToCart = () => {
  if (!product) return;
  store.addToCart({ ...product, selectedAmount: 1 });
  alert("เพิ่มสินค้าในตะกร้าสำเร็จ!");
};
</script>

<style scoped></style>
