<template>
  <div>
    <div class="p-10">
      <div class="mx-[20px] lg:mx-[50px]">
        <div class="w-full lg:w-3/6 p-2">แท็ก</div>
        <div class="flex flex-col lg:flex-row justify-between gap-4">
          <div class="w-full p-2">
            <!-- photoshow -->
            <div class="p-2 flex justify-center">
              <div class="flex justify-center">
                <img
                  class="object-cover max-w-full h-auto"
                  src="https://mercular.s3.ap-southeast-1.amazonaws.com/images/products/2024/10/import/angry%20miao/am-rgb-650-white-top-view(1).jpg"
                  alt=""
                />
              </div>
            </div>
            <!-- selectphoto -->
            <div class="flex flex-wrap justify-center gap-2 h-auto p-2">
              <div class="photoselect">
                <img
                  class="object-cover max-w-[60px] lg:max-w-[80px]"
                  src="https://mercular.s3.ap-southeast-1.amazonaws.com/images/products/2024/10/import/angry%20miao/am-rgb-650-white-side-view.jpg"
                  alt=""
                />
              </div>
              <div class="photoselect">
                <img
                  class="object-cover max-w-[60px] lg:max-w-[80px]"
                  src="https://mercular.s3.ap-southeast-1.amazonaws.com/images/products/2024/10/import/angry%20miao/am-rgb-650-white-top-view(1).jpg"
                  alt=""
                />
              </div>
              <div class="photoselect">
                <img
                  class="object-cover max-w-[60px] lg:max-w-[80px]"
                  src="https://mercular.s3.ap-southeast-1.amazonaws.com/images/products/2024/10/import/angry%20miao/am-rgb-650-white-front-view(1).jpg"
                  alt=""
                />
              </div>
              <div class="photoselect">
                <img
                  class="object-cover max-w-[60px] lg:max-w-[80px]"
                  src="https://mercular.s3.ap-southeast-1.amazonaws.com/images/products/2024/10/import/angry%20miao/am-rgb-650-white-top-view(1).jpg"
                  alt=""
                />
              </div>
            </div>
          </div>
          <!-- detailproduct -->
          <div class="w-full lg:w-3/6 p-5">
            <h1 class="fontsubheader">ชื่อ</h1>
            <div class="mt-[6px] flex flex-wrap gap-2 lg:gap-5">
              <div>star number</div>
              |
              <div>total review</div>
              |
              <div>like</div>
            </div>
            <div class="my-[20px] font-semibold text-[#FF0808] text-2xl lg:text-4xl">
              ฿4500
            </div>
            <div class="flex flex-col justify-between gap-5">
              <div class="h-full">
                <h1 class="fontsubheader">รายละเอียด</h1>
                <div class="h-[200px] lg:h-[470px] w-full p-[20px] overflow-auto">
                  <p class="text-wrap break-words">
                    หากคุณกำลังมองหาคีย์บอร์ดในงบประมาณประมาณ 500 บาท ควรเลือกคีย์บอร์ดแบบมีสายที่ออกแบบมาเพื่อการใช้งานทั่วไป เช่น รุ่นที่รองรับพิมพ์เอกสาร ทำงานออฟฟิศ หรือเล่นเกมเบื้องต้น โดยเน้นไปที่แบรนด์ที่เชื่อถือได้ เช่น Logitech, A4Tech หรือ Nubwo ซึ่งมักให้ความทนทานและการตอบสนองที่ดีในราคาที่คุ้มค่า สำหรับการพิมพ์ ควรเลือกคีย์บอร์ดแบบเมมเบรนที่มีปุ่มกดนุ่มสบาย ช่วยลดความเมื่อยล้าระหว่างการใช้งาน หากคุณต้องการใช้งานเพื่อการเล่นเกมแบบเบา ๆ อาจมองหารุ่นที่มีดีไซน์ทันสมัย ปุ่มที่ตอบสนองรวดเร็ว และรองรับฟีเจอร์ Anti-Ghosting ในบางปุ่มสำคัญ ควรตรวจสอบรีวิวออนไลน์และทดลองกดปุ่มจริงหากเป็นไปได้ เพื่อให้แน่ใจว่าคีย์บอร์ดที่เลือกเหมาะกับการใช้งานและมอบประสบการณ์ที่ดีที่สุดในงบประมาณจำกัดของคุณ!
                  </p>
                </div>
              </div>
              <button
                class="bg-[#988FD0] text-white p-[15px] rounded-[10px] text-center text-lg lg:text-xl w-full lg:w-[350px] ml-[10px] transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300"
              >
                <div class="flex justify-center gap-4">
                  <div>
                    <i class="fa-solid fa-cart-plus"></i>
                  </div>
                  เพิ่มใส่ตะกร้า
                </div>
              </button>
            </div>
          </div>
        </div>
        <hr class="hr" />
        <!-- review -->
        <div class="h-auto lg:h-[500px] p-[20px]">
          <h1 class="fontheader">รีวิวสินค้า</h1>
          <div class="flex flex-wrap gap-5">
            <div>star number</div>
            |
            <div>total review</div>
          </div>
          <!-- comment -->
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-5 p-[20px]">
            <!-- cardreview -->
            <div
              v-for="(item, index) in [1,2,3]"
              :key="index"
              class="border-2 rounded-[5px] p-5 w-full lg:w-[400px] object-cover"
            >
              <div class="flex justify-between">
                <div class="flex flex-col items-center gap-2">
                  <h1 class="subheader w-full">ชื่อ</h1>
                  <div>createAt</div>
                </div>
                <div class="flex flex-col items-center gap-2 w-2/4">
                  <div class="subheader">4</div>
                  <div class="icons flex justify-center">
                    <img
                      src="https://cdn-icons-png.flaticon.com/256/15853/15853959.png"
                      alt=""
                    />
                    <img
                      src="https://cdn-icons-png.flaticon.com/256/15853/15853959.png"
                      alt=""
                    />
                    <img
                      src="https://cdn-icons-png.flaticon.com/256/15853/15853959.png"
                      alt=""
                    />
                    <img
                      src="https://cdn-icons-png.flaticon.com/256/15853/15853959.png"
                      alt=""
                    />
                    <img
                      src="https://cdn-icons-png.flaticon.com/256/15853/15853959.png"
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <hr class="hr" />
              <div>
                <div class="detail p-2 h-[90px]">details</div>
                <div class="flex flex-wrap justify-center gap-2 p-2">
                  <img
                    class="photoreview max-w-[60px] lg:max-w-[80px]"
                    src="https://mercular.s3.ap-southeast-1.amazonaws.com/images/products/2024/10/import/angry%20miao/am-rgb-650-white-side-view.jpg"
                    alt=""
                  />
                  <img
                    class="photoreview max-w-[60px] lg:max-w-[80px]"
                    src="https://mercular.s3.ap-southeast-1.amazonaws.com/images/products/2024/10/import/angry%20miao/am-rgb-650-white-top-view(1).jpg"
                    alt=""
                  />
                  <img
                    class="photoreview max-w-[60px] lg:max-w-[80px]"
                    src="https://mercular.s3.ap-southeast-1.amazonaws.com/images/products/2024/10/import/angry%20miao/am-rgb-650-white-front-view(1).jpg"
                    alt=""
                  />
                  <img
                    class="photoreview max-w-[60px] lg:max-w-[80px]"
                    src="https://mercular.s3.ap-southeast-1.amazonaws.com/images/products/2024/10/import/angry%20miao/am-rgb-650-white-top-view(1).jpg"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="p-[20px] lg:p-[40px] bg-[#988FD0]/30">
      <div class="grid gap-7 mx-[20px] lg:mx-[50px]">
        <h1 class="fontheader">สินค้าใกล้เคียง</h1>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          <div v-for="(item, index) in products.slice(0, 4)" :key="index">
            <CardProduct :product="item" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Product } from "~/models/product.model";

const products = ref<Product[]>([
  {
    id: 1,
    name: "AULA",
    detail: "Wried Mechanical KEYBOARD ",
    price: 1000,
    amount: 0,
    img: "https://aulathailand.com/wp-content/uploads/2023/06/1.png",
  },
  {
    id: 2,
    name: "AULA",
    detail: "Wried Mechanical KEYBOARD ",
    price: 2000,
    amount: 3,
    img: "https://aulathailand.com/wp-content/uploads/2023/06/1.png",
  },
  {
    id: 3,
    name: "AULA",
    detail: "Wried Mechanical KEYBOARD ",
    price: 3000,
    amount: 10,
    img: "https://aulathailand.com/wp-content/uploads/2023/06/1.png",
  },
  {
    id: 4,
    name: "AULA",
    detail: "Wried Mechanical KEYBOARD ",
    price: 4000,
    amount: 20,
    img: "https://aulathailand.com/wp-content/uploads/2023/06/1.png",
  },
  {
    id: 5,
    name: "AULA",
    detail: "Wried Mechanical KEYBOARD ",
    price: 5000,
    amount: 30,
    img: "https://aulathailand.com/wp-content/uploads/2023/06/1.png",
  },
  {
    id: 6,
    name: "AULA",
    detail: "Wried Mechanical KEYBOARD ",
    price: 6000,
    amount: 40,
    img: "https://aulathailand.com/wp-content/uploads/2023/06/1.png",
  },
]);
</script>

<style scoped>
.photoselect img {
  transition: transform 0.2s;
}
.photoselect img:hover {
  transform: scale(1.1);
}
</style>
