<script lang="ts" setup>
import Taro from "@tarojs/taro";
import { computed, onMounted, ref } from "vue";
import { getApprovalType } from "@/api/cart";
import CommonPicker from "@/components/CommonPicker.vue";
import { getUserList } from "@/api/purchaseOrder";
import { formatAmount, $navigateTo, $navigateBack } from "@/lib/util";
import { pageList } from "@/api/address";
import { create } from "@/api/purchaseOrder";
const listData = ref(Taro.getStorageSync("createSales"));
const goodsTotalNum = computed(() => {
  let count = 0;
  listData.value.map((item) => {
    count += Number(item.num) || 0;
  });
  return count;
});

const goodsTotalPrice = computed(() => {
  let count = 0;
  listData.value.map((item) => {
    count += (Number(item.num) || 0) * item.price;
  });
  return formatAmount(count);
});

const approvalTypeList = ref([]);

const form = ref({
  approvalTypeId: null,
  applyUserName: "",
  applyUserPhone: "",
  operation: "",
  remark: "",
  addressId: null,
});

async function getApproval() {
  approvalTypeList.value = await getApprovalType();
  form.value.approvalTypeId = approvalTypeList.value[0].id;
}

// 获取请购人
async function getUsers(applyUserName) {
  const { list } = await getUserList({ applyUserName: applyUserName || "" });
  const userList = list.map((item) => ({
    value: item.applyUserPhone,
    text: item.applyUserName,
  }));
  return userList;
}

async function setUser(item) {
  console.log("item", item);
  Object.assign(form.value, {
    applyUserName: item.text,
    applyUserPhone: item.value,
  });
}

// 获取收货人信息
const consigneeList = ref([]);
async function getConsigneeList() {
  consigneeList.value = await pageList();
}
onMounted(() => {
  getApproval();
  getConsigneeList();
});

// 提交生成采购需求单
const form$ = ref()
async function onSubmit(){
  await form$.value.validate().then(async ({ valid }: any) => {
    if (valid) {
      if(!goodsTotalNum.value){
        return Taro.showToast({title:"总数量不能为0", icon:'error'})
      }
      Taro.showLoading({title:'加载中...'})
      const query = {
        ...form.value,
        itemList:listData.value.map(item=>({
          instructions: form.value.operation,
          itemId: item.itemId,
          num: item.num,
          skuId: item.skuId,
        }))
      };
      await create(query)
      Taro.hideLoading()
      Taro.showToast({title:"成功", icon:'success'})
      $navigateBack()
    }
  });
}

async function validFunc(prop){
  await form$.value.validate(prop);
}
const rules = ref({
  addressId:[{ required: true, message: '请选择收货人地址' }],
  operation:[{ required: true, message: '请输入使用说明' }]
})
</script>
<template>
  <view>
    <nut-form ref="form$" :model-value="form" :rules="rules">
      <nut-form-item label="用途" prop="approvalTypeId">
        <nut-radio-group v-model="form.approvalTypeId">
          <nut-radio
            icon-size="14"
            v-for="item in approvalTypeList"
            :key="item.id"
            :label="item.id"
            >{{ item.title }}</nut-radio
          >
        </nut-radio-group>
      </nut-form-item>
      <nut-form-item label="请购人">
        <nut-input
          v-model="form.applyUserName"
          placeholder="请输入姓名"
          type="text"
        >
          <template #right>
            <common-picker
              title="历史请购人"
              ref="commonPicker$"
              :api="getUsers"
              @submit="setUser"
            >
              <template v-slot:default="{ open }">
                <nut-button type="primary" shape size="small" @click="open"
                  >历史请购人</nut-button
                >
              </template>
            </common-picker>
          </template>
        </nut-input>
      </nut-form-item>
      <nut-form-item label="请购人电话">
        <nut-input
          v-model="form.applyUserPhone"
          placeholder="请输入请购人电话"
          type="text"
        />
      </nut-form-item>
      <nut-form-item label="使用说明" prop="operation" required>
        <nut-textarea
          v-model="form.operation"
          placeholder="请输入使用说明"
          type="text"
          @blur="validFunc('operation')"
        />
      </nut-form-item>
      <nut-form-item label="收货人信息" prop="addressId" required>
        <nut-radio-group v-model="form.addressId" @change="validFunc('addressId')">
          <nut-radio
            icon-size="14"
            v-for="item in consigneeList"
            :key="item.id"
            :label="item.id"
            >{{ item.fullAddress }}</nut-radio
          >
        </nut-radio-group>
      </nut-form-item>

      <nut-form-item label="备注">
        <nut-textarea
          v-model="form.remark"
          placeholder="请输入备注"
          type="text"
        />
      </nut-form-item>
      <nut-form-item label="采购商品"> </nut-form-item>
    </nut-form>
    <nut-cell v-for="item in listData" :key="item.skuId">
      <view class="goods-item">
        <img
          :src="item.picture"
          class="goods-item-picture"
          alt="加载失败"
          @tap="
            $navigateTo(`/pages/goods/detail?describeUrl=${item.describeUrl}`)
          "
        />
        <view class="goods-item-desc">
          <view>
            <strong class="goods-item-desc-skuName">{{ item.skuName }}</strong>
          </view>
          <view v-if="item.properties"
            >商品规格：{{ item.properties.join(",") }}</view
          >
          <view>商品单价：{{ formatAmount(item.price) }}元</view>
          <view>
            <nut-input-number v-model="item.num" step="1" />
          </view>
          <view v-if="item.price" style="color: red">
            <strong>￥{{ formatAmount(item.price * item.num) }}</strong>
          </view>
        </view>
      </view>
    </nut-cell>
    <nut-cell>
      <view class="footer-total">
        共
        <strong class="red-font">{{ listData.length }}</strong>
        种商品，合计数量
        <strong class="red-font">{{ goodsTotalNum }}</strong>
        件, 采购总金额
        <strong class="red-font">{{ goodsTotalPrice }}</strong> 元
      </view>
    </nut-cell>
    <view style="padding: 20px">
      <nut-button size="large" type="primary" @click="onSubmit">提交</nut-button>
    </view>
  </view>
</template>
<style lang="scss" scoped>
.nut-cell-group {
  margin-top: 0;
}
.footer-total {
  text-align: right;
  width: 100%;
  .red-font {
    color: red;
  }
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
  }
}
</style>
