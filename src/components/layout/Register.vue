<template>
  <div class="q-pa-md" style="min-width: 200px; width: 400px">
    <q-form @submit="onRegister" class="q-gutter-md">
      <div class="row">
        <q-input
        class="q-pr-md"
        style="width: 40%"
          filled
          v-model="regForm.name"
          label="姓名"
          hint="请输入姓名"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || '姓名不为空']"
        />
        <q-select
        class="q-pr-md"
          filled
          v-model="regForm.gender"
          label="性别"
          :options="genderOptions"
          style="width: 30%"
        />
        <q-input
          filled
          v-model="regForm.age"
          label="年龄"
          type="number"
          style="width: 30%"
          lazy-rules
          :rules="[(val) => (val) || '年龄不为空',
        val => val > 0 && val < 100 || '输入正确年龄']"
        />
      </div>

      <q-input
        filled
        v-model="regForm.account"
        label="账号"
        hint="请输入账号"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || '账号不为空']"
      />
      <q-input
        filled
        v-model="regForm.password"
        type="password"
        label="密码"
        hint="请输入密码"
        lazy-rules
        :rules="[(val) => (val !== null && val !== '') || '密码不为空']"
      />
      <div class="row">
        <q-select
        class="q-pr-md"
          filled
          v-model="regForm.identity"
          label="身份"
          :options="identityOptions"
          style="width: 40%"
        />
        <q-select
        class="q-pr-md"
          filled
          v-model="regForm.professionalType"
          label="专业"
          :options="professionalTypeOptions"
          style="width: 40%"
        />
        <q-input
          filled
          v-model="regForm.jobNumber"
          label="年级"
          type="number"
          style="width: 20%"
          no-error-icon
          :rules="[(val) => (val && val.length > 0 && val.length <=4) || '年级不正确',
        val => val > 1950 && val < 2050 || '年级不正确']"
        />
      </div>

      <q-input
        filled
        v-model="regForm.telephone"
        type="tel"
        label="电话号码"
        hint="请输入电话号码"
        lazy-rules
        :rules="[(val) => (val !== null && val !== '') || '号码不为空',
      val => (val.length==11) || '输入正确号码']"
      />
      <div>
        <q-btn label="注册" type="register" color="primary" />
      </div>
      <p>已有账号？<a @click="goToLogin">去登录</a></p>
    </q-form>
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
// @ts-ignore
import { reactive, ref } from "vue";
import router from "../../router";
// @ts-ignore
import request from "@/api/index";

const $q = useQuasar();

const genderOptions = ["男", "女"];
const identityOptions = ["教师","督导教师","督导组长"]
const professionalTypeOptions = ["软件工程"]

const regForm = reactive({
  name: "",
  account: "",
  password: "",
  gender: "",
  age: null,
  identity: null,
  professionalType: "",
  jobNumber: "",
  telephone: "",
});


const goToLogin = () => {
  router.push("/login");
};

const onRegister = async () => {
  // @ts-ignore
  const reqestData = regForm;
  // @ts-ignore
  reqestData.identity = identityOptions.indexOf(reqestData.identity) + 1;
  const res = await request.post('/user/reg',reqestData)
  console.log(res);
  if (res.data.success) {
    $q.notify({
      color: "green-4",
      textColor: "white",
      icon: "cloud_done",
      message: "注册成功",
    })
    router.push('/login')
  }
  else{
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
