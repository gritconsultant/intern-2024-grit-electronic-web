<template>
  <div class="p-6">
    <h1 class="text-xl font-bold mb-4">คืนสินค้า</h1>
    <div class="bg-white p-4 rounded-lg shadow border">
      <!-- Order Details -->
      <div>
        <h2 class="font-bold">รายละเอียดคำสั่งซื้อ</h2>
        <p>หมายเลขคำสั่งซื้อ: {{ orderId }}</p>
        <p>ชื่อสินค้า: {{ product?.name }}</p>
        <p>ราคาสินค้า: ฿{{ product?.price }}</p>
      </div>

      <!-- Return Form -->
      <div class="mt-6">
        <label for="reason" class="font-bold">เหตุผลในการคืนสินค้า</label>
        <textarea
          id="reason"
          rows="4"
          class="w-full border p-2 mt-2 rounded-lg"
          placeholder="กรุณาใส่เหตุผลในการคืนสินค้า"
        ></textarea>

        <label for="evidence" class="font-bold mt-4 block">หลักฐานการคืนสินค้า</label>
        <input
          id="evidence"
          type="file"
          class="w-full mt-2 p-2 border rounded-lg"
        />

        <button
          class="bg-[#FCCA81] hover:bg-[#EE973C] text-white p-2 rounded-lg mt-4"
          @click="submitReturn"
        >
          ยืนยันการคืนสินค้า
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { ref, computed } from "vue";
import type { Order, Product } from "~/models/product.model";

const route = useRoute();

const orders = ref<Order[]>([
  {
    id: "778231342",
    date: "26 ตุลาคม 2566",
    total: 50878,
    deliveryDate: "17-20 พฤศจิกายน 2566",
    products: [
      {
        id: 1,
        name: "เครื่องดื่มรังนกสำเร็จรูป",
        detail: "ดอกบัวคู่ เครื่องดื่มรังนกสำเร็จรูป สูตรดั้งเดิม",
        price: 150,
        amount: 5,
        img: "https://halal.co.th/storages/products/679578.jpg",
        categoryId: 2,
      },
      {
        id: 2,
        name: "เครื่องดื่มใบอ่อนข้าวสาลีชนิดผง",
        detail:
          "กิฟฟารีน วีทกราส (เครื่องดื่มใบอ่อนข้าวสาลีชนิดผง) (ตรากิฟฟารีน)",
        price: 150,
        amount: 3,
        img: "https://halal.co.th/storages/products/p135225.jpg",
        categoryId: 2,
      },
      {
        id: 3,
        name: "เครื่องดื่มรังนกสำเร็จรูป",
        detail: "ดอกบัวคู่ เครื่องดื่มรังนกสำเร็จรูป สูตรดั้งเดิม",
        price: 150,
        amount: 5,
        img: "https://halal.co.th/storages/products/679578.jpg",
        categoryId: 2,
      },
      {
        id: 4,
        name: "เครื่องดื่มใบอ่อนข้าวสาลีชนิดผง",
        detail:
          "กิฟฟารีน วีทกราส (เครื่องดื่มใบอ่อนข้าวสาลีชนิดผง) (ตรากิฟฟารีน)",
        price: 150,
        amount: 3,
        img: "https://halal.co.th/storages/products/p135225.jpg",
        categoryId: 2,
      },
    ],
    shippingStatus: [
      {
        text: "การจัดส่งสำเร็จ",
        date: "23 พฤศจิกายน 2566 17:00 น.",
        isCurrent: true,
      },
      {
        text: "อยู่ระหว่างการจัดส่ง",
        date: "23 พฤศจิกายน 2566 16:00 น.",
        isCurrent: false,
      },
      {
        text: "พัสดุอยู่ที่ศูนย์เตรียมสินค้า",
        date: "23 พฤศจิกายน 2566 04:19 น.",
        isCurrent: false,
      },
    ],
    namerecipe: "คมเข้ม คำเกษ 098 765 4321",
    address: "kku เพลส อำเภอเมือง ตำบลในเมือง จังหวัดขอนแก่น 40000",
  },
]);

// Get route params
const orderId = route.params.orderId as string;
const productId = Number(route.params.productId);

// Find order and product by IDs
const order = computed(() => orders.value.find((o) => o.id === orderId));
const product = computed(() =>
  order.value?.products.find((p) => p.id === productId)
);

const submitReturn = () => {
  alert("การคืนสินค้าสำเร็จ");
};
</script>

<style scoped>
textarea {
  resize: none;
}
</style>
