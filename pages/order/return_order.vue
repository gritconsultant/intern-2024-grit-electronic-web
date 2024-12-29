<template>
  <div class="flex">
    <!-- Sidebar -->
    <Sidebar />
    <div class="w-full boxprofile m-9 -ml-2">
      <div class="flex justify-between items-center border-b pb-4 m-4">
        <h1 class="font-medium text-lg">คืนสินค้า</h1>
      </div>

      <div>
        <div class="flex my-6">
          <h1 class=" font-normal px-5">หมายเลขคำสั่งซื้อ</h1>
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
