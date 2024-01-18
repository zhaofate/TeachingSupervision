<template>
  <div class="q-pa-md" style="min-width: 200px; width: 400px">
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <q-input
        filled
        v-model="name"
        label="账号"
        hint="请输入账号"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || '账号不为空']"
      />

      <q-input
        filled
        v-model="age"
        label="密码"
        lazy-rules
        :rules="[
          (val) => (val !== null && val !== '') || '密码不为空',
          (val) => (val > 0 && val < 100) || 'Please type a real age',
        ]"
      />

      <q-toggle v-model="accept" label="我同意" />

      <div>
        <q-btn
        @click="onLogin"
          label="登录"
          type="submit"
          color="primary"
        />
      </div>
      <p>还没有账号？<a @click="goToRegister">去注册</a></p>
    </q-form>
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { ref } from "vue";
import router from "../../router";

const $q = useQuasar();

const name = ref(null);
const age = ref(null);
const accept = ref(false);

const goToRegister = () => {
  router.push('/login/register')
}

const onLogin = () => {
  router.push('/home')
}

  const onSubmit = ()=> {
    if (accept.value !== true) {
      $q.notify({
        color: "red-5",
        textColor: "white",
        icon: "warning",
        message: "You need to accept the license and terms first",
      });
    } else {
      $q.notify({
        color: "green-4",
        textColor: "white",
        icon: "cloud_done",
        message: "Submitted",
      });
    }
  }

  const onReset = ()=> {
    name.value = null;
    age.value = null;
    accept.value = false;
  }
</script>

<style scoped lang="scss">
.q-form {
  font-size: smaller;
  color: #6a6a6b;
}
</style>
