<!-- 督导任务 -->

<!-- 督导任务 -->

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
        label="新增任务"
        icon="flight_takeoff"
        @click="addTaskControl = true"
      />
    </q-card>
    <q-markup-table>
      <thead class="bg-blue-4">
        <tr>
          <th colspan="11">
            <div class="row no-wrap items-center">
              <div class="text-h6 q-ml-md text-white">督导任务</div>
            </div>
          </th>
        </tr>
        <tr>
          <th class="text-left">id</th>
          <th class="text-right">任务</th>
          <th class="text-right">督导教师</th>
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
          <td class="text-right">{{ item.superName }}</td>
          <td class="text-right">{{ item.teacherName }}</td>
          <td class="text-right">{{ item.course.name }}</td>
          <td class="text-right">{{ item.course.className }}</td>
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
            ><span class="text-weight-bold"> 任务详情页 </span></q-toolbar-title
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
          <q-item-label class="q-mb-md">
            督导教师：{{ task.superName }}</q-item-label
          >
          <q-item-label class="q-mb-md">
            评课教师：{{ task.teacherName }}</q-item-label
          >
          <q-item-label class="q-mb-md">
            评课班级：{{ task.course.className }}</q-item-label
          >
          <q-item-label class="q-mb-md">
            课程：{{ task.course.name }}</q-item-label
          >

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

    <!-- 新增任务表单 -->
    <q-dialog v-model="addTaskControl">
      <q-card style="width: 100%; height: 100%">
        <q-toolbar>
          <q-avatar>
            <q-icon name="style" size="2em" color="primary" />
          </q-avatar>

          <q-toolbar-title
            ><span class="text-weight-bold"> 新增任务页 </span></q-toolbar-title
          >
          <q-btn flat round dense icon="close" v-close-popup />
        </q-toolbar>
        <q-form @submit="addTask()">
          <q-card-section style="width: 100%">
            <q-input
              style="width: 50%"
              v-model="reqAddTaskInfo.taskName"
              filled
              dense
              color="blue-6"
              label="任务名字"
              :rules="[(val) => (val && val.length > 0) || '任务不为空']"
            />
            <q-input
              style="width: 100%"
              v-model="reqAddTaskInfo.comment"
              filled
              autofocus
            autogrow
              dense
              color="blue-6"
              label="任务内容"
              :rules="[(val) => (val && val.length > 0) || '内容不为空']"
            />
            <q-select
              v-model="reqAddTaskInfo.superId"
              dense
              :options="superNameOptions"
              style="width: 300px"
              options-cover
              class="q-mt-md"
              emit-value
              map-options
              :rules="[(val) => !!val || '请选择督导教师']"
            >
              <template v-slot:before>
                <q-item-label caption class="text-grey-10"
                  >选择督导教师：</q-item-label
                >
              </template>
            </q-select>
            <q-select
              v-model="reqAddTaskInfo.teacherId"
              dense
              :options="teacherNameOptions"
              style="width: 300px"
              options-cover
              class="q-mt-md"
              emit-value
              map-options
              :rules="[(val) => !!val || '请选择评教教师']"
            >
              <template v-slot:before>
                <q-item-label caption class="text-grey-10"
                  >选择评教老师：</q-item-label
                >
              </template>
            </q-select>
            <q-select
              v-model="reqAddTaskInfo.courseId"
              dense
              :options="courseNameOptions"
              style="width: 300px"
              options-cover
              class="q-mt-md"
              emit-value
              map-options
              :rules="[(val) => !!val || '请选择课程']"
            >
              <template v-slot:before>
                <q-item-label caption class="text-grey-10"
                  >选择课程：</q-item-label
                >
              </template>
            </q-select>
            <q-select
              v-model="reqAddTaskInfo.className"
              dense
              :options="classNameOptions"
              style="width: 300px"
              options-cover
              class="q-mt-md"
              :rules="[(val) => !!val || '请选择班级']"
            >
              <template v-slot:before>
                <q-item-label caption class="text-grey-10"
                  >选择班级：</q-item-label
                >
              </template>
            </q-select>
            <q-input
              style="width: 300px"
              filled
              v-model="reqAddTaskInfo.deadline"
              mask="date"
              :rules="['date']"
              class="q-mt-md"
              dense
            >
              <template v-slot:before>
                <q-item-label caption class="text-grey-10"
                  >选择截止时间：</q-item-label
                >
              </template>
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    ref="qDateProxy"
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="reqAddTaskInfo.deadline">
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Close"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </q-card-section>

          <q-card-section>
            <q-btn
              type="submit"
              class="float-right"
              size="12px"
              style="color: #ff0080"
              flat
              label="提交新增任务"
            />
          </q-card-section>
        </q-form>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive, watch } from "vue";
// @ts-ignore
import request from "@/api/index";
import { useQuasar } from "quasar";

const $q = useQuasar();

let tasks = ref([]);
let task = ref({});
let taskControl = ref(false);

let addTaskControl = ref(false);

let reqAddTaskInfo = reactive({
    taskName: "",
    content: "",
    superId: null,
    courseId: null,
    teacherId: null,
    className: null,
    deadline: null,
  });

let superNameOptions = ref([]);
let teacherNameOptions = ref([]);
let courseNameOptions = ref([]);
let classNameOptions = ref([]);

watch(
  () => reqAddTaskInfo.teacherId,
  (newTeacherId, oldTeacherId) => {
    if (newTeacherId) {
      getClass(newTeacherId);
    }
  }
);

onMounted(async () => {
  updateTasks();
  await initOptions();
});

function initReqInfo() {
  reqAddTaskInfo = {
    taskName: "",
    content: "",
    superId: null,
    courseId: null,
    teacherId: null,
    className: null,
    deadline: null,
  };
}

// 新增任务
const addTask = async () => {
  const res = await request.get("/leader/setTask", { params: reqAddTaskInfo });
  console.log(res);
  if (res.data.success) {
    $q.notify({
      color: "green-4",
      textColor: "white",
      icon: "cloud_done",
      message: "布置任务成功",
    });
    addTaskControl.value = false;
    initReqInfo();
    updateTasks();
  } else {
    $q.notify({
      color: "green-4",
      textColor: "white",
      icon: "cloud_done",
      message: res.data.errorMsg,
    });
  }
};

// 获取详情页弹框
const handleTaskBtn = (item) => {
  task.value = item;
  taskControl.value = true;
};

// 获取一些信息
const initOptions = async () => {
  await getSuperTeachers();
  await getTeachers();
};

//获取督导教师
const getSuperTeachers = async () => {
  const res = await request.get("/leader/all");
  const teacherList = res.data.data.map((item, index) => {
    return {
      value: item.id,
      label: item.name,
    };
  });
  superNameOptions.value = teacherList;
};

// 获取教师信息
const getTeachers = async () => {
  const res = await request.get("/super/teachers");
  const teacherList = res.data.data.map((item, index) => {
    return {
      value: item.id,
      label: item.name,
    };
  });
  teacherNameOptions.value = teacherList;
};

// 获取班级信息
const getClass = async (id) => {
  const res = await request.get("/leader/allCurriculum", { teacherId: id });
  const courseList = res.data.data.map((item, index) => {
    return {
      value: item.id,
      label: item.name,
    };
  });
  const classList = res.data.data.map((item, index) => {
    return item.className;
  });
  courseNameOptions.value = courseList;
  classNameOptions.value = classList;
};

// 获取任务列表
const getTasks = async () => {
  const res = await request.get("/leader/allTask");
  return res.data.data;
};

// 更新任务列表
const updateTasks = async () => {
  tasks.value = await getTasks();
};
</script>
