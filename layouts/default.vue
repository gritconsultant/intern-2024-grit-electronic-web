<template>
  <div class="h-screen bg-slate-600 p-2">
    <Header />
    <div class="h-[70%]">
      <slot />
    </div>
    <Footer />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
