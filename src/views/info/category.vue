<template>
  <div id="info_category">
    <el-button type="danger" class="add_first_degree_btn" @click="addFirstDegreeCate">添加一级分类</el-button>
    <hr style="background-color: #e9e9e9;border: none;height: 1px;margin-bottom: 30px" />
    <div>
      <el-row :gutter="30">
        <el-col :span="9">
          <div class="categorywrap">
            <div class="category category_title" v-for="item in CateData.data" :key="item.id">
              <h4>
                <svg-icon iconClass="unfold" class="unfold" />
                {{ item.category_name }}
                <div class="button_group">
                  <el-button
                    size="mini"
                    round
                    type="danger"
                    @click="EditShowCate({data:item,type:'editfirst'})"
                  >编辑</el-button>
                  <el-button size="mini" round type="success" @click="AddShowCate(item.id)">添加子级</el-button>
                  <el-button size="mini" round @click="DeleteCateWarn(item.id)">删除</el-button>
                </div>
              </h4>
              <ul v-if="item.children">
                <li v-for="item2 in item.children" :key="item2.id">
                  {{ item2.category_name }}
                  <div class="button_group">
                    <el-button
                      size="mini"
                      round
                      type="danger"
                      @click="EditShowSecondCate({data:item2})"
                    >编辑</el-button>
                    <el-button size="mini" round @click="DelSencondCateWarn(item,item2.id)">删除</el-button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </el-col>
        <el-col :span="15">
          <div class="category">
            <h4>{{editTitle}}</h4>
            <el-form ref="categoryform" :model="categoryform" class="edit_cate">
              <el-form-item label="一级分类名称" v-if="input_firstDegree" class="input_firstDegree">
                <el-input
                  v-model="categoryform.fir_name"
                  class="category_name"
                  :disabled="disabled_firstDegree"
                ></el-input>
              </el-form-item>
              <el-form-item label="二级分类名称" v-if="input_secondDegree">
                <el-input
                  v-model="categoryform.sen_name"
                  class="category_name"
                  :disabled="disabled_secondDegree"
                ></el-input>
              </el-form-item>
            </el-form>
            <el-button
              size="medium"
              type="danger"
              class="confirm_btn"
              @click="submit"
              :loading="submitloading"
              :disabled="submit_disabled"
            >确定</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import {
  addFirstCategory,
  getCategoryall,
  editCategory,
  deleteCategory,
  addChildrenCategory
} from "@/api/info";
import { reactive, ref, onMounted, watch } from "@vue/composition-api";
import { global } from "@/utils/global";
import { common } from "@/api/common";
export default {
  name: "infoCategory",
  setup(props, { root, refs }) {
    //global
    const { MsgBox } = global();
    //common
    const { getCateTypeAll, TypeAllKey } = common();
    //ref
    const editTitle = ref("分类编辑");
    const submint_btn_type = ref("");
    const input_firstDegree = ref(true);
    const input_secondDegree = ref(true);
    const submitloading = ref(false);
    const submit_disabled = ref(true);
    const disabled_firstDegree = ref(true);
    const disabled_secondDegree = ref(true);
    const deleteId = ref("");
    const editId = ref("");
    const editName = ref("");
    const addSenId = ref("");
    //reactive
    const categoryform = reactive({
      fir_name: "",
      sen_name: ""
    });
    const CateData = reactive({
      data: []
    });
    const TypeData = reactive({
      data: []
    });
    const deleteData = reactive({
      data: []
    });
    const childrenData = reactive({
      data: []
    });
    //onMounted
    onMounted(() => {
      //GetCategoryall();
      getCateTypeAll();
    });
    /**
     * watch
     */
    watch(() => {
      CateData.data = TypeAllKey.data;
    });
    // watch(() => TypeAllKey.data, value => { TypeData.data = value; }
    // );
    //methods
    //提交按钮操作
    const submit = () => {
      if (submint_btn_type.value === "addfirst") {
        addFirstCate();
      } else if (submint_btn_type.value === "editfirst") {
        EditFirstCate();
      } else if (submint_btn_type.value === "addsecond") {
        addSecondCate();
      }
    };
    //添加一级分类
    const addFirstDegreeCate = () => {
      submint_btn_type.value = "addfirst";
      editTitle.value = "一级分类编辑";
      categoryform.fir_name = "";
      categoryform.sen_name = "";
      input_firstDegree.value = true;
      input_secondDegree.value = false;
      disabled_firstDegree.value = false;
      submit_disabled.value = false;
    };
    const addFirstCate = () => {
      if (!categoryform.fir_name) {
        root.$message({
          message: "分类名称不能为空",
          type: "warning"
        });
        return false;
      }
      submit_disabled.value = false;
      submitloading.value = true;
      let data = {
        categoryName: categoryform.fir_name
      };
      addFirstCategory(data)
        .then(response => {
          let resData = response.data;
          if (resData.resCode === 0) {
            root.$message({
              message: resData.message,
              type: "success"
            });
            CateData.data.push(resData.data);
            categoryform.fir_name = "";
          }
          submitloading.value = false;
        })
        .catch(error => {
          submitloading.value = false;
          categoryform.fir_name = "";
          categoryform.sen_name = "";
        });
    };
    //编辑一级信息分类
    const EditFirstCate = () => {
      let data = {
        id: editId.value,
        categoryName: categoryform.fir_name
      };
      if (!categoryform.fir_name) {
        root.$message({
          message: "分类名称不能为空",
          type: "warning"
        });
        return false;
      } else if (categoryform.fir_name == editName.value) {
        root.$message({
          message: "分类名称没有改变",
          type: "warning"
        });
        return false;
      }
      submit_disabled.value = false;
      submitloading.value = true;
      editCategory(data)
        .then(response => {
          let resData = response.data;
          if (resData.resCode === 0) {
            root.$message({
              message: resData.message,
              type: "success"
            });
            //GetCategoryall();
            getCateTypeAll();
            categoryform.fir_name = "";
          }
          submitloading.value = false;
        })
        .catch(error => {
          submitloading.value = false;
          categoryform.fir_name = "";
          categoryform.sen_name = "";
        });
    };
    const EditShowCate = params => {
      //表单的改变
      addFirstDegreeCate();
      //将编辑的分类名字 出现在 输入框
      categoryform.fir_name = params.data.category_name;
      //判断是 一级分类 /二级
      submint_btn_type.value = params.type;
      editId.value = params.data.id;
      editName.value = params.data.category_name;
    };
    //添加二级分类
    const AddShowCate = id => {
      submint_btn_type.value = "addsecond";
      editTitle.value = "二级分类编辑";
      input_firstDegree.value = false;
      input_secondDegree.value = true;
      disabled_secondDegree.value = false;
      submit_disabled.value = false;
      addSenId.value = id;
    };
    const addSecondCate = () => {
      let data = {
        categoryName: categoryform.sen_name,
        parentId: addSenId.value
      };
      if (!categoryform.sen_name) {
        root.$message({
          message: "分类名称不能为空",
          type: "warning"
        });
        return false;
      }
      submit_disabled.value = false;
      submitloading.value = true;
      addChildrenCategory(data)
        .then(response => {
          let resData = response.data;
          if (resData.resCode === 0) {
            root.$message({
              message: resData.message,
              type: "success"
            });
            getCateTypeAll();
            categoryform.sen_name = "";
          }
          submitloading.value = false;
        })
        .catch(error => {
          submitloading.value = false;
          categoryform.fir_name = "";
          categoryform.sen_name = "";
        });
    };
    //获取信息分类
    // const GetCategoryall = () => {
    //   getCategoryall()
    //     .then(response => {
    //        let resData = response.data;
    //       if (resData.resCode === 0) {
    //         CateData.data = resData.data;
    //         categoryform.sen_name = "";
    //       }
    //     })
    //     .catch(error => {
    //       console.log(error);
    //     });
    // };
    //删除信息分类
    const DeleteCateWarn = id => {
      deleteId.value = id;
      MsgBox({
        content: "确认删除此分类，是否继续？",
        tip: "警告",
        fn: DeleteCategory,
        catchFn: () => {
          deleteId.value = "";
          root.$message({
            message: "已取消删除",
            type: "success"
          });
        }
      });
    };
    const DeleteCategory = () => {
      deleteCategory({ categoryId: deleteId.value })
        .then(response => {
          let resData = response.data;
          if (resData.resCode === 0) {
            root.$message({
              message: "删除成功",
              type: "success"
            });
            if (CateData.data.children) {
              let index = CateData.data.children.findIndex(
                item => item.id == deleteId.value
              );
              CateData.data.children.splice(index, 1);
            } else {
              let index = CateData.data.findIndex(
                item => item.id == deleteId.value
              );
              CateData.data.splice(index, 1);
            }
          }
        })
        .catch(error => {});
    };
    //删除二级分类
    const DelSencondCateWarn = (item, id) => {
      deleteId.value = id;
      deleteData.data = item.children;
      MsgBox({
        content: "确认删除此分类，是否继续？",
        tip: "警告",
        fn: DeleteSecondCategory,
        catchFn: () => {
          deleteId.value = "";
          root.$message({
            message: "已取消删除",
            type: "success"
          });
        }
      });
    };
    const DeleteSecondCategory = () => {
      deleteCategory({ categoryId: deleteId.value })
        .then(response => {
          let resData = response.data;
          if (resData.resCode === 0) {
            root.$message({
              message: "删除成功",
              type: "success"
            });
            // let index = deleteData.data.filter(
            //   item => item.id === deleteId.value
            // );
            // deleteData.data.splice(index, 1);
            getCateTypeAll();
          }
        })
        .catch(error => {});
    };
    return {
      //ref
      editTitle,
      input_firstDegree,
      input_secondDegree,
      submitloading,
      submit_disabled,
      disabled_firstDegree,
      disabled_secondDegree,
      //reactive
      childrenData,
      deleteData,
      CateData,
      categoryform,
      //methods
      submit,
      addFirstDegreeCate,
      AddShowCate,
      DeleteCateWarn,
      EditShowCate,
      DelSencondCateWarn
    };
  }
};
</script>

<style scoped>
.add_first_degree_btn {
  width: 157px;
  margin-bottom: 30px;
}
.edit_cate .el-form-item {
  width: 53%;
}
.category {
  line-height: 44px;
  position: relative;
  cursor: pointer;
}
.category_title::before {
  content: "";
  position: absolute;
  left: 20px;
  top: 34px;
  bottom: -13px;
  width: 32px;
  border-left: 1px dotted #000;
}
.categorywrap div:last-child::before {
  bottom: 21px;
}
.category h4 {
  font-size: 15px;
  color: #344a5f;
  padding-left: 40px;
}
.category_title li {
  font-size: 14px;
  color: #344a5f;
  padding-left: 60px;
  position: relative;
  margin-left: 21px;
  padding-left: 40px;
}
.category_title li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 22px;
  width: 32px;
  border-bottom: 1px dotted #000;
}
.category h4:hover,
.category li:hover {
  background-color: #f3f3f3;
  transition: all 0.5s ease 0s;
}
.category h4:hover .button_group,
.category li:hover .button_group {
  display: block;
}
.svg-icon {
  width: 15px;
  position: absolute;
  left: 13px;
  top: 13px;
}
.button_group {
  display: none;
  position: absolute;
  right: 11px;
  top: 0;
  z-index: 10;
}
.edit_cate {
  padding-left: 40px;
  padding-top: 30px;
}
.el-form .el-form-item__label {
  color: #344a5f;
}
.category_name {
  width: 309px;
}
.confirm_btn {
  margin-left: 136px;
}
</style>
