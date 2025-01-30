<template>
  <div v-if="product">
    <div class="p-10">
      <div class="mx-[20px] lg:mx-[50px]">
        <!-- Product Details -->
        <div class="flex flex-col lg:flex-row justify-between gap-4">
          <div class="w-full p-2 flex justify-center">
            <div class="object-cover max-w-full w-[650px] h-[650px]">
              {{ product.image.id }}
            </div>
          </div>
          <div class="w-full lg:w-3/6 p-5">
            <h1 class="font-bold text-2xl">{{ product.name }}</h1>
            <div class="mt-2 flex gap-5">
              <div>จำนวนรีวิว: {{ product.Review.length }}</div>
              <div>ถูกใจ</div>
            </div>
            <div class="text-[#FF0808] font-semibold text-4xl mt-10">
              ฿{{ product.price }}
            </div>
            <div class="mt-10">
              <h1 class="font-medium text-base">รายละเอียด</h1>
              <div
                class="h-[350px] w-full p-4 overflow-y-auto  rounded-md mt-4"
              >
                <p>{{ product.description }}</p>
              </div>
            </div>
            <!-- Quantity Control -->
            <div class="flex items-center gap-4 mt-4">
              <button
                class="px-4 py-2 rounded border"
                @click="decreaseQuantity"
              >
                -
              </button>
              <span class="text-lg font-semibold">{{ selectedAmount }}</span>
              <button
                class="px-4 py-2 rounded border"
                @click="increaseQuantity"
              >
                +
              </button>
            </div>
            <button
              class="bg-[#EE973C] text-white p-4 rounded-lg w-full lg:w-[350px] mt-10 hover:bg-[#FD8C35]/70 transition"
              @click="addToCart"
            >
              เพิ่มใส่ตะกร้า
            </button>
          </div>
        </div>
        <hr class="my-10" />
        <!-- Reviews -->
        <div>
          <h1 class="text-2xl font-bold">รีวิวสินค้า</h1>
          <div class="flex gap-5 mt-4">
            <p>จำนวนรีวิวทั้งหมด: {{ product.Review.length }}</p>
          </div>
          <div class="flex justify-center gap-20 mt-10">
            <div
              v-for="Review in paginatedReviews"
              :key="Review.id"
              class="border rounded-lg p-4 w-[480px]"
            >
              <div class="flex justify-between">
                <div>
                  <h2 class="font-bold text-xl">โดย: {{ Review.username }}</h2>
                  <p class="text-sm text-gray-500">
                    คะแนน: {{ Review.rating }}
                  </p>
                </div>
              </div>
              <p class="mt-2">{{ Review.description }}</p>
            </div>
          </div>
          <div class="flex justify-center mt-6">
            <button
              v-for="page in totalPages"
              :key="page"
              @click="changePage(page)"
              :class="{
                'bg-[#EE973C] text-white': page === currentPage,
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
        <div class="grid grid-cols-4 gap-10 mt-10">
          <NuxtLink>
            <CardProduct
              v-for="product in products"
              :key="product.category.id"
              :product="product"
            />
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import Category from "~/components/Dropdown/Category.vue";
import type { Product } from "~/models/product.model";
import service from "~/service";
import { useIndexStore } from "~/store/main";

const products = ref<Product[]>([]);
const route = useRoute();

const getProductById = async () => {
  const resp = await service.product.getProductById(route.params.id);
  const data = resp.data.data;

  const product: Product = {
    id: data.id,
    name: data.name,
    price: data.price,
    stock: data.stock,
    description: data.description ?? null,
    image: {
      id: data.image?.id,
      ref_id: data.image?.ref_id,
      type: data.image?.type,
      description: data.image?.description,
    },
    category: {
      id: data.category?.id,
      name: data.category?.name,
    },
    Review:
      data.Review?.map((r: any) => ({
        id: r.id,
        rating: Math.max(1, Math.min(5, r.rating)),
        username: r.username,
        description: r.description,
      })) ?? [],
    is_active: data.is_active,
    created_at: data.created_at,
    updated_at: data.updated_at,
  };
  products.value.push(product);
};



// Selected Product
const product = computed(() =>
  products.value.find((item) => item.id === Number(route.params.id))
);


// Quantity Control
const selectedAmount = ref(1);

const increaseQuantity = () => {
  if (product.value && selectedAmount.value < product.value.stock) {
    selectedAmount.value++;
  }
};

const decreaseQuantity = () => {
  if (selectedAmount.value > 1) {
    selectedAmount.value--;
  }
};

const addToCart = () => {
  if (!product.value) return;
  const store = useIndexStore();
  store.addToCart({ ...product.value, selectedAmount: selectedAmount.value });
  alert("เพิ่มสินค้าในตะกร้าสำเร็จ!");
};

// Pagination for Reviews
const reviewsPerPage = 3;
const currentPage = ref(1);

const paginatedReviews = computed(() => {
  if (!product.value) return [];
  const start = (currentPage.value - 1) * reviewsPerPage;
  return product.value.Review.slice(start, start + reviewsPerPage);
});

const totalPages = computed(() => {
  if (!product.value) return 0;
  return Math.ceil(product.value.Review.length / reviewsPerPage);
});

const changePage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};
onMounted(() => {
  getProductById();
});
</script>
<style scoped>
</style>