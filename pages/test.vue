<template>
  <div class="flex">
    <!-- Sidebar -->
    <Sidebar />

    <!-- Content -->
    <div class="w-full lg:w-3/4 p-6">
      <h1 class="text-xl font-bold mb-6">ที่ต้องจัดส่ง</h1>

      <!-- Tabs -->
      <div>
        <Tab />
      </div>

      <!-- Order List -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Order Card -->
        <div class="bg-white p-4 rounded-lg shadow border">
          <div class="flex justify-between items-center mb-4">
            <p>หมายเลขคำสั่งซื้อ #334902461</p>
          </div>

          <!-- Product -->
          <div class="flex items-center space-x-4 pb-4">
            <div class="w-[150px] h-[100px]">
              <img
                src="https://aulathailand.com/wp-content/uploads/2023/06/1.png"
                alt="product"
                class="w-full h-full object-cover"
              />
            </div>
            <div class="w-full">
              <div class="flex justify-between">
                <h2 class="font-bold">คีย์บอร์ด</h2>
                <p class="text-lg font-bold">฿24,999</p>
              </div>
              <p class="text-gray-500 text-sm">Wried Mechanical KEYBOARD</p>
            </div>
          </div>

          <!-- Order Summary -->
          <div class="mt-4">
            <p class="flex justify-between border-b pb-2">
              <span>รวมทั้งหมด</span>
              <span>฿24,999</span>
            </p>
            <p class="flex justify-between mt-3 font-bold text-base">
              <span>จัดส่งภายในวันที่</span>
              <span>25 มกราคม 2568</span>
            </p>
          </div>
        </div>

        <!-- Order Details -->
        <div class="bg-white p-4 rounded-lg shadow border">
          <h2 class="font-bold mb-4">รายละเอียดคำสั่งซื้อ</h2>

          <!-- Product -->
          <div class="flex items-center space-x-4 border-b pb-4">
            <div class="w-[150px] h-[100px]">
              <img
                src="https://aulathailand.com/wp-content/uploads/2023/06/1.png"
                alt="product"
                class="w-full h-full object-cover"
              />
            </div>
            <div class="w-full">
              <div class="flex justify-between">
                <h2 class="font-bold">คีย์บอร์ด</h2>
                <p class="text-lg font-bold">฿24,999</p>
              </div>
              <p class="text-gray-500 text-sm">Wried Mechanical KEYBOARD</p>
            </div>
          </div>

          <!-- Address -->
          <div class="mt-4 space-y-4 border-b pb-4">
            <div>
              <h3 class="font-bold">ที่อยู่ของคุณ</h3>
            </div>
            <div>
              <p class="text-gray-500 text-sm">
                ชื่อผู้รับ: คมเข้ม คำเกษ 065 094 5399 <br />
                ที่อยู่: kku เพลส หมู่ 12 ตำบลในเมือง อำเภอเมือง จังหวัดขอนแก่น
                40000
              </p>
            </div>
          </div>

          <!-- Address -->
          <div class="mt-4 space-y-4 border-b pb-4">
            <h3 class="font-bold">จัดส่งโดย</h3>
            <div class="border flex items-center rounded-lg">
              <div class="w-20 h-20 rounded-lg">
                <img
                  src="https://file.thailandpost.com/upload/content/cs4_New%20logo%20THP%20-04_63bce2f853fe8_63f8243acc06e.jpg"
                  class="w-full h-full object-cover rounded-lg"
                />
              </div>
              <p class="text-md font-medium">
                ไปรษณีย์ไทย <br />
                <span class="text-sm font-normal text-gray-500"
                  >จัดส่งภายในวันที่ 25 มกราคม 2568</span
                >
              </p>
            </div>
          </div>

          <!-- Pay -->
          <div class="mt-4 space-y-4 border-b pb-4">
            <h3 class="font-bold">การชำระเงิน</h3>
            <p class="text-sm font-medium">
              OR Code Prompt Pay <br />
              <span class="text-sm font-normal text-gray-500"
                >ทำการชำระเงินด้วยOR Code Prompt Pay </span
              >
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
/**** Add custom styling here ****/
</style>
