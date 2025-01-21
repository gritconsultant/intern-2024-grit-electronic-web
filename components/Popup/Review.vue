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
            v-model="reviewText"
            class="w-full border rounded-md p-2 mt-4"
            rows="3"
            placeholder="แสดงความคิดเห็น"
          ></textarea>

          <!-- Image Upload Section -->
          <div class="mt-4">
            <h3 class="text-sm font-medium mb-2">เพิ่มรูปภาพ (สูงสุด 4 รูป)</h3>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <div
                v-for="(image, index) in uploadedImages"
                :key="index"
                class="relative w-24 h-24 border rounded-md overflow-hidden"
              >
                <img
                  :src="image"
                  alt="Uploaded"
                  class="w-full h-full object-cover"
                />
                <button
                  class="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                  @click="removeImage(index)"
                >
                  ×
                </button>
              </div>
              <div
                v-if="uploadedImages.length < 4"
                class="w-24 h-24 border rounded-md flex items-center justify-center cursor-pointer bg-gray-100"
              >
                <label for="image-upload" class="cursor-pointer">
                  <i class="fas fa-plus text-gray-400"></i>
                </label>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  class="hidden"
                  @change="handleImageUpload"
                />
              </div>
            </div>
          </div>
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

import { ref } from "vue";
import { useRouter } from "vue-router";
import { useIndexStore } from "~/store/main";

const store = useIndexStore();
const router = useRouter();

// Rating and Review
const rating = ref(5);
const reviewText = ref("");

// Image Upload
const uploadedImages = ref<string[]>([]);


const confirmReview = () => {
  alert(
    `รีวิวของคุณ: ${reviewText.value}\nคะแนน: ${rating.value}\nรูปภาพ: ${uploadedImages.value.length}`
  );
  store.reviewAction = false;
  router.push("/order/review");
};


const setRating = (value: number) => {
  rating.value = value;
};


// Image Upload
const handleImageUpload = (event: Event) => {
  const input = event.target as HTMLInputElement;
  const files = input.files;

  if (files && uploadedImages.value.length < 4) {
    const file = files[0];
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.result) {
        uploadedImages.value.push(reader.result as string);
      }
    };

    reader.readAsDataURL(file);
  }
};

// ลบ Uploaded Image
const removeImage = (index: number) => {
  uploadedImages.value.splice(index, 1);
};
</script>

<style scoped>
textarea {
  resize: none;
}
</style>
