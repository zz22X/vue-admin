<template>
  <div class>
    <el-container style="background-color: #344a5f;">
      <el-aside :class="[navStatus ? 'close' : 'open']">
        <LayoutNav />
      </el-aside>
      <el-container>
        <el-header style="height: 75px;position: sticky;top: 0;z-index: 999;">
          <LayoutHeader />
        </el-header>
        <el-main>
          <LayoutMain />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import LayoutNav from "./components/nav";
import LayoutMain from "./components/main";
import LayoutHeader from "./components/header";
import { computed } from "@vue/composition-api";
export default {
  name: "",
  components: {
    LayoutNav,
    LayoutMain,
    LayoutHeader
  },
  setup(props, { root }) {
    const navStatus = computed(() => root.$store.state.Layout.isCollapse);
    //console.log(root.$store.state.Layout.isCollapse);
    return {
      navStatus
    };
  }
};
</script>

<style scoped>
.el-header {
  background-color: #fff;
  color: #333;
  line-height: 75px;
  padding-left: 30px;
  padding-right: 0;
  box-shadow: 0 3px 16px 0 rgba(0, 0, 0, 0.1);
}
.close {
  width: 65px !important;
}
.open {
  width: 250px !important;
}
.el-aside {
  background-color: #344a5f;
  color: #333;
  height: 100vh;
  transition: all 0.5s ease 0s;
  overflow: visible; 
}

.el-main {
  background-color: #f7f7f7;
  color: #333;
  padding: 30px;
  box-shadow: inset 0 1px 30px 2px rgba(0, 0, 0, 0.1);
}
</style>
