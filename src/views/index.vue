<template>
  <div>
    进入门户
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" :key="viewKey"/>
      </keep-alive>
    </router-view>
  </div>
</template>
<script setup>
import {computed} from 'vue'
import {useRoute} from 'vue-router'

const route = useRoute()

const viewKey = computed(() => {
  return route.query.key
})

</script>
<style scoped>

</style>