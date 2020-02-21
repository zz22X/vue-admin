<template>
  <div>
    <div>
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
      ref="upload"
    >
      <i slot="default" class="el-icon-plus"></i>
      <div slot="file" slot-scope="{file}">
        <img class="el-upload-list__item-thumbnail" :src="file.url" alt />
        <span class="el-upload-list__item-actions">
          <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
            <i class="el-icon-zoom-in"></i>
          </span>
          <span
            v-if="!data.disabled"
            class="el-upload-list__item-delete"
            @click="handleDownload(file)"
          >
            <i class="el-icon-download"></i>
          </span>
          <span
            v-if="!data.disabled"
            class="el-upload-list__item-delete"
            @click="handleRemove(file)"
          >
            <i class="el-icon-delete"></i>
          </span>
        </span>
      </div>
    </el-upload>
    <el-dialog :visible.sync="data.dialogVisible">
      <img width="100%" :src="data.dialogImageUrl" alt />
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import { reactive, ref, watch } from "@vue/composition-api";
export default {
  name: "uploadImg",
  props: {
    fileurl: {
      type: String,
      default: ""
    }
  },
  setup(props, { root, emit, refs }) {
    console.log(props.fileurl);
    const data = reactive({
      file: "",
      fileurl: "",
      fileList: [],
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false
    });

    //watch
    watch(() => {
      data.fileurl = props.fileurl;
      console.log(data.fileurl);
    });

    //缩略图相关
    //删除图片
    const handleRemove = file => {
      let fileuid = file.uid;
      let index = data.fileList.filter(item => item.uid !== fileuid);
      data.fileList = index;
    };
    //图片大图预览
    const handlePictureCardPreview = file => {
      data.dialogImageUrl = file.url;
      data.dialogVisible = true;
    };
    //图片上传
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
            data.dialogImageUrl = res.data.data.userHead;
            emit("update:fileurl", res.data.data.userHead);
            refs.upload.clearFiles();
          }
        })
        .catch(err => {
          console.log(err);
        });
    };
    //监控图片变化
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

    return {
      data,
      handleRemove,
      handlePictureCardPreview,
      handleDownload,
      handlePictureChange
    };
  }
};
</script>

<style scoped>
</style>