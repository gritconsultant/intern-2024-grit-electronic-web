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
            <label for="productname"> ชื่อสินค้า </label> <br />
            <input
              type="text"
              id="productname"
              class="w-[300px] h-[55px] rounded-xl mt-4 shadow-lg text-xs px-2 text-black border-2 "
            />
          </div>
          <div class="mt-12">
            <label for="productprice"> ราคาสินค้า </label> <br />
            <input
              type="text"
              id="productprice"
              class="w-[300px] h-[55px] rounded-xl mt-5 shadow-lg text-xs px-2 text-black border-2"
            />
          </div>
        </div>

        <div class="">
          <div class="mr-10">
            <label for="productdetail"> รายละเอียดขอคืนสินค้า </label> <br />
                <input
              type="text"
              id="productdetail"
              class="w-[450px] h-[55px] rounded-xl text-xs px-2  mt-5 shadow-lg text-black border-2"
            />

          </div>
        </div>
      </div>



    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
