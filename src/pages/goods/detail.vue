<script lang="ts" setup>
import { ref } from 'vue'
import Taro from "@tarojs/taro";
import { $navigateBack } from '@/lib/util';

const item = ref(Taro.getStorageSync("goods-details"))
</script>
<template>
   <view class="detail-content">
      <view v-if="item.describeUrl" v-html="item.describeUrl">
      </view>
      <view v-else>
        <nut-empty image="empty" description="无内容"></nut-empty>
      </view>
      <view>
        <nut-button size="large" @click="$navigateBack">返回</nut-button>
      </view>
   </view>
</template>
<style lang="scss" scoped>
.detail-content{
  padding: 20rpx;
  *{
    max-width: 100%;
  }
}
</style>
