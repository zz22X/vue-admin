<template>
  <el-pagination
    background
    :current-page="1"
    :page-size="curPageSize"
    :total="totalPage"
    :page-sizes="pageSize"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    layout="total, sizes, prev, pager, next, jumper"
    style=" text-align: right"
  ></el-pagination>
</template>

<script>
import { reactive, watch, onMounted } from "@vue/composition-api";
export default {
  name: "Pagination",
  props: {
    totalPage: {
      type: Number,
      default: 0
    },
    pageSize: {
      type: Array,
      default: () => [5, 10] //pageSize默认[5, 10]
    },
    curPageSize: {
      type: Number,
      default: 5 //curPageSize默认为5
    }
  },
  setup(props, { emit }) {
    const data = reactive({
      pageNumber: 1,
      pageSize: 5,
      totalPage: "",
    });
    onMounted(() => {
    })
    watch(() => {
      data.pageSize = props.curPageSize
      data.pageNumber = props.pageNumber
    });
    const handleCurrentChange = val => {
      data.pageNumber = val;
      emit("sendpagenumber", data.pageNumber);
    };
    const handleSizeChange = val => {
      data.pageSize = val;
      emit("sendpagesize", data.pageSize);
    };
    
    return {
      data,
      handleCurrentChange,
      handleSizeChange
    };
  }
};
</script>

<style scoped>
</style>