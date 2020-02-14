<template>
  <div class="header">
    <div class="operation_icon" @click="navCollapse">
      <svg-icon iconClass="menu" class="menu" />
    </div>
    <div class="right_nav">
      <div class="admin">
        <div class="headimg"></div>管理员
      </div>
      <div class="switch_icon">
        <svg-icon iconClass="logout" class="logout" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/composition-api";
export default {
  name: "LayoutHeader",
  setup(props, { root }) {
    const navCollapse = () => {
      root.$store.commit("Layout/isCollapse");
    };
    return {
      navCollapse
    };
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
  font-size: 25px !important;
  vertical-align: middle;
}
.logout {
  margin: 0 !important;
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