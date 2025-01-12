<template>
  <div class="absolute top-14 right-0 w-full bg-white shadow-lg z-50 md:hidden">
    <ul class="flex flex-col text-center border-t border-gray-200">
      <li class="py-3 border-b">
        <NuxtLink to="/" class="text-black hover:text-[#EE973C]">
          <img
            src="https://cdn-icons-png.flaticon.com/256/88/88032.png"
            alt="Shopping Cart"
            class="w-5 h-5 mx-auto"
          />
          Cart
        </NuxtLink>
      </li>
      <li class="py-3 border-b">
        <NuxtLink to="/" class="text-black hover:text-[#EE973C]">
          <img
            src="https://cdn-icons-png.flaticon.com/256/157/157990.png"
            alt="Favorites"
            class="w-5 h-5 mx-auto"
          />
          Favorites
        </NuxtLink>
      </li>
      <li class="py-3 border-b">
        <NuxtLink to="/" class="text-black hover:text-[#EE973C]">
          <img
            src="https://cdn-icons-png.flaticon.com/256/388/388652.png"
            alt="Notifications"
            class="w-5 h-5 mx-auto"
          />
          Notifications
        </NuxtLink>
      </li>
      <li class="py-3">
        <NuxtLink to="/" class="text-black hover:text-[#EE973C]">
          <img
            src="https://cdn-icons-png.flaticon.com/256/268/268441.png"
            alt="User"
            class="w-5 h-5 mx-auto"
          />
          Profile
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
/* Add necessary styling here */
</style>
