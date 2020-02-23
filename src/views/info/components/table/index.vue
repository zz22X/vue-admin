<template>
  <Table
    :loading="data.loading"
    :tableData="data.tableData"
    :tableColumn="table.tableColumn"
    :tableOption="table.tableOption"
    @handlebutton="handlebutton"
    @handleselectionchange="handleselectionchange"
    @toformatter="toformatter"
  ></Table>
</template>

<script>
import Table from "@c/table/index";
import { formatDate } from "@/utils/common";
//3.0
import { reactive, watch, onMounted } from "@vue/composition-api";
export default {
  name: "TableCmp",
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
  components: {
    Table
  },
  setup(props, { emit }) {
    const data = reactive({
      tableData: [],
      loading: false,
      deleteId: "",
      formatter: "",
      switchVal: "",
    });
    const table = reactive({
      tableColumn: [
        { param: "title", label: "标题" },
        { param: "categoryId", label: "类型", width: "110"},
        { param: "createDate", label: "日期", width: "180", formatter:"toDate"},
        { param: "manger", label: "管理人", width: "130" }
      ],
      tableOption: {
        label: "操作",
        width: "250",
        options: [
          { type: "success", label: "编辑", methods: "handleEdit" },
          { type: "success", label: "编辑详情", methods: "handleEditDetail" },
          { type: "danger", label: "删除", methods: "handleDelete" }
        ]
      }
    });
    onMounted(() => {
      toformatter()
    })
    watch(() => {
      data.tableData = props.tableData;
      data.loading = props.loading
      data.AddNewVisible = props.AddNewVisible
    });
    const handleselectionchange = val => {
      console.log(val)
      let id = val.map(item => item.id);
      data.deleteId = id;
      emit("selectionchange", data.deleteId)
    };
    const handlebutton = (methods, row, index) => {
      console.log(methods);
      if (methods.methods == "handleEdit") {
        handleEdit(methods.index);
      } else if (methods.methods == "handleEditDetail") {
        handleEditDetail(methods.index);
      } else if (methods.methods == "handleDelete") {
        handleDelete(methods.index);
      }
    };
    const handleEdit = (val) => {
      emit("handleedit", val)
    }
    const handleEditDetail = (val) => {
      emit("handleeditdetail", val)
    }
    const handleDelete = (val) => {
      emit("handledelete", val)
    }
    const toformatter = (row) => {
      let val = table.tableColumn.filter(item => item.formatter)
       return formatDate(val.createDate);
    }
    return {
      data,
      table,
      handleselectionchange,
      handlebutton,
      toformatter
    };
  }
};
</script>

<style scoped>
</style>