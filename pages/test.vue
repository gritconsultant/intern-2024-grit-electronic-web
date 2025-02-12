<template>
    <div
      class="absolute inset-0 flex items-center justify-center bg-black/50 z-50"
    >
      <div
        class="w-[95%] sm:w-[90%] md:w-[500px] h-auto border-2 flex flex-col rounded-[5px] bg-[#FFFFFF] drop-shadow-lg overflow-hidden"
      >
        <div class="flex justify-between items-center p-4 md:p-5 border-b-2">
          <h1 class="text-sm md:text-base font-bold">รีวิวสินค้า</h1>
          <button @click="closePopup">
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
  
  import { ref } from "vue";
  import Swal from "sweetalert2";
  import service from "~/service";
import type { ReviewCreate, ReviewRes } from "~/models/product.model";
  
  const rating = ref(5);
  const description = ref("");
  const selectedProduct = defineProps<{ product: string }>();
  const emit = defineEmits<{
    (e: "close"): void;
  }>();
  
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
  const confirmReview = async () => {
    // Set product_id based on the selected product
    review.value.product_id = Number(selectedProduct.product) || 0;
    review.value.description = description.value;
    review.value.rating = rating.value;
  
    try {
      // Call the addReview function to send the review data
      await addReview();
      Swal.fire({
        title: "รีวิวสำเร็จ",
        text: `คุณได้ให้รีวิวสินค้า "${selectedProduct.product}"`,
        icon: "success",
      });
      emit("close"); // Close the popup
    } catch (error) {
      Swal.fire({
        title: "เกิดข้อผิดพลาด",
        text: "ไม่สามารถเพิ่มรีวิวได้",
        icon: "error",
      });
    }
  };
  
  // Function to add the review
  const addReview = async () => {
    if (!review.value.product_id) {
      Swal.fire({
        title: "ไม่พบสินค้าที่รีวิว",
        text: "โปรดเลือกสินค้าที่ต้องการรีวิวก่อน",
        icon: "error",
      });
      return;
    }
  
    try {
      const resp = await service.product.addReview(review.value);
      const data = resp.data.data;
  
      reviewRes.value = {
        description: data.description,
        rating: data.rating,
        product_id: data.product_id,
      };
    } catch (error) {
      throw error;
    }
  };
  
  const setRating = (value: number) => {
    rating.value = value;
  };
  
  const closePopup = () => {
    emit("close"); // Close the popup when clicking the close button
  };
  </script>
  