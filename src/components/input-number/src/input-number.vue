<template>
  <el-input ref="_elInput" @input="inputChange" @change="change">
    <template v-for="(_, name) in $slots" #[name]="scopedData">
      <slot :name="name" />
    </template>
  </el-input>
</template>
<script setup>
import { ref } from 'vue'
import { isNumber } from '../../utils/validate.js'
import { useExposed } from '@/components/hooks/useExposed.js'
/**
 * 定义组件名称
 */
defineOptions({
  //组件名称
  name: 'InputNumber',
})
/**
 * 透传Element的属性到组件上
 * 方便ref直接调用
 */
const _elInput = ref(null)
useExposed(_elInput)
/**
 * 声明组件事件
 * @type {EmitFn<string[]>}
 */
const emits = defineEmits(['update:modelValue'])
/**
 * 主要用于验证是否是数组不是数字返回null
 * 否则返回实际值
 * @param value
 */
const change = (value) => {
  if (isNumber(value)) {
    emits('update:modelValue', Number(value))
  } else {
    emits('update:modelValue', null)
  }
}
const inputChange = (value) => {
  emits('update:modelValue', value)
}
</script>
<style scoped></style>
