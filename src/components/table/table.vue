<template>
  <Table
    :loading="data.loading"
    :tableData="data.tableData"
    :tableColumn="table.tableColumn"
    :tableOption="table.tableOption"
    @handlebutton="handlebutton"
    @handleselectionchange="handleselectionchange"
    @handleswitch="handleswitch"
    @toformatter="toformatter"
  ></Table>
</template>

<script>
//引入 Table 组件
import Table from "@c/table/index";
//3.0
import { reactive, watch, onMounted } from "@vue/composition-api";
export default {
  name: "TableCmp",
  components: {
    Table
  },
  props: {
    //表格内容 从父组件获取 或者在此获取 都可以
    tableData: {
      type: Array,
      default: () => []
    },
    //在获取表格内容的请求过程 自行改变
    loading: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    const data = reactive({
      tableData: [],
      loading: false,
      area: ""
    });
    const table = reactive({
      //表头  表格内容根据 param 来渲染
      tableColumn: [
        { param: "email", label: "邮箱/用户名" },
        { param: "name", label: "姓名", width: "150" },
        { param: "phone", label: "手机号", width: "200" },
        { param: "newarea", label: "地区", width: "200" },
        { param: "role", label: "角色", width: "150" },
        {
          param: "switchModel",
          label: "禁启用状态",
          width: "110",
          activecol: "#13ce66",
          inactivecol: "#ff4949",
          methods: "handleswitch",
          render: row => {
            if (row.status == 0) {
              return true;
            } else {
              return false;
            }
          }
        }
      ],
      tableOption: {
        label: "操作",
        width: "250",
        options: [
          { type: "success", label: "编辑", methods: "handleEdit" },
          { type: "danger", label: "删除", methods: "handleDelete" }
        ]
      }
    });

    watch(() => {
      //监听表格内容数据 变化
      data.tableData = props.tableData;
      //监听表格加载变化
      data.loading = props.loading;
    });
    onMounted(() => {});
    //下拉值选中改变
    const handleselectionchange = val => {
      let selectionchange = val;
      emit("sendselectionchange", selectionchange);
    };
    //按钮 根据methods的值 分别传出不同的点击事件
    const handlebutton = (methods, row, index) => {
      let buttonmethods = methods.methods;
      let buttonindex = methods.index;
      if (buttonmethods == "handleEdit") {
        emit("handleedit", buttonindex);
      } else {
        emit("handledelete", buttonindex);
      }
    };
    //开关变化
    const handleswitch = (methods, row, index, param) => {
      let switchmethods = methods.methods;
      let switchindex = methods.index;
      let switchModel = param;
      console.log(methods);
      emit("switchmethods", switchindex, switchModel);
    };

    //格式 转换
    const toformatter = (row) =>{
      console.log(row)
      emit("toformatter", row)
    }
    return {
      data,
      table,
      handleselectionchange,
      handlebutton,
      handleswitch,
      toformatter
    };
  }
};
</script>

<style scoped>
</style>