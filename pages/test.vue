<template>
    <div>
      <!-- Navbar -->
      <div class="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
        <div class="h-[70px] md:h-[80px] lg:h-[90px] border-b border-gray-200 flex items-center justify-between px-4 md:px-8">
          <!-- Logo -->
          <NuxtLink to="/">
            <img
              class="w-[160px] md:w-[180px] lg:w-[200px]"
              src="https://bangkokbrands.com/wp-content/uploads/2023/06/Bangkok-brand-site-logo.png"
              alt="Logo"
            />
          </NuxtLink>
  
          <!-- Mobile Menu Button (Hidden in Desktop) -->
          <button @click="toggleMobileMenu" class="md:hidden text-gray-800">
            <i class="fas fa-bars text-2xl"></i>
          </button>
  
          <!-- Nav Menu (Desktop & Tablet) -->
          <div class="hidden md:flex items-center justify-between w-full">
            <div class="flex items-center text-base lg:text-lg">
              <NuxtLink to="/product" class="nav-link mx-2 lg:mx-5" :class="{ active: isActive(['/product']) }">
                สินค้าทั้งหมด
              </NuxtLink>
              <DropdownCategory class="mx-2 lg:mx-5" />
              <NuxtLink to="/info" class="nav-link mx-2 lg:mx-5" :class="{ active: isActive(['/info']) }">
                เกี่ยวกับโครงการ
              </NuxtLink>
              <NuxtLink to="/info/contact" class="nav-link mx-2 lg:mx-5" :class="{ active: isActive(['/info/contact']) }">
                ติดต่อเรา
              </NuxtLink>
            </div>
  
            <!-- Icons (Visible in Desktop & Tablet) -->
            <div class="hidden md:flex items-center gap-3 lg:gap-6 bg-pink-600">
              <i class="fas fa-shopping-cart text-xl lg:text-2xl cursor-pointer" @click="store.cartAction = !store.cartAction"></i>
              <i class="fas fa-heart text-xl lg:text-2xl cursor-pointer" @click="store.favouriteAction = !store.favouriteAction"></i>
              <DropdownProfile />
            </div>
          </div>
        </div>
      </div>
  
      <!-- Mobile Menu -->
      <div v-if="mobileMenuOpen" class="fixed inset-0 bg-black/60 z-50 flex flex-col">
        <div class="bg-white w-64 h-full p-6 shadow-lg">
          <button @click="toggleMobileMenu" class="absolute top-4 right-4 text-gray-800">
            <i class="fas fa-times text-2xl"></i>
          </button>
  
          <nav class="mt-8 space-y-4 text-lg">
            <NuxtLink to="/product" class="nav-link block" :class="{ active: isActive(['/product']) }">
              สินค้าทั้งหมด
            </NuxtLink>
            <DropdownCategory />
            <NuxtLink to="/info" class="nav-link block" :class="{ active: isActive(['/info']) }">
              เกี่ยวกับโครงการ
            </NuxtLink>
            <NuxtLink to="/info/contact" class="nav-link block" :class="{ active: isActive(['/info/contact']) }">
              ติดต่อเรา
            </NuxtLink>
          </nav>
  
          <div class="mt-6 flex space-x-6">
            <i class="fas fa-shopping-cart text-2xl cursor-pointer" @click="store.cartAction = !store.cartAction"></i>
            <i class="fas fa-heart text-2xl cursor-pointer" @click="store.favouriteAction = !store.favouriteAction"></i>
            <DropdownProfile />
          </div>
        </div>
      </div>
  
      <!-- Cart Popup -->
      <div v-if="store.cartAction" @click="store.cartAction = !store.cartAction" class="fixed inset-0 bg-black/50 flex justify-end z-50">
        <div @click.stop>
          <PopupCart />
        </div>
      </div>
  
      <!-- Fav Popup -->
      <div v-if="store.favouriteAction" @click="store.favouriteAction = !store.favouriteAction" class="fixed inset-0 bg-black/50 flex justify-end z-50">
        <div @click.stop>
          <PopupFavorite />
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useIndexStore } from "~/store/main";
  
  const store = useIndexStore();
  const route = useRoute();
  const mobileMenuOpen = ref(false);
  const isActive = (paths: string[]) => {
    return paths.includes(route.path);
  };
  
  const toggleMobileMenu = () => {
      mobileMenuOpen.value = !mobileMenuOpen.value;
    };
  </script>
  
  <style scoped>
    .nav-link {
      @apply hover:underline hover:text-[#EE973C];
    }
    .active {
      @apply text-[#EE973C] underline;
    }
    
    /* Mobile Menu Animation */
    .mobile-menu-enter-active, .mobile-menu-leave-active {
      transition: transform 0.3s ease-out, opacity 0.3s ease-out;
    }
    .mobile-menu-enter, .mobile-menu-leave-to {
      transform: translateX(-100%);
      opacity: 0;
    }
    </style>
  