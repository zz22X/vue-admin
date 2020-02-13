<template>
  <div class="header">
    <div class="operation_icon">
      <svg-icon iconClass="menu" className="menu" />
    </div>
    <div class="right_nav">
      <div class="admin">
        <div class="headimg"></div>
        管理员
      </div>
      <div class="switch_icon">
        <svg-icon iconClass="logout" className="logout" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LayoutHeader",
  data() {
    return {};
  }
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
}
.menu,
.logout {
  font-size: 23px!important;
  vertical-align: middle
}
.switch_icon {
  width: 75px;
  height: 100%;
  text-align: center;
  border-left: 1px solid #ededed;
}
.right_nav {
  display: flex;
}
.headimg {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: pink;
  display: inline-block;
  vertical-align: middle;
  margin-right: 15px;
}
.admin {
  margin-right: 23px;
  font-size: 14px;
  color: #252525;
}
</style>