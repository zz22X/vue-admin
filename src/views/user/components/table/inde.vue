<template>
  <TableCmp
    @sendselectionchange="getselectionchange"
    @handleedit="getedit"
    @handledelete="getdelete"
    @switchmethods="getswitchmethods"
    :tableData="data.tableData"
    :loading="data.loading"
  />
</template>

<script>
import { global } from "@/utils/global";
import TableCmp from "./table";
import { DeleteUserInfo } from "@/api/user";
import { reactive, watch } from "@vue/composition-api";
export default {
  name: "TableVue",
  components: {
    TableCmp
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
  setup(props, { emit, root }) {
    //global
    const { MsgBox } = global();
    const data = reactive({
      loading: false,
      tableData: [],
      deleteid: []
    });

    watch(() => {
      data.tableData = props.tableData;
      data.loading = props.loading;
    });
    //选项变化
    const getselectionchange = val => {
      console.log(val)
      let id = val.map(item => item.email);
      data.deleteId = id;
      emit("getdeletemany", data.deleteId)
    };
    //编辑按钮
    const getedit = val => {
      emit("getedit", val);
    };
    //删除按钮
    const getdelete = val => {
      data.deleteId = [val.email];
      MsgBox({
        content: "您是否要删除所选内容？",
        fn: deleteUserInfo,
        catchFn: () => {
          data.deleteid = [];
          root.$message({
            message: "已取消删除",
            type: "success"
          });
        }
      });
    };
    //删除操作
    const deleteUserInfo = () => {
      emit("confirmdelete")
    };
    //开关按钮
    const getswitchmethods = val => {
      let status = val.isAdmin;
    };
    return {
      data,
      getselectionchange,
      getedit,
      getdelete,
      getswitchmethods
    };
  }
};
</script>

<style scoped>
</style>