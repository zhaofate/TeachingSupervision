<template>
  <div class="q-pa-md" style="min-width: 200px; width: 400px">
    <q-form @submit="onLogin" class="q-gutter-md">
      <q-input
        filled
        v-model="account"
        label="账号"
        hint="请输入账号"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || '账号不为空']"
      />

      <q-input
        filled
        type="password"
        v-model="password"
        label="密码"
        hint="请输入密码"
        lazy-rules
        :rules="[(val) => (val !== null && val !== '') || '密码不为空']"
      />

      <div>
        <q-btn label="登录" type="submit" color="primary" />
      </div>
      <p>还没有账号？<a @click="goToRegister">去注册</a></p>
    </q-form>
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { ref } from "vue";
import router from "../../router";
// @ts-ignore
import request from "@/api/index";

// @ts-ignore
const $q = useQuasar();

const account = ref(null);
const password = ref(null);

const goToRegister = () => {
  router.push("/register");
};

const onLogin = async () => {
  // @ts-ignore
  const res = await request.get(
    `/user/login?account=${account.value}&password=${password.value}`
  );
  if (res.data.success) {
    $q.notify({
      color: "green-4",
      textColor: "white",
      icon: "cloud_done",
      message: "登录成功",
    })
    if (res.data.identity==1){
      router.push("/teacher");
    }else if (res.data.identity==2){
      router.push("/leader");
    }else {
      router.push("/supervision");
    }
  } else {
    $q.notify({
      color: "red-5",
      textColor: "white",
      icon: "warning",
      message: res.data.errorMsg,
    })
  }
};
</script>

<style scoped lang="scss">
.q-form {
  font-size: smaller;
  color: #6a6a6b;
}
</style>
