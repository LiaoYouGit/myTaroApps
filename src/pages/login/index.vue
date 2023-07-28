<script lang="ts" setup>
import { ref } from "vue";
import { login } from "@/api/auth";
import useUserStore from "@/store/user";
import { $redirectTo } from "@/lib/util";
import LOGO from "@/assets/logo.jpg";
const userStore = useUserStore();
const form = ref({
  password: undefined,
  userName: undefined,
});
const rules = {
  password: [{ required: true, message: "请输入密码" }],
  userName: [{ required: true, message: "请输入用户名称" }],
};

const form$ = ref();
async function onLogin() {
  await form$.value.validate().then(async ({ valid }: any) => {
    if (valid) {
      const query = {
        ...form.value,
      };
      console.log("query", query);
      const result = await login(query);
      await userStore.initLoginState(result);
      $redirectTo("/pages/goods/index");
    }
  });
}
// 失去焦点校验
async function customBlurValidate(prop) {
  await form$.value.validate(prop);
}
</script>
<template>
  <view class="container">
    <view class="main">
      <view class="logo-container">
        <img class="logo-image" :src="LOGO" />
        <view class="logo-title"> 广州医科大学第二附属医院 </view>
      </view>
      <nut-form ref="form$" :model-value="form" :shadow="false" :rules="rules">
        <nut-form-item label="用户名：" prop="userName">
          <nut-input
            v-model="form.userName"
            class="nut-input-text"
            placeholder="请输入用户名"
            @blur="customBlurValidate('userName')"
            type="text"
          />
        </nut-form-item>
        <nut-form-item label="密码：" prop="password">
          <nut-input
            type="password"
            v-model="form.password"
            @blur="customBlurValidate('password')"
            class="nut-input-text"
            placeholder="请输入密码"
          />
        </nut-form-item>
      </nut-form>
      <view style="margin-top: 20rpx">
        <nut-button size="large" type="info" @click="onLogin">登 录</nut-button>
      </view>
    </view>
  </view>
</template>
<style lang="scss" scoped>
.container {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100vh;
  .main {
    flex: 1;
    padding: 20rpx;
    .logo-container {
      width: 100%;
      .logo-image {
        object-fit: cover;
        margin-left: 50%;
        transform: translateX(-50%);
      }
      .logo-title {
        text-align: center;
        color: #5e9ce3;
        font-size: 50px;
        font-weight: bold;
        margin: 30px 0;
        .en {
          font-size: 50%;
        }
      }
    }
  }
}
</style>
