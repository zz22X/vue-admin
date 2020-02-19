import Vue from "vue";
import Vuex from "vuex";
import navCollapse from "./module/layout/index"
import Login from "./module/login/index"
import Common from "./module/common/index"
import Info from "./module/info/index"
Vue.use(Vuex);


export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    Layout: navCollapse,
    Login,
    Common,
    Info
  }
});
