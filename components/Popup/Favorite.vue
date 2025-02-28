<template>
  <div
    class="w-[500px] max-md:w-[390px] h-full  max-lg:h-[76.4%] max-md:h-full border-2 flex flex-col gap-2 rounded-[5px] bg-[#FFFFFF] drop-shadow-lg overflow-hidden"
  >
    <div class="flex justify-between items-center p-4 md:p-5 border-b-2">
      <h1 class="text-sm md:text-base font-bold">
        รายการโปรด ({{ wish.length }})
      </h1>
      <button @click="store.favouriteAction = !store.favouriteAction">
        <svg
          class="w-5 h-5 md:w-6 md:h-6 hover:text-red-500"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18 17.94 6M18 18 6.06 6"
          />
        </svg>
      </button>
    </div>

    <!-- Favorite Items -->
    <div class="px-4 md:px-5 overflow-y-auto flex-1">
      <div
        v-for="item  in wish"
        :key="item.id"
        class="flex justify-between items-center border-b py-2"
      >
        <img
          :src="item.product.image || 'https://www.shutterstock.com/image-vector/no-image-available-picture-coming-600nw-2057829641.jpg'"
          alt="product"
          class="w-[50px] h-[50px] md:w-[75px] md:h-[75px] object-cover rounded-md"
        />
        <div class="flex-1 ml-2 ">
          <div class="flex justify-between ">
            <div>
              <!-- link ไปหน้า product -->
              <div>
              <router-link
                v-if="item.product.id"
                :to="`/product/${item.product.id}`"
                class="text-lg font-bold text-black cursor-pointer hover:text-[#FD8C35]/70"
              >
                {{ item.product.name }}
              </router-link>
            </div>
            </div>
          </div>

          <div class="flex justify-between">
            <!-- detail -->
            <div class="font-normal text-xs text-black/50">
              <p class="texthide">{{ item.product.description }}</p>
            </div>

            <!-- fav -->
            <!-- <div>
              <button @click="toggleFavorite(index)" class="text-red-500">
                <svg
                  v-if="item.is_favorite"
                  class="w-5 h-5 md:w-6 md:h-6 text-red-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09A5.978 5.978 0 0116.5 3c3.08 0 5.5 2.42 5.5 5.5 0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                  />
                </svg>
                <svg
                  v-else
                  class="w-5 h-5 md:w-6 md:h-6 text-gray-400 hover:text-red-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 21l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09A5.978 5.978 0 0116.5 3c3.08 0 5.5 2.42 5.5 5.5 0 3.78-3.4 6.86-8.55 11.54L12 21z"
                  />
                </svg>
              </button>
            </div> -->
          </div>
          <div>
            <div class="flex justify-between items-center gap-2 mt-5">
              <div>
                <p class="font-bold">฿{{ item.product.price }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="p-3 md:p-4 border-t bg-gray-100">
      <button
        @click="store.favouriteAction = !store.favouriteAction"
        class="w-full mt-2 text-sm md:text-base text-gray-500 hover:underline"
      >
        เลือกซื้อสินค้าต่อ →
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { wishlistById } from "~/models/product.model";
import service from "~/service";
import { useIndexStore } from "~/store/main";

const store = useIndexStore();
const wish = ref<wishlistById[]>([]);
  const loading = ref(true);

const getWishlist = async () => {
  loading.value = true;
  await service.product
    .getFavorite()
    .then((resp: any) => {
      const data = resp.data.data;
      const wishlist: wishlistById[] = [];
      console.log(data);

      for (let i = 0; i < data.length; i++) {
        const e = data[i];
        const wishlists: wishlistById = {
          id: e.id,
          user: e.user,
          product: e.product,
          price_per_product: e.price_per_product,
          amount_per_product: e.amount_per_product,
          created_at: e.created_at,
          updated_at: e.updated_at,
          is_favorite: true,
        };
        wishlist.push(wishlists);
      }
      wish.value = wishlist;
    })
    .catch((erro: any) => {
      console.error(Error);
    })
    .finally(() => {
      loading.value = false;
    });
};

// const deleteWishlist = async (id: String) => {
//   loading.value = true;
//   await service.product
//     .deleteFavorite(id)
//     .then((resp: any) => {
//       const data = resp.data.data;
//       console.log(data);
//     })
//     .catch((error: any) => {
//       console.error(error);
//     })
//     .finally(() => {
//       loading.value = false;
//     });
// };

// Toggle Favorite - ถ้ากดไอคอนหัวใจซ้ำจะเปลี่ยน isFavorite
// const toggleFavorite = async (index: number) => {
//   loading.value = true;
//   const item = wish.value[index];

//   if (item.is_favorite) {
//     // ถ้ากดปิด ให้ลบจากรายการโปรด
//     try {
//       await deleteWishlist(String(item.id));
//       wish.value.splice(index, 1); // ลบออกจาก UI
//     } catch (error) {
//       console.error("Failed to remove from wishlist:", error);
//     }
//   } else {
//     loading.value = false;
//     // ถ้ากดเปิด ต้องเพิ่มเข้าไปในรายการโปรด (ถ้ามี API รองรับ)
//     console.log("เพิ่มเข้ารายการโปรด", item.product.name);
//   }
// };

onMounted(() => {
  getWishlist();
});
</script>

<style scoped></style>
