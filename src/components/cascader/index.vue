<template>
  <el-cascader
    placeholder="请选择"
    v-model="data.category"
    :options="data.options"
    @change="cascaderChange"
    :props="data.props"
  ></el-cascader>
</template>

<script>
import { common } from "@/api/common";
import { reactive, watch, onMounted, onUpdated } from "@vue/composition-api";
export default {
  name: "Cascader",
  props: {
    //接收类型为对象 默认为空
    modelCascader: {
      type: Array,
      default: () => []
    },
    props: {
      type: Object,
      default: () => {}
    },
    options: {
      type: Array,
      default: () => []
    },
    category: {
      type: Array,
      default: () => []
    }
  },
  setup(props, { emit }) {
    //common
    //const { getCateTypeAll, TypeAllKey } = common();
    //data
    const data = reactive({
      options: [], //下拉选项内容 从getCateTypeAll中获取
      category: [], //v-model值
      cascaderVal: [], //选中节点变化的值
      props: {}
    });
    //组件加载完成时生命周期函数
    onMounted(() => {
      //获取分类信息
      //getCateTypeAll();
      //选项初始化
      initOption();
    });
    //监听
    watch(() => {
      data.category = props.category;
      data.props = props.props;
      data.options = props.options;
    });
    //监听选项改变 跟 v-model差不多 用组件@chnange方法
    const cascaderChange = val => {
      data.cascaderVal = val;
      data.category = data.cascaderVal
      emit("sendmodelkey", data.cascaderVal);
    };
    //选项初始胡 无默认值情况
    const initOption = () => {
      if (props.modelCascader.length === 0) {
        data.category = [];
        console.log("参数为空无默认值");
        return false;
      } else {
        data.category = props.modelCascader[0];
      }
    };

    return {
      data,
      cascaderChange
    };
  }
};
</script>

<style scoped>
</style>


<!--
对elementuiCascader组件 二次封装 内部需要引入显示的数据

局部引入   <Cascader :modelCascader="data.cascaderOption" @sendmodelkey="getmodelkey"/>
          import Cascader from "@c/cascader/index"
            components: {
              Cascader
            },
父组件通过: :modelCascader="data.cascaderOption" 传入选择器默认显示的值 如果没有传空即可
            const data = reactive({
              cascaderOption: {
                init: []   //init为默认值数组 传一个value init: ["XXX"]
              }
            });

            例：data.form.category = props.sign.data.categoryId;       从数据中获取的默认值 为字符串类型
                data.cascaderOption.init.push(data.form.category);     push到data.cascaderOption.init 中 如果有进行切换需要清空数组
子组件接收: props: {
               modelCascader: {
                type: Object,
                default: () => {}
               }
              }
子组件通过:  1、需要对传进来的对象进行判断 
               是否为空 为空=>不进行监听
               不为空 监听 并且将其改变为字符串传出
            emit("sendmodelkey", 传出去的默认值) 
      
父组件接收:  @sendmodelkey="getmodelkey"          方法自定义
            const getmodelkey = (val) => {       val:子组件传出的 data.category
              data.form.category = val
            }
 -->