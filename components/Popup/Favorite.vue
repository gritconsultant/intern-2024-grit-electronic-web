<template>
  <div
    class="w-full md:w-[500px] h-full border-2 flex flex-col gap-2 rounded-[5px] bg-[#FFFFFF] drop-shadow-lg overflow-hidden"
  >
    <div class="flex justify-between items-center p-4 md:p-5 border-b-2">
      <h1 class="text-sm md:text-base font-bold">
        รายการโปรด ({{ favoriteItems.length }})
      </h1>
      <h2
        @click="clearFavorites"
        class="text-red-500 cursor-pointer ml-auto text-xs md:text-sm"
      >
        ลบทั้งหมด
      </h2>
      <button @click="closeFavorites">
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
        v-for="(item, index) in favoriteItems"
        :key="item.id"
        class="flex justify-between items-center border-b py-2"
      >
        <img
          :src="item.img"
          alt="product"
          class="w-[50px] h-[50px] md:w-[75px] md:h-[75px] object-cover rounded-md"
        />
        <div class="flex-1 ml-2">
          <div class="flex justify-between">
            <div>
              <p class="text-xs md:text-sm font-medium">{{ item.name }}</p>
            </div>
          </div>

          <div class="flex justify-between">
            <!-- detail -->
            <div class="font-normal text-xs text-black/50">
              <p class="texthide">{{ item.detail }}</p>
            </div>

            <!-- fav -->
            <div>
              <button @click="toggleFavorite(index)" class="text-red-500">
                <svg
                  v-if="item.isFavorite"
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
            </div>
          </div>
          <div>
            <div class="flex justify-between items-center gap-2 mt-2">
              <div>
                <p class="fontsubheader">฿{{ item.price }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="p-3 md:p-4 border-t bg-gray-100">
      <button
        @click="closeFavorites"
        class="w-full mt-2 text-sm md:text-base text-gray-500 hover:underline"
      >
        เลือกซื้อสินค้าต่อ →
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "auth",
});

const store = useIndexStore();

import { ref } from "vue";
import { useIndexStore } from "~/store/main";

// State สำหรับสินค้าในตะกร้า
const favoriteItems = ref([
{
    id: 1,
    name: "มะขาม 4 รส",
    detail:
      "มะขาม 4 รส มะขามคลุก (บ้านมะขาม) โดยบริษัทสวนผึ้ง จำกัด ",
    price: 62,
    amount: 1,
    img: "https://th-test-11.slatic.net/p/2b0d5f80a00b77d2c6490b09a053a1c0.png",
    isFavorite: true,
  },
  {
    id: 2,
    name: "มะขามคลุกบ๊วย 4 รส",
    detail: "มะขามแกะเปลือก ปรุงรสด้วย นำ้ตาล พริก เกลือ และผงบ๊วย ",
    price: 62,
    amount: 1,
    img: "https://halal.co.th/storages/products/343928.png",
    isFavorite: true,
  },
]);

// Toggle Favorite - ถ้ากดไอคอนหัวใจซ้ำจะเปลี่ยน isFavorite
const toggleFavorite = (index: number) => {
  favoriteItems.value[index].isFavorite =
    !favoriteItems.value[index].isFavorite;
  if (!favoriteItems.value[index].isFavorite) {
    // ถ้า isFavorite เป็น false ให้ลบออกจากรายการ
    favoriteItems.value.splice(index, 1);
  }
};

// ล้างรายการโปรด
const clearFavorites = () => {
  favoriteItems.value = [];
};

// ปิด Popup
const closeFavorites = () => {
  store.favouriteAction = false;
};
</script>

<style scoped>
/* Responsive styling */
@media (max-width: 768px) {
  .fontsubheader {
    font-size: 12px;
  }
  .texthide {
    display: none;
  }
}
@media (min-width: 769px) {
  .fontsubheader {
    font-size: 16px;
  }
  .texthide {
    display: block;
  }
}
</style>
