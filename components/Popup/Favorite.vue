<template>
  <div
    class="w-[500px] h-full border-2 flex flex-col gap-2 rounded-[5px] bg-[#FFFFFF] drop-shadow-lg"
  >
    <div class="flex justify-between items-center p-5 border-b-2">
      <h1>รายการโปรด ({{ favoriteItems.length }})</h1>
      <h2
        @click="clearFavorites"
        class="text-red-500 cursor-pointer ml-[225px]"
      >
        ลบทั้งหมด
      </h2>
      <button @click="closeFavorites">
        <svg
          class="w-6 h-6 hover:text-red-500"
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
            stroke-width="2"
            d="M6 18 17.94 6M18 18 6.06 6"
          />
        </svg>
      </button>
    </div>

    <!-- Favorite Items -->
    <div class="px-5 overflow-y-auto flex-1">
      <div
        v-for="(item, index) in favoriteItems"
        :key="item.id"
        class="flex justify-between items-center border-b py-2"
      >
        <img
          :src="item.img"
          alt="product"
          class="w-[75px] h-[75px] object-cover rounded-md"
        />
        <div class="flex-1 ml-2">
          <div class="flex justify-between">
            <div>
              <p class="text-sm font-medium">{{ item.name }}</p>
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
                  class="w-[22px] h-[22px] text-red-500"
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
                  class="w-[22px] h-[22px] text-gray-400 hover:text-red-500"
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
    <div class="p-4 border-t bg-gray-100">
      <button
        @click="closeFavorites"
        class="w-full mt-2 text-gray-500 text-sm hover:underline"
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
    name: "Aspire Go โน๊ตบุ๊ค",
    detail: "Intel Core i3, RAM 8GB krmlfmrefmrfmkrmfemrmrefmrfmfrmkm",
    price: 13990,
    amount: 1,
    img: "https://via.placeholder.com/50",
    isFavorite: true, // เพิ่ม isFavorite
  },
  {
    id: 2,
    name: "White - S98 คีย์บอร์ดไร้สาย",
    detail: "Gasket Mechanical Keyboard",
    price: 2990,
    amount: 1,
    img: "https://via.placeholder.com/50",
    isFavorite: true,
  },
  {
    id: 3,
    name: "White - S98 คีย์บอร์ดไร้สาย",
    detail: "Gasket Mechanical Keyboard",
    price: 2990,
    amount: 1,
    img: "https://via.placeholder.com/50",
    isFavorite: true,
  },
  {
    id: 4,
    name: "White - S98 คีย์บอร์ดไร้สาย",
    detail: "Gasket Mechanical Keyboard",
    price: 2990,
    amount: 1,
    img: "https://via.placeholder.com/50",
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

<style scoped></style>
