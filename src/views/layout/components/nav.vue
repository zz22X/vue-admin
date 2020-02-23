<template>
  <div class="Nav" style="position: sticky; top: 0;z-index: 100;">
    <div>
    <img
      src="../../../assets/images/logo.png"
      alt
      id="logo"
      :style="{ left: isCollapse ? '0px' : '70px' }"
    />
    </div>
    <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      router
      background-color="transparent"
      text-color="#fff"
      active-text-color="#fff"
    >
      <template v-for="(item, index) in routers">
        <el-submenu :index="index + ''" :key="item.id" v-if="!item.hidden">
          <!-- 一级菜单-->
          <template slot="title">
            <svg-icon :iconClass="item.meta.icon" :className="item.meta.icon" />
            <span slot="title">{{ item.meta.name }}</span>
          </template>
          <!-- 子级菜单-->
          <template v-for="subitem in item.children">
            <el-menu-item
              :key="subitem.id"
              :index="subitem.path"
              v-if="!subitem.hidden"
            >{{ subitem.meta.name }}</el-menu-item>
          </template>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { reactive, computed } from "@vue/composition-api";
export default {
  name: "LayoutNav",
  setup(props, { root }) {
    //computed 监听变化  如果要加花括号需要 return出去
    const isCollapse = computed(() => root.$store.state.Layout.isCollapse);
    const routers = reactive(root.$router.options.routes);

    return {
      isCollapse,
      routers
    };
  }
};
</script>

<style>
.el-menu {
  border-right: 0;
}
#logo {
  position: relative;
  width: 95px;
  height: 95px;
  vertical-align: middle;
  margin: 18px 0;
  transition: all 0.5s ease 0s;
  z-index: 999;
}
.is-opened .el-submenu__title {
  background-color: #f56c6c !important;
}
.is-opened .is-active {
  background-color: rgba(245, 108, 108, 0.2) !important;
}
.el-menu--popup {
  background-color: rgba(52, 74, 95, 0.9) !important;
}
.el-menu--popup-right-start {
  background-color: rgba(52, 74, 95, 0.9) !important;
}

</style>
