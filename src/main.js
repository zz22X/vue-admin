import Vue from "vue";
import VueCompositionApi from "@vue/composition-api";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
//引入自定义全局方法
import MessageBox from "@/utils/messagebox"
//引入自定义全局组件
import "./icons" 
//引入路由守卫
import "./router/premit"
//elementui
Vue.use(ElementUI);
Vue.use(MessageBox);
Vue.use(VueCompositionApi);
Vue.config.productionTip = false;
//引入富文本
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
  
Vue.use(VueQuillEditor)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
