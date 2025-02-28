<template>
  <div class="h-screen">
    <Header />
    <div class="h-[70%] max-lg:h-[60%]">
      <slot />
    </div>
    <Footer />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
