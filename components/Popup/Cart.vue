<template>
  <div
    class="w-full md:w-[500px] h-full border-2 flex flex-col gap-2 rounded-[5px] bg-[#FFFFFF] drop-shadow-lg overflow-hidden"
  >
    <div class="flex justify-between items-center p-4 md:p-5 border-b-2">
      <h1 class="text-sm md:text-base font-bold">
        ตะกร้าสินค้า ({{ carts.length }})
      </h1>
      <h2 class="text-red-500 cursor-pointer text-xs md:text-sm ml-56">
        ลบทั้งหมด
      </h2>
      <button @click="store.cartAction = !store.cartAction">
        <svg
          class="w-5 h-5 md:w-6 md:h-6 hover:text-red-500"
          xmlns="http://www.w3.org/2000/svg"
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

    <!-- Cart Items -->
    <div class="px-4 md:px-5 flex-grow overflow-y-auto">
      <div
        v-for="item in carts"
        :key="item.id"
        class="flex justify-between items-center border-b py-2"
      >
        <input type="checkbox" v-model="item.selected" class="mr-2" />
        <img
          src=""
          alt=""
          class="w-[50px] h-[50px] md:w-[75px] md:h-[75px] object-cover rounded-md"
        />
        <div class="flex-1 ml-2 md:ml-4">
          <div class="flex justify-between">
            <div>
              <router-link
                v-if="item.Product.id"
                :to="`/product/${item.Product.id}`"
                class="text-sm md:text-md font-normal text-blue-500 hover:underline"
              >
                {{ item.Product.name }}
              </router-link>
            </div>
          <div>
            <button @click="deleteCartItem(item.id)" class="text-red-500">
              <svg
                class="w-[15px] h-[15px] md:w-[17px] md:h-[17px] hover:text-red-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                />
              </svg>
            </button>
          </div>
          </div>

          <div class="flex justify-between items-center">
            <div class="flex items-center gap-2 mt-2 md:mt-3">
              <span class="text-sm md:text-base">จำนวน: {{ item.total_product_amount }} </span>
            </div>
            <div class="mt-2 md:mt-3">
              <p class="font-semibold text-sm md:text-lg">
                ฿{{ item.Product?.price || 0 }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="p-4 border-t mt-4 bg-gray-100">
      <div class="flex justify-between font-medium">
        <span class="text-sm md:text-base">ราคารวม:</span>
        <span class="text-sm md:text-base">฿{{ totalSelectedPrice }}</span>
      </div>
      <div class="flex flex-col items-center mt-5 md:mt-10">
        <button
          class="popupbtn w-full mb-2 text-sm md:text-base py-2"
          :disabled="selectedItems.length === 0"
        >
          ชำระเงิน ({{ selectedItems.length }} รายการ)
        </button>
        <button
          @click="store.cartAction = !store.cartAction"
          class="w-full text-gray-500 text-xs md:text-sm hover:underline mt-2 md:mt-5"
        >
          เลือกซื้อสินค้าต่อ →
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Swal from "sweetalert2";
import { ref, computed, onMounted } from "vue";
import type { CartItem, CartItems } from "~/models/product.model";
import service from "~/service";
import { useIndexStore } from "~/store/main";

const store = useIndexStore();
const cartlist = ref<CartItems[]>([]);
const carts = ref<CartItem[]>([]);



const getCartItem = async () => {
  await service.product
    .getCart()
    .then((resp: any) => {
      const data = resp.data.data.CartItems;
      const cartitems: CartItem[] = [];
      console.log(data);

      for (let i = 0; i < data.length; i++) {
        const e = data[i];
        const cartitem: CartItem = {
          id: e.id,
          Product: e.product,
          total_product_amount: e.total_product_amount,
          selected: false,
        };
        cartitems.push(cartitem);
      }
      carts.value = cartitems;
    })
    .catch((error: any) => {
      console.error(error);
    })
    .finally(() => {
    });
};

const deleteCartItem = async (cartItemId: number) => {
  const result = await Swal.fire({
    title: "คุณแน่ใจหรือไม่?",
    text: "คุณต้องการลบสินค้านี้ออกจากตะกร้า!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#EE973C",
    cancelButtonColor: "#d33",
    confirmButtonText: "ยืนยัน",
    cancelButtonText: "ยกเลิก"
  });

  if (result.isConfirmed) {
    await service.product.deleteCartItem(cartItemId) // ส่งค่า cart_item_id ใน body
      .then(() => {
        // กรองและลบสินค้าออกจาก cartlist และ carts
        cartlist.value = cartlist.value.filter(item => item.id !== cartItemId);
        carts.value = carts.value.filter(item => item.id !== cartItemId); // ทำการอัพเดต `carts`
        Swal.fire(
          "ลบสินค้าสำเร็จ!",
          "สินค้าถูกลบออกจากตะกร้าแล้ว.",
          "success"
        );
      })
      .catch((error: any) => {
        console.error("ลบสินค้าไม่สำเร็จ:", error);
        Swal.fire(
          "เกิดข้อผิดพลาด!",
          "ไม่สามารถลบสินค้าจากตะกร้าได้.",
          "error"
        );
      });
  }
};

// กรองสินค้าที่เลือกไว้
const selectedItems = computed(() => {
  return carts.value.filter((item: any) => item.selected);
});

// คำนวณราคารวมของสินค้าที่เลือก
const totalSelectedPrice = computed(() => {
  return selectedItems.value.reduce(
    (sum, item) => sum + (item.Product?.price || 0) * item.total_product_amount,
    0
  );
});

onMounted(() => {
  getCartItem();
});
</script>

<style scoped></style>
