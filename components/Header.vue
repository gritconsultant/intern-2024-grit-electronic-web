<template>
  <div>
    <div class="h-[80px] pt-[5px] border border-b-black grid items-center">
      <div class="flex items-center justify-between">
        <NuxtLink to="/" class="pl-[30px]">
          <img class="w-[150px]" src="https://bangkokbrands.com/wp-content/uploads/2023/06/Bangkok-brand-site-logo.png" alt="Logo" />
        </NuxtLink>

        <!-- Nav and Icons -->
        <div class="flex items-center justify-between w-full">
          <!-- Nav Menu -->
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
              <DropdownProfile/>
            </div>
          </div>

        </div>
      </div>
    </div>


<!-- Cart Popup -->
<div
  v-if="store.cartAction"
  @click="store.cartAction = !store.cartAction"
  class="fixed inset-0 bg-black/50 flex justify-end z-50"
>
  <div @click.stop>
    <PopupCart />
  </div>
</div>

<!-- Fav Popup -->
<div
  v-if="store.favouriteAction"
  @click="store.favouriteAction = !store.favouriteAction"
  class="fixed inset-0 bg-black/50 flex justify-end z-50"
>
  <div @click.stop>
    <PopupFavorite />
  </div>
</div>

<!-- Noti Popup -->
<div
  v-if="store.notificationAction"
  @click="store.notificationAction = !store.notificationAction"
  class="fixed inset-0 bg-black/50 flex justify-end z-50"
>
  <div @click.stop>
    <PopupNotification />
  </div>
</div>

  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useIndexStore } from "~/store/main";

const store = useIndexStore();
const mobileMenuOpen = ref(false);

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
};
</script>

<style scoped>
</style>
