<template>
  <div class="main">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'LayoutMain',
  data() { 
    return {

    }
  }
 }
</script>

<style scoped>
.main {
  background-color: #fff;
  padding: 30px;
  height: 100%;
}
</style>