<template>
  <el-row :gutter="0" class="form_bottom" style="margin-top: 30px">
    <el-col :span="4">
      <el-button @click="deleteAll">批量删除</el-button>
    </el-col>
    <el-col :span="20">
      <Pagination
        :totalPage="totalPage"
        @sendpagesize="getpagesize"
        @sendpagenumber="getpagenumber"
      />
    </el-col>
  </el-row>
</template>
<script>
import Pagination from "@c/Pagination/index";
import { global } from "@/utils/global";
import { reactive, watch, onMounted } from "@vue/composition-api";
export default {
  name: "PaginationCmp",
  props: {
    totalPage: {
      type: Number,
      default: 0
    },
    deleteAllData: {
      type: Array,
      default: () => []
    },
    deleteId: {
      type: Array,
      default: () => []
    }
  },
  components: {
    Pagination
  },
  setup(props, { emit, root }) {
    //global
    const { MsgBox } = global();

    const data = reactive({
      deleteId: [],
      deleteAllData: [],
      pagesize: null,
      pagenumber: null
    });
    onMounted(() => {});
    watch(() => {
      data.deleteId = props.deleteId;
      data.deleteAllData = props.deleteAllData;
    });
    const deleteAll = () => {
      if (!data.deleteId || data.deleteId.length == 0) {
        root.$message({
          message: "请选择要删除的数据",
          type: "warning"
        });
        return false;
      }
      MsgBox({
        content: "删除选定内容,是否继续?",
        fn: confirmDelete,
        catchFn: () => {
          data.deleteId = "";
          root.$message({
            message: "已取消删除",
            type: "success"
          });
        }
      });
    };
    //emit("confirmdelete")
    const confirmDelete = () => {
      emit("confirmdelete")
    }
    const getpagesize = val => {
      data.pagesize = val;
      let size = val;
      emit("getpagesize", size);
      emit("Getinfolist");
    };
    const GetInfoList = () => {};
    const getpagenumber = val => {
      data.pagenumber = val;
      let num = val;
      emit("getpagenumber", num);
      emit("Getinfolist");
    };

    return {
      data,
      deleteAll,
      getpagesize,
      getpagenumber,
      GetInfoList
    };
  }
};
</script>

<style scoped>
</style>