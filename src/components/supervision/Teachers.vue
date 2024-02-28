<!-- 教师信息 -->

<template>
  <div style="color: black;">
    <div
      v-for="(item, index) in teachers"
      :key="index"
    >
      <q-card class="my-card q-mb-md" flat bordered>
        <q-item>
          <q-item-section avatar>
            <q-avatar>
              <q-icon name="person_4" size="xl" v-if="item.gender == '男'" />
              <q-icon name="person_3" size="xl" v-else="item.gender == '女'" />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ item.name }}</q-item-label>
            <q-item-label caption>
              年龄：{{ item.age }} 电话号码：{{ item.telephone }}
            </q-item-label>
          </q-item-section>

          <q-item-section class="col-1" style="min-width: 100px">
          </q-item-section>
        </q-item>

        <q-separator />

        <q-card-section horizontal>
          <q-card-section class=" row items-center">
            <q-item-label class="q-mr-md" style="margin-top: 4px;">
              {{ item.professionalType }}
            </q-item-label>
            <q-item-label > {{ item.jobNumber }} 级 </q-item-label>
          </q-card-section>
        </q-card-section>
      </q-card>
    </div>

  </div>
</template>

<script setup>
import {reactive,onMounted} from "vue"
// @ts-ignore
import request from "@/api/index"

const teachers = reactive([])


// 获取教师信息
const getTeachers = async () => {
  const res = await request.get("/super/teachers");
  return res.data.data; // 返回获取到的教师数据
};

onMounted(async () => {
  const teacherData = await getTeachers();
  teachers.push(...teacherData);
  });
</script>