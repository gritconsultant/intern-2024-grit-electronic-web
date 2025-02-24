Payment

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
            :src="
              i.image ||
              'https://www.shutterstock.com/image-vector/no-image-available-picture-coming-600nw-2057829641.jpg'
            "
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

      <!-- แสดงราคารวม -->
      <div class="px-4 mt-5 text-center">
        <p class="text-lg font-semibold">
          ราคาสินค้า: {{ totalProductPrice.toLocaleString() }} บาท
        </p>
        <p class="text-lg font-semibold">
          ค่าจัดส่ง: {{ shippingFee.toLocaleString() }} บาท
        </p>
        <p class="text-lg font-semibold mt-2 border-t pt-2">
          ราคารวม: {{ totalOrderPrice.toLocaleString() }} บาท
        </p>
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
          :max="new Date().toISOString().slice(0, 16)"
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
import { computed, ref, onMounted } from "vue";
import type {
  OrderById,
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
  total_price_ship: 0,
  date: "",
  order_id: 0,
});

const paymentRes = ref<PaymentRes>({
  total_price_ship: 0,
  date: "",
  order_id: 0,
});

// ดึงบัญชีธนาคาร
const getSystemBank = async () => {
  try {
    const resp = await service.product.getSystemBank();
    system.value = resp.data.data;
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการดึงข้อมูลธนาคาร", error);
  }
};

// ดึงข้อมูลคำสั่งซื้อ
const getOrder = async (orderId: number) => {
  loading.value = true;
  try {
    const resp = await service.product.getOrderById(orderId);
    order.value = resp.data.data;
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการดึงข้อมูลคำสั่งซื้อ", error);
  }
  loading.value = false;
};

// คำนวณค่าจัดส่ง
const shippingFee = computed(() => {
  if (!order.value) return 0;
  const count: any = order.value?.total_amount || 0;
  return Math.ceil(count / 5) * 50; // เพิ่มค่าจัดส่งทีละ 50 ทุก ๆ 5 ชิ้น // ฟรีค่าจัดส่งถ้าเกิน 1000 บาท
});

// คำนวณราคาสินค้าทั้งหมด
const totalProductPrice = computed(() => {
  return order.value?.total_price || 0;
});

// คำนวณราคาสุทธิรวมค่าจัดส่ง
const totalOrderPrice = computed(() => {
  return totalProductPrice.value + shippingFee.value;
});

// ตรวจสอบวันที่
const validateDate = () => {
  if (!paymentCreate.value.date) {
    Swal.fire("กรุณาเลือกวันที่", "โปรดเลือกวันที่และเวลาที่โอน", "warning");
    return false;
  }

  const selectedDate = new Date(paymentCreate.value.date);
  const now = new Date();

  // ตรวจสอบว่าเลือกวันที่ในอนาคตหรือไม่
  if (selectedDate > now) {
    Swal.fire("วันที่ไม่ถูกต้อง", "ไม่สามารถโอนเกินวันปัจจุบันได้", "error");
    return false;
  }

  // ตรวจสอบวันที่ที่เลือกให้เป็นวันที่ที่มีอยู่จริงในเดือนนั้น ๆ
  const [year, month, day] = paymentCreate.value.date
    .split("T")[0]
    .split("-")
    .map(Number);
  const lastDay = new Date(year, month, 0).getDate(); // ดึงจำนวนวันสูงสุดของเดือนนั้น ๆ

  if (day > lastDay) {
    Swal.fire(
      "วันที่ไม่ถูกต้อง",
      "ไม่สามารถชำระได้เนื่องจากวันที่ไม่มีอยู่จริง",
      "error"
    );
    return false;
  }

  const [hour, minute] = paymentCreate.value.date
    .split("T")[1]
    ?.split(":")
    .map(Number) || [0, 0];

  // ตรวจสอบเวลาให้ถูกต้อง
  if (hour >= 24 || minute >= 60) {
    Swal.fire(
      "เวลาที่ไม่ถูกต้อง",
      "ไม่สามารถชำระได้เนื่องจากเวลาไม่มีอยู่จริง",
      "error"
    );
    return false;
  }

  return true;
};


// อัปเดตการชำระเงิน
const updatePayment = async () => {
  if (!validateDate()) return;
  loading.value = true;

  paymentCreate.value.total_price_ship = totalOrderPrice.value;
  await service.product
    .updatePayment(props.orderId, paymentCreate.value)
    .then(() => {
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
  if (props.orderId) {
    await getOrder(props.orderId);
  }
  paymentCreate.value.order_id = props.orderId ?? 0;
});
</script>
