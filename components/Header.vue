<template>
  <div>
    <div class="h-[60px] pt-[5px] border-2 border-white border-b-black">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <NuxtLink to="/" class="pl-[30px]">
          <img class="w-[150px]" src="/images/logo.ico" alt="Logo" />
        </NuxtLink>

        <!-- Navigation and Icons -->
        <div class="flex items-center justify-between w-full">
          <!-- Navigation Menu -->
          <div class="flex items-center fonsubtheader mt-3">
            <div class="mx-4">
              <NuxtLink
                to="/product"
                class="hover:underline hover:text-indigo-500"
                >สินค้าทั้งหมด</NuxtLink
              >
            </div>
            <CategoryDropdown />
          </div>

          <!-- Icons -->
          <div
            class="hidden md:flex items-center gap-4 md:gap-6 mt-3 mx-3 md:mx-5"
          >
            <img
              class="icons w-6 md:w-8"
              src="https://cdn-icons-png.flaticon.com/256/152/152536.png"
              alt="Search"
            />
            <img
              class="icons w-6 md:w-8"
              src="https://cdn-icons-png.flaticon.com/256/88/88032.png"
              alt="Shopping Cart"
            />
            <img
              class="icons w-6 md:w-8"
              src="https://cdn-icons-png.flaticon.com/256/157/157990.png"
              alt="Favorites"
            />
            <img
              class="icons w-6 md:w-8"
              src="https://cdn-icons-png.flaticon.com/256/388/388652.png"
              alt="Notifications"
            />
            <img
              class="icons w-6 md:w-8"
              src="https://cdn-icons-png.flaticon.com/256/268/268441.png"
              alt="User"
            />
          </div>

          <!-- Mobile Menu -->
          <button
            class="block md:hidden text-black hover:text-gray-700 focus:outline-none"
            @click="toggleMobileMenu"
          >
            <svg
              class="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Icon Menu -->
    <IconDropdown v-if="mobileMenuOpen" />

    <!-- Cart Popup -->
     <!-- <div v-if="cartOpen" class="fixed inset-0 bg-black/50 flex justify-end z-50">
      <div class="w-[400px]">
        <PopupCart @close="toggleCart" />
      </div>
     </div> -->
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import CategoryDropdown from "~/components/Dropdown/Category.vue"; // Dropdown for categories
import IconDropdown from "~/components/Dropdown/Icon.vue"; // Dropdown for icons
// import PopupCart from "~/components/Popup/Cart.vue"; // Popup for cart

const mobileMenuOpen = ref(false);
// const cartOpen = ref(false);

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
};

// const toggleCart = () => {
//   cartOpen.value =!cartOpen.value;
// }
</script>

<style scoped>
.icons {
  transition: transform 0.2s;
}
.icons:hover {
  transform: scale(1.1);
}
</style>
