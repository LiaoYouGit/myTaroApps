<script lang="ts" setup>
import { createTableColumns } from '@/components/TableSearch/utils'
import { computed } from 'vue'
import TableSearch from '@/components/TableSearch/TableSearch.vue'
import { pageList } from '@/api/purchaseOrder';
import { $navigateTo } from '@/lib/util';


const columns= computed(()=>{
  return createTableColumns([
    ['采购编号','code'],
    ['提交审核时间','createTime'],
    ['审核通过时间','auditTime'],
    ['采购金额','price'],
    ['审核状态','state'],
    ['妥了网订单号','thirdOrderId'],
    ['订单状态','selfOrder'],
    ['采购员','purchaseName'],
    ['采购部门','departmentName'],
  ])
})

function clickItem(row){
  $navigateTo(`/pages/order/detail?id=${row.id}`)
}
</script>
<template>
   <view>
      <table-search :columns="columns" :api="pageList" @ItemClick="clickItem">

      </table-search>
   </view>
</template>
<style scoped>

</style>
