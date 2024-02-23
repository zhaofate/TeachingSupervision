<template>
  <Home name="teacher" :menu-list="menuList1" :updateMenu=updateMenu>
    <router-view></router-view>
  </Home>
</template>

<script setup>

// @ts-ignore
import Home from "../components/Home.vue"
// @ts-ignore
import { useMenuStore } from "@/store/menu";

const {menuList1,updateMenuList} = useMenuStore();


const updateMenu = (newMenuList) => {
  updateMenuList(newMenuList,1);
}

</script>

