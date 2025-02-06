<template>
  <div>
    <div v-if="product && product.name"> <!-- ตรวจสอบว่า product มีค่าและมี name -->
      <div class="p-10">
        <div class="mx-[20px] lg:mx-[50px]">
          <!-- Product Details -->
          <div class="flex flex-col lg:flex-row justify-between gap-4">
            <div class="w-full p-2 flex justify-center">
              <div class="object-cover max-w-full w-[650px] h-[650px]">
                <img src="" alt="" class="w-full h-full object-cover" />
              </div>
            </div>
            <div class="w-full lg:w-3/6 p-5">
              <h1 class="font-bold text-2xl">{{ product.name }}</h1>
              <div class="mt-2 flex gap-5">
                <div>จำนวนรีวิว: {{ product.Review?.length }}</div>
                <div>ถูกใจ</div>
              </div>
              <div class="text-[#FF0808] font-semibold text-4xl mt-10">
                ฿{{ product.price }}
              </div>
              <div class="mt-10">
                <h1 class="font-medium text-base">รายละเอียด</h1>
                <div class="h-[350px] w-full p-4 overflow-y-auto rounded-md mt-4">
                  <p>{{ product.description }}</p>
                </div>
              </div>
              <!-- Quantity Control -->
              <div class="flex items-center gap-4 mt-4">
                <button class="px-4 py-2 rounded border" @click="decreaseQuantity">-</button>
                <span class="text-lg font-semibold">{{ selectedAmount  }}</span>
                <button class="px-4 py-2 rounded border" @click="increaseQuantity">+</button>
              </div>
              <button type="submit" @click="addCartItem" class="bg-[#EE973C] text-white p-4 rounded-lg w-full lg:w-[350px] mt-10 hover:bg-[#FD8C35]/70 transition">
                เพิ่มใส่ตะกร้า
              </button>
            </div>
          </div>
          <hr class="my-10" />
          <!-- Reviews -->
          <div>
            <h1 class="text-2xl font-bold">รีวิวสินค้า</h1>
            <div class="flex gap-5 mt-4">
              <p>จำนวนรีวิวทั้งหมด: {{ product.Review?.length }}</p>
            </div>
            <div class="flex justify-center gap-20 mt-10">
              <div v-for="Review in paginatedReviews" :key="Review.id" class="border rounded-lg p-4 w-[480px]">
                <div class="flex justify-between">
                  <div>
                    <h2 class="font-bold text-xl">โดย: {{ Review.username }}</h2>
                    <p class="text-sm text-gray-500">คะแนน: {{ Review.rating }}</p>
                  </div>
                </div>
                <p class="mt-2">{{ Review.description }}</p>
              </div>
            </div>
            <div class="flex justify-center mt-6">
              <button v-for="page in totalPages" :key="page" @click="changePage(page)"
                :class="{ 'bg-[#EE973C] text-white': page === currentPage, 'bg-gray-200': page !== currentPage }"
                class="px-4 py-2 mx-1 rounded">
                {{ page }}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="p-[20px] lg:p-[40px] bg-[#FCCA81]/30">
        <!-- <div>
          <h1 class="text-2xl flex justify-center font-bold">สินค้าใกล้เคียง</h1>
          <div class="grid grid-cols-4 gap-10 mt-10">
            <NuxtLink v-for="product in relatedProducts" :key="product.id" :to="`/product/${product.id}`">
              <CardProduct :product="product" />
            </NuxtLink>
          </div>
        </div> -->
      </div>
    </div>
    <Loading :loading="loading" />
  </div>
</template>

<script lang="ts" setup>
import Swal from "sweetalert2";
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import type { CartItemAdd, CartItemRes, Product } from "~/models/product.model";
import service from "~/service";

const route = useRoute();
const loading = ref(false); 
const products = ref<Product[]>([]);
const cartitem = ref<CartItemAdd>({
  product_id: 0,
  total_product_amount: 0,
});

const cartitemRes = ref<CartItemRes>({
  product_id: 0,
  total_product_amount: 0,
});

// Get Product By ID
const getProductById = async () => {
  loading.value = true;
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
  loading.value = false;
};

// Add Product to Cart
const addCartItem = async () => {
  loading.value = true;
  cartitem.value.product_id = Number(route.params.id);
  cartitem.value.total_product_amount = selectedAmount.value;
  await service.product.addCartItem(cartitem.value).then((resp: any) => {
    const data = resp.data.data;
    if (data) {
      Swal.fire({
        title: "เพิ่มสินค้าสำเร็จ!",
        text: "ได้เพิ่มสินค้าแล้ว!",
        icon: "success",
      });
    }

    const cartitem: CartItemRes = {
      product_id: data.id,
      total_product_amount: data.total_product_amount,
    };
    cartitemRes.value = cartitem;
  }).catch((error: any) => {
    console.error(error);
  }).finally(() => {
    loading.value = false;
  });
};



// Selected Product
const product = computed(() => products.value.find((item) => item.id === Number(route.params.id)));

// Quantity Control
const selectedAmount = ref(1);

const increaseQuantity = () => {
  if (product.value?.stock && selectedAmount.value < product.value.stock) {
    selectedAmount.value++;
  }
};

const decreaseQuantity = () => {
  if (selectedAmount.value > 1) {
    selectedAmount.value--;
  }
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

// Get Related Products (filter by category)
// const relatedProducts = computed(() => {
//   if (!product.value) return [];
//   return products.value.filter(p => p.category.id === product.value.category.id && p.id !== product.value.id);
// });

onMounted(() => {
  getProductById();
});
</script>
