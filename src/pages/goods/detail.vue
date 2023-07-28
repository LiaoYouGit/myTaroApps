<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useRouter } from "@tarojs/taro";
import { $navigateBack } from '@/lib/util';
const router = useRouter();
const content = computed(()=>router.params.describeUrl || null)
</script>
<template>
   <view class="detail-content">
      <view v-if="content" v-html="content">
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
