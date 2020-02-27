<template>
  <div class>
    <el-form :inline="true" :model="data.form" class="demo-form-inline">
      <el-row :gutter="0">
        <el-col :span="4">
          <el-form-item label="关键字" class="item_keyword">
          <!--下拉选项-->
            <Select
              :selsct="data.selsctOption"
              style="width: 138px;"
              @sendselectvalue="getselectvalue"
            />
          </el-form-item>
        </el-col>
        <el-col :span="9">
          <el-input v-model="data.form.input" placeholder="请输入内容" clearable style="width: 200px;"></el-input>
          <el-button type="danger" @click="search" style="width: 100px; margin-left: 30px">搜 索</el-button>
        </el-col>
        <el-col :span="11" style="text-align: right;">
          <el-button type="danger" class="addbtn" @click="AddNewUser" style="width: 100px;">添加用户</el-button>
        </el-col>
      </el-row>
    </el-form>
    <!--编辑用户模块 -->
    <editDialog
      :flag.sync="editDialog.AddNewVisible"
      :editData="data.editData"
      :sign="editDialog.sign"
      @GetList="getUserList"
    />
    <!--添加用户模块 -->
    <addDialog :flag.sync="addDialog.AddNewVisible" :sign="addDialog.sign" @GetList="getUserList" />
    <!-- 表格 -->
    <TableVue
      :tableData="table.tableData"
      :loading="table.loading"
      @getedit="getedit"
      @getdeletemany="getdeletemany"
      @GetList="getUserList"
      @confirmdelete="confirmDelete"
    />
    <!-- 分页 -->
    <PaginationCmp
      :totalPage="pagination.totalpage"
      :deleteId="data.deleteId"
      @getpagesize="getpagesize"
      @getpagenumber="getpagenumber"
      @Getinfolist="getUserList"
      @confirmdelete="confirmDelete"
    />
  </div>
</template>

<script>
import { GetUserInfo, DeleteUserInfo, SearchUserInfo } from "@/api/user";
import editDialog from "./components/dialog/edit";
import addDialog from "./components/dialog/add";
import PaginationCmp from "./components/pagination";
import TableVue from "./components/table/inde";
import Select from "@c/select/index";
import { reactive, onMounted } from "@vue/composition-api";
export default {
  name: "",
  components: {
    Select,
    TableVue,
    PaginationCmp,
    editDialog,
    addDialog
  },
  setup(props, { root, emit }) {
    const data = reactive({
      area: "",
      DATA: [],
      form: {
        input: "",
        keyword: ""
      },
      selsctOption: {
        init: ["name", "phone", "email"]
      },
      deleteAllData: [],
      deleteId: [],
      editData: {}
    });
    const pagination = reactive({
      pageNumber: 1,
      pageSize: 5,
      totalpage: 0
    });
    const table = reactive({
      loading: false,
      tableData: [],
      deleteid: []
    });
    const editDialog = reactive({
      AddNewVisible: false,
      sign: {
        value: "编辑用户"
      }
    });
    const addDialog = reactive({
      AddNewVisible: false,
      sign: {
        value: "添加用户"
      }
    });

    onMounted(() => {
      getUserList();
      changeData();
    });

    //form表单  搜索 添加用户 下拉选项
    const search = () => {
      let formatsearch = {};
      if (data.form.keyword) {
        formatsearch.keyword = data.form.keyword;
      }
      if (data.form.input) {
        formatsearch[data.form.keyword] = data.form.input;
      }
      table.loading = true;
      SearchUserInfo(formatsearch)
        .then(res => {
          setTimeout(() => {
            if (res.data.status === 0) {
              pagination.totalpage = res.data.total;
              table.tableData = res.data.data;
              table.loading = false;
              changeData();
            }
          }, 500);
        })
        .catch(err => {
          console.log(err);
        });
    };
    const AddNewUser = () => {
      addDialog.AddNewVisible = true;
    };
    const getselectvalue = val => {
      data.form.keyword = val;
      console.log(data.form.keyword);
    };
    //表格 获取删除id数组 编辑显示 ok
    const getdeletemany = val => {
      data.deleteId = val;
    };
    const getedit = val => {
      data.editData = val;
      editDialog.AddNewVisible = true;
    };
    //pagination 获取分页信息 ok
    const getpagenumber = val => {
      pagination.pageNumber = val;
      getUserList();
      console.log(pagination.pageNumber);
      console.log(pagination.pageSize);
    };
    const getpagesize = val => {
      pagination.pageSize = val;
      getUserList();
      console.log(pagination.pageSize);
      console.log(pagination.pageNumber);
    };

    //通用 确认删除 ok
    const confirmDelete = () => {
      let resdata = {
        email: data.deleteId
      };
      DeleteUserInfo(resdata)
        .then(res => {
          if (res.data.status === 0) {
            root.$message({
              message: "删除成功",
              type: "success"
            });
            getUserList();
          }
        })
        .catch(err => {
          console.log(err);
        });
    };
    //通用 获取信息列表 ok
    const getUserList = () => {
      let resdata = {
        pageSize: pagination.pageSize,
        pageNumber: pagination.pageNumber
      };
      table.loading = true;
      setTimeout(() => {
        GetUserInfo(resdata)
          .then(res => {
            let resData = res.data;
            if (resData.status === 0) {
              pagination.totalpage = 12;
              table.tableData = resData.data;

              table.loading = false;
              changeData();
            }
          })
          .catch(err => {
            table.loading = false;
          });
      }, 500);
    };
    //通用 格式化地区
    const changeData = () => {
      data.DATA = table.tableData;
      data.DATA.forEach(item => {
        item.newarea = item.area[0] + "/" + item.area[1] + "/" + item.area[2];
      });
    };

    return {
      data, table, pagination, addDialog, editDialog,
      //form
      search, AddNewUser, getselectvalue,
      //表格
      getdeletemany, getedit,
      //页码
      getpagenumber, getpagesize,
      //通用
      getUserList, confirmDelete
    };
  }
};
</script>

<style scoped>
</style>
