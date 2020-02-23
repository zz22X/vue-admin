<template>
  <div class>
    <el-form :inline="true" :model="data.form" class="demo-form-inline">
      <el-row :gutter="0">
        <el-col :span="4">
          <el-form-item label="关键字" class="item_keyword">
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
          <el-button type="danger" class="addbtn" @click="AddNewInfo" style="width: 100px;">添加用户</el-button>
        </el-col>
      </el-row>
    </el-form>
    <!-- 表格 -->
    <TableCmp
      @sendselectionchange="getselectionchange"
      @handleedit="getedit"
      @handledelete="getdelete"
      @switchmethods="getswitchmethods"
      :userTable="data.userData"
    />
    <!-- 分页 -->
    <PaginationCmp
      :totalPage="data.userData.length"
      :deleteAllData="data.deleteAllData"
      :deleteId="data.deleteId"
    />
  </div>
</template>

<script>
import PaginationCmp from "./components/pagination";
import TableCmp from "./components/table";
import Select from "@c/select/index";
import { reactive } from "@vue/composition-api";
export default {
  name: "",
  components: {
    Select,
    TableCmp,
    PaginationCmp
  },
  setup(props) {
    const data = reactive({
      form: {
        input: "",
        keyword: ""
      },
      selsctOption: {
        init: ["name", "phone", "email"]
      },
      userData: [
        {
          email: "101255852@163.com",
          name: "zzx",
          phone: "111111111111",
          area: "福州",
          role: "管理员",
          status: ""
        },
        {
          email: "15960019793@163.com",
          name: "zzx",
          phone: "111111111",
          area: "福州",
          role: "管理员",
          status: ""
        },{
          email: "1012552@163.com",
          name: "zzx",
          phone: "111111111111",
          area: "福州",
          role: "管理员",
          status: ""
        },{
          email: "101852@163.com",
          name: "zzx",
          phone: "111111111111",
          area: "福州",
          role: "管员",
          status: ""
        },{
          email: "1012852@163.com",
          name: "zzx",
          phone: "111111111111",
          area: "福州",
          role: "管理员",
          status: ""
        },{
          email: "101255852@163.com",
          name: "z",
          phone: "111111111111",
          area: "福州",
          role: "管员",
          status: ""
        },{
          email: "1012@163.com",
          name: "zzx",
          phone: "111111111111",
          area: "福州",
          role: "管理员",
          status: ""
        },{
          email: "1015852@163.com",
          name: "zzx",
          phone: "111111111111",
          area: "福州",
          role: "管理员",
          status: ""
        },{
          email: "10s5852@163.com",
          name: "zzx",
          phone: "111111111111",
          area: "福州",
          role: "管理员",
          status: ""
        },{
          email: "1012w852@163.com",
          name: "zzx",
          phone: "111111111111",
          area: "福州",
          role: "管理员",
          status: ""
        },{
          email: "1q55852@163.com",
          name: "zzx",
          phone: "111111111111",
          area: "福州",
          role: "管理员",
          status: ""
        },{
          email: "10852@163.com",
          name: "zzx",
          phone: "111111111111",
          area: "福州",
          role: "管理员",
          status: ""
        },
      ],
      deleteAllData: [],
      deleteId: []
    });
    const getselectvalue = val => {
      form.keyword = val;
    };
    const search = () => {};
    const AddNewInfo = () => {};

    //选项变化
    const getselectionchange = (val) => {
      let id = val.map(item => item.email);
      data.deleteId = id
    };
    //编辑按钮
    const getedit = val => {
      console.log(val);
    };
    //删除按钮
    const getdelete = val => {
      console.log(val);
    };
    //开关按钮
    const getswitchmethods = val => {
      let status = val.switchModel;
      console.log(val.switchModel);
      data.userData.forEach(item => {
        console.log(item);
      });
    };
    return {
      data,
      search,
      AddNewInfo,
      getselectvalue,
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
