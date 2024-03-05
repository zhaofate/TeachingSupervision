<!-- 系统入口页面 -->

<script setup>
import { onMounted,ref } from "vue";
import request from "@/api/index"
import { useQuasar } from "quasar";
// @ts-ignore
import LayoutSvg from "@/components/layout/LayoutSvg.vue";
const $q = useQuasar();

const ip = ref(false);

// 获取ip
const checkIp = async () => {
  const res = await request.get('/ip/checkIP'
    );
    if (res.data.success) {
      ip.value = true;
  } else {
    $q.notify({
      color: "red-5",
      textColor: "white",
      icon: "warning",
      message: res.data.errorMsg,
    });
    ip.value=false;
  }
}

onMounted(async ()=> {
  await checkIp();
})
</script>

<template>
  <div id="container" v-if="ip">
    <div class="left_column">
      <LayoutSvg />
    </div>
    <div class="right_form">
      <div class="title">教学督导工作管理系统</div>
      <!-- 子组件的位置 登录和注册表单-->
      <router-view></router-view>
    </div>
  </div>
  <div id="container" v-else>
    <div class="left_column">
      <LayoutSvg />
    </div>
    <div class="right_form">
      <div class="title">教学督导工作管理系统</div>
        <h2>请使用校内网</h2>
    </div>
  </div>
</template>

<style scoped lang="scss">
#container {
  width: 90%;
  height: 100vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
  row-gap: 1rem;
  color: #000;
  .left_column {
    flex: 1;
    margin: auto;
  }
  .right_form {
    width: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-right: 5rem;
    .title {
      margin: 20px auto;
      text-align: center;
    }
  }
}
</style>
