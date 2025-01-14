<template>
  <div>
    <div class="h-[80px] pt-[5px] border border-b-black grid items-center">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <NuxtLink to="/" class="pl-[30px]">
          <img class="w-[150px]" src="https://bangkokbrands.com/wp-content/uploads/2023/06/Bangkok-brand-site-logo.png" alt="Logo" />
        </NuxtLink>

        <!-- Navigation and Icons -->
        <div class="flex items-center justify-between w-full">
          <!-- Navigation Menu -->
          <div class="flex items-center fonsubtheader">
            <div class="mx-4">
              <NuxtLink
                to="/product"
                class="hover:underline hover:text-[#EE973C]"
                >สินค้าทั้งหมด</NuxtLink
              >
            </div>

            <!-- Dropdown  -->
            <DropdownCategory />
          </div>

          <!-- Icons (Visible in Desktop) -->
          <div
            class="hidden md:flex items-center gap-4 md:gap-6 mx-3 md:mx-5 "
          >
            <img
              class="icons w-6 md:w-8"
              src="https://cdn-icons-png.flaticon.com/256/88/88032.png"
              alt="Shopping Cart"
              @click="store.cartAction = !store.cartAction"
            />
            <img
              class="icons w-6 md:w-8"
              src="https://cdn-icons-png.flaticon.com/256/157/157990.png"
              alt="Favorites"
              @click="store.favouriteAction = !store.favouriteAction"
            />
            <img
              class="icons w-6 md:w-8"
              src="https://cdn-icons-png.flaticon.com/256/388/388652.png"
              alt="Notifications"
              @click="store.notificationAction = !store.notificationAction"
            />
            <div>
              <ProfileDropdown/>
            </div>
          </div>

          <!-- Mobile Menu Button -->
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

    <!-- Mobile Icon Menu (Visible only in Mobile) -->
    <IconDropdown v-show="mobileMenuOpen" class="md:hidden" />


    <!-- Cart Popup -->
    <div
      v-if="store.cartAction"
      class="fixed inset-0 bg-black/50 flex justify-end z-50 "
    >
      <div>
        <PopupCart />
      </div>
    </div>

    <!-- Fav Popup -->
    <div
      v-if="store.favouriteAction"
      class="fixed inset-0 bg-black/50 flex justify-end z-50"
    >
      <div>
        <PopupFavorite />
      </div>
    </div>

        <!-- Noti Popup -->
        <div
      v-if="store.notificationAction"
      class="fixed inset-0 bg-black/50 flex justify-end z-50"
    >
      <div>
        <PopupNotification />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useIndexStore } from "~/store/main";
 // Dropdown for categories
import ProfileDropdown from "~/components/Dropdown/Profile.vue"; // Dropdown for profile
import IconDropdown from "~/components/Dropdown/Icon.vue"; // Dropdown for icons

const store = useIndexStore();
const mobileMenuOpen = ref(false);

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
};
</script>

<style scoped>
.icons {
  transition: transform 0.2s;
}
.icons:hover {
  transform: scale(1.1);
}
</style>
