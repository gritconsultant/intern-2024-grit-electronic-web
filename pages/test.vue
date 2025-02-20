<template>
  <div class="p-[90px]">
    <div class="container mx-auto px-6 py-12">
    <!-- Title Section -->
    <h1 class="text-2xl font-bold text-gray-900 text-center">ข้อมูลติดต่อ</h1>
    <p class="text-gray-600 text-center mt-3">
      หากต้องการความช่วยเหลือ หรืออยากรู้เพิ่มเติมเกี่ยวกับ Bangkok Brand สามารถติดต่อเราได้
    </p>

    <!-- Contact Information -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 text-center justify-center">
      <div class="flex flex-col items-center">
        <div class="bg-[#EE973C]/30 p-4 rounded-full">
          <i class="fas fa-map-marker-alt text-[#EE973C]/70 text-2xl"></i>
        </div>
        <h3 class="text-lg font-semibold mt-3">ที่อยู่</h3>
        <p class="text-gray-700 w-[300px]">173 ศาลาว่าการกรุงเทพมหานคร (เสาชิงช้า) ถนนดินสอ แขวงเสาชิงช้า เขตพระนคร
          กรุงเทพมหานคร 10200</p>
      </div>

      <div class="flex flex-col items-center">
        <div class="bg-[#EE973C]/30 p-4 rounded-full">
          <i class="fas fa-phone text-[#EE973C]/70 text-2xl"></i>
        </div>
        <h3 class="text-lg font-semibold mt-3">ติดต่อ</h3>
        <p class="text-gray-700">โทรศัพท์ : 02-224-3038</p>
        <p class="text-gray-700">อีเมล : bangkokbrand@gmail.com</p>
      </div>


    </div>

    <!-- Google Map Section -->
    <div class="mt-12 flex ">
      <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7750.335464015881!2d100.5563859153434!3d13.768756503956919!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29fad79aa4eef%3A0x57b3c934809b3599!2z4Liq4Liz4LiZ4Lix4LiB4Lie4Lix4LiS4LiZ4Liy4Liq4Lix4LiH4LiE4LihIOC4geC4o-C4uOC4h-C5gOC4l-C4nuC4oeC4q-C4suC4meC4hOC4ow!5e0!3m2!1sen!2sus!4v1740033423350!5m2!1sen!2sus" width="1000" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div>

    <!-- Social Media Links -->
    <div class="bg-gray-200 p-8 rounded-lg mt-12 shadow-lg text-center">
      <h2 class="text-2xl font-bold text-gray-800">ช่องทางติดตามอื่นๆ</h2>
      <p class="text-gray-600 mt-2">ติดตาม Bangkok Brand ได้ตาม Social medie ทุกช่องทาง!</p>
      <div class="flex justify-center gap-6 mt-6">
        <!-- Facebook -->
        <a
          href="https://www.facebook.com/profile.php?id=100064262010712"
          target="_blank"
          class="social-icon bg-blue-600 hover:bg-blue-700"
        >
          <i class="fab fa-facebook-f text-white text-2xl"></i>
        </a>
        <!-- Instagram -->
        <a
          href="https://www.instagram.com/bangkokbrand2023?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==.com"
          target="_blank"
          class="social-icon bg-gradient-to-r from-pink-500 to-orange-500 hover:opacity-80"
        >
          <i class="fab fa-instagram text-white text-2xl"></i>
        </a>
        <!-- YouTube -->
        <a
          href="https://www.youtube.com/@bangkokbrandtv/featured.com"
          target="_blank"
          class="social-icon bg-red-600 hover:bg-red-700"
        >
          <i class="fab fa-youtube text-white text-2xl"></i>
        </a>
      </div>
    </div>
  </div>

  </div>
</template>

<script setup>
</script>

<style scoped>
.container {
  max-width: 1000px;
}

/* Social Media Icon Styles */
.social-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  transition: transform 0.3s ease;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
}
.social-icon:hover {
  transform: scale(1.1);
}
</style>
