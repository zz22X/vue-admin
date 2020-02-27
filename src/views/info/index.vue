<template>
  <div class="console">
    <!--顶部 form表单 -->
    <el-form :inline="true" :model="form" class="demo-form-inline">
      <el-row>
        <el-col :span="3">
          <el-form-item label="分类" class="item_type">
          <!--级联菜单 -->
            <CascaderCmp :category="form.category" @getmodelkey="getmodelkey" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="日期" class="item_date">
            <el-date-picker
              class="date"
              v-model="form.date"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              prefix-icon="el-icon-time"
              :default-time="['12:00:00', '08:00:00']"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd HH:mm:ss"
              @change="handleChangeDate"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item label="关键字" class="item_keyword">
          <!--下拉菜单 -->
            <Select :selsct="data.selsctOption" @sendselectvalue="getselectvalue" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-input v-model="form.input" placeholder="请输入内容" clearable class="search"></el-input>
          <el-button type="danger" class="searchbtn" @click="search">搜 索</el-button>
        </el-col>
        <el-col :span="2" class="newAdd">
          <el-button type="danger" class="addbtn" @click="AddNewInfo">新 增</el-button>
        </el-col>
      </el-row>
    </el-form>
    <!--新增模块 -->
    <addDialog
      :flag.sync="addDialog.AddNewVisible"
      :sendCateType="addDialog.type_key"
      :sign="addDialog.sendsign"
      @GetList="GetInfoList"
    />
    <!--表格内容 -->
    <TableCmp
      :tableData="table.tableData"
      :loading="table.loading"
      @handleedit="handleEdit"
      @handleeditdetail="handleEditDetail"
      @selectionchange="selectionchange"
      @handledelete="handleDelete"
    />
    <!--底部 -->
    <PaginationCmp
      :totalPage="pagination.totalpage"
      :deleteId="table.deleteid"
      @confirmdelete="confirmDelete"
      @getpagesize="getpagesize"
      @getpagenumber="getpagenumber"
      @Getinfolist="GetInfoList"
    />
  </div>
</template>

<script>
import PaginationCmp from "@c/Pagination/pagination";
import Select from "@c/select/index";
import TableCmp from "./components/table/index";
import CascaderCmp from "./components/cascader/index";
import addDialog from "./components/dialog/info";
import { global } from "@/utils/global";
import { formatDate } from "@/utils/common";
import { common } from "@/api/common";
import { getInfoList, deleteInfo } from "@/api/info";
import { reactive, onMounted, watch } from "@vue/composition-api";
export default {
  name: "",
  components: {
    addDialog,
    CascaderCmp,
    Select,
    PaginationCmp,
    TableCmp
  },
  setup(props, { root, refs }) {
    //global
    const { MsgBox } = global();
    //common
    const { getCateType, TypeKey } = common();
    //data
    const data = reactive({
      selsctOption: {
        init: ["id", "title"]
      },
      cascaderOption: {
        init: []
      }
    });
    const table = reactive({
      loading: false,
      tableData: [],
      deleteid: []
    });
    const pagination = reactive({
      pageNumber: 1,
      pageSize: 5,
      totalpage: 0
    });
    const addDialog = reactive({
      AddNewVisible: false,
      sendsign: {
        value: "",
        data: "",
        show: true
      },
      type_key: []
    });
    const form = reactive({
      category: [],
      date: "",
      keyword: "",
      input: "",
      textarea: ""
    });

    //onMounted
    onMounted(() => {
      //方法1 vue3.0
      getCateType();

      //方法2： vuex
      //vuexGetCateType()
      //
      // const vuexGetCateType = () => {
      //   root.$store
      //     .dispatch("Common/GetCateType")
      //     .then(res => {})
      //     .catch(err => {});
      // };
      GetInfoList();
    });
    /**
     * watch
     */
    watch(
      () => TypeKey.data,
      value => {
        addDialog.type_key = value;
      }
    );
    /**
     * methods
     */
    const handleChangeDate = () => {};
    //搜索
    const search = () => {
      GetInfoList();
    };
    //搜索条件处理
    const formatData = () => {
      let formatdata = {};
      if (form.category) {
        formatdata.categoryId = form.category;
      }
      if (form.date.length > 0) {
        (formatdata.startTiem = form.date[0]),
          (formatdata.endTime = form.date[1]);
      }
      if (form.input) {
        formatdata[form.keyword] = form.input;
      }
      return formatdata;
    };
    //cascader ok
    const getmodelkey = val => {
      console.log(val)
      form.category = val;
    };
    //select ok
    const getselectvalue = val => {
      form.keyword = val;
    };
    //addDialog 新增 ok
    const AddNewInfo = () => {
      addDialog.AddNewVisible = true;
      addDialog.sendsign.value = "新增";
      addDialog.sendsign.data = "";
    };
    //addDialog 编辑 ok
    const handleEdit = val => {
      addDialog.AddNewVisible = true;
      addDialog.sendsign.value = "编辑";
      addDialog.sendsign.data = val;
      addDialog.sendsign.show = false;
    };
    //table 删除 ok
    const handleDelete = val => {
      table.deleteid.push(val.id);
      MsgBox({
        content: "删除此内容,是否继续?",
        fn: confirmDelete,
        catchFn: () => {
          table.deleteid = [];
          root.$message({
            message: "已取消删除",
            type: "success"
          });
        }
      });
    };
    //table 编辑详情 ok
    const handleEditDetail = val => {
      //root.$store.commit("Info/InfoDetail", val);
      root.$router.push({
        name: "InfoDetail",
        params: {
          id: val.id,
          val: val
        }
      });
    };
    //table 选中变化 ok
    const selectionchange = val => {
      table.deleteid = val;
    };
    //pagination 获取分页信息 ok
    const getpagenumber = val => {
      pagination.pageNumber = val;
    };
    const getpagesize = val => {
      pagination.pageSize = val;
    };
    //通用 确认删除 ok
    const confirmDelete = () => {
      let data = {
        id: table.deleteid
      };
      deleteInfo(data)
        .then(res => {
          if (res.data.resCode === 0) {
            root.$message({
              message: "删除成功",
              type: "success"
            });
            GetInfoList();
          }
        })
        .catch(err => {
          console.log(err);
        });
    };
    //通用 获取信息列表 ok
    const GetInfoList = () => {
      let data = {
        categoryId: form.category[0],
        startTiem: form.date[0],
        endTime: form.date[1],
        [form.keyword]: form.input,
        pageNumber: pagination.pageNumber,
        pageSize: pagination.pageSize
      };
      table.loading = true;
      setTimeout(() => {
        getInfoList(data)
          .then(res => {
            let resData = res.data;
            if (resData.resCode === 0) {
              pagination.totalpage = resData.data.total;
              table.tableData = resData.data.data;
              table.tableData.map(item => {
                item.createDate = formatDate(item.createDate);
              });
              table.tableData.forEach(item => {
                let CateId = item.categoryId;
                let CateType = addDialog.type_key.filter(
                  item => item.id == CateId
                );
                table.tableData.map(item => {
                  item.categoryId = CateType[0].category_name;
                });
              });
              table.loading = false;
            }
          })
          .catch(err => {
            table.loading = false;
          });
      }, 500);
    };

    return {
      //reactive
      table,
      data,
      pagination,
      addDialog,
      form,
      //form
      handleChangeDate,
      search,
      //cascade
      getmodelkey,
      //select
      getselectvalue,
      //addDialog
      AddNewInfo,
      handleEdit,
      //table,
      selectionchange,
      handleEditDetail,
      handleDelete,
      //pagination
      getpagenumber,
      getpagesize,
      //通用
      GetInfoList,
      confirmDelete
    };
  }
};
</script>

<style>
body .el-table th.gutter {
  display: table-cell !important;
}
.el-row .el-form-item {
  display: flex;
  justify-content: flex-start;
}
.el-form-item__label {
  font-size: 15px;
  color: #344a5f;
}
.el-form-item__content {
  flex: 2;
}
.item_date .el-input__inner {
  width: 370px;
}
.el-row .item_type {
  margin: 0;
  padding-right: 20px;
}
.item_type .el-form-item__content {
  flex: 3;
}
.el-col-3 .item_type {
  display: flex;
}
.el-col-8 .item_date {
  padding-left: 17px;
}
.el-col-8 {
  display: flex;
}
.el-row .item_keyword {
  display: flex;
  justify-content: flex-start;
  padding-left: 13px;
}
.search {
  flex: 9;
  margin-left: 10px;
  margin-right: 20px;
}
.searchbtn {
  flex: 2;
  margin-right: 70px;
}
.newAdd {
  text-align: right;
}
.addbtn {
  width: 80%;
}
.el-table th > .cell {
  text-align: center;
  font-size: 15px;
  color: #344a5f;
}
.el-table .cell {
  text-align: center;
  color: #344a5f;
}
.console .el-table__header .el-table_1_column_6 {
  border-right: 0;
}

/* 
新增
*/
.el-dialog {
  width: 35%;
  padding: 16px 26px 34px 14px;
}
.el-dialog__footer {
  text-align: center;
}
.el-dialog__title {
  color: #344a5f;
}
.add_title,
.add_type,
.add_desc {
  display: flex;
  padding-left: 12px;
  font-size: 15px;
}
.add_title_input,
.add_desc_input {
  width: 428px;
}
</style>
