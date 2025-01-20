<template>
    <div>
        <h1>test</h1>
        <li v-for= "(item, index) in items" :key="index">
            {{ item.name }}
            <p>{{ item.description }}</p>
            <img :src="item.coverimage">
    
            <NuxtLink :to="'/index' + item.id"> read more</NuxtLink>
        </li>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const items = ref()

fetch('https://www.melivecode.com/api/attractions')
.then(res => res.json())
.then((result) => {
    items.value = result
    console.log(result)
})
</script>

<style scoped>

</style>