<!-- 督导评价 -->
<template>
  <div style="color: #000">
    <q-list padding>
      <div v-for="(item, index) in comments" :key="index">
        <q-item>
          <q-card
            style="
              background-color: transparent;
              width: 100%;
              border: none;
              box-shadow: none;
            "
          >
            <q-item>
              <q-item-section avatar>
                <q-icon name="chat_bubble" color="green" />
              </q-item-section>
              <q-item-section
                ><q-item-label>
                  {{ item.comments }}
                </q-item-label>

                <q-item-label caption class="q-mt-md"
                  >{{ item.updateTime }}
                </q-item-label>
              </q-item-section>
              <q-item-section side class="q-mr-xl col-0.5">
                <q-item-label caption>评分：</q-item-label>
                <q-item-label>{{ item.score }}</q-item-label>
              </q-item-section>
              <q-item-section side class="col-2">
                <q-item-label>{{ item.superviserName }}</q-item-label>
                <q-item-label caption
                  >评价课程-{{ item.courseName }}</q-item-label
                >
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section avatar>
                <q-icon name="q-directions" size="md" color="blue" />
              </q-item-section>
              <q-item-section v-if="item.feedback !== null">
                <q-item-label>{{ item.feedback }}</q-item-label>
                <q-item-label caption>{{ item.feedbackTime }} </q-item-label>
              </q-item-section>
              <q-item-section v-else="item.feedback == null" class="q-ml-md">
                <q-item-label style="font-size: 16px; margin-bottom: 5px"
                  >暂无反馈
                </q-item-label>
                <q-item-label caption>{{ item.feedbackTime }} </q-item-label>
              </q-item-section>
              <q-item-section side v-show="item.feedback == null">
                <q-btn
                  label="反馈"
                  rounded
                  color="primary"
                  @click="
                    feedbackFrame = true;
                    feedbackInfo.supervisionId = item.superviserId;
                  "
                ></q-btn>
              </q-item-section>
            </q-item>
          </q-card>
        </q-item>
        <q-separator spaced inset="item" />
      </div>
    </q-list>

    <!-- 反馈信息弹框 -->
    <q-dialog v-model="feedbackFrame" persistent>
      <q-card style="min-width: 500px">
        <q-card-section>
          <div class="text-h6">你的反馈</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dense v-model="feedbackInfo.feedback" autofocus autogrow />
        </q-card-section>

        <q-card-actions fixed-right class="text-primary">
          <q-btn flat label="取消" v-close-popup />
          <q-btn flat label="确定" v-close-popup @click="handleFeedbackBtn()" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
// @ts-ignore
import request from "@/api/index";
import { onMounted, reactive, ref } from "vue";
import { useQuasar } from "quasar";

const $q = useQuasar();

const comments = ref([]);

// 督导反馈信息
let feedbackInfo = reactive({
  supervisionId: null,
  feedback: "",
});
const feedbackFrame = ref(false);

// 反馈处理
const handleFeedbackBtn = async () => {
  const res = await request.get(`/teacher/feedback?supervisionId=${feedbackInfo.supervisionId}&feedback=${feedbackInfo.feedback}`);
  if (res.data.success) {
    $q.notify({
      color: "green-4",
      textColor: "white",
      icon: "cloud_done",
      message: "反馈成功",
    });
    updateComments();
  } else {
    $q.notify({
      color: "red-5",
      textColor: "white",
      icon: "warning",
      message: res.data.errorMsg,
    });
  }
  feedbackInfo = {
    supervisionId: null,
    feedback: "",
  };
};

onMounted(async () => {
  await updateComments();
});

// 获取督导评价
const getComments = async () => {
  const res = await request.get("/teacher/view");
  return res.data.data;
};

// 刷新评价列表
const updateComments = async () => {
  comments.value = [];
  const newData = await getComments();
  // @ts-ignore
  comments.value.push(...newData);
};
</script>
