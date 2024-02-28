<!-- 督导反馈 -->

<!-- 督导评价 -->
<template>
  <div style="color: #000">
    <q-list padding>
      <div v-for="(item, index) in feedback" :key="index">
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
                  {{ item.supervision.comments }}
                </q-item-label>

                <q-item-label caption class="q-mt-md"
                  >{{ item.supervision.updateTime }}
                </q-item-label>
              </q-item-section>
              <q-item-section side class="q-mr-xl col-0.5">
                <q-item-label caption style="color: #000">评分：</q-item-label>
                <q-item-label style="color: #000">{{ item.supervision.score }}</q-item-label>
              </q-item-section>
              <q-item-section side class="col-1">
                <q-item-label caption style="color: #000">{{
                  item.teacherName
                }}</q-item-label>
                <q-item-label caption style="color: #000">{{
                  item.className
                }}</q-item-label>
                <q-item-label caption style="color: #000">
                  课程名称
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section avatar>
                <q-icon name="q-directions" size="md" color="blue" />
              </q-item-section>
              <q-item-section v-if="item.supervision.feedback !== null">
                <q-item-label>{{ item.supervision.feedback }}</q-item-label>
                <q-item-label caption>{{ item.supervision.feedbackTime }} </q-item-label>
              </q-item-section>
              <q-item-section v-else="item.supervision.feedback == null" class="q-ml-md">
                <q-item-label style="font-size: 16px; margin-bottom: 5px"
                  >暂无反馈
                </q-item-label>
                <q-item-label caption>{{ item.feedbackTime }} </q-item-label>
              </q-item-section>
            </q-item>
          </q-card>
        </q-item>
        <q-separator spaced inset="item" />
      </div>
    </q-list>
  </div>
</template>

<script setup>
// @ts-ignore
import request from "@/api/index";
import { onMounted, reactive, ref } from "vue";

const feedback = ref([]);

onMounted(async () => {
  feedback.value = await getFeedback();
});

// 获取反馈列表
const getFeedback = async () => {
  const res = await request.get("/super/feedback");
  return res.data.data;
};
</script>
