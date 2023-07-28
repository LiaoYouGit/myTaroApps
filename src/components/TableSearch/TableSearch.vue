<script lang="ts" setup>
import { pageList } from "@/api/address";
import { formatDate } from "@/lib/util";
import Taro from "@tarojs/taro";
import { ref, computed, onMounted } from "vue";
const props = withDefaults(defineProps<{
  columns: any[],
  api?:Function,
  height?:string,
  tableProps?:any,
  pictureKey?:string,
}>(),{
  height: '100vh',
})



const emit = defineEmits(['ItemClick'])
const tableList = ref([])
const totals = ref(0)
const tableState = ref({
  pageIndex: 1,
  pageSize: 10,
});


const searchModelParams = ref({})
const tableColumns = computed(() => {
  const columns = props.columns || []
  return columns.map(item => {
    if (item.search) {
      const key = item.search.key || item.dataIndex
      searchModelParams[key] = undefined;
    }
    return item
  })
})


function getSearchParams() {
  const searchParams = searchModelParams.value;
  const query = {};
  Object.keys(searchParams).forEach(key => {
    if (searchParams[key] === null || searchParams[key] !== '') {
      query[key] = searchParams[key];
    }
  });
  return query;
}

async function getList(pageIndex?: number) {
  Taro.showLoading({ title: "加载中..." });
  if (pageIndex === 1) {
    tableState.value.pageIndex = pageIndex;
    tableList.value = [];
  }
  const query = {
    ...tableState.value,
    ...getSearchParams()
  };
  const result = await props.api(query);
  if (Array.isArray(result)) {
    totals.value = result.length;
    tableList.value.push(...result);
  } else {
    const { total, list } = result
    totals.value = total;
    tableList.value.push(...list);
    console.log('tableList',tableList)
  }
  Taro.hideLoading();
}

function handleScroll() {
  const maxPageIndex = Math.ceil(totals.value / 10);
  if (maxPageIndex > tableState.value.pageIndex) {
    tableState.value.pageIndex++;
    getList();
  }
}


function formatVal(col, value) {
  if (/time/i.test(col.dataIndex) || /date/i.test(col.dataIndex)) {
    return formatDate(value)
  } else if (col.valueMap) {
    return col.valueMap[value]
  } else if (col.formatter) {
    return col.formatter(value)
  } else if (value && value !== 0) {
    return value
  } else {
    return value === 0 ? 0 : '-'
  }
}

function itemClick(item){
  emit('ItemClick', item)
}


onMounted(()=>{
  getList(1)
})
defineExpose({
  getList,
  getSearchParams,
  tableState,
})
</script>
<template>
  <view>
    <slot name="search" v-bind="{ searchModelParams }">
    </slot>
    <scroll-view scrollY :style="`height: ${height}`" @scrolltolower="handleScroll">
      <slot name="list" v-bind="{ tableList }">
        <nut-cell v-for="item in tableList" v-bind="tableProps" :key="item.id" @click="itemClick(item)">
          <view class="goods-item">
            <img v-if="pictureKey" :src="item[pictureKey]" class="goods-item-picture" alt="加载失败" />
            <view class="goods-item-desc">
              <view v-for="(colItem, colIndex) in tableColumns" :key="colIndex">
                <slot :name="colItem.dataIndex" v-bind="{ colItem }">
                  <strong style="font-size:16px" v-if="colIndex === 0" class="">
                    {{ formatVal(colItem, item[colItem.dataIndex]) }}
                  </strong>
                  <view v-else class="">
                    {{ colItem.title }}：{{ formatVal(colItem, item[colItem.dataIndex]) }}
                  </view>
                </slot>
              </view>
            </view>
          </view>
        </nut-cell>
      </slot>

    </scroll-view>
  </view>
</template>
<style lang="scss" scoped>
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
      padding: 1rpx;
    }
  }
}
</style>
