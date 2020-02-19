<template>
  <div class="info_dialog">
    <!--新增模块 -->
    <el-dialog
      :title="data.sign.value"
      :visible.sync="data.AddNewVisible"
      @close="close"
      @opened="poened"
      @open="open"
    >
      <el-form :model="data.form" ref="dataForm">
        <el-form-item label="类型" class="add_type" prop="category">
          <el-select v-model="data.form.category" placeholder="请选择" class="type">
            <el-option
              v-for="item in data.type_key"
              :key="item.id"
              :label="item.category_name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标题" class="add_title" prop="title">
          <el-input
            v-model="data.form.title"
            autocomplete="off"
            clearable
            class="add_title_input"
            placeholder="请输入标题"
          ></el-input>
        </el-form-item>
        <el-form-item label="描述" class="add_desc" prop="content">
          <el-input
            type="textarea"
            class="add_desc_input"
            :autosize="{ minRows: 2, maxRows: 3}"
            clearable
            placeholder="请输入内容"
            v-model="data.form.content"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelAddNew" style="width: 150px">取 消</el-button>
        <el-button
          type="danger"
          @click="confirmAddNew"
          :loading="data.confirmloading"
          style="width: 150px; margin-left: 22px"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addInfoList, editInfoList } from "@/api/info";
import { global } from "@/utils/global";
import { reactive, watch, ref } from "@vue/composition-api";
export default {
  name: "addDialog",
  props: {
    flag: {
      type: Boolean,
      default: false
    },
    sendCateType: {
      type: Array,
      default: () => []
    },
    sign: {
      type: Object,
      default: () => {}
    }
  },
  setup(props, { root, emit, refs }) {
    const { MsgBox } = global();
    //data数据
    const data = reactive({
      AddNewVisible: false,
      confirmloading: false,
      sign: {
        value: "",
        data: {},
        hidden: null
      },
      form: {
        category: "",
        title: "",
        content: ""
      },
      type_key: []
    });
    //watch监听
    watch(() => {
      data.AddNewVisible = props.flag;
      data.sign.value = props.sign.value;
      data.sign.data = props.sign.data;
      data.sign.show = props.sign.show;
    });

    /* 
        methods
    */
    //关闭
    const close = () => {
      data.AddNewVisible = false;
      emit("update:flag", false);
      refs.dataForm.resetFields();
    };
    //打开时
    const open = () => {
      if (data.sign.value == "编辑") {
        data.form.category = props.sign.data.categoryId;
        data.form.title = props.sign.data.title;
        data.form.content = props.sign.data.content;
      }
    };
    //打开动画结束后
    const poened = () => {
      data.type_key = props.sendCateType;
    };
    const cancelAddNew = () => {
      close();
      root.$message({
        type: "info",
        message: "已取消"
      });
      refs.dataForm.resetFields();
    };
    const confirmAddNew = () => {
      if (!data.form.category) {
        root.$message({
          message: "请选择分类",
          type: "warning"
        });
        return false;
      } else if (!data.form.title) {
        root.$message({
          message: "标题不能为空",
          type: "warning"
        });
        return false;
      } else if (!data.form.content) {
        root.$message({
          message: "请简要描述内容",
          type: "warning"
        });
        return false;
      }
      data.confirmloading = true;
      if (data.sign.value == "新增") {
        AddInfoList();
        return false;
      } else if (data.sign.value == "编辑") {
        EditInfoList();
      }
      setTimeout(() => {
        data.AddNewVisible = false;
      }, 1000);
    };
    /**
     *内部方法
     */
    //新增操作
    const AddInfoList = () => {
      let parpms = {
        category: data.form.category,
        title: data.form.title,
        content: data.form.content
      };
      addInfoList(parpms)
        .then(res => {
          let resData = res.data;
          if (resData.resCode === 0) {
            root.$message({
              message: "添加成功",
              type: "success"
            });
          }
          refs.dataForm.resetFields();
          emit("GetList");
          data.confirmloading = false;
        })
        .catch(err => {
          root.$message({
            message: "添加失败",
            type: "warning"
          });
          data.confirmloading = false;
        });
    };
    //编辑操作
    const EditInfoList = () => {
      let reqData = {
        id: props.sign.data.id,
        categoryId: data.form.category,
        title: data.form.title,
        content: data.form.content,
        imgUrl: ""
      };
      editInfoList(reqData)
        .then(res => {
          let resData = res.data;
          if (resData.resCode === 0) {
            root.$message({
              message: "编辑成功",
              type: "success"
            });
          }
          emit("GetList");
          data.confirmloading = false;
          refs.dataForm.resetFields();
        })
        .catch(err => {
          root.$message({
            message: "编辑失败",
            type: "warning"
          });
          data.confirmloading = false;
        });
    };
    return {
      data,
      //methods
      close,
      open,
      poened,
      cancelAddNew,
      confirmAddNew
    };
  }
};
</script>

<style>
</style>
