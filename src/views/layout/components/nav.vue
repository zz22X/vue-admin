<template>
  <div class="Nav">
    <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      router
      background-color="transparent"
      text-color="#fff"
      active-text-color="#fff"
    >
      <template v-for="(item, index) in routers">
        <el-submenu :index="index + '' " :key="item.id" v-if="!item.hidden">
          <!-- 一级菜单-->
          <template slot="title">
            <svg-icon :iconClass="item.meta.icon" :className="item.meta.icon" />
            <span slot="title">{{item.meta.name}}</span>
          </template>
          <!-- 子级菜单-->
          <el-menu-item
            v-for="subitem in item.children"
            :key="subitem.id"
            :index="subitem.path"
          >{{ subitem.meta.name }}</el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { ref, reactive } from "@vue/composition-api";
export default {
  name: "LayoutNav",
  setup(props, { root }) {
    const isCollapse = ref(false);
    const routers = reactive(root.$router.options.routes);
    //console.log(routers);
    const handleOpen = (key, keyPath) => {
      //console.log(key, keyPath);
    };
    const handleClose = (key, keyPath) => {
      //console.log(key, keyPath);
    };

    return {
      isCollapse,
      routers,
      handleOpen,
      handleClose
    };
  }
};
</script>

<style scoped>
.el-submenu {
  font-size: 14px;
}
</style>