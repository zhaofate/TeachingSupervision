<template>
  <Home  name="leader" :menu-list="menuList3" :updateMenu=updateMenu>
    <router-view></router-view>
  </Home>
</template>

<script setup>
import { ref } from "vue";
import Home from "../components/Home.vue"

// @ts-ignore
import { useMenuStore } from "@/store/menu";

const {menuList3,updateMenuList} = useMenuStore();


const updateMenu = (newMenuList) => {
  updateMenuList(newMenuList,3);
}


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
