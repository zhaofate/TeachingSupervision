<!-- 敏感词管理 -->

<template>
  <div style="color: #000">
    <q-card
      style="background-color: transparent"
      flat
      class="q-mb-md q-gutter-sm"
    >
      <q-btn
        class="btn-fixed-width"
        color="blue-9"
        label="添加敏感词"
        icon="flight_takeoff"
        @click="addWordControl = true"
      />
    </q-card>
    <q-markup-table>
      <thead class="bg-blue-4">
        <tr>
          <th colspan="10">
            <div class="row no-wrap items-center">
              <div class="text-h6 q-ml-md text-white">敏感词列表</div>
            </div>
          </th>
        </tr>
        <tr>
          <th class="text-left">id</th>
          <th class="text-right">敏感词</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in words" :key="index">
          <td class="text-left">{{ index }}</td>
          <td class="text-right">{{ item }}</td>
        </tr>
      </tbody>
    </q-markup-table>

    <!-- 添加敏感词弹框 -->
    <q-dialog v-model="addWordControl" persistent>
      <q-card style="min-width: 500px">
        <q-card-section>
          <div class="text-h6">添加敏感词</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            dense
            v-model="reqWord"
            autofocus
            autogrow
            :rules="[(val) => (val && val.length > 0) || '不为空']"
          />
        </q-card-section>

        <q-card-actions fixed-right class="text-primary">
          <q-btn flat label="取消" v-close-popup />
          <q-btn flat label="确定" @click="handleAddwordBtn()" />
        </q-card-actions>
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

let words = ref([]);
let addWordControl = ref(false);

let reqWord = ref(null);

onMounted(async () => {
  await updateWords();
});

// 新增敏感词
const handleAddwordBtn = async () => {
  if (reqWord.value) {
    const res = await request.get("/leader/word?words="+ reqWord.value );
  if (res.data.success) {
    $q.notify({
      color: "green-4",
      textColor: "white",
      icon: "cloud_done",
      message: "添加敏感词成功",
    });
    await updateWords();
    addWordControl.value = false;
  } else {
    $q.notify({
      color: "red-5",
      textColor: "white",
      icon: "warning",
      message: res.data.errorMsg,
    });
  }
  reqWord.value = null;
  }
};

// 获取敏感词
const getWords = async () => {
  const res = await request.get("/leader/words");
  return res.data.data;
};

// 更新
const updateWords = async () => {
  words.value = await getWords();
};
</script>
