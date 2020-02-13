//自定义全局组件 由于vue模块默认为runtime 模式.所以全局组件会报错
//改编vue 指向就可以 在vue.config.js中 添加 'vue': 'vue/dist/vue.js'
import Vue from "vue";
import svgIcon from "./svgicon.vue"
Vue.component('svg-icon', svgIcon)



const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => {
  return requireContext.keys().map(requireContext)
}
requireAll(req)

// require.context(‘./svg’, false, /\.svg$/) 参数说明：
// 第一个：目录
// 第二个：是否遍历子级目录
// 第三个：定义遍历文件规则
