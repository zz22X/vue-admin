<template>
  <Cascader
    :modelCascader="data.cascaderOption"
    @sendmodelkey="getmodelkey"
    :options="data.options"
    :props="data.props"
    :category="data.category"
  />
</template>

<script>
import Cascader from "@c/cascader/index";
import { common } from "@/api/common";
import { reactive, onMounted, watch } from "@vue/composition-api";
export default {
  name: "CascaderCmp",
  components: {
    Cascader
  },
  props: {
    modelCascader: {
      type: Object,
      default: () => {}
    },
    category: {
      type: Array,
      default: () => []
    }
  },
  setup(props, {emit}) {
    const { getCity, cityData } = common();
    const data = reactive({
      props: {
        expandTrigger: "hover",
        value: 'name',
        label: 'name',
        children: "children"
      },
      options: [],
      cascaderOption: [],
      category: [],
      cascaderVal: []
    });

    onMounted(() => {
      getCity();
    });
    watch(() => {
      data.options = cityData.data; 
      data.cascaderOption = props.modelCascader;
      data.category = props.category
    });
    const getmodelkey = val => {
      data.cascaderVal = val
      emit("getmodelkey", data.cascaderVal); //默认值传出去
    };

    return {
      data,
      getmodelkey
    };
  }
};
</script>

<style scoped>
</style>