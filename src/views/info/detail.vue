<template>
  <div id="info_detail">
    <el-form
      :model="data.ruleForm"
      :rules="data.rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="信息分类" prop="category" style="width: 18%;">
        <Cascader :modelCascader="data.cascaderOption" @sendmodelkey="getmodelkey" />
      </el-form-item>
      <el-form-item label="标题" prop="title" style="width: 34%;">
        <el-input v-model="data.ruleForm.title"></el-input>
      </el-form-item>
      <el-form-item label="缩略图" prop="pics" id="suoluepic">
        <uploadImg :fileurl.sync="data.fileurl" />
      </el-form-item>
      <el-form-item prop="date" style="width: 22%;" label="发布日期">
        <el-input
          placeholder="选择日期时间"
          v-model="data.ruleForm.date"
          :disabled="true"
          prefix-icon="el-icon-date"
        ></el-input>
      </el-form-item>
      <el-form-item label="详细内容" prop="content" style="width: 95%;height: 220px;">
        <quill-editor
          v-model="data.ruleForm.content"
          ref="myQuillEditor"
          :options="data.editorOption"
          style="height: 158px;"
        ></quill-editor>
      </el-form-item>
      <el-form-item class="submit">
        <el-button
          type="danger"
          @click="submitForm('ruleForm')"
          style="width: 100px;"
          :loading="data.confirmloading"
        >保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { common } from "@/api/common";
import { formatDate } from "@/utils/common";
import { editInfoList, getInfoList } from "@/api/info";
//组件
import uploadImg from "@c/uploadimg/index";
import Cascader from "@c/cascader/index";
//3.0
import { reactive, onMounted, ref, watch } from "@vue/composition-api";
export default {
  name: "",
  components: {
    uploadImg,
    Cascader
  },
  setup(props, { root, refs }) {
    const { getCateTypeAll, TypeAllKey } = common();
    const data = reactive({
      confirmloading: false,
      id: root.$route.params.id,
      row:
        root.$route.params.row || JSON.parse(root.$store.getters["Info/info"]),
      ruleForm: {
        category: "",
        title: "",
        pics: "",
        date: "",
        content: ""
      },
      cascaderOption: {
        init: [] //init为默认值数组 传一个value init: ["XXX"]
      },
      options: [],
      rules: {
        title: [
          { required: true, message: "请输入标题", trigger: "blur" },
          { min: 5, max: 30, message: "长度在 5 到 30 个字符", trigger: "blur" }
        ],
        category: [
          { required: true, message: "请选择分类", trigger: "change" }
        ],
        pics: [{ required: false, message: "请选择图片", trigger: "change" }],
        desc: [
          { required: true, message: "请填写信息详细内容", trigger: "blur" }
        ]
      },
      file: "",
      fileurl: "",
      editorOption: { theme: "snow" }
    });

    onMounted(() => {
      getInfo();
      getCateTypeAll();
      //defaultData();
    });

    watch(() => {
      data.options = TypeAllKey.data;
    });

    //获取页面内容getInfoList
    const getInfo = () => {
      let reqData = {
        id: data.id,
        pageNumber: 1,
        pageSize: 1
      };
      getInfoList(reqData)
        .then(res => {
          let resData = res.data.data.data;
          data.ruleForm.title = resData[0].title;
          data.ruleForm.content = resData[0].content;
          data.ruleForm.date = formatDate(resData[0].createDate);
          data.ruleForm.category = resData[0].categoryId;
          data.cascaderOption.init.push(data.ruleForm.category)
          data.fileurl = resData[0].imgUrl;
        })
        .catch(err => {});
    };
    const getmodelkey = (val) => {
      data.ruleForm.category = val;
    };
    //进入页面显示的内容
    const defaultData = () => {
      data.ruleForm.category = data.row.categoryId;
    };

    //保存修改
    const submitForm = ruleForm => {
      refs.ruleForm.validate(valid => {
        if (valid) {
          data.confirmloading = true;
          EditInfoList();
        } else {
          root.$message({
            message: "再仔细看下~还有内容没填",
            type: "warning"
          });
          return false;
        }
      });
    };
    const EditInfoList = () => {
      let reqData = {
        id: data.id,
        categoryId: data.ruleForm.category,
        title: data.ruleForm.title,
        content: data.ruleForm.content,
        imgUrl: data.fileurl
      };
      editInfoList(reqData)
        .then(res => {
          let resData = res.data;
          if (resData.resCode === 0) {
            root.$message({
              message: "保存成功",
              type: "success"
            });
          }
          console.log(res);
          data.confirmloading = false;
        })
        .catch(err => {
          root.$message({
            message: "保存失败",
            type: "warning"
          });
          data.confirmloading = false;
        });
    };
    return {
      data,
      submitForm,
      getmodelkey,
      defaultData
    };
  }
};
</script>

<style>
#info_detail .submit {
  margin-bottom: 0px;
}
.imgurl {
  width: 148px;
  height: 148px;
  cursor: default;
  text-align: center;
}
/*
*.imgurl {
  position: absolute;
  width: 148px;
  height: 148px;
  left: 0;
  top: 0;
  cursor: default;
  text-align: center;
*}
#suoluepic .el-upload-list,
#suoluepic .el-upload-list--picture-card {
  padding-left: 160px;
}
*/
</style>