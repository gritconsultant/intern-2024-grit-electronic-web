<template>
  <div
    class="absolute inset-0 flex items-center justify-center bg-black/50 z-50"
  >
    <div
      class="w-[95%] sm:w-[90%] md:w-[500px] h-auto border-2 flex flex-col rounded-[5px] bg-[#FFFFFF] drop-shadow-lg overflow-hidden"
    >
      <div class="flex justify-between items-center p-4 md:p-5 border-b-2">
        <h1 class="text-sm md:text-base font-bold">รีวิวสินค้า</h1>
        <button @click="store.reviewAction = !store.reviewAction">
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
      <div>
        <div class="px-4 mt-5">
          <h2 class="text-center font-bold text-lg mb-4">รีวิวและให้คะแนน</h2>
          <div class="text-center">
            <p class="text-xl font-semibold p-2">{{ rating }}/5</p>
            <div class="flex justify-center space-x-1">
              <i
                v-for="star in 5"
                :key="star"
                :class="star <= rating ? 'text-yellow-500' : 'text-gray-300'"
                class="fas fa-star cursor-pointer"
                @click="setRating(star)"
              ></i>
            </div>
          </div>

          <textarea
            v-model="description"
            class="w-full border rounded-md p-2 mt-4"
            rows="3"
            placeholder="แสดงความคิดเห็น"
          ></textarea>

        </div>
      </div>
      <div class="flex justify-center mt-4 px-4 pb-6">
        <button
          class="popupbtn w-full md:w-auto py-2 px-4 bg-[#EE973C] hover:bg-[#FD8C35]/70 text-white rounded-md outline-none"
          @click="confirmReview"
        >
          รีวิว
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

definePageMeta({
  layout: "auth",
});

import Swal from "sweetalert2";
import { ref } from "vue";
import { useRouter } from "vue-router";
import type { ReviewCreate, ReviewRes } from "~/models/product.model";
import service from "~/service";
import { useIndexStore } from "~/store/main";

const store = useIndexStore();
const router = useRouter();
const review = ref<ReviewCreate>({
  description: "",
  rating: 0,
  product_id: 0,
})

const reviewRes = ref<ReviewRes>({
  description: "",
  rating: 0,
  product_id: 0,
})

// Rating and Review
const rating = ref(5);
const description = ref("");

const addReview = async() => {
  review.value.description = description.value;
  review.value.rating = rating.value;
  // review.value.product_id = store.product?.id;

  await service.product.addReview(review.value)
  .then((resp: any) => {
    const data = resp.data.data;

          // ถ้าการเพิ่มรีวิวสำเร็จ
          Swal.fire({
        title: "เพิ่มรีวิวสำเร็จ!",
        text: "ได้เพิ่มรีวิวแล้ว!",
        icon: "success",
      });

      const review: ReviewRes = {
        description: data.description,
        rating: data.rating,
        product_id: data.product_id,
      }

      reviewRes.value = review;


  })
  .catch((error: any) => {
      // ตรวจสอบว่า API ส่ง message ว่า stock ไม่พอ
      if (error.response && error.response.data.message === "not enough stock") {
        Swal.fire({
          title: "ไม่สามารถซื้อได้!",
          text: "ขออภัย, สินค้าชิ้นนี้หมดสต็อกแล้ว!",
          icon: "error",
        });
        return; // หยุดการดำเนินการ
      }
    })
    .finally(() => {
    });
}




const confirmReview = () => {
  alert(
    `รีวิวของคุณ: ${description.value}\nคะแนน: ${rating.value}`
  );
  store.reviewAction = false;
  router.push("/order/review");
};


const setRating = (value: number) => {
  rating.value = value;
};

onMounted(() => {
  addReview();
})

</script>

<style scoped>
textarea {
  resize: none;
}
</style>
