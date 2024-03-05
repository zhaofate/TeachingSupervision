<!-- 个人中心 -->

<!-- 个人中心 -->

<template>
  <div style="color: #000">
    <q-card class="my-card q-mt-xl q-ml-xl bg-transparent" flat>
      <q-item>
        <q-item-section avatar>
          <q-avatar>
            <q-icon name="person_4" size="xl" v-if="myInfo.gender == '男'" />
            <q-icon name="person_3" size="xl" v-else="myInfo.gender == '女'" />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ myInfo.name }}</q-item-label>
        </q-item-section>

        <q-item-section class="col-1" style="min-width: 100px">
          <q-btn
            flat
            q-ml-md
            style="color: #548dbb; width: 100px"
            label="重置密码"
            @click="psdFrameControl = true"
          />
        </q-item-section>
      </q-item>

      <q-separator />

      <q-card-section horizontal>
        <q-card-section class="col-2">
          <q-item-label class="q-mb-md q-mt-md">
            {{ myInfo.professionalType }}
          </q-item-label>
          <q-item-label> {{ myInfo.jobNumber }} 级 </q-item-label>
        </q-card-section>
      </q-card-section>
      <q-card-section horizontal>
        <q-card-section class="col-10">
          <q-item-label style="white-space: pre-wrap" class="q-mb-md">
            年龄：{{ myInfo.age }}
          </q-item-label>
          <q-item-label style="white-space: pre-wrap">
            电话号码：{{ myInfo.telephone }}
          </q-item-label>
        </q-card-section>
      </q-card-section>
    </q-card>
    <q-dialog v-model="psdFrameControl" persistent>
      <q-card style="min-width: 500px">
        <q-card-section>
          <div class="text-h6">重置密码</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            filled
            type="password"
            v-model="password"
            label="密码"
            hint="请输入密码"
            lazy-rules
            :rules="[(val) => (val !== null && val !== '') || '密码不为空']"
          />
        </q-card-section>

        <q-card-actions fixed-right class="text-primary">
          <q-btn flat label="取消" v-close-popup @click="password=null"/>
          <q-btn flat label="确定" @click="handleResetBtn()" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
// @ts-ignore
import request from "@/api/index";
import { useQuasar } from 'quasar'
const $q = useQuasar()
const myInfo = ref({});

const password = ref(null);
const psdFrameControl = ref(false);

onMounted(async () => {
  myInfo.value = await getInfo();
});

// 获取个人信息
const getInfo = async () => {
  const res = await request.get("/super/myInfo");
  return res.data.data;
};


// 重置密码
const handleResetBtn = async () => {
  const res = await request.get("/user/reset?password="+password.value);
  console.log(res.data.success)
  if(res.data.success) {
    $q.notify({
      color: "green-4",
      textColor: "white",
      icon: "cloud_done",
      message: res.data.data,
    });
  }
  password.value =null;
    psdFrameControl.value = false;
}
</script>

