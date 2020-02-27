<template>
  <el-row :gutter="0" class="form_bottom" style="margin-top: 30px">
    <el-col :span="4">
      <el-button @click="deleteAll(data.deleteAllData)">批量删除</el-button>
    </el-col>
    <el-col :span="20">
      <Pagination
        :totalPage="totalPage"
        @sendpagesize="getpagesize"
        @sendpagenumber="getpagenumber"
        @Getinfolist="GetInfoList"
      />
    </el-col>
  </el-row>
</template>
<script>
import { global } from "@/utils/global";
import Pagination from "@c/Pagination/index";
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
    const deleteAll = val => {
      if (!data.deleteId || data.deleteId.length == 0) {
        root.$message({
          message: "请选择要删除的数据",
          type: "warning"
        });
        return false;
      } else {
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
      }
    };
    const deleteUserInfo = () => {
      emit("confirmdelete")
    }
    const getpagesize = val => {
      data.pagesize = val;
      emit("getpagesize", data.pagesize);
    };
    const GetInfoList = () => {};
    const getpagenumber = val => {
      data.pagenumber = val;
      emit("getpagenumber", data.pagenumber);
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