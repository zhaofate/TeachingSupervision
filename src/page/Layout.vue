<script setup>
// @ts-ignore
import LayoutSvg from "@/components/layout/LayoutSvg.vue";
</script>

<template>
  <div id="container">
    <div class="left_column">
      <LayoutSvg />
    </div>
    <div class="right_form">
      <div class="title">教学督导工作管理系统</div>
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped lang="scss">
#container {
  width: 90%;
  height: 100vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
  row-gap: 1rem;
  color: #000;
  .left_column {
    flex: 1;
    margin: auto;
  }
  .right_form {
    width: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-right: 5rem;
    .title {
      margin: 20px auto;
      text-align: center;
    }
  }
}
</style>
