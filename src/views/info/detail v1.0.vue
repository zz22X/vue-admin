<template>
  <div id="info_detail">
    <el-form
      :model="data.ruleForm"
      :rules="data.rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="信息分类" prop="category">
        <el-cascader
          placeholder="请选择"
          v-model="data.ruleForm.category"
          :options="data.options"
          :props="{ expandTrigger: 'hover',value: 'id', label: 'category_name', children: 'children'} "
        ></el-cascader>
      </el-form-item>
      <el-form-item label="标题" prop="title" style="width: 34%;">
        <el-input v-model="data.ruleForm.title"></el-input>
      </el-form-item>
      <el-form-item label="缩略图" prop="pics" id="suoluepic">
        <div class="demo-image__preview">
          <img
            style="width: 148px; height: 148px; cursor: pointer;"
            :src="data.fileurl"
            v-show="data.fileurl"
          />
        </div>
        <el-upload
          action
          list-type="picture-card"
          :auto-upload="false"
          :file-list="data.fileList"
          :on-change="handlePictureChange"
        >
          <i slot="default" class="el-icon-plus"></i>
          <div slot="file" slot-scope="{file}">
            <img class="el-upload-list__item-thumbnail" :src="file.url" alt />
            <span class="el-upload-list__item-actions">
              <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                <i class="el-icon-zoom-in"></i>
              </span>
              <span
                v-if="!data.ruleForm.disabled"
                class="el-upload-list__item-delete"
                @click="handleDownload(file)"
              >
                <i class="el-icon-download"></i>
              </span>
              <span
                v-if="!data.ruleForm.disabled"
                class="el-upload-list__item-delete"
                @click="handleRemove(file)"
              >
                <i class="el-icon-delete"></i>
              </span>
            </span>
          </div>
        </el-upload>
        <el-dialog :visible.sync="data.ruleForm.dialogVisible">
          <img width="100%" :src="data.ruleForm.dialogImageUrl" alt />
        </el-dialog>
      </el-form-item>
      <el-form-item label="发布日期">
        <el-form-item prop="date" style="width: 15%;">
          <el-input
            placeholder="选择日期时间"
            v-model="data.ruleForm.date"
            :disabled="true"
            prefix-icon="el-icon-date"
          ></el-input>
        </el-form-item>
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
import axios from "axios";
import { common } from "@/api/common";
import { formatDate } from "@/utils/common";
import { editInfoList } from "@/api/info";
import { reactive, onMounted, ref, watch } from "@vue/composition-api";
export default {
  name: "",
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
        content: "",
        dialogImageUrl: "",
        dialogVisible: false,
        disabled: false
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
      srcUrl: [],
      fileList: [],
      editorOption: { theme: "snow" }
    });

    onMounted(() => {
      getCateTypeAll();
      defaultData();
    });

    watch(() => {
      data.options = TypeAllKey.data;
    });
    //进入页面显示的内容
    const defaultData = () => {
      data.ruleForm.title = data.row.title;
      data.ruleForm.content = data.row.content;
      data.ruleForm.date = formatDate(data.row.createDate);
      data.ruleForm.category = data.row.categoryId;
      data.fileurl = data.row.imgUrl;
      data.srcUrl.push(data.row.imgUrl);
    };
    //缩略图相关
    const handleRemove = file => {
      let fileuid = file.uid;
      let index = data.fileList.filter(item => item.uid !== fileuid);
      data.fileList = index;
    };
    const handlePictureCardPreview = file => {
      data.ruleForm.dialogImageUrl = file.url;
      data.ruleForm.dialogVisible = true;
    };
    const handleDownload = file => {
      data.file = file.raw;
      const param = new FormData();
      param.append("file", data.file, data.id);
      axios
        .post("http://localhost:3000/api2/users/uploadUserHead", param, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(res => {
          if (res.data.status === 0) {
            root.$message({
              message: "图片上传成功",
              type: "success"
            });
            data.ruleForm.dialogImageUrl = res.data.data.userHead;
          }
        })
        .catch(err => {
          console.log(err);
        });
    };
    const handlePictureChange = (file, fileList) => {
      data.fileList = fileList;
      let filename = file.name;
      let regex = /(.jpg|.jpeg|.gif|.png|.bmp)$/;
      if (!regex.test(filename.toLowerCase())) {
        root.$message({
          message: "图片格式不符",
          type: "warning"
        });
      }
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
        imgUrl: data.ruleForm.dialogImageUrl
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
          refs.ruleForm.resetFields();
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
      handleRemove,
      handlePictureCardPreview,
      handleDownload,
      handlePictureChange
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