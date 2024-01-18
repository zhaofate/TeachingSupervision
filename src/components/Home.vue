<template>
  <div class="q-pa-md">
    <q-layout
      view="hHh Lpr lff"
      container
      style="height: 100vh"
      class="shadow-2 rounded-borders"
    >
      <q-header elevated :class="$q.dark.isActive ? 'bg-primary' : 'bg-black'">
        <q-toolbar>
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
          <q-toolbar-title>Teaching Supervision</q-toolbar-title>
        </q-toolbar>
      </q-header>

      <q-drawer
        v-model="drawer"
        show-if-above
        :width="200"
        :breakpoint="500"
        bordered
        :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
      >
        <q-list>
          <template v-for="(menuItem, index) in menuList" :key="index">
            <q-item clickable :active="menuItem.separator" v-ripple>
              <q-item-section avatar>
                <q-icon :name="menuItem.icon" />
              </q-item-section>
              <q-item-section>
                {{ menuItem.label }}
              </q-item-section>
            </q-item>
          </template>
        </q-list>
      </q-drawer>

      <q-page-container>
        <q-page padding>
          <router-view></router-view>
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script setup>
import { ref } from "vue";

let drawer = ref(false);

const menuList = [
  {
    icon: "sticky_note_2",
    label: "教师信息",
    separator: false,
  },
  {
    icon: "golf_course",
    label: "督导课表",
    separator: false,
  },
  {
    icon: "splitscreen",
    label: "督导任务",
    separator: false,
  },
  {
    icon: "cast_for_education",
    label: "督导评教",
    separator: false,
  },
  {
    icon: "assessment",
    label: "督导评价",
    separator: true,
  },
  {
    icon: "send",
    label: "督导反馈",
    separator: true,
  },
  {
    icon: "bubble_chart",
    label: "评价分析",
    separator: true,
  },
  {
    icon: "upcoming",
    label: "消息中心",
    separator: false,
  },
  {
    icon: "account_circle",
    label: "个人中心",
    separator: false,
  },
  {
    icon: "error",
    label: "错误日志",
    separator: false,
  },
  {
    icon: "subject",
    label: "操作日志",
    separator: false,
  },
  {
    icon: "manage_history",
    label: "敏感词管理",
    separator: false,
  },
];
</script>

<style lang="scss" scoped>
.q-pa-md {
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
  .q-item {
    border-radius: 0 32px 32px 0;
  }
}
</style>
