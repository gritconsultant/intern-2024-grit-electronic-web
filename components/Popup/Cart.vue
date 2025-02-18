<template>
  <div
    class="w-full md:w-[500px] h-full border-2 flex flex-col gap-2 rounded-[5px] bg-[#FFFFFF] drop-shadow-lg overflow-hidden"
  >
    <div  class="flex justify-between items-center p-4 md:p-5 border-b-2" >
      <h1 class="text-sm md:text-base font-bold" >
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
    <div class="px-4 md:px-5 flex-grow overflow-y-auto" >
      <div
        v-for="(item, index) in carts"
        :key="item.id"
        class="flex justify-between items-center border-b py-2"
      >
        <input type="checkbox" v-model="item.selected" class="mr-2" />
        <img
          :src="item.Product.image"
          alt=""
          class="w-[50px] h-[50px] md:w-[75px] md:h-[75px] object-cover rounded-md"
        />
        <div class="flex-1 ml-2 md:ml-4">
          <div class="flex justify-between">
            <div>
              <router-link
                v-if="item.Product.id"
                :to="`/product/${item.Product.id}`"
                class="text-lg font-bold text-black cursor-pointer hover:text-[#FD8C35]/70"
              >
                {{ item.Product.name }}
              </router-link>
            </div>

            <div>
              <button @click="deleteCartItem(item.id)" class="text-red-500">
                <svg
                  class="w-[20px] h-[20px] md:w-[22px] md:h-[22px] hover:text-red-500"
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
                >จำนวน: {{ item.total_product_amount }}
              </span>

              <!-- icon แก้ไข -->
              <button @click="toggleEditItem(index, item.id)" class="ml-2 text-gray-500 hover:text-gray-700">
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

            <div v-if="editIndex === index" class="flex items-center gap-2 mt-2 md:mt-3">
              <button @click="decreaseSelectedAmount(index)" class="px-2 text-xs md:text-sm border rounded">-</button>
              <span> {{ item.total_product_amount }}</span>
              <button @click="increaseSelectedAmount(index)" class="px-2 text-xs md:text-sm border rounded">+</button>

              <button @click="saveEdit"
                class="px-2 text-xs md:text-sm bg-green-500 text-white rounded"
              >
                <svg
                  class="w-[22px] h-[22px] text-gray-800 dark:text-white"
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
        @click="addOrder"
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
import type {
  OrderAdd,
  CartItem,
  CartItems,
  OrderRes,
  ProductCartUpdate,
  ProductCartRes,
} from "~/models/product.model";
import service from "~/service";
import { useIndexStore } from "~/store/main";

const store = useIndexStore();
const route = useRoute();
const router = useRouter();
const loading = ref(true);
const cartlist = ref<CartItems[]>([]);
const carts = ref<CartItem[]>([]);
const editIndex = ref<number | null>(null);
const isEditing = ref(false);
const editItem = ref<number>();

const props = defineProps({
  cartitemId: {
    type: Number,
  }
})
const orders = ref<OrderAdd>({
  shipment_id: 0,
  payment_id: 0,
  status: "pending",
});

const orderRes = ref<OrderRes>({
  shipment_id: 0,
  payment_id: 0,
  status: "pending",
});

const productCartUpdate = ref<ProductCartUpdate>({
  total_product_amount: 0,
})

const productCartRes = ref<ProductCartRes>({
  id: 0,
  total_product_amount: 0,
})

const getCartItem = async () => {
  loading.value = true;
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
          image: e.image,
        };
        cartitems.push(cartitem);
      }
      carts.value = cartitems;
    })
    .catch((error: any) => {
      console.error(error);
    })
    .finally(() => {
      loading.value = false;
    });
};


const deleteCartItem = async (cartItemId: number) => {
  loading.value = true;
  const result = await Swal.fire({
    title: "คุณแน่ใจหรือไม่?",
    text: "คุณต้องการลบสินค้านี้ออกจากตะกร้า!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#EE973C",
    cancelButtonColor: "#d33",
    confirmButtonText: "ยืนยัน",
    cancelButtonText: "ยกเลิก",
  });

  if (result.isConfirmed) {
    await service.product
      .deleteCartItem(cartItemId) // ส่งค่า cart_item_id ใน body
      .then(() => {
        // กรองและลบสินค้าออกจาก cartlist และ carts
        cartlist.value = cartlist.value.filter(
          (item) => item.id !== cartItemId
        );
        carts.value = carts.value.filter((item) => item.id !== cartItemId); // ทำการอัพเดต `carts`
        Swal.fire("ลบสินค้าสำเร็จ!", "สินค้าถูกลบออกจากตะกร้าแล้ว.", "success");
      })
      .catch((error: any) => {
        console.error("ลบสินค้าไม่สำเร็จ:", error);
        Swal.fire("เกิดข้อผิดพลาด!", "ไม่สามารถลบสินค้าจากตะกร้าได้.", "error");
      })
      .finally(() => {
        loading.value = false;
      });
  }
};
// กรองสินค้าที่เลือกไว้
const selectedItems = computed(() => {
  return carts.value.filter((item: any) => item.selected);
});

const addOrder = async () => {
  loading.value = true;

    // ดึงเฉพาะสินค้าที่ถูกเลือก
    const selectedproduct = selectedItems.value.filter(item => item.selected);
    console.log(selectedItems.value);


  // สร้างข้อมูลคำสั่งซื้อใหม่ (เฉพาะสินค้าที่เลือก)
  const orderData = {
    shipment_id: orders.value.shipment_id,
    payment_id: orders.value.payment_id,
    status: "pending",
    cart_items: selectedproduct.map(item => ({
      cart_id: item.id,
      total_product_amount: item.total_product_amount,
    })),
  };
    orders.value.shipment_id = orders.value.shipment_id;
    orders.value.payment_id = orders.value.payment_id;
    console.log(orderData)
    await service.product
      .addOrder(orderData)
      .then((resp: any) => {
        const data = resp.data.data;
        if (data) {
          Swal.fire({
            title: "การสั่งซื้อสำเร็จ!",
            text: "คำสั่งซื้อของคุณถูกเพิ่มเรียบร้อย!",
            icon: "success",
          })
          .then(() => {
            // รีโหลดหน้าใหม่
            router.push({ path: '/order/checkout' }).then(() => window.location.reload());
          });
        }
        const orders: OrderRes = {
          shipment_id: data.id,
          payment_id: data.payment_id,
          status: data.status,
          
        };
        orderRes.value = orders;
      })
      .catch((error: any) => {
        console.error(error);
      })
      .finally(() => {
        loading.value = false;
      });
  };

const toggleEditItem = (index: number , id: number) => {
    editIndex.value = isEditing.value? null : index;
    editItem.value = id;
  isEditing.value =!isEditing.value;
}



const saveEdit = async () => {
  loading.value = true;

  const item = carts.value.find((item:CartItem) => item.id == editItem.value )
  const index = carts.value.findIndex((item:CartItem)=> item.id == editItem.value)
  
  console.log(index)
  if (item && index !== -1){
    productCartUpdate.value.total_product_amount = item.total_product_amount
    toggleEditItem(index , item.id)
  }



  await service.product.updateCartItem(editItem.value, productCartUpdate.value)
  .then((resp: any) => {
    console.log(resp);
    const data = resp.data.data;
    const productCartUpdate: ProductCartRes = {
      id: data.id,
      total_product_amount: data.total_product_amount,
    };
    productCartRes.value = productCartUpdate;

    if (resp.status == 200) {

Swal.fire({
  title: "เปลี่ยนแปลงจำนวนสินค้า!",
  text: "เปลี่ยแปลงจำนวนสินค้าสำเร็จ",
  icon: "success",
  confirmButtonText: "ตกลง",
})
}
  })
  .catch((error: any) => {
     console.error(error);
   })
   .finally(() => {
    loading.value = false;
   });
}


// เพิ่มจำนวน
const increaseSelectedAmount = (index: number) => {
  carts.value[index].total_product_amount++;
};

// ลดจำนวน
const decreaseSelectedAmount = (index: number) => {
  if (carts.value[index].total_product_amount > 1) {
    carts.value[index].total_product_amount--;
  }
};

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
