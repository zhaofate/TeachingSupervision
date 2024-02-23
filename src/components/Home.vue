<template>
  <div class="q-pa-md" style="overflow-x: hidden;">
    <q-layout
      view="hHh Lpr lff"
      container
      style="height: 100vh"
      class="shadow-2 rounded-borders"
    >
      <q-header elevated >
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
      >
        <q-list>
          <template v-for="(menuItem, index) in menuList" :key="index">
            <q-item clickable :active="menuItem.separator" v-ripple @click="handleClick(index)">
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

      <q-page-container style="width: 100%; overflow-wrap: break-word; overflow-x: hidden;">
        <q-page padding>
          <router-view ></router-view>
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>


<script setup lang="js">
// @ts-ignore
// @ts-ignore
import { ref } from 'vue';
import router from '../router';

// 定义传入组件的参数类型
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  menuList: {
    type: Array,
    required: true
  },
  updateMenu: {
    type: Function,
    required: true
  }
});


const handleClick = (index) => {

  const newMenu = props.menuList;

  newMenu.forEach((item) => {
    // @ts-ignore
    item.separator =false
  });
  // @ts-ignore
  newMenu[index].separator = true;

  // @ts-ignore
  props.updateMenu(newMenu);
  // 路由跳转 
  // @ts-ignore
  router.push(props.menuList[index].path);
};

const drawer = ref(false);
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
