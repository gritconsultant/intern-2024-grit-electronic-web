<template>
  <div>
    <div class="h-screen flex items-center justify-center bg-gradient-to-r from-green-200 via-yellow-100 to-green-200">
  <div class="bg-white shadow-xl rounded-lg w-full max-w-sm p-8">
    <!-- Logo -->
    <div class="flex justify-center mb-6">
      <img src="" alt="Bangkok Brand" class="w-16 h-16">
    </div>
    <!-- Title -->
    <h2 class="text-2xl font-bold text-center text-gray-800 mb-4">เข้าสู่ระบบ</h2>
    <!-- Form -->
    <form>
      <!-- Email -->
      <div class="mb-4">
        <label for="email" class="block text-sm text-gray-600 mb-2">อีเมล</label>
        <input type="email" id="email" class="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300" placeholder="กรุณาใส่อีเมล">
      </div>
      <!-- Password -->
      <div class="mb-4 relative">
        <label for="password" class="block text-sm text-gray-600 mb-2">รหัสผ่าน</label>
        <input type="password" id="password" class="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300" placeholder="กรุณาใส่รหัสผ่าน">
        <span class="absolute inset-y-0 right-3 flex items-center text-gray-500 cursor-pointer">
          <i class="fas fa-eye"></i>
        </span>
      </div>
      <!-- Forget Password -->
      <div class="text-right mb-4">
        <a href="#" class="text-sm text-orange-500 hover:underline">ลืมรหัสผ่าน?</a>
      </div>
      <!-- Button -->
      <button type="submit" class="w-full bg-orange-500 hover:bg-orange-400 text-white font-bold py-3 rounded-lg transition">
        เข้าสู่ระบบ
      </button>
      <!-- Register -->
      <div class="text-center mt-4 text-sm text-gray-600">
        ไม่มีบัญชีผู้ใช้? <a href="#" class="text-orange-500 hover:underline">ลงทะเบียน</a>
      </div>
    </form>
  </div>
</div>


  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>