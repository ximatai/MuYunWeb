<template xmlns="http://www.w3.org/1999/html">
  <div class="p-40 mt-10">
    自己的组件库
    <MInputNumber ref="mInputNumber" v-model="v" @change="change1" @blur="blur">
    </MInputNumber>
    Element 组件库
    <el-input ref="elInputOne" v-model="v" placeholder="Please input number"
              @change="change1"></el-input>
  </div>
</template>

<script setup>
import {ref} from "vue";
const v = ref(0)
const elInputOne = ref(null)
const mInputNumber = ref(null)
const change1 = (e) => {

}


</script>

<style scoped>

</style>
