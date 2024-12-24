<template>
  <div>
    <div class="p-[50px]">
      <div>tack pages</div>
      <div class="flex gap-2 my-6">
        <h1 class="font-semibold">หมายเลขคำสั่งซื้อ</h1>
        <p class="text-black/40">#78965423</p>
      </div>

      <div class="flex justify-between">
        <div class="mx-10">
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
                class=" w-[400px] mt-2 inputphoto"
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
</template>

<script setup lang="ts"></script>

<style scoped></style>
