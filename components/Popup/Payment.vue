<template>
  <div
    class="absolute inset-0 flex items-center justify-center bg-black/50 z-50"
  >
    <div
      class="w-full md:w-[500px] h-auto border-2 flex flex-col rounded-[5px] bg-[#FFFFFF] drop-shadow-lg overflow-hidden"
    >
      <div class="flex justify-between items-center p-4 md:p-5 border-b-2">
        <h1 class="text-sm md:text-base font-bold">สรุปราคาสินค้า</h1>
        <button @click="store.paymentAction = !store.paymentAction">
          <svg
            class="w-6 h-6 hover:text-red-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <!-- เลือกบัญชีธนาคาร -->
      <div
        v-for="i in system"
        :key="i.id"
        class="flex flex-col items-center justify-center py-6 px-4 md:px-8"
      >
        <div class="w-[80%] max-w-[300px] mb-6">
          <img
            :src="i.image"
            alt="QR Code"
            class="w-full h-auto object-cover rounded-lg"
          />
        </div>

        <div class="text-center mb-6">
          <h2 class="text-lg font-semibold">{{ i.bank_name }}</h2>
          <p class="text-sm mt-3">
            เลขบัญชี: <span class="font-semibold">{{ i.account_number }}</span>
          </p>
          <p class="text-sm">
            ชื่อบัญชี: <span class="font-semibold">{{ i.account_name }}</span>
          </p>
        </div>
      </div>

      <!-- วันที่และเวลาที่โอน -->
      <div class="px-4 mt-5">
        <label
          for="transfer-datetime"
          class="block text-sm font-medium text-gray-700"
          >วันที่และเวลาที่โอน</label
        >
        <input
          id="transfer-datetime"
          type="datetime-local"
          v-model="paymentCreate.date"
          class="w-full border rounded-md p-2 text-sm"
          required
        />
      </div>

      <div class="flex justify-center mt-4 px-4 pb-6">
        <button
          type="button"
          class="popupbtn w-full md:w-auto py-2 px-4 bg-[#EE973C] hover:bg-[#FD8C35]/70 text-white rounded-md"
          @click="updatePayment"
        >
          ยืนยันคำสั่งซื้อ
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: "auth" });

import Swal from "sweetalert2";
import { useRouter, useRoute } from "vue-router";
import type {
  OrderById,
  OrderUpdate,
  OrderUpdateRes,
  PaymentCreate,
  PaymentRes,
  SystemBank,
} from "~/models/product.model";
import service from "~/service";
import { useIndexStore } from "~/store/main";

const router = useRouter();
const route = useRoute();
const store = useIndexStore();
const system = ref<SystemBank[]>([]);
const order = ref<OrderById | null>(null);
const loading = ref(true);

const props = defineProps({
  orderId: {
    type: Number,
  },
  paymentId: {
    type: Number,
  },
  shipmentId: {
    type: Number,
  },
});

// เก็บค่าการชำระเงิน
const paymentCreate = ref<PaymentCreate>({
  system_bank_id: 0,
  date: "",
  order_id: 0,
});

const paymentRes = ref<PaymentRes>({
  system_bank_id: 0,
  date: "",
  order_id: 0,
});


// ดึงบัญชีธนาคาร
const getSystemBank = async () => {
  try {
    const resp = await service.product.getSystemBank();
    system.value = resp.data.data.map((e: any) => ({
      id: e.id,
      bank_name: e.bank_name,
      account_name: e.account_name,
      account_number: e.account_number,
      image: e.image,
      is_active: e.is_active,
    }));
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการดึงข้อมูลธนาคาร", error);
  }
};

// ดึงข้อมูลคำสั่งซื้อ
const getOrder = async (orderId: number) => {
  loading.value = true;
  try {
    const resp = await service.product.getOrderById(orderId);
    const data = resp.data.data;
    if (data) {
      order.value = {
        id: data.id,
        User: data.User || { id: 0, firstname: "", lastname: "", phone: 0 },
        Payment: data.Payment || {
          id: 0,
          price: 0,
          bank_name: "",
          account_name: "",
          account_number: 0,
          status: "",
        },
        SystemBank: data.SystemBank || null,
        Shipment: data.Shipment || null,
        total_amount: data.total_amount || 0,
        total_price: data.total_price || 0,
        status: data.status || "",
        created_at: data.created_at || "",
        updated_at: data.updated_at || "",
        tracking_number: data.tracking_number || "",
        products: Array.isArray(data.products) ? data.products : [],
      } as OrderById;
    }
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการดึงข้อมูลคำสั่งซื้อ", error);
  }
  loading.value = false;
};

const updatePayment = async () => {
  loading.value = true;
  console.log(props.paymentId)
  await service.product
    .updatePayment(props.orderId, paymentCreate.value)

    .then((resp: any) => {
      console.log(resp);
      const data = resp.data;
      const paymentCreate: PaymentRes = {
        system_bank_id: data.system_bank_id,
        date: data.date,
        order_id: data.order_id,
      };
      paymentRes.value = paymentCreate;

      if (resp.status == 200) {
        Swal.fire({
          title: "ยืนยันการชำระเงินสำเร็จ",
          text: "การชำระเงินสำเร็จแล้ว",
          icon: "success",
          confirmButtonText: "ตกลง",
        }).then(() => {
          store.paymentAction = false;
          router
            .push({ path: "/order/checkout" })
            .then(() => window.location.reload());
        });
      }
    })
    .catch((error: any) => {
      console.log(error);
    })
    .finally(() => {
      loading.value = false;
    });
};

onMounted(async () => {
  await getSystemBank();
  const orderId = route.params.orderId ? Number(route.params.orderId) : null;
  if (orderId) {
    await getOrder(orderId);
  } else {
    console.error("ไม่พบ orderId ใน route params");
  }
  paymentCreate.value.order_id = props.orderId ?? 0;
});
</script>
