<script setup lang="ts">
import Taro from "@tarojs/taro";
import { pageList, platformCategory } from "@/api/goods";
import { onMounted, ref } from "vue";
import { goodsTypeOptions, goodsTypMap } from "@/configs/goods";
import CommonCascader from "@/components/CommonCascader.vue";
import { formatAmount } from "@/lib/util";
const searchValue = ref({
  type: undefined,
  firstCid: undefined,
  secondCid: undefined,
  thirdCid: undefined,
  skuName: undefined,
  pageSize: 10,
  pageIndex: 1,
});

const listData = ref<
  {
    skuId?: number;
    picture?: string;
    skuName?: string;
    brand?: string;
    category?: string;
    properties: string[];
    type: 0 | 1;
    price?: number;
  }[]
>([]);
const totals = ref(0);
async function getList(pageIndex?: number) {
  Taro.showLoading({ title: "加载中..." });
  if (pageIndex === 1) {
    searchValue.value.pageIndex = pageIndex;
    listData.value = [];
  }
  const query = {
    ...searchValue.value,
  };
  if (query.type && query.type > 0) {
    query.type--;
  } else {
    delete query.type;
  }
  console.log("query.type", query.type);
  const { total, list } = await pageList(query);
  totals.value = total;
  listData.value.push(...list);
  Taro.hideLoading();
}

function handleScroll() {
  const maxPageIndex = Math.ceil(totals.value / 10);
  if (maxPageIndex > searchValue.value.pageIndex) {
    searchValue.value.pageIndex++;
    getList();
  }
}

onMounted(() => getList(1));

const selectCategoryText = ref("选择分类");
const searchKeys = ref({
  0: "firstCid",
  1: "secondCid",
  2: "thirdCid",
});
async function getPlatformCategory(node, resolve) {
  console.log("node", node);
  const { value, level } = node;
  const key = searchKeys.value[level];
  if (key) {
    searchValue.value[key] = value;
    if (level === 2) {
      getList(1);
      selectCategoryText.value = node.text;
    }
  }
  const query = {
    categoryLevel: level || 1,
    parentCategoryId: value || -1,
  };
  const { categoryList } = await platformCategory(query);
  const children = categoryList.map((item) => ({
    ...item,
    text: item.name,
    value: item.categoryId,
    leaf: level >= 3,
  }));
  resolve(children);
}
const cascaderValue = ref()
function onRefresh() {
  searchValue.value = {
    ...searchValue.value,
    firstCid: undefined,
    secondCid: undefined,
    thirdCid: undefined,
    skuName: undefined,
  };
  selectCategoryText.value = '选择分类'
  cascaderValue.value = null
  getList(1)
}
const cascaderProps = ref({
  lazy: true,
  lazyLoad: getPlatformCategory,
});
</script>

<template>
  <view>
    <view class="header">
      <nut-searchbar
        v-model="searchValue.skuName"
        placeholder="请输入商品名称"
        @search="getList(1)"
      >
        <template v-slot:leftout>
          <CommonCascader
            v-model="cascaderValue"
            :title="selectCategoryText"
            :cascaderProps="cascaderProps"
            ref="commonCascader$"
          >
            <template v-slot:default="{ title, getValue }">
              <view
                class="select-type"
                style="color: rgb(250, 44, 25)"
                @tap="getValue"
              >
                {{ title }}
              </view>
            </template>
          </CommonCascader>
        </template>
        <template v-slot:rightout>
          <view
            class="select-type"
            @tap="onRefresh"
          >
            重置
          </view>
        </template>
      </nut-searchbar>
      <nut-tabs
        v-model="searchValue.type"
        :auto-height="false"
        @change="getList(1)"
      >
        <nut-tab-pane
          v-for="item in goodsTypeOptions"
          :key="item.value"
          :pane-key="item.value"
          :title="item.text"
        >
        </nut-tab-pane>
      </nut-tabs>
    </view>
    <view v-if="listData.length === 0">
      <nut-empty image="empty" description="无内容"></nut-empty>
    </view>
    <scroll-view
      v-else
      scrollY
      style="height: calc(100vh - 146px)"
      @scrolltolower="handleScroll"
    >
      <nut-cell v-for="item in listData" :key="item.skuId">
        <view class="goods-item">
          <img :src="item.picture" class="goods-item-picture" alt="加载失败" />
          <view class="goods-item-desc">
            <view>
              <strong class="goods-item-desc-skuName">{{
                item.skuName
              }}</strong>
            </view>
            <view>商品品牌:{{ item.brand }}</view>
            <view>商品分类:{{ item.category }}</view>
            <view>商品规格:{{ item.properties.join(",") }}</view>
            <view>商品类型:{{ goodsTypMap[item.type] || "无" }}</view>
            <view v-if="item.price" style="color: red">
              <strong>￥{{ formatAmount(item.price) }}</strong>
            </view>
          </view>
        </view>
      </nut-cell>
    </scroll-view>
  </view>
</template>

<style lang="scss" scoped>
.select-type {
  font-size: 14px;
  line-height: 22px;
  white-space: nowrap;
}
.goods-item {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  max-width: 100%;
  .goods-item-picture {
    width: 200rpx;
    height: 200rpx;
    padding: 5rpx;
    object-fit: cover;
    border: 1px solid #eee;
  }
  .goods-item-desc {
    margin-left: 20rpx;
    * {
      padding: 3rpx;
    }
    /*.goods-item-desc-skuName{
      text-overflow: ellipsis;
      word-break: break-all;
      white-space: nowrap;
      overflow: hidden;
    }*/
  }
}
.header {
  position: sticky;
  top: 0;
  z-index: 99;
}
.nut-tab-pane {
  padding: 0;
}
.nut-list-item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50px;
  margin-bottom: 10px;
  background-color: #f4a8b6;
  border-radius: 10px;
}
</style>
