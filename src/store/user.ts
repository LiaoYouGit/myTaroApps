import { defineStore } from "pinia";
import { computed, ref, toRefs } from "vue";
import { getLoginInfo } from '@/api/auth';
import { $navigateTo } from "@/lib/util";
interface UserInfo{
  id?:number,
  classfication?:number
}

export default defineStore('userStore',()=>{
  const state = ref<{
    isInited: boolean,
    userInfo: UserInfo | null,
  }>({
    isInited: false, // 是否加载完成
    userInfo: null,
  })

  const isLogin = computed(()=>!!(state.value.userInfo?.id))

  const isAdmin = computed(()=>isLogin.value && state.value.userInfo?.classfication === 1)

  async function initLoginState (userInfo = null) {
    try {
      state.value.userInfo = userInfo || await getLoginInfo();
      if (!state.value.userInfo) {
        gotoLogin();
      }

      setTimeout(() => {
        state.value.isInited = true;
      });
    } catch (error) {

    } finally {
    }
  }

  async function gotoLogin () {
    $navigateTo('/pages/login/index');
  }

  return {
    ...toRefs(state),
    isLogin,
    isAdmin,
    initLoginState,
    gotoLogin,
  }
})
