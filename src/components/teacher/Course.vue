<!-- 课程中心 -->

<template>
  <div style="color: #000">
    <!-- 上传课表 -->
    <div style="width: 100%; height: 60px" class="q-pr-md">
      <q-file
        class="float-right"
        :model-value="files"
        @update:model-value="updateFiles"
        max-files="1"
        label="上传课表"
        hint="格式为 xlsx"
        outlined
        multiple
        dense
        accept=".xlsx"
        :clearable="!isUploading"
        style="max-width: 200px"
      >
        <template v-slot:file="{ index, file }">
          <q-chip
            class="full-width q-my-xs"
            :removable="isUploading && uploadProgress[index].percent < 1"
            square
            @remove="cancelFile(index)"
          >
            <q-linear-progress
              class="absolute-full full-height"
              :value="uploadProgress[index].percent"
              :color="uploadProgress[index].color"
              track-color="grey-2"
            />

            <q-avatar>
              <q-icon :name="uploadProgress[index].icon" />
            </q-avatar>

            <div class="ellipsis relative-position">
              {{ file.name }}
            </div>

            <q-tooltip>
              {{ file.name }}
            </q-tooltip>
          </q-chip>
        </template>

        <template v-slot:after v-if="canUpload">
          <q-btn
            color="primary"
            dense
            icon="cloud_upload"
            round
            @click="upload"
            :disable="!canUpload"
            :loading="isUploading"
          />
        </template>
      </q-file>
    </div>
    <!-- 课表 -->
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
            <q-item class="col-10"></q-item>

            <q-item class="col-2">
              <q-select
                label-right="周"
                v-model="week"
                dense
                :options="weeksOptions"
                style="width: 70px"
                options-cover
              >
                <template v-slot:after>
                  <q-item-label caption class="text-grey-10">周</q-item-label>
                </template>
              </q-select>
              <q-btn
                flat
                q-ml-md
                style="color: #ff0080"
                label="查看课表"
                @click="handleWeekBtn()"
              />
            </q-item>
          </q-card>
        </template>
      </q-table>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed, onBeforeUnmount } from "vue";
// @ts-ignore
import request from "@/api/index";

import { useQuasar } from "quasar";
const $q = useQuasar();

const weeksOptions = ref([
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  "all",
]);

// 选择的周数
const week = ref("all");

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

const files = ref(null);
const uploadProgress = ref([]);
const uploading = ref(null);

function cleanUp() {
  clearTimeout(uploading.value);
}

function updateUploadProgress() {
  let done = true;

  uploadProgress.value = uploadProgress.value.map((progress) => {
    if (progress.percent === 1 || progress.error === true) {
      return progress;
    }

    const percent = Math.min(1, progress.percent + Math.random() / 10);
    const error = percent < 1 && Math.random() > 0.95;

    if (error === false && percent < 1 && done === true) {
      done = false;
    }

    return {
      ...progress,
      error,
      color: error === true ? "red-2" : "green-2",
      percent,
    };
  });

  uploading.value =
    done !== true ? setTimeout(updateUploadProgress, 300) : null;
}

onBeforeUnmount(cleanUp);

const isUploading = computed(() => uploading.value !== null);
const canUpload = computed(() => files.value !== null);

function cancelFile(index) {
  uploadProgress.value[index] = {
    ...uploadProgress.value[index],
    error: true,
    color: "orange-2",
  };
}

// 上传文件
const updateFiles = async (newFiles) => {
  files.value = newFiles;
  uploadProgress.value = (newFiles || []).map((file) => ({
    error: false,
    color: "green-2",
    percent: 0,
    icon: file.type.indexOf("xlsx/") === 0 ? "file" : "insert_drive_file",
  }));
  const res = await request.post("/teacher/upload", { file: files.value });
  if (res.data.success) {
    uploadProgress.value = (newFiles || []).map((file) => ({
      error: false,
      color: "green-2",
      percent: 100,
      icon: file.type.indexOf("xlsx/") === 0 ? "file" : "insert_drive_file",
    }));
    upload();
    setTimeout(() => {
      files.value = null;
      $q.notify({
        color: "green-4",
        textColor: "white",
        icon: "cloud_done",
        message: "上传成功",
        timeout: 3000,
      });
    }, 3000);
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

function upload() {
  cleanUp();

  const allDone = uploadProgress.value.every(
    (progress) => progress.percent === 1
  );

  uploadProgress.value = uploadProgress.value.map((progress) => ({
    ...progress,
    error: false,
    color: "green-2",
    percent: allDone === true ? 0 : progress.percent,
  }));

  updateUploadProgress();
}

// 切换周数
const handleWeekBtn = () => {
  updateCourse();
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

onMounted(async () => {
  await updateCourse();
  initColumns();
});

const getCourse = (section, day) => {
  const course = seriousData.value.find(
    (course) => course.section === section && course.dayWeek === day
  );
  return course ? course : null;
};

// 获取全部课程信息
const getCourseAll = async () => {
  const res = await request.get("/teacher/all");
  return res.data.data;
};

// 获取课程信息
const getCourseByWeek = async (data) => {
  const res = await request.get("/teacher/week", { week: data });
  console.log(res.data.data);
  return res.data.data;
};

// 更新课程数据
const updateCourse = async () => {
  // @ts-ignore
  if (week.value == "all") {
    seriousData.value = await getCourseAll();
  } else {
    seriousData.value = await getCourseByWeek(week.value);
  }
};
</script>

<style scoped></style>
