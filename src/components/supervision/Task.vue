<!-- 督导任务 -->

<template>
  <div style="color: black">
    <q-markup-table>
      <thead class="bg-blue-4">
        <tr>
          <th colspan="10">
            <div class="row no-wrap items-center">
              <div class="text-h6 q-ml-md text-white">督导任务</div>
            </div>
          </th>
        </tr>
        <tr>
          <th class="text-left">id</th>
          <th class="text-right">任务</th>
          <th class="text-right">老师</th>
          <th class="text-right">课程</th>
          <th class="text-right">班级</th>
          <th class="text-right">开始时间</th>
          <th class="text-right">截止时间</th>
          <th class="text-right">接受状态</th>
          <th class="text-right">完成状态</th>
          <th class="text-right">编辑</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in tasks" :key="index">
          <td class="text-left">{{ item.id }}</td>
          <td class="text-right">{{ item.name }}</td>
          <td class="text-right">老师</td>
          <td class="text-right">课程</td>
          <td class="text-right">班级</td>
          <td class="text-right">{{ item.createTime }}</td>
          <td class="text-right">{{ item.deadline }}</td>
          <td class="text-right">
            <q-btn
              v-if="item.receivingStatus"
              size="12px"
              color="primary"
              flat
              label="已接收"
            />
            <q-btn
              v-else="!item.receivingStatus"
              size="12px"
              flat
              color="deep-orange"
              label="未接收"
            />
          </td>
          <td class="text-right">
            <q-btn
              v-if="item.completionStatus"
              size="12px"
              color="primary"
              flat
              label="已完成"
            />
            <q-btn
              v-else="!item.completionStatus"
              size="12px"
              flat
              color="deep-orange"
              label="未完成"
            />
          </td>
          <td class="text-right">
            <q-btn
              flat
              rounded
              color="primary"
              size="12px"
              @click="handleTaskBtn(item)"
              >详情</q-btn
            >
            <q-btn
              flat
              rounded
              color="primary"
              size="12px"
              v-if="!item.receivingStatus"
              @click="handleAcceptTask(item.id)"
              >接受任务</q-btn
            >
          </td>
        </tr>
      </tbody>
    </q-markup-table>

    <!-- 详情页弹框 -->
    <q-dialog v-model="taskControl">
      <q-card style="width: 100%; height: 400px">
        <q-toolbar>
          <q-avatar>
            <q-icon name="style" size="2em" color="primary" />
          </q-avatar>

          <q-toolbar-title
            ><span class="text-weight-bold">
              任务详情页
            </span></q-toolbar-title
          >

          <q-btn flat round dense icon="close" v-close-popup />
        </q-toolbar>

        <q-card-section style="width: 100%">
          <q-item-label style="width: 100%">任务内容:</q-item-label>
          <q-item-label
            class="q-mb-md q-ml-md"
            style="width: 100%; font-size: medium"
            >{{ task.content }}</q-item-label
          >
          <q-item-label class="q-mb-md"> 评课教师：{{ task.teacherName }}</q-item-label>
          <q-item-label class="q-mb-md"> 评课班级：{{ task.course.className }}</q-item-label>
          <q-item-label class="q-mb-md"> 课程：{{ task.course.name }}</q-item-label>

          <q-item-label caption>开始时间： {{ task.createTime }}</q-item-label>
          <q-item-label caption>截止时间： {{ task.deadline }}</q-item-label>
          <q-card-section>
            <q-btn
              class="float-right"
              v-if="task.completionStatus"
              size="12px"
              color="primary"
              flat
              label="已完成"
            />
            <q-btn
              class="float-right"
              v-else="!task.completionStatus"
              size="12px"
              flat
              color="deep-orange"
              label="未完成"
            />
            <q-btn
              class="float-right"
              v-if="task.receivingStatus"
              size="12px"
              color="primary"
              flat
              label="已接收"
            />
            <q-btn
              class="float-right"
              v-else="!item.receivingStatus"
              size="12px"
              flat
              color="deep-orange"
              label="未接收"
            />
          </q-card-section>
        </q-card-section>
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

let tasks = ref([]);
let task = ref({});
let taskControl = ref(false);

onMounted(() => {
  updateTasks();
});

//接受任务 
const handleAcceptTask = async (id) => {
  const res = await request.get("/super/accept", {taskId:id});
  if (res.data.success) {
    $q.notify({
      color: "green-4",
      textColor: "white",
      icon: "cloud_done",
      message: "已接收任务",
    });
    updateTasks();
  } else {
    $q.notify({
      color: "red-5",
      textColor: "white",
      icon: "warning",
      message: res.data.errorMsg,
    });
  }
}

// 获取详情页弹框
const handleTaskBtn = (item) => {
  task.value = item;
  taskControl.value = true;
};

// 获取任务列表
const getTasks = async () => {
  const res = await request.get("/super/allTask");
  return res.data.data;
};

// 更新任务列表
const updateTasks = async () => {
  tasks.value = await getTasks();
};
</script>
