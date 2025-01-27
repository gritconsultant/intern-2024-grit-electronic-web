<template>
  <div v-if="product">
    <div class="p-10">
      <div class="mx-[20px] lg:mx-[50px]">
        <!-- Product Details -->
        <div class="flex flex-col lg:flex-row justify-between gap-4">
          <div class="w-full p-2 flex justify-center">
            <!-- <img
              class="object-cover max-w-full w-[650px] h-[650px]"
              :src="product.img"
              :alt="product.name"
            /> -->
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
                <p>{{ product.description }}</p>
              </div>
            </div>
            <!-- Quantity Control -->
            <div class="flex items-center gap-4 mt-4 ">
              <button class="px-4 py-2 rounded border" @click="decreaseQuantity">
                -
              </button>
              <span class="text-lg font-semibold">{{ selectedAmount }}</span>
              <button class="px-4 py-2 rounded border" @click="increaseQuantity">
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

        <!-- Review -->
        <div>
          <h1 class="text-2xl font-bold">รีวิวสินค้า</h1>
          <div class="flex gap-5 mt-4">
            <p>จำนวนรีวิวทั้งหมด: {{ product.Review.length }}</p>
          </div>

          <div class="flex justify-center gap-20 mt-10">
            <!-- Reviews -->
            <!-- <div
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
                  v-for="(image, index) in product.Review.image.slice(0, 4)"
                  :key="index"
                  :src="image"
                  class="w-[80px] h-[80px] object-cover rounded-md"
                  alt="Review Image"
                />
              </div>
            </div> -->
          </div>

          <!-- Pagination -->
          <!-- <div class="flex justify-center mt-6">
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
          </div> -->
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
import { errorMessages } from "vue/compiler-sfc";
import type { Product } from "~/models/product.model";
import service from "~/service";
import { useIndexStore } from "~/store/main";

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
    Review: [{ id: 0, rating: 0 }, { id: 0, rating: 0 }],
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


// Selected amount for the product
const selectedAmount = ref(1);

// Increase quantity
const increaseQuantity = () => {
  if (product && selectedAmount.value < product.stock) {
    selectedAmount.value++;
  } else {
    alert("ไม่สามารถเพิ่มจำนวนได้");
  }
};

// Decrease quantity
const decreaseQuantity = () => {
  if (selectedAmount.value > 1) {
    selectedAmount.value--;
  }
};

// Paginate
// const reviewsPerPage = 3;
// const currentPage = ref(1);
// const paginatedReviews = computed(() => {
//   const start = (currentPage.value - 1) * reviewsPerPage;
//   return products.Review.value.slice(start, start + reviewsPerPage);
// });
// const totalPages = computed(() =>
//   Math.ceil(products.Review.value.length / reviewsPerPage)
// );
// const changePage = (page: number) => {
//   if (page >= 1 && page <= totalPages.value) {
//     currentPage.value = page;
//   }
// };

// Product
const route = useRoute();
const store = useIndexStore();
const product = products.value.find((item) => item.id === Number(route.params.id));
const addToCart = () => {
  if (!product) return;
  store.addToCart({ ...product, selectedAmount: 1 });
  alert("เพิ่มสินค้าในตะกร้าสำเร็จ!");
};
</script>

<style scoped></style>
