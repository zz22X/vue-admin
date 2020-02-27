<template>
  <Table
    :loading="data.loading"
    :tableData="data.tableData"
    :tableColumn="table.tableColumn"
    :tableOption="table.tableOption"
    :formatter="data.formatter"
    @handlebutton="handlebutton"
    @handleselectionchange="handleselectionchange"
    @handleswitch="handleswitch"
  ></Table>
</template>

<script>
import Table from "@c/table/index";
//3.0
import { reactive, watch,onMounted } from "@vue/composition-api";
export default {
  name: "TableCmp",
  components: {
    Table
  },
  props: {
    tableData: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    const data = reactive({
      tableData: [],
      loading: false,
      formatter:"",
      area:"",
    });
    const table = reactive({
      tableColumn: [
        { param: "email", label: "邮箱/用户名" },
        { param: "name", label: "姓名", width: "150" },
        { param: "phone", label: "手机号", width: "200" },
        { param: "newarea", label: "地区", width: "200" },
        { param: "role", label: "角色", width: "150" },
        {
          param: "isAdmin",
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

      data.tableData = props.tableData;
      
      data.loading = props.loading;
    });
    onMounted(() => {
      //data.tableData.map(item =>item.area = item.area[0] + '/' +item.area[1] + '/' +item.area[2])
      
    })
    const handleselectionchange = val => {
      let selectionchange = val;
      emit("sendselectionchange", selectionchange);
    };
    const handlebutton = (methods, row, index) => {
      let buttonmethods = methods.methods;
      let buttonindex = methods.index;
      if (buttonmethods == "handleEdit") {
        emit("handleedit", buttonindex);
      } else {
        emit("handledelete", buttonindex);
      }
    };
    const handleswitch = (methods, row, index,param) => {
      let switchmethods = methods.methods;
      let switchindex = methods.index;
      let switchModel = param
      console.log(methods)
      emit("switchmethods", switchindex, switchModel);
    };

    return {
      data,
      table,
      handleselectionchange,
      handlebutton,
      handleswitch
    };
  }
};
</script>

<style scoped>
</style>