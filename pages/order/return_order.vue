<template>
  <div class="flex p-4">
    <!-- Sidebar -->
    <Sidebar />
    <div class="w-full lg:w-3/4 p-6">
      <div class="border-b">
        <h1 class="text-xl font-bold mb-6">คืนสินค้า</h1>
      </div>

      <div>
        <div class="flex my-6">
          <h1 class="font-normal px-5">หมายเลขคำสั่งซื้อ</h1>
          <p class="text-black/40">#78965423</p>
        </div>

        <div class="flex justify-between">
          <div class="mx-10 mt-2">
            <div>
              <label for="productname "> ชื่อสินค้า </label> <br />
              <input
                type="text"
                id="productname"
                class="w-[400px] h-[45px] mt-2 inputbox"
              />
            </div>
            <div class="mt-5">
              <label for="productprice"> ราคาสินค้า </label> <br />
              <input
                type="text"
                id="productprice"
                class="w-[400px] h-[45px] mt-2 inputbox"
              />
            </div>

            <div class="mt-5">
              <label for="file_input">หลักฐานการชำระเงิน</label> <br />
              <input
                class="w-[400px] mt-2 inputphoto"
                id="file_input"
                type="file"
              />
            </div>
          </div>

          <div>
            <div class="mr-10">
              <label for="productdetail"> รายละเอียดขอคืนสินค้า </label> <br />
              <input
                type="text"
                id="productdetail"
                class="w-[450px] h-[45px] mt-4 inputbox"
              />
            </div>

            <div class="mt-5 flex justify-between items-center">
              <label class="text-sm" for="file_input">แนบรูปสินค้า</label>
              <input
                class="mr-10 w-[370px] inputphoto"
                id="file_input"
                type="file"
              />
            </div>

            <!-- Login Button -->
            <div class="mt-10">
              <button
                type="submit"
                class="text-white w-full max-w-[300px] h-[45px] bg-[#FCCA81] hover:bg-[#EE973C] hover:text-black rounded-xl"
                @click="confirmSent"
              >
                ยืนยันการคืนสินค้า
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

const confirmSent = () => {
  alert("ส่งคำขอร้องคืนสินค้าเสร็จสิ้น");
}
</script>

<style scoped></style>
