<template>
  <div>
    <div v-if="products && products.name">
      <!-- ตรวจสอบว่า product มีค่าและมี name -->
      <div class="p-10">
        <div class="mx-[20px] lg:mx-[50px]">
          <!-- Product Details -->
          <div class="flex flex-col lg:flex-row justify-between gap-4">
            <div class="w-full p-2 flex justify-center">
              <div class="object-cover max-w-full w-[650px] h-[650px]">
                <img
                  :src="products.image"
                  alt=""
                  class="w-full h-full object-cover"
                />
              </div>
            </div>
            <div class="w-full lg:w-3/6 p-5">
              <h1 class="font-bold text-2xl">{{ products.name }}</h1>
              <div class="mt-2 flex gap-5">
                <div>จำนวนรีวิว: {{ products.Review?.length }}</div>
                <div>
                  <!-- ไอคอนหัวใจ -->
                  <button
                    type="submit"
                    @click="updateWishlist"
                    class="focus:outline-none"
                  >
                  <span v-if="products.is_favorite">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      class="w-7 h-7 transition text-red-500"
                  
                    >
                      <path
                        fill-rule="evenodd"
                        d="M12 4.248c-3.148-5.402-12-2.95-12 3.24 0 4.01 3.97 8.303 11.3 14.477a1.5 1.5 0 002.4 0C20.03 15.79 24 11.498 24 7.488c0-6.19-8.852-8.642-12-3.24z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </span>
              
                    <span v-else>
                      <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      class="w-7 h-7 transition text-gray-400 hover:text-red-500"
               
                    >
                      <path
                        fill-rule="evenodd"
                        d="M12 4.248c-3.148-5.402-12-2.95-12 3.24 0 4.01 3.97 8.303 11.3 14.477a1.5 1.5 0 002.4 0C20.03 15.79 24 11.498 24 7.488c0-6.19-8.852-8.642-12-3.24z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    </span>
                  </button>
                </div>
              </div>
              <div class="text-[#FF0808] font-semibold text-4xl mt-10">
                ฿{{ products.price }}
              </div>
              <div class="mt-10">
                <h1 class="font-medium text-base">รายละเอียด</h1>
                <div
                  class="h-[350px] w-full p-4 overflow-y-auto rounded-md mt-4"
                >
                  <p>{{ products.description }}</p>
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
                type="submit"
                @click="addCartItem"
                class="bg-[#EE973C] text-white p-4 rounded-lg w-full lg:w-[350px] mt-10 hover:bg-[#FD8C35]/70 transition"
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
              <p>จำนวนรีวิวทั้งหมด: {{ products.Review?.length }}</p>
            </div>
            <div class="flex justify-center gap-20 mt-10">
              <div
                v-for="Review in paginatedReviews"
                :key="Review.id"
                class="border rounded-lg p-4 w-[480px]"
              >
                <div class="flex justify-between">
                  <div>
                    <h2 class="font-bold text-xl">
                      โดย: {{ Review.username }}
                    </h2>
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
      <!-- สินค้าใกล้เคียง -->
      <div class="p-[20px] lg:p-[40px] bg-[#FCCA81]/30">
        <div class="flex flex-col gap-4">
          <p class="text-xl font-semibold">สินค้า</p>
          <div class="flex flex-wrap gap-20 justify-center">
            <div
              v-for="product in productslist.slice(0, 4)"
              :key="product.id"
              class="flex justify-center"
            >
              <NuxtLink :to="`/product/${product.id}`">
                <CardProduct :product="product" />
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Loading :loading="loading" />
  </div>
</template>

<script lang="ts" setup>
import Swal from "sweetalert2";
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import type {
  CartItemAdd,
  CartItemRes,
  Params,
  Product,
  ProductGet,
  WishlistCreate,
  WishlistRes,
  WishlistUpdate,
} from "~/models/product.model";
import service from "~/service";
import { useIndexStore } from "~/store/main";

definePageMeta({
  middleware: "auth",
});

const route = useRoute();
const store = useIndexStore();
const loading = ref(false);
const products = ref<Product>();
const productslist = ref<Product[]>([]);
const search = ref<string>("");
const page = ref<number>(0);
const size = ref<number>(0);
const cartitem = ref<CartItemAdd>({
  product_id: 0,
  total_product_amount: 0,
});

const cartitemRes = ref<CartItemRes>({
  product_id: 0,
  total_product_amount: 0,
});

// const wishlistCreate = ref<WishlistCreate>({
//   user_id: 0,
//   product_id: 0,
//   is_favorite: false,
// });

const wishlistRes = ref<WishlistRes>({
  product_id: 0,
  is_favorite: false,
});

const wishlistUpdate = ref<WishlistUpdate>({
  product_id: 0,
  is_favorite: false,
});

// Get Product By ID
const getProductById = async () => {
  loading.value = true;

  const ida = ref<string>("");
  if (store.$state.userId) {
    ida.value = store.$state.userId;
  }
  const query = ref<ProductGet>({
    user_id: ida.value,
  });
  const resp = await service.product.getProductById(
    route.params.id,
    query.value
  );
  const data = resp.data.data;

  const product: Product = {
    id: data.id,
    name: data.name,
    price: data.price,
    stock: data.stock,
    description: data.description ?? null,
    image: data.image,
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
    is_favorite: data.is_favorite,
  };

  products.value = product;
  loading.value = false;
};

const addCartItem = async () => {
  cartitem.value.product_id = Number(route.params.id);
  cartitem.value.total_product_amount = selectedAmount.value;

  await service.product
    .addCartItem(cartitem.value)
    .then((resp: any) => {
      const data = resp.data.data;

      // ถ้าการเพิ่มสินค้าสำเร็จ
      Swal.fire({
        title: "เพิ่มสินค้าสำเร็จ!",
        text: "ได้เพิ่มสินค้าแล้ว!",
        icon: "success",
      });

      const cartitem: CartItemRes = {
        product_id: data.id,
        total_product_amount: data.total_product_amount,
      };
      cartitemRes.value = cartitem;
    })
    .catch((error: any) => {
      // ตรวจสอบว่า API ส่ง message ว่า stock ไม่พอ
      if (
        error.response &&
        error.response.data.message === "not enough stock"
      ) {
        Swal.fire({
          title: "ไม่สามารถซื้อได้!",
          text: "ขออภัย, สินค้าชิ้นนี้หมดสต็อกแล้ว!",
          icon: "error",
        });
        return; // หยุดการดำเนินการ
      }
    })
    .finally(() => {
      loading.value = false;
    });
};

// const addFavorite = async () => {
//   wishlistCreate.value.product_id = Number(route.params.id);
//   wishlistCreate.value.user_id = Number(store.$state.userId);

//   // ตรวจสอบว่าถ้าหัวใจเป็นสีแดงแล้ว ให้ทำการลบออกจาก wishlist
//   if (wishlistRes.value.isFavorite) {
//     await deleteWishlist(wishlistCreate.value.product_id.toString());
//   } else {
//     // สลับการกดหัวใจ (toggle)
//     wishlistCreate.value.isFavorite = true;
//     await service.product.addFavorite(wishlistCreate.value)
//       .then((resp: any) => {
//         const data = resp.data;
//         // อัปเดตสถานะการถูกใจ
//         wishlistRes.value.isFavorite = data.isFavorite;
//       })
//       .catch((error: any) => {
//         console.error("เกิดข้อผิดพลาด:", error);
//       });
//   }
// };

const updateWishlist = async () => {
  loading.value = true;
  wishlistUpdate.value.product_id = Number(route.params.id);
  console.log(wishlistUpdate.value);

  await service.product
    .UpdateWish(wishlistUpdate.value)
    .then(async (resp: any) => {
      const data = resp.data.data;
      console.log(data);

      await getProductById();
    })
    .catch((error: any) => {
      console.error("Error updating wishlist:", error);
    })
    .finally(async () => {
      loading.value = false;
    });
};

const getAllProducts = async () => {
  try {
    const param: Params = {
      page: page.value, // ใช้ .value ในการเข้าถึง currentPage
      size: size.value, // ใช้ .value ในการเข้าถึง size
      search: search.value || "", // ใช้ค่าป้องกันถ้า search เป็น null หรือ undefined
    };
    const resp = await service.product.getProductList(param);
    productslist.value = resp.data.data.map((e: any) => ({
      id: e.id,
      name: e.name,
      price: e.price,
      stock: e.stock,
      description: e.description ?? "",
      image: e.image,
      category: {
        id: e.category?.id,
        name: e.category?.name,
      },
      is_active: e.is_active,
      created_at: e.created_at,
      updated_at: e.updated_at,
    }));
  } catch (error) {
    console.error("Error fetching all products:", error);
  }
};

// Quantity Control
const selectedAmount = ref(1);

const increaseQuantity = () => {
  if (products.value?.stock && selectedAmount.value < products.value.stock) {
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
  if (!products.value) return [];
  const start = (currentPage.value - 1) * reviewsPerPage;
  return products.value.Review.slice(start, start + reviewsPerPage);
});

const totalPages = computed(() => {
  if (!products.value) return 0;
  return Math.ceil(products.value.Review.length / reviewsPerPage);
});

const changePage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};
// Watch for changes in page, size, or search
watch([page, size, search], () => {
  // Call getProductList when any of the values change
  getAllProducts();
});

onMounted(() => {
  getAllProducts();
  getProductById();
});
</script>

<style scoped>
.sticky {
  position: sticky;
}
</style>
