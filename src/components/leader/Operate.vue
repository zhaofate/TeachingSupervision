<!-- 操作日志 -->

<template>
  <div style="color: #000">
    <q-card
      style="background-color: transparent"
      flat
      class="q-gutter-sm q-mx-none"
    >
      <q-item class="q-mx-none">
        <q-select
          dense
          class="bg-blue-2 text-white rounded-borders q-px-md"
          style="width: 200px; color: aliceblue"
          :options="operateOptions"
          v-model="operate"
          options-cover
          emit-value
          map-options
        >
          <template v-slot:before>
            <q-item-label caption class="text-grey-10">选择类型：</q-item-label>
          </template>
        </q-select>
        <q-btn
          flat
          q-ml-md
          style="color: #548dbb;width: 100px"
          label="查看"
          @click="handleOperateBtn()"
        />
      </q-item>
    </q-card>

    <q-table
      title="操作日志"
      class="my-sticky-header-table q-mx-md"
      :rows="logData"
      :columns="columns"
      row-key="name"
      :pagination="true"
      :rows-per-page-options="[5, 10, 15,20]"
      no-data-label="暂无数据"
    >
    </q-table>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive, watch } from "vue";
// @ts-ignore
import request from "@/api/index";

let operate = ref(null);

const operateOptions = ref([
  {
    label: "新增",
    value: 1,
  },
  {
    label: "删除",
    value: 2,
  },
  {
    label: "编辑",
    value: 3,
  },
  {
    label: "",
    value: null,
  },
]);

const columns = ref([
  {
    name: "operationUser",
    label: "最近更新人姓名",
    align: "right",
    field: "operationUser",
  },
  {
    name: "operTime",
    label: "最近更新时间",
    align: "right",
    field: "operTime",
  },
  { name: "opType", label: "操作类型", align: "right", field: "opType" },
  { name: "action", label: "更新内容", align: "right", field: "action" },
  { name: "identity", label: "操作人权限", align: "right", field: "identity" },
]);

let logData = ref([]);

onMounted(async () => {
  await getLogs();
});

// 获取日志
const getLogs = async () => {
  const res = await request.get("/leader/operLog");
  logData.value = res.data.data;
};

const handleOperateBtn = async () => {
  if (operate.value !== null) {
    const res = await request.get(`/leader/operLog/${operate.value}`);
    if (res.data.success){
      logData.value = res.data.data;
    }
  }
  else {
    await getLogs();
  }
};
</script>

<style lang="sass">
.my-sticky-header-table
  /* height 或 max-height 很重要 */

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    /* 设置固定行的表头颜色 */
    background-color: #e3f2fd

  /** 固定表头 */
  thead tr th
    position: sticky
    z-index: 1
  thead tr:first-child th
    top: 0

  /* 这是当加载指示器出现时 */
  &.q-table--loading thead tr:last-child th
    /* 所有前面表头行的高度 */
    top: 48px
</style>
