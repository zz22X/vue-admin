<template>
  <div class="console">
    <!--顶部 form表单 -->
    <el-form :inline="true" :model="form" class="demo-form-inline">
      <el-row>
        <el-col :span="3">
          <el-form-item label="分类" class="item_type">
            <el-select v-model="form.category" placeholder="请选择" clearable class="type">
              <el-option
                v-for="item in type_key.data"
                :key="item.id"
                :label="item.category_name"
                :value="item.id"
              ></el-option>
            </el-select>
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
            <el-select v-model="form.keyword" placeholder="ID/标题" class="keyword">
              <el-option
                v-for="item in form.search_key"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
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
      :flag.sync="AddNewVisible"
      :sendCateType="type_key.data"
      :sign="sendsign"
      @GetList="GetInfoList"
    />
    <!--表格内容 -->
    <el-table
      :data="tableData.data"
      border
      style="width: 100%"
      v-loading="loading"
      ref="TableData"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" ref="select"></el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="categoryId" label="类型" width="110" :formatter="toType"></el-table-column>
      <el-table-column prop="createDate" label="日期" width="180" :formatter="toDate"></el-table-column>
      <el-table-column prop="manger" label="管理人" width="130"></el-table-column>
      <el-table-column label="操作" width="250">
        <template slot-scope="scope">
          <el-button size="mini" type="success" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="success" @click="handleEditDetail(scope.$index, scope.row)">编辑详情</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--底部 -->
    <el-row :gutter="0" class="form_bottom" style="margin-top: 30px">
      <el-col :span="4">
        <el-button @click="deleteALL(tableData.data)">批量删除</el-button>
      </el-col>
      <el-col :span="20">
        <el-pagination
          background
          :page-size="5"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          layout="total, sizes, prev, pager, next, jumper"
          :current-page="1"
          :total="totalpage"
          :page-sizes="[5, 10]"
          style=" text-align: right"
        ></el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import addDialog from "./components/dialog/info";
import { global } from "@/utils/global";
import { formatDate } from "@/utils/common";
import { common } from "@/api/common";
import { getInfoList, getCategory, deleteInfo } from "@/api/info";
import { reactive, onMounted, ref, watch } from "@vue/composition-api";
export default {
  name: "",
  components: {
    addDialog
  },
  setup(props, { root, refs }) {
    //global
    const { MsgBox } = global();
    //common
    const { getCateType, TypeKey } = common();
    //data
    const loading = ref(false);
    const totalpage = ref(0);
    const page_size = ref(4);
    const AddNewVisible = ref(false);
    const formLabelWidth = ref("45px");
    const sendsign = reactive({
      value: "",
      data: "",
      show: true
    });
    const deleteid = reactive({
      id: ""
    });
    const page = reactive({
      pageNumber: 1,
      pageSize: 5
    });
    const infoList = reactive({});
    const tableData = reactive({ data: [] });
    const type_key = reactive({ data: [] });
    const form = reactive({
      category: "",
      date: "",
      keyword: "",
      input: "",
      search_key: [
        { value: "id", label: "ID" },
        { value: "title", label: "标题" }
      ],
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
        type_key.data = value;
      }
    );
    /**
     * methods
     */
    //新增
    const AddNewInfo = () => {
      AddNewVisible.value = true;
      sendsign.value = "新增";
      sendsign.data = "";
    };
    //表格展示 分类 时间戳
    const toDate = row => {
      return formatDate(row.createDate);
    };
    const toType = row => {
      let CateId = row.categoryId;
      let CateType = type_key.data.filter(item => item.id == CateId);
      return CateType[0].category_name;
    };
    //时间框值改变
    const handleChangeDate = () => {};
    //搜索
    const search = () => {
      //let reqData = formatData()
      //console.log(reqData)
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
    //编辑
    const handleEdit = (index, row) => {
      //console.log(row);
      AddNewVisible.value = true;
      sendsign.value = "编辑";
      sendsign.data = row;
      sendsign.show = false;
      //console.log(sendsign)
    };
    //删除
    const handleDelete = (index, row) => {
      deleteid.id = [row.id];
      MsgBox({
        content: "删除此内容,是否继续?",
        fn: confirmDelete,
        catchFn: () => {
          deleteid.id = "";
          root.$message({
            message: "已取消删除",
            type: "success"
          });
        }
      });
    };
    const deleteALL = () => {
      if (!deleteid.id || deleteid.id.length == 0) {
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
          deleteid.id = "";
          root.$message({
            message: "已取消删除",
            type: "success"
          });
        }
      });
    };
    const handleSelectionChange = selection => {
      let id = selection.map(item => item.id);
      deleteid.id = id;
      console.log(deleteid.id);
    };
    const confirmDelete = () => {
      let data = {
        id: deleteid.id
      };
      deleteInfo(data)
        .then(res => {
          if (res.data.resCode === 0) {
            root.$message({
              message: "删除成功",
              type: "success"
            });
            GetInfoList();
            // let index = tableData.data.findIndex(
            //   item => item.id == deleteid.id
            // );
            // tableData.data.splice(index, 1);
          }
        })
        .catch(err => {
          console.log(err);
        });
    };
    //获取信息列表
    const handleCurrentChange = val => {
      page.pageNumber = val;
      GetInfoList();
    };
    const handleSizeChange = val => {
      page.pageSize = val;
      GetInfoList();
    };
    const GetInfoList = () => {
      let data = {
        categoryId: form.category,
        startTiem: form.date[0],
        endTime: form.date[1],
        [form.keyword]: form.input,
        pageNumber: page.pageNumber,
        pageSize: page.pageSize
      };
      loading.value = true;
      setTimeout(() => {
        getInfoList(data)
          .then(res => {
            let resData = res.data;
            if (resData.resCode === 0) {
              // if(resData.data.data.length < page.pageSize ) {
              //   totalpage.value = resData.data.data.length
              // } else {

              // }
              totalpage.value = resData.data.total;
              tableData.data = resData.data.data;
              loading.value = false;
            }
          })
          .catch(err => {
            loading.value = false;
          });
      }, 500);
    };
    //编辑详情
    const handleEditDetail = (index, row) => {
      root.$store.commit("Info/InfoDetail",row)
      root.$router.push({
        name: "InfoDetail",
        params: {
          id: row.id,
          row: row
        }
      })
    }
    return {
      //ref
      loading,
      page_size,
      totalpage,
      AddNewVisible,
      formLabelWidth,
      sendsign,
      //reactive
      tableData,
      form,
      type_key,
      //methods
      search,
      toDate,
      toType,
      AddNewInfo,
      handleChangeDate,
      handleSelectionChange,
      handleCurrentChange,
      handleSizeChange,
      handleEditDetail,
      handleEdit,
      handleDelete,
      deleteALL,
      GetInfoList
    };
  }
};
</script>

<style>
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
