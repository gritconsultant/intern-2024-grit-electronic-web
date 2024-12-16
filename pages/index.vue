<template>
  <div class="mx-[50px]">
    <div class="border-[2px] h-[10rem]">Posters</div>
    <div class="grid grid-cols-1 text-center">
      <div class="mt-[15px]">
        <h1 class="mb-[10px]">หมวดหมู่สินค้า</h1>
        <div class="flex justify-center gap-3">
          <div>คอมพิวเตอร์</div>
          <div>โน๊ตบุ๊ค</div>
          <div>อุปกรณ์เสริม</div>
        </div>
      </div>
    </div>
    <div class="mt-[30px]">
      <h1 class="fontheader">สินค้าแนะนำ-Recommend</h1>
      <div class="mt-2 p-3">
        <!-- cardproduct demo -->
        <div
          class="w-[300px] h-[450px] border-2 p-5 flex flex-col gap-2 rounded-[5px]"
        >
          <div class="flex justify-between border-2 h-[30px]">
            <div>star</div>
            <div>like</div>
          </div>
          <div class="object-cover place-content-center border-2 h-[250px]">
            <img
              src="https://blog.bnn.in.th/wp-content/uploads/2024/03/Acer-Aspire-3-A315-59-32GC.jpg"
              alt=""
            />
          </div>
          <div class="flex justify-between border-2">
            <div>
                <span class="fontsubheader">ชื่อ</span>
            </div>
            <div>
                ฿2000
            </div>
          </div>
          <div>
            <span class="fontsubheader">รายละเอียด</span>
            <div class="detail">
                รุ่น Acer Aspire 3 A315-59 59 ��ุตบอล 3 นิ้ว รุ่นใหม่ ที่มี��ุตบอล��้า��ล่อง สามารถใช้งานในบ้านกับ��ู้ใช้ที่อยู่ในบ้านได้อย่า��รา��รื่น
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
