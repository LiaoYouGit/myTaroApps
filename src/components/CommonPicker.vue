<template>
  <slot v-bind="{ show, open }">
    <nut-cell
      :title="title"
      :desc="popupDesc"
      @click="open"
    ></nut-cell>
  </slot>
  <nut-popup position="bottom" v-model:visible="show">
    <nut-picker
      v-model="value"
      :columns="pickerColumns"
      :title="title"
      @confirm="popupConfirm"
      @cancel="show = false"
    >
    </nut-picker>
  </nut-popup>
</template>
<script lang="ts" setup>
import { useVModel } from "@vueuse/core";
import { once } from "events";
import { resolve } from "path";
import { onMounted, ref } from "vue";
import Taro from "@tarojs/taro";


const props = withDefaults(
  defineProps<{
    title?:string
    modelValue?: any;
    api?: Function;
    columns?: any[];
  }>(),
  {
    title:'请选择城市'
  }
);

const emit = defineEmits(["update:modelValue","submit"]);
const value = useVModel(props, "modelValue", emit);

async function getColumnsData(){
   if(typeof props.api === 'function'){
    pickerColumns.value = await props.api()
   }else{
    pickerColumns.value = props.columns || []
   }
}
const show = ref(false);
const popupDesc = ref();

const pickerColumns = ref([
  { text: "南京市", value: "NanJing" },
  { text: "无锡市", value: "WuXi" },
  { text: "海北藏族自治区", value: "ZangZu" },
  { text: "北京市", value: "BeiJing" },
  { text: "连云港市", value: "LianYunGang" },
  { text: "浙江市", value: "ZheJiang" },
  { text: "江苏市", value: "JiangSu" },
]);

const popupConfirm = ({ selectedValue, selectedOptions }) => {
  popupDesc.value = selectedOptions.map((val: any) => val.text).join(",");
  const [item] = selectedOptions
  emit('submit',item)
  show.value = false;
};


function open(){
  show.value = true
}

onMounted(() => {
  getColumnsData()
});

defineExpose({
  open,
})
</script>
