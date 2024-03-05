<!-- 督导评价 -->

<template>
  <div style="color: black">
    <q-markup-table>
      <thead class="bg-blue-4">
        <tr>
          <th colspan="10">
            <div class="row no-wrap items-center">
              <div class="text-h6 q-ml-md text-white">已接收的督导任务</div>
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
              v-if="!item.completionStatus"
              @click="handleEvaluateBtn(item)"
              >进行评分</q-btn
            >
          </td>
        </tr>
      </tbody>
    </q-markup-table>
    <!-- 详情页弹框 -->
    <q-dialog v-model="taskControl">
      <q-card style="width: 100%; height: 500px">
        <q-toolbar>
          <q-avatar>
            <q-icon name="style" size="2em" color="primary" />
          </q-avatar>

          <q-toolbar-title
            ><span class="text-weight-bold"> 任务详情页 </span> {{ task.name }}</q-toolbar-title
          >

          <q-btn flat round dense icon="close" v-close-popup />
        </q-toolbar>

        <q-card-section style="width: 100%">
          <q-item-label style="width: 100%">任务内容: </q-item-label>
          <q-item-label
            class="q-mb-md q-ml-md"
            style="width: 100%; font-size: medium"
            >{{ task.content }}</q-item-label
          >
          <q-item-label class="q-mb-md"> 评课教师：{{ task.teacherName }}</q-item-label>
          <q-item-label class="q-mb-md"> 评课班级：{{ task.course.className}}</q-item-label>
          <q-item-label class="q-mb-md"> 课程：{{ task.course.name }}</q-item-label>

          <q-item-label v-if="task.completionStatus">评分： {{ task.createTime }}</q-item-label>
          <q-item-label v-if="task.completionStatus" style="width: 100%">任务内容: </q-item-label>
          <q-item-label v-if="task.completionStatus"
            class="q-mb-md q-ml-md"
            style="width: 100%; font-size: medium"
            >{{ task.content }}</q-item-label
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
          </q-card-section>
        </q-card-section>
      </q-card>
    </q-dialog>
    <!-- 评分表单弹框 -->
    <q-dialog v-model="evaluateInfoControl">
      <q-card style="width: 1000px; max-width: 80vw; height: 100%">
        <q-toolbar class="bg-blue-grey-2 text-primary">
          <q-avatar>
            <q-icon name="style" size="2em" color="primary" />
          </q-avatar>

          <q-toolbar-title
            ><span class="text-weight-bold">
              督导员听课评价表
            </span></q-toolbar-title
          >
          <q-btn flat round dense icon="close" v-close-popup />
        </q-toolbar>

        <q-item style="width: 100%">
          <q-item-section>
            <q-item-label class="q-mb-md q-mt-md"> 授课教师名称：{{ task.teacherName }}</q-item-label>
            <q-item-label class="q-mb-md"> 课程名称：{{ task.course.className}}</q-item-label>
            <q-item-label class="q-mb-md"> 授课班级：{{ task.course.name }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-separator />
        <q-item class="q-mx-md">
          <q-card-section class="q-mx-md">
            <q-markup-table
              separator="cell"
              flat
              bordered
              dense
              class="q-mx-md"
            >
              <thead>
                <tr>
                  <th class="text-left">评价项目</th>
                  <th class="text-right">评价内容</th>
                  <th class="text-right">评分</th>
                </tr>
              </thead>
              <tbody style="font-size: medium">
                <tr v-for="(item, index) in evaluateFrom" :key="index">
                  <td class="text-left">{{ index + 1 }}</td>
                  <td class="text-right">{{ item.text }}</td>
                  <td class="text-right">
                    <q-radio
                      v-model="item.score"
                      checked-icon="task_alt"
                      unchecked-icon="panorama_fish_eye"
                      val="9"
                      label="良"
                    />
                    <q-radio
                      v-model="item.score"
                      checked-icon="task_alt"
                      unchecked-icon="panorama_fish_eye"
                      val="8"
                      label="中"
                    />
                    <q-radio
                      v-model="item.score"
                      checked-icon="task_alt"
                      unchecked-icon="panorama_fish_eye"
                      val="7"
                      label="合格"
                    />
                    <q-radio
                      v-model="item.score"
                      checked-icon="task_alt"
                      unchecked-icon="panorama_fish_eye"
                      val="6"
                      label="不合格"
                    />
                  </td>
                </tr>
              </tbody>
            </q-markup-table>
          </q-card-section>
        </q-item>
        <q-item>
          <q-input
            style="width: 90%"
            class="q-mx-xl"
            v-model="evaluateInfo.comments"
            filled
            color="blue-6"
            label="你的评语"
            autofocus
            autogrow
            :rules="[(val) => (val && val.length > 0) || '评语不为空']"
          />
        </q-item>
        <q-item class="q-mb-md">
          <q-item-section class="col-9"></q-item-section>
          <q-item-section class="col-2">
            <q-btn
              q-ml-md
              class="bg-blue-5 text-white"
              label="提交"
              @click="handleEvaluate()"
              flat
            />
          </q-item-section>
        </q-item>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from "vue";
// @ts-ignore
import request from "@/api/index";
import { useQuasar } from "quasar";

const $q = useQuasar();

let tasks = ref([]);
let task = ref({});
let taskControl = ref(false);
let evaluateInfoControl = ref(false);

// 评分项目数组
let evaluateFrom = ref([
  {
    text: "立德树人，严谨治学，为人师表，关爱学生。",
    score: null,
  },
  {
    text: "讲课概念准确，详略得当，注重能力的培养。",
    score: null,

  },
  {
    text: "实验内容体现了专业和技术的先进性，引入新思维、新技术。",
    score: null,

  },
  {
    text: "学生做好预习，准备充分，教师认真检查学生的预习报告。",
    score: null,

  },
  {
    text: "实验室秩序井然，学生能按时完成实验内容。",
    score: null,

  },
  {
    text: "考勤、操作、实验结果等考核方式符合实验特色，运行记录完整。",
    score: null,

  },
  {
    text: "认真批改实验报告，注重过程化考核。",
    score: null,

  },
  {
    text: "实验室布置整洁有序，仪器设备材料准备齐全，安全警示标志清楚。",
    score: null,

  },
  {
    text: "巡回指导发现问题及时纠正，耐心解答学生提出的问题。",
    score: null,

  },
  {
    text: "教学环节的设计与实施均符合实验项目验证设计综合的特点。",
    score: null,

  },
]);


// 评分字段结构
let evaluateInfo = reactive({
  comments: "",
  score: 0,
  taskId: null,
});

onMounted(() => {
  updateTasks();
});

// 评分提交
const handleEvaluate = async () => {
  // 检查
  if (checkAllSelected()) {
    const allScore = evaluateFrom.value.reduce(
      (num, item) => num + Number(item.score),
      0
    );
    const score = (allScore / evaluateFrom.value.length).toFixed(2);
    // @ts-ignore
    evaluateInfo.score = score;
    const res = await request.get(`/super/allReceived?taskId=${evaluateInfo.taskId}&comments=${evaluateInfo.comments}&score=${evaluateInfo.score}`);
    if(res.data.success){
      $q.notify({
      color: "green-4",
      textColor: "white",
      icon: "cloud_done",
      message: "评教成功",
    })
    initEvaluateForm();
    evaluateInfoControl.value = false;
    evaluateFrom.value.forEach(item => {
      item.score = null;
    })
    }
    else {
      $q.notify({
      color: "red-5",
      textColor: "white",
      icon: "warning",
      message: res.data.errorMsg,
    });
    }

  } else {
    $q.notify({
      color: "red-5",
      textColor: "white",
      icon: "warning",
      message: "所有项目都需要完成",
    });
  }
};

// 进行评分弹框
const handleEvaluateBtn = (item) => {
  evaluateInfoControl.value = true;
  evaluateInfo.taskId = item.id;
  task.value = item
};

// 置空评论表单
const initEvaluateForm = () => {
  evaluateInfo = {
    comments: "",
    score: 0,
    taskId: null,
  };
};

// 检查所以选框是否都被选中
const checkAllSelected = () => {
  return evaluateFrom.value.every((item) => item.score) && evaluateInfo.comments !== "";
};

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
