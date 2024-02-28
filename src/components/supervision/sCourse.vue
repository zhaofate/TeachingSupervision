<!-- 督导课表 -->

<template>
  <div style="color: black">
    <div class="q-pa-md">
      <q-table
        color="primary"
        card-class="text-blue-3"
        table-class="text-grey-10"
        table-header-class="bg-blue-1 text-grey-10"
        separator="cell"
        flat
        bordered
        :rows="rows"
        :columns="columns"
        row-key="section"
      >
        <template #body-cell="props">
          <!-- 第一列的表格样式 -->
          <q-td
            style="
              font-size: 1rem;
              text-align: center;
              background-color: antiquewhite;
            "
            class="text-primary"
            :props="props"
            v-if="props.col.name === 'time'"
          >
            第{{ props.row.section }} - {{ props.row.section + 1 }}节
          </q-td>

          <!-- 含有课程的样式 -->
          <q-td
            style="font-size: 0.8rem; text-align: center; width: 200px"
            class="text-grey-10 bg-blue-3"
            :props="props"
            v-if="
              props.col.name !== 'time' &&
              getCourse(props.row.section, props.col.name) !== null
            "
          >
            <div>
              <q-item-label>
                {{ getCourse(props.row.section, props.col.name).name }}
              </q-item-label>
              <q-item-label>
                {{
                  `班级：${
                    getCourse(props.row.section, props.col.name).className
                  }`
                }}
              </q-item-label>
              <q-item-label>
                教室：{{
                  getCourse(props.row.section, props.col.name).position
                }}
              </q-item-label>
              <q-item-label
                v-if="getCourse(props.row.section, props.col.name).weeks"
              >
                {{ getCourse(props.row.section, props.col.name).weeks }} 周
              </q-item-label>
            </div>
          </q-td>

          <!-- 没有课程的样式 -->
          <q-td
            :props="props"
            v-if="
              props.col.name !== 'time' &&
              getCourse(props.row.section, props.col.name) == null
            "
            style="width: 200px"
          >
          </q-td>
        </template>
        <!-- 底部样式 -->
        <template v-slot:bottom>
          <q-card
            class="row"
            style="width: 100%; border: none; box-shadow: none"
          >
            <q-item class="col-8"></q-item>

            <q-item class="col-4">
              <q-select
                v-model="name"
                dense
                :options="teacherOptions"
                style="width: 150px"
                options-cover
                class="q-mr-md"
              >
                <template v-slot:before>
                  <q-item-label caption class="text-grey-10"
                    >选择老师：</q-item-label
                  >
                </template>
                <!-- <template v-slot:option="{ opt, toggleOption }">
                  <q-item
                    :key="opt.id"
                    v-ripple
                    clickable
                    @click="toggleOption(opt)"
                  >
                    <q-item-section>
                      <q-item-label>{{ opt.name }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </template> -->
              </q-select>

              <q-select
                label-right="周"
                v-model="reqInfo.week"
                dense
                :options="weeksOptions"
                style="width: 100px"
                options-cover
                class="q-mr-md"
              >
                <template v-slot:before>
                  <q-item-label caption class="text-grey-10"
                    >选择周：</q-item-label
                  >
                </template>
              </q-select>
              <q-btn
                flat
                q-ml-md
                style="color: #ff0080"
                label="查看课表"
                @click="handleCourseBtn()"
              />
            </q-item>
          </q-card>
        </template>
      </q-table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from "vue";
// @ts-ignore
import request from "@/api/index";
import { useQuasar } from "quasar";
const $q = useQuasar();

let teachers = ref(null);
let teacherOptions = ref(null);

const name = ref(null);

// 请求查看课表数据结构
const reqInfo = ref({
  id: null,
  week: null,
});


const rows = ref([
  { section: 1 },
  { section: 3 },
  { section: 5 },
  { section: 7 },
  { section: 9 },
]);
const daysOfWeek = ["周一", "周二", "周三", "周四", "周五"];
let seriousData = ref([]);
let columns = reactive([]);

const weeksOptions = ref([
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
]);

onMounted(async () => {
  await getTeachers();
  initColumns();
});

// 处理查看课表
const handleCourseBtn = async () => {
  const id = teachers.value.find((item) => item.name === name.value)?.id;
  reqInfo.value.id = id;
  getCourseByWeek(reqInfo)
};


// 初始化数组
const initColumns = () => {
  const cols = [{ name: "time", label: "周次/节次" }];
  daysOfWeek.map((day, index) => {
    // @ts-ignore
    cols.push({ name: index + 1, label: day });
  });
  columns.push(...cols);
};

const getCourse = (section, day) => {
  const course = seriousData.value.find(
    (course) => course.section === section && course.dayWeek === day
  );
  return course ? course : null;
};

// 获取课程信息
const getCourseByWeek = async (data) => {
  const res = await request.get("/super/curriculum", data);
  if(res.data.success) {
    seriousData.value = res.data.data;
  }
  else {
    $q.notify({
      color: "red-5",
      textColor: "white",
      icon: "warning",
      message: res.data.errorMsg,
    });
  }
};

// 获取教师信息
const getTeachers = async () => {
  const res = await request.get("/super/teachers");
  const teacherList = res.data.data.map((item, index) => {
    return {
      id: item.id,
      name: item.name,
    };
  });
  teachers.value = teacherList;
  teacherOptions.value = teachers.value.map((item) => item.name);
};
</script>
