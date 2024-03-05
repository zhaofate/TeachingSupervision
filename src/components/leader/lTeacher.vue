<!-- 用户管理 -->

<template>
  <div style="color: black">
    <q-card
      style="background-color: transparent"
      flat
      class="q-mb-md q-gutter-sm"
    >
      <q-btn
        class="btn-fixed-width"
        color="blue-9"
        label="添加督导教师"
        icon="flight_takeoff"
        @click="addTeacherControl = true"
      />
    </q-card>
    <div v-for="(item, index) in teachers" :key="index">
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
          <q-card-section class="row items-center">
            <q-item-label class="q-mr-md" style="margin-top: 4px">
              {{ item.professionalType }}
            </q-item-label>
            <q-item-label> {{ item.jobNumber }} 级 </q-item-label>
          </q-card-section>
        </q-card-section>
      </q-card>
    </div>
    <!-- 添加教师弹框 -->
    <q-dialog v-model="addTeacherControl">
      <q-card style="width: 600px; max-width: 80vw; height: 100%">
        <q-toolbar class="bg-blue-grey-2 text-primary">
          <q-avatar>
            <q-icon name="style" size="2em" color="primary" />
          </q-avatar>

          <q-toolbar-title
            ><span class="text-weight-bold">
              添加督导教师
            </span></q-toolbar-title
          >
          <q-btn flat round dense icon="close" v-close-popup />
        </q-toolbar>

        <q-separator />
        <q-item class="row items-center" style="width: 100%">
          <q-card-section class="col-12">
            <q-markup-table flat bordered class="q-mx-md">
              <thead class="bg-blue-3">
                <tr>
                  <th colspan="5">
                    <div class="row no-wrap items-center">
                      <div class="text-h6 text-white">待添加教师</div>
                    </div>
                  </th>
                </tr>
                <tr>
                  <th class="text-left">姓名</th>
                  <th class="text-right">年龄</th>
                  <th class="text-right">专业</th>
                  <th class="text-right">年级</th>
                  <th class="text-right">操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in toAddTeachers" :key="index">
                  <td class="text-left">{{ item.name }}</td>
                  <td class="text-right">{{ item.age }}</td>
                  <td class="text-right">{{ item.professionalType }}</td>
                  <td class="text-right">{{ item.jobNumber }}</td>
                  <td class="text-right">
                    <q-radio
                      keep-color
                      v-model="supervisingTeacherId"
                      :val="item.id"
                      label="选择"
                      color="cyan"
                    />
                  </td>
                </tr>
              </tbody>
            </q-markup-table>
          </q-card-section>
        </q-item>
        <q-item class="q-mb-md">
          <q-item-section class="col-9"></q-item-section>
          <q-item-section class="col-2">
            <q-btn
              q-ml-md
              class="bg-blue-5 text-white"
              label="提交"
              flat
              @click="handleAddTeacher()"
            />
          </q-item-section>
        </q-item>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
// @ts-ignore
import request from "@/api/index";

import { useQuasar } from "quasar";

const $q = useQuasar();

// 所有我管理的督导教师
let teachers = ref([]);

// 没有组长的教师信息
let toAddTeachers = ref([]);

let addTeacherControl = ref(false);

let supervisingTeacherId = ref(null);

// 添加老师
const handleAddTeacher = async () => {
  if (supervisingTeacherId.value) {
    const res = await request.get("/leader/add", {
      supervisingTeacherId: supervisingTeacherId.value,
    });
    if (res.data.success) {
      $q.notify({
        color: "green-4",
        textColor: "white",
        icon: "cloud_done",
        message: "添加成功",
      });
      await updateTeachers();
    } else {
      $q.notify({
        color: "red-5",
        textColor: "white",
        icon: "warning",
        message: res.data.errorMsg,
      });
    }
    addTeacherControl.value = false;
    supervisingTeacherId.value = false;
  } else {
    $q.notify({
      color: "red-5",
      textColor: "white",
      icon: "warning",
      message: "未选择",
    });
  }
};

// 更新教师列表
const updateTeachers = async () => {
  teachers.value = await getTeachers();
  toAddTeachers.value = await getToAddTeachers();
};

// 获取教师信息
const getTeachers = async () => {
  const res = await request.get("/leader/all");
  return res.data.data; // 返回获取到的教师数据
};

// 获取待添加的老师信息
const getToAddTeachers = async () => {
  const res = await request.get("/leader/allAlone");
  return res.data.data;
};

onMounted(async () => {
  await updateTeachers();
});
</script>
