<template>
  <Home  name="super" :menu-list="menuList2" :updateMenu=updateMenu>
    <router-view></router-view>
  </Home>
</template>

<script setup>
import { ref } from "vue";
import Home from "../components/Home.vue"

// @ts-ignore
import { useMenuStore } from "@/store/menu";

const {menuList2,updateMenuList} = useMenuStore();

const updateMenu = (newMenuList) => {
  updateMenuList(newMenuList,2);
}

</script>

<style lang="scss" scoped>
</style>
