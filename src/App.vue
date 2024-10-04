<template xmlns="http://www.w3.org/1999/html">
  <div id="muyun-app">
    <router-view />
    <!--    <el-button type="primary" @click="changeUser">测试Store setUser</el-button>-->
    <!--    {{ appStore.useUserStore.user.name }}-->
    <!--    自己的组件库-->
    <!--    <MInputNumber ref="mInputNumber" v-model="v" @change="change1">-->
    <!--    </MInputNumber>-->
    <!--    Element 组件库-->
    <!--    <el-input ref="elInputOne" v-model="v" placeholder="Please input number"-->
    <!--              @change="change1"></el-input>-->
  </div>
</template>

<script setup>
import { onMounted, nextTick } from 'vue'
import appStore from '@/store/index.js'
console.log(import.meta.env.VITE_APP_ROOT)
onMounted(() => {
  appStore.useUserStore.setUser({
    id: '123',
    name: '张三',
    age: 18,
  })
})
import { ref } from 'vue'

const v = ref(0)
const elInputOne = ref(null)
const mInputNumber = ref(null)
const change1 = (e) => {}
const changeUser = (e) => {
  appStore.useUserStore.setUser({
    id: '222',
    name: '李四',
    age: 20,
  })
  nextTick(() => {
    console.log(localStorage.getItem('user'))
  })
}
</script>

<style scoped></style>
