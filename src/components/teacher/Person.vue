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

        <q-item-section class="col-1" style="min-width: 100px"></q-item-section>
      </q-item>

      <q-separator />

      <q-card-section horizontal>
        <q-card-section class="col-2">
          <q-item-label class="q-mb-md q-mt-md">
            {{ myInfo.professionalType }}
          </q-item-label>
          <q-item-label>
            {{ myInfo.jobNumber }} 级
          </q-item-label>
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
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
// @ts-ignore
import request from "@/api/index";
const myInfo = ref({});

onMounted(async () => {
  myInfo.value = await getInfo();
  console.log(myInfo.value);
});

// 获取个人信息
const getInfo = async () => {
  const res = await request.get("/teacher/myInfo");
  return res.data.data;
};
</script>
