<!-- 教师互评 -->

<template>
  <div style="color: black">
    <div style="height: 50px">
      <q-btn
        class="q-mr-md"
        :outline="!commentControl"
        rounded
        color="primary"
        icon-right="directions"
        label="教师评价"
        @click="commentControl = true"
      />
      <q-btn
        :outline="commentControl"
        rounded
        color="primary"
        icon-right="directions"
        label="教师信息"
        @click="commentControl = false"
      />
      <q-btn
        class="float-right"
        rounded
        label="我的评价"
        icon="keyboard_arrow_right"
        color="primary"
        @click="myCommentFrame = true"
      />
    </div>

    <!-- 教师评论 -->
    <div v-if="commentControl">
      <q-list padding>
        <div v-for="(item, index) in comments" :key="index">
          <q-item>
            <q-item-section avatar>
              <q-icon name="chat_bubble" color="green" />
            </q-item-section>
            <q-item-section class="col-10"
              ><q-item-label
                >{{ item.comments }}
                <q-item-label caption class="q-mt-md">{{
                  item.commentTime
                }}</q-item-label></q-item-label
              >
            </q-item-section>
            <q-item-section side>
              <q-item-label>{{ item.nameFrom }}老师</q-item-label>
              <q-item-label caption>评价了我</q-item-label>
            </q-item-section>
          </q-item>
          <q-separator spaced inset="item" />
        </div>
      </q-list>
    </div>

    <!-- 所有教师信息 -->
    <div
      v-else="!commentControl"
      v-for="(item, index) in teachers"
      :key="index"
    >
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
            <q-btn
              color="blue"
              icon-right="send"
              label="评价"
              @click="
                commentFrame = true;
                commentInfo.to = item.id;
              "
            />
          </q-item-section>
        </q-item>

        <q-separator />

        <q-card-section horizontal>
          <q-card-section class="col-2">
            <q-item-label>
              {{ item.professionalType }}
            </q-item-label>
            <q-item-label> {{ item.jobNumber }} 级 </q-item-label>
          </q-card-section>

          <q-separator vertical />

          <q-card-section class="col-10">
            <q-item-label style="white-space: pre-wrap">
              组长评价： {{ item.leaderComments }}
            </q-item-label>
          </q-card-section>
        </q-card-section>
      </q-card>
    </div>

    <!-- 我的评价列表弹框 -->
    <q-dialog
      v-model="myCommentFrame"
      position="right"
      style="bottom: 0; right: 0"
    >
      <q-card style="width: 600px; height: 100%">
        <q-linear-progress :value="1" color="blue" />
        <q-card-section class="row items-center no-wrap">
          <div class="text-weight-bold col-11">我的评价</div>
          <q-btn
            class="col-1"
            rounded
            color="primary"
            icon="close"
            @click="myCommentFrame = false"
          />
        </q-card-section>
        <q-list padding>
          <div v-for="(item, index) in myComments" :key="index">
            <q-item>
              <q-item-section avatar>
                <q-icon name="chat_bubble" color="green" />
              </q-item-section>
              <q-item-section class="col-8"
                ><q-item-label
                  >{{ item.comments }}
                  <q-item-label caption class="q-mt-md">
                    评价了{{ item.name }}老师&nbsp;&nbsp;{{ item.commentTime }}</q-item-label
                  ></q-item-label
                >
              </q-item-section>
            </q-item>
            <q-separator spaced inset="item" />
          </div>
        </q-list>
      </q-card>
    </q-dialog>

    <!-- 评论弹框 -->
    <q-dialog v-model="commentFrame" persistent>
      <q-card style="min-width: 500px">
        <q-card-section>
          <div class="text-h6">你的评论</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dense v-model="commentInfo.comment" autofocus autogrow />
        </q-card-section>

        <q-card-actions fixed-right class="text-primary">
          <q-btn flat label="取消" v-close-popup />
          <q-btn flat label="确定" v-close-popup @click="handleCommentBtn()" />
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
const teachers = reactive([]);
const comments = reactive([]);
const myComments = ref([]);
let myCommentFrame = ref(false);
let commentFrame = ref(false);
let commentInfo = reactive({
  to: null,
  comment: "",
});

// 控制评论页面和教师信息页面
let commentControl = ref(true);

const handleCommentBtn = async () => {
  // 提交评论
  const res = await request.get("/teacher/comment", commentInfo);
  if (res.data.success) {
    $q.notify({
      color: "green-4",
      textColor: "white",
      icon: "cloud_done",
      message: "评论成功",
    });
    await updateMyComments();
  } else {
    $q.notify({
      color: "red-5",
      textColor: "white",
      icon: "warning",
      message: res.data.errorMsg,
    });
  }
  commentInfo = {
    to: null,
    comment: "",
  };
};

const getTeachers = async () => {
  const res = await request.get("/teacher/teachers");
  return res.data.data; // 返回获取到的教师数据
};

const getComments = async () => {
  const res = await request.get("/teacher/get");
  return res.data.data;
};

const getMyComments = async () => {
  const res = await request.get("/teacher/commented");
  return res.data.data;
};

const updateMyComments = async () => {
  myComments.value = [];
  const newData = await getMyComments();
  // @ts-ignore
  myComments.value.push(...newData);
};

onMounted(async () => {
  const teacherData = await getTeachers();
  teachers.push(...teacherData);

  const commentsData = await getComments();
  comments.push(...commentsData);

  updateMyComments();
});
</script>
