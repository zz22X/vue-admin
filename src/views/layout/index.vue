<template>
  <div class>
    <el-container>
      <el-aside width="250px">
        <LayoutNav />
      </el-aside>
      <el-container>
        <el-header style="height: 75px">
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
import { reactive, ref } from "@vue/composition-api";
export default {
  name: "",
  components: {
    LayoutNav,
    LayoutMain,
    LayoutHeader
  },
  setup(props) {
    const handleOpen = (key, keyPath) => {
      console.log(key, keyPath);
    };
    const handleClose = (key, keyPath) => {
      console.log(key, keyPath);
    };

    return {
      handleOpen,
      handleClose
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

.el-aside {
  background-color: #344a5f;
  color: #333;
  line-height: 200px;
  height: 100vh;
}

.el-main {
  background-color: #f7f7f7;
  color: #333;
  padding: 30px;
  box-shadow: inset 0 1px 30px 2px rgba(0, 0, 0, 0.1);
}
</style>