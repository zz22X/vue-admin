import Vue from "vue";
import Vuex from "vuex";
import navCollapse from "./module/layout/index"
import Login from "./module/login/index"
Vue.use(Vuex);


export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    Layout: navCollapse,
    Login
  }
});
