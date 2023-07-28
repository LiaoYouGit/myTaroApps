<script lang="ts" setup>
import { ref } from "vue"
import { useVModel } from '@vueuse/core'
const props = withDefaults(defineProps<{
  modelValue?:any,
  title?:string,
  api?:Function,
  desc?:string,
  options?:any[],
  cascaderProps?: any
}>(),{
  title:'选择地址',
})

const emit = defineEmits(['update:modelValue'])
const value = useVModel(props,'modelValue',emit)

const visible = ref(false)
const cascaderOptions = ref<any[]>([])

async function openOptions(){
  if(typeof props.api === 'function'){
    cascaderOptions.value = await props.api()
  }
  if(props.options && props.options.length > 0){
    cascaderOptions.value = props.options
  }
}

function getValue(){
  visible.value = true
  openOptions()
}

defineExpose({
  getValue,
})
</script>
<template>
  <slot v-bind="{ title, desc, visible, getValue }">
    <nut-cell
      :title="title"
      :desc="desc"
      @click="visible = true"
    >
    </nut-cell>
  </slot>
  <nut-cascader
    :title="title"
    v-model:visible="visible"
    v-model="value"
    v-bind="cascaderProps"
    :options="cascaderOptions"
  ></nut-cascader>
</template>
<style scoped>
</style>
