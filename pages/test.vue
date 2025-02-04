<template>
  <div
    class="w-full md:w-[500px] h-full border-2 flex flex-col gap-2 rounded-[5px] bg-[#FFFFFF] drop-shadow-lg overflow-hidden"
  >
    <div class="flex justify-between items-center p-4 md:p-5 border-b-2">
      <h1 class="text-sm md:text-base font-bold">
        ตะกร้าสินค้า ({{ cartItems.length }})
      </h1>
      <h2
        @click="clearCart"
        class="text-red-500 cursor-pointer text-xs md:text-sm ml-56"
      >
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
        v-for="(item, index) in cartItems"
        :key="item.id"
        class="flex justify-between items-center border-b py-2"
      >
        <input type="checkbox" class="mr-2" v-model="item.selected" />

        <img
          :src="item.img"
          alt="product"
          class="w-[50px] h-[50px] md:w-[75px] md:h-[75px] object-cover rounded-md"
        />
        <div class="flex-1 ml-2 md:ml-4">
          <div class="flex justify-between">
            <div>
              <router-link
                :to="`/product/${item.id}`"
                class="text-sm md:text-md font-normal text-blue-500 hover:underline"
              >
                {{ item.name }}
              </router-link>
              <div class="font-normal text-xs text-black/50">
                <p class="texthide">{{ item.detail }}</p>
              </div>
            </div>
            <div>
              <button @click="removeItem(index)" class="text-red-500">
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
              <span class="text-sm md:text-base"
                >จำนวน: {{ item.selectedAmount }}</span
              >
              <!-- ไอคอนแก้ไข -->
              <button
                @click="toggleEditItem(index)"
                class="ml-2 text-gray-500 hover:text-gray-700"
              >
                <svg
                  class="w-[22px] h-[22px] text-gray-400 hover:text-gray-700 dark:text-white"
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
                    d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
                  />
                </svg>
              </button>
            </div>

            <div
              v-if="editIndex === index"
              class="flex items-center gap-2 mt-2 md:mt-3"
            >
              <button
                @click="decreaseSelectedAmount(index)"
                class="px-2 text-xs md:text-sm border rounded"
              >
                -
              </button>
              <span class="text-sm md:text-base">{{
                item.selectedAmount
              }}</span>
              <button
                @click="increaseSelectedAmount(index)"
                class="px-2 text-xs md:text-sm border rounded"
              >
                +
              </button>
              <button
                @click="saveEdit"
                class="px-2 text-xs md:text-sm bg-green-500 text-white rounded"
              >
                <svg
                  class="w-[22px] h-[22px] dark:text-white"
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
                    d="M5 11.917 9.724 16.5 19 7.5"
                  />
                </svg>
              </button>
            </div>

            <div class="mt-2 md:mt-3">
              <p class="font-semibold text-sm md:text-lg">฿{{ item.price }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="p-4 border-t mt-4 bg-gray-100">
      <div class="flex justify-between font-medium">
        <span class="text-sm md:text-base">ราคารวม:</span>
        <span class="text-sm md:text-base">฿{{ selectedTotalPrice }}</span>
      </div>
      <div class="flex flex-col items-center mt-5 md:mt-10">
        <button
          @click="checkout"
          class="popupbtn w-full mb-2 text-sm md:text-base py-2"
          :disabled="editIndex !== null"
        >
          ชำระเงิน ({{ selectedCount }} รายการ)
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
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useIndexStore } from "~/store/main";

const store = useIndexStore();
const router = useRouter();

const cartItems = ref([
  {
    id: 1,
    name: "มะขาม 4 รส",
    detail: "มะขาม 4 รส มะขามคลุก (บ้านมะขาม) โดยบริษัทสวนผึ้ง จำกัด",
    price: 62,
    amount: 10,
    img: "https://th-test-11.slatic.net/p/2b0d5f80a00b77d2c6490b09a053a1c0.png",
    categoryId: 1,
    selected: false,
    selectedAmount: 1,
  },
  {
    id: 2,
    name: "มะขามคลุกบ๊วย 4 รส",
    detail: "มะขามแกะเปลือก ปรุงรสด้วย นำ้ตาล พริก เกลือ และผงบ๊วย",
    price: 62,
    amount: 13,
    img: "https://halal.co.th/storages/products/343928.png",
    categoryId: 1,
    selected: false,
    selectedAmount: 1,
  },
  {
    id: 3,
    name: "เลมอนอบแห้ง รสน้ำผึ้ง",
    detail: "เลมอนอบแห้ง ผสมด้วย ผงน้ำผึ้ง",
    price: 59,
    amount: 10,
    img: "https://halal.co.th/storages/products/390694.jpg",
    categoryId: 1,
    selected: false,
    selectedAmount: 1,
  },
  {
    id: 4,
    name: "เผือกกรอบไส้เสาวรส",
    detail: "บริษัท สวนผึ้งหวาน จำกัด เผือกกรอบไส้เสาวรส",
    price: 58,
    amount: 20,
    img: "https://halal.co.th/storages/products/680694.jpg",
    categoryId: 1,
    selected: false,
    selectedAmount: 1,
  },

  {
    id: 5,
    name: "เครื่องดื่มรังนกสำเร็จรูป",
    detail: "ดอกบัวคู่ เครื่องดื่มรังนกสำเร็จรูป สูตรดั้งเดิม",
    price: 150,
    amount: 5,
    img: "https://halal.co.th/storages/products/679578.jpg",
    categoryId: 2,
    selected: false,
    selectedAmount: 1,
  },
  {
    id: 6,
    name: "เครื่องดื่มใบอ่อนข้าวสาลีชนิดผง",
    detail: "กิฟฟารีน วีทกราส (เครื่องดื่มใบอ่อนข้าวสาลีชนิดผง) (ตรากิฟฟารีน)",
    price: 150,
    amount: 3,
    img: "https://halal.co.th/storages/products/p135225.jpg",
    categoryId: 2,
    selected: false,
    selectedAmount: 1,
  },
  {
    id: 7,
    name: "เครื่องดื่มน้ำองุ่นขาว",
    detail:
      "กลูต้า เคอร์คิวมา มินต์ ซี เครื่องดื่มน้ำองุ่นขาว ผสมกลูต้าไธโอนและขมิ้น",
    price: 40,
    amount: 3,
    img: "https://farmfoodsmart.com/upload/products/1634/637982414838759739.png",
    categoryId: 2,
    selected: false,
    selectedAmount: 1,
  },
  {
    id: 8,
    name: "เครื่องดื่มสมุนไพรตรีผลา",
    detail: "ชีววิถี เครื่องดื่มสมุนไพรตรีผลา สูตรเข้มข้น รสธรรมชาติ",
    price: 155,
    amount: 3,
    img: "https://obs-ect.line-scdn.net/r/ect/ect/image_1695790690327236876b5788947t124fdd52",
    categoryId: 2,
    selected: false,
    selectedAmount: 1,
  },
]);

const editIndex = ref<number | null>(null);

const toggleEditItem = (index: number) => {
  editIndex.value = editIndex.value === index ? null : index;
};

const saveEdit = () => {
  editIndex.value = null;
};

const isEditing = ref(false);

const selectedTotalPrice = computed(() =>
  cartItems.value.reduce(
    (sum, item) =>
      item.selected ? sum + item.price * item.selectedAmount : sum,
    0
  )
);

const selectedCount = computed(
  () => cartItems.value.filter((item) => item.selected).length
);

// เพิ่มจำนวนสินค้าที่เลือก
const increaseSelectedAmount = (index: number) => {
  const item = cartItems.value[index];
  if (item.selectedAmount < item.amount) {
    item.selectedAmount++;
  }
};

// ลดจำนวนสินค้าที่เลือก
const decreaseSelectedAmount = (index: number) => {
  const item = cartItems.value[index];
  if (item.selectedAmount > 1) {
    item.selectedAmount--;
  }
};

// ลบสินค้าออกจากตะกร้า
const removeItem = (index: number) => {
  cartItems.value.splice(index, 1);
};

// ลบตะกร้าสินค้า
const clearCart = () => {
  cartItems.value = [];
};

// ชำระเงินเฉพาะสินค้าที่เลือก
const checkout = () => {
  if (isEditing.value) return alert("กรุณาบันทึกก่อนชำระเงิน");
  const selectedItems = cartItems.value.filter((item) => item.selected);
  console.log("ชำระเงินสำหรับสินค้า:", selectedItems);
  store.cartAction = false;
  router.push("/order/checkout");
};
</script>

<style scoped></style>