<script lang="ts" setup>
import Taro from "@tarojs/taro";
import { ref } from "vue";
import { getDetail } from "@/api/purchaseOrder";
import { onAppShow } from "@tarojs/taro";
const instance = Taro.getCurrentInstance()
const id = instance.router?.params.id || null
console.log('instance',instance)


function getDetailData(){

}

onAppShow((options)=>{
  console.log('options',options)
})
onMounted(() => {

});


</script>
<template>
   <view>
    123456
   </view>
</template>
<style scoped>

</style>
