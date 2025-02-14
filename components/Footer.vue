<template>
  <div
    class="p-6 flex flex-col lg:flex-row gap-9 text-black border-t-2 border-gray-400"
  >
    <!-- Logo and Address -->
    <div class="ml-0 lg:ml-7 flex flex-col items-center lg:items-start">
      <img
        src="https://bangkokbrands.com/wp-content/uploads/2023/06/Bangkok-brand-site-logo.png"
        class="w-[180px]"
      />

      <p class="mt-5 text-center lg:text-left text-sm w-[270px]">
        173 ศาลาว่าการกรุงเทพมหานคร(เสาชิงช้า) ถนนดินสอ แขวงเสาชิงช้า เขตพระนคร
        กรุงเทพมหานคร 10200
      </p>
    </div>


    <div
      class="grid grid-cols-1 md:grid-cols-3 w-full detail mt-5 lg:mt-2 lg:ml-10 px-0 lg:px-32"
    >
      <!-- Categories -->
      <div class="mb-6 md:mb-0">
        <div class="font-bold text-base mb-4">หมวดหมู่</div>
        <div
        >
        <div v-for="cate in categories.slice(0,5)" :key="cate.id">
              <NuxtLink
                :to="`/category/${cate.id}`"
                class="block px-4 py-2 hover:bg-gray-100"
              >
                {{ cate.name }}
              </NuxtLink>
            </div>
        </div>
      </div>

      <!-- Help -->
      <div class="mb-6 md:mb-0">
        <div class="font-bold text-base mb-4">ช่วยเหลือ</div>
        <div
          v-for="(data, i) in page.slice(5, 8)"
          :key="i"
          class="hover:text-[#FCCA81] text-sm mt-1"
        >
          <NuxtLink :to="data.path">
            {{ data.name }}
          </NuxtLink>
        </div>
      </div>

      <!-- Contact -->
      <div>
        <div class="font-bold text-base mb-4">ช่องทางการติดต่อ</div>
        <div class="text-sm">
          <p>อีเมล : bangkokbrand@gmail.com</p>
          <p class="mt-1">โทรศัพท์ : 02-224-3038</p>
          <div class="flex justify-start mt-2 gap-3 items-center ">
            <p>
              <a href="https://www.facebook.com/profile.php?id=100064262010712">
                <svg
                  class="w-[20px] h-[20px] text-gray-800 hover:text-[#FCCA81]"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill-rule="evenodd"
                    d="M13.135 6H15V3h-1.865a4.147 4.147 0 0 0-4.142 4.142V9H7v3h2v9.938h3V12h2.021l.592-3H12V6.591A.6.6 0 0 1 12.592 6h.543Z"
                    clip-rule="evenodd"
                  />
                </svg>
              </a>
            </p>
            <p>
              <a
                href="https://www.instagram.com/bangkokbrand2023?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==.com"
              >
                <svg
                  class="w-[21px] h-[21px] text-gray-800 hover:text-[#FCCA81]"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    fill-rule="evenodd"
                    d="M3 8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8Zm5-3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8Zm7.597 2.214a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2h-.01a1 1 0 0 1-1-1ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-5 3a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z"
                    clip-rule="evenodd"
                  />
                </svg>
              </a>
            </p>
            <p>
              <a href="https://www.youtube.com/@bangkokbrandtv/featured.com">
                <svg
                  class="w-[21px] h-[22px] text-gray-800 hover:text-[#FCCA81]"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill-rule="evenodd"
                    d="M21.7 8.037a4.26 4.26 0 0 0-.789-1.964 2.84 2.84 0 0 0-1.984-.839c-2.767-.2-6.926-.2-6.926-.2s-4.157 0-6.928.2a2.836 2.836 0 0 0-1.983.839 4.225 4.225 0 0 0-.79 1.965 30.146 30.146 0 0 0-.2 3.206v1.5a30.12 30.12 0 0 0 .2 3.206c.094.712.364 1.39.784 1.972.604.536 1.38.837 2.187.848 1.583.151 6.731.2 6.731.2s4.161 0 6.928-.2a2.844 2.844 0 0 0 1.985-.84 4.27 4.27 0 0 0 .787-1.965 30.12 30.12 0 0 0 .2-3.206v-1.516a30.672 30.672 0 0 0-.202-3.206Zm-11.692 6.554v-5.62l5.4 2.819-5.4 2.801Z"
                    clip-rule="evenodd"
                  />
                </svg>
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Page } from "~/models/page.model";
import type { Category } from "~/models/product.model";
import service from "~/service";

const categories = ref<Category[]>([]);

const getCategoryList = async () => {
  await service.product
    .getCategoryList()
    .then((resp: any) => {
      const data = resp.data.data;
      categories.value = data.map((e: any) => ({
        id: e.id,    
        name: e.name, 
        image: e.image,   
      }));
    })
    .catch((error: any) => {
      console.error("เกิดข้อผิดพลาดในการดึงหมวดหมู่สินค้า:", error);
    });
};

onMounted(() => {
  getCategoryList();
});

const page = ref<Page[]>([
  {
    name: "อาหาร",
    path: "/category/food",
    active: false,
  },
  {
    name: "เครื่องดื่ม",
    path: "/category/drink",
    active: false,
  },
  {
    name: "สมุนไพร",
    path: "/category/herbs",
    active: false,
  },
  {
    name: "ผ้าและเครื่องแต่งกาย",
    path: "/category/cloth",
    active: false,
  },
  {
    name: "ของใช้ ของตกแต่ง",
    path: "/category/items",
    active: false,
  },
  // {
  //   name: "คืนสินค้า",
  //   path: "/order/refundOrder",
  //   active: false,
  // },
  {
    name: "จัดการบัญชี",
    path: "/profile",
    active: false,
  },
]);
</script>

<style scoped></style>
