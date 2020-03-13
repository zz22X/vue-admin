<template>
  <el-select v-model="data" placeholder="请选择" class="keyword" @change="selsctChange">
    <el-option
      v-for="item in data.initOption"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    ></el-option>
  </el-select>
</template>

<script>
import { reactive, watch, onMounted } from "@vue/composition-api";
export default {
  name: "Select",
  props: {
    selsct: {
      type: Object,
      default: () => {}
    }
  },
  setup(props, { emit }) {
    const data = reactive({
      selectValue: "",
      selectedVal: "",
      initOption: [],
      search_key: [
        { label: "姓名", value: "name" },
        { label: "手机号", value: "phone" },
        { label: "邮箱", value: "email" },
        { label: "ID", value: "id" },
        { label: "标题", value: "title" },
        { label: "管理员", value: "管理员" },
        { label: "用户", value: "用户" }
      ]
    });

    watch(() => {});

    onMounted(() => {
      initOption();
    });

    const initOption = () => {
      let initData = props.selsct.init;
      let option = [];
      if (initData.length === 0) {
        console.log("参数为空无法显示");
        return false;
      }
      initData.forEach(item => {
        let arr = data.search_key.filter(e => e.value == item)[0];
        option.push(arr);
      });
      if (initData.length === 0) {
        console.log("匹配数据为空");
        return false;
      }
      data.initOption = option;
      data.selectValue = option[0].value;
    };

    const selsctChange = val => {
      data.selectedVal = val;
      emit("sendselectvalue", data.selectValue);
    };
    return {
      data,
      selsctChange
    };
  }
};
</script>

<style scoped>
</style>

<!--
对elementui Select组件 二次封装 内部需要定义显示的数据 定义多组 循环匹配
    data: {
      search_key: [
        { label: "姓名", value: "name" },
        { label: "手机号", value: "phone" },
        { label: "邮箱", value: "email" },
        { label: "ID", value: "id" },
        { label: "标题", value: "title" }
      ]
    }
局部引入 
          <Select :selsct="data.selsctOption" @sendselectvalue="getselectvalue"/>
          import Select from "@c/select/index";
          components: {
              Select
            },
父组件通过: :selsct="data.selsctOption" 传入选择器默认显示的值
            const data = reactive({
              selsctOption:{
                init:["name", "phone", "email"]
              } 
            });
            selsctOption: object {}
            init: Array []  需要匹配的值
子组件接收: selsct: {
              type: Object,
              default: () => {}
            }
子组件通过:  emit("sendselectvalue", data.selectValue);
            data.selectValue  为v-model的值
父组件接收:  @sendselectvalue="getselectvalue"          方法自定义
            const getselectvalue = (val) => {       val:子组件传出的 data.category
              XXXX = val
            }
 -->