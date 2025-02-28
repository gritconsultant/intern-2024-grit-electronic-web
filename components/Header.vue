<template>
  <div>
    <div class="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
      <div class="h-[90px] pt-[5px] border border-b-gray/20 grid items-center">
        <div class="flex items-center justify-between max-lg:hidden">
          <NuxtLink to="/" class="pl-[30px]">
            <img
              class="w-[200px]"
              src="https://bangkokbrands.com/wp-content/uploads/2023/06/Bangkok-brand-site-logo.png"
              alt="Logo"
            />
          </NuxtLink>

          <!-- Nav and Icons -->
          <div class="flex items-center justify-between w-full">
            <!-- Nav Menu -->
            <div class="flex items-center text-lg">
              <div class="mx-5">
                <NuxtLink
                  to="/product"
                  class="hover:underline hover:text-[#EE973C]"
                  :class="{
                    'text-[#EE973C] underline': isActive(['/product']),
                  }"
                  >สินค้าทั้งหมด</NuxtLink
                >
              </div>

              <!-- Dropdown  -->
              <div
                class="mx-5"
                :class="{
                  'text-[#EE973C] underline': isActive(['/category/[id]']),
                }"
              >
                <DropdownCategory />
              </div>

              <div class="mx-5">
                <NuxtLink
                  to="/info"
                  class="hover:underline hover:text-[#EE973C]"
                  :class="{
                    'text-[#EE973C] underline': isActive(['/info']),
                  }"
                  >เกี่ยวกับโครงการ</NuxtLink
                >
              </div>

              <div class="mx-5">
                <NuxtLink
                  to="/info/contact"
                  class="hover:underline hover:text-[#EE973C]"
                  :class="{
                    'text-[#EE973C] underline': isActive(['/info/contact']),
                  }"
                  >ติดต่อเรา</NuxtLink
                >
              </div>
            </div>

            <!-- Icons (Visible in Desktop) -->
            <div class="md:flex items-center gap-4 md:gap-6 mx-3 md:mx-5">
              <!-- cart -->
              <svg
                class="w-[32px] h-[32px] text-gray-800 cursor-pointer"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
                @click="store.cartAction = !store.cartAction"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.3"
                  d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"
                />
              </svg>

              <!-- fav -->
              <svg
                class="w-[32px] h-[32px] text-gray-800 cursor-pointer"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
                @click="store.favouriteAction = !store.favouriteAction"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.3"
                  d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                />
              </svg>

              <!-- Noti -->
              <!-- <svg
              class="w-[30px] h-[30px] text-gray-800  cursor-pointer"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
              @click="store.notificationAction = !store.notificationAction"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.3"
                d="M12 5.365V3m0 2.365a5.338 5.338 0 0 1 5.133 5.368v1.8c0 2.386 1.867 2.982 1.867 4.175 0 .593 0 1.292-.538 1.292H5.538C5 18 5 17.301 5 16.708c0-1.193 1.867-1.789 1.867-4.175v-1.8A5.338 5.338 0 0 1 12 5.365ZM8.733 18c.094.852.306 1.54.944 2.112a3.48 3.48 0 0 0 4.646 0c.638-.572 1.236-1.26 1.33-2.112h-6.92Z"
              />
            </svg> -->

              <div>
                <DropdownProfile />
              </div>
            </div>
          </div>
        </div>

        <div class="lg:hidden min-lg:hidden flex justify-between">
          <div>
            <div class="pl-9">
              <img
                src="https://puu.sh/KoD5F.png"
                alt=""
                class="h-[60px] max-md:h-[50px] w-[60px] max-md:w-[50px]  cursor-pointer"
                @click="popsidebar = true"
              />
            </div>
          </div>

        <div class="w-[50%]  flex justify-end">
          <!-- Icons (Visible in Desktop) -->
          <div class="flex items-center justify-end gap-4 md:gap-6 mx-3 md:mx-5 w-[50%] ">
            <!-- cart -->
            <svg
              class="w-[32px] h-[32px] text-gray-800 cursor-pointer"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
              @click="store.cartAction = !store.cartAction"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.3"
                d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"
              />
            </svg>

            <!-- fav -->
            <svg
              class="w-[32px] h-[32px] text-gray-800 cursor-pointer"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
              @click="store.favouriteAction = !store.favouriteAction"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.3"
                d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
              />
            </svg>

            <!-- Noti -->
            <!-- <svg
              class="w-[30px] h-[30px] text-gray-800  cursor-pointer"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
              @click="store.notificationAction = !store.notificationAction"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.3"
                d="M12 5.365V3m0 2.365a5.338 5.338 0 0 1 5.133 5.368v1.8c0 2.386 1.867 2.982 1.867 4.175 0 .593 0 1.292-.538 1.292H5.538C5 18 5 17.301 5 16.708c0-1.193 1.867-1.789 1.867-4.175v-1.8A5.338 5.338 0 0 1 12 5.365ZM8.733 18c.094.852.306 1.54.944 2.112a3.48 3.48 0 0 0 4.646 0c.638-.572 1.236-1.26 1.33-2.112h-6.92Z"
              />
            </svg> -->

            <div>
              <DropdownProfile />
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
    </div>
 
    <div
      class="fixed z-10 h-screen w-[190px] mt-[85px] lg:hidden min-lg:hidden"
      v-if="popsidebar"
    >
      <i
        class="fa-solid fa-angles-left text-[30px] absolute z-10 top-5 right-0 cursor-pointer bg-orange-300 border rounded-full p-[4px]"
        @click="popsidebar = false"
      ></i>
      <div class="bg-white drop-shadow-lg h-full w-[170px]">
        <!-- Nav Menu -->
        <div class="flex flex-col justify-start gap-4 p-4 items-center text-lg">
          <div class="flex justify-start w-full">
            <NuxtLink to="/" class="hover:underline hover:text-[#EE973C]"
            :class="{
                'text-[#EE973C] underline': isActive(['/']),
              }"
              >หน้าหลัก</NuxtLink
            >
          </div>

          <div class="flex justify-start w-full">
            <NuxtLink
              to="/product"
              class="hover:underline hover:text-[#EE973C]"
              :class="{
                'text-[#EE973C] underline': isActive(['/product']),
              }"
              >สินค้าทั้งหมด</NuxtLink
            >
          </div>

          <!-- Dropdown  -->
          <div
            class="flex justify-start w-full"
            :class="{
              'text-[#EE973C] underline': isActive(['/category/[id]']),
            }"
          >
            <DropdownCategory />
          </div>

          <div class="flex justify-start w-full">
            <NuxtLink
              to="/info"
              class="hover:underline hover:text-[#EE973C]"
              :class="{
                'text-[#EE973C] underline': isActive(['/info']),
              }"
              >เกี่ยวกับโครงการ</NuxtLink
            >
          </div>

          <div class="flex justify-start w-full">
            <NuxtLink
              to="/info/contact"
              class="hover:underline hover:text-[#EE973C]"
              :class="{
                'text-[#EE973C] underline': isActive(['/info/contact']),
              }"
              >ติดต่อเรา</NuxtLink
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useIndexStore } from "~/store/main";

const popsidebar = ref(false);

const store = useIndexStore();
const route = useRoute();
const isActive = (paths: string[]) => {
  return paths.includes(route.path);
};
</script>

<style scoped></style>
