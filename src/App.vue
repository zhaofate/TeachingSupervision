<script setup>
</script>

<template>
  <div class="contain pattern-grid-xl">
    <!-- 路由视图容器 -->
    <router-view></router-view> 
  </div>
</template>

<style scoped lang="scss">
.contain {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.pattern-grid-xl {
  background-color: #e0e0e0;
  color: #dadada;
}
</style>

