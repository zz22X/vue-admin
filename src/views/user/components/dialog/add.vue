<template>
  <div class="info_dialog">
    <!--新增模块 -->
    <el-dialog
      :visible.sync="data.AddNewVisible"
      @close="close"
      @opened="poened"
      @open="open"
      :title="data.sign.value"
    >
      <el-form
        :model="data.form"
        ref="dataForm"
        :rules="data.rules"
        label-position="right"
        label-width="100px"
        style="margin-left: 50px;"
      >
        <el-form-item label="邮箱/用户名" prop="email">
          <el-input
            v-model="data.form.email"
            autocomplete="off"
            clearable
            placeholder="请输入邮箱/验证名"
            style="width: 220px;"
          ></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input
            v-model="data.form.name"
            autocomplete="off"
            maxlength="16"
            minlength="2"
            clearable
            placeholder="请输入姓名"
            style="width: 220px;"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input
            v-model.number="data.form.phone"
            autocomplete="off"
            clearable
            placeholder="请输入手机号"
            maxlength="11"
            minlength="11"
            style="width: 220px;"
          ></el-input>
        </el-form-item>
        <el-form-item label="地区" prop="area">
          <CascaderCmp @getmodelkey="getmodelkey" :category="data.form.area" />
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <Select :selsct="data.selsctOption" @sendselectvalue="getselectvalue" />
        </el-form-item>
        <el-form-item label="禁启用状态" prop="status">
          <el-switch v-model="data.form.status" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align: center;">
        <el-button @click="cancelAddNew" style="width: 100px">取 消</el-button>
        <el-button
          type="danger"
          @click="confirmAddNew"
          :loading="data.confirmloading"
          style="width: 100px; margin-left: 22px"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import CascaderCmp from "../cascader/cascaderCmp";
import Select from "@c/select/index";
import { AddUserInfo } from "@/api/user";
import { global } from "@/utils/global";
import { validateEmil, validateName, validatePhone } from "@/utils/validate";
import { reactive, watch, refs } from "@vue/composition-api";
export default {
  name: "addDialog",
  components: {
    Select,
    CascaderCmp
  },
  props: {
    flag: {
      type: Boolean,
      default: false
    },
    sign: {
      type: Object,
      default: () => {}
    }
  },
  setup(props, { root, emit, refs }) {
    //验证邮箱
    let validateEmail = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入邮箱"));
      } else if (validateEmil(value)) {
        callback(new Error("邮箱格式错误"));
      } else {
        callback();
      }
    };
    //验证手机号
    let validatePhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入手机号"));
      }
      if (validatePhone(value)) {
        callback(new Error("请输入11位数字值"));
      } else {
        callback();
      }
    };
    //验证姓名
    let valiName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入姓名"));
      } else if (validateName(value)) {
        callback(new Error("姓名格式有误"));
      } else {
        callback();
      }
    };
    /****************************************************************************************************************************** */
    //data数据
    const data = reactive({
      AddNewVisible: false,
      confirmloading: false,
      sign: {
        value: ""
      },
      editData: {},
      cascaderOption: {
        init: []
      },
      form: {
        email: "",
        name: "",
        phone: "",
        role: "",
        status: false,
        area: [],
        props: {}
      },
      selsctOption: {
        init: ["用户", "管理员"]
      },
      options: [],
      rules: {
        email: [{ required: true, validator: validateEmail, trigger: "blur" }],
        name: [{ required: true, validator: valiName, trigger: "blur" }],
        phone: [{ required: true, validator: validatePhone, trigger: "blur" }]
      }
    });
    //watch监听
    watch(() => {
      data.AddNewVisible = props.flag;
      data.sign.value = props.sign.value;
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
    const open = () => {};
    //打开动画结束后
    const poened = () => {};
    const cancelAddNew = () => {
      data.AddNewVisible = false;
    };
    const confirmAddNew = () => {
      editUserInfo();
    };

    const getselectvalue = val => {
      data.form.role = val;
    };
    const handleChange = () => {};
    /**
     *内部方法
     */
    const getmodelkey = val => {
      console.log(val);
      data.form.area = val;
      //console.log(area)
    };

    const editUserInfo = () => {
      let params = {
        email: data.form.email,
        name: data.form.name,
        phone: data.form.phone,
        role: data.form.role,
        isAdmin: data.form.isAdmin,
        area: data.form.area
      };
      console.log(data.form.area)
      AddUserInfo(params)
        .then(res => {
          let resData = res.data;
          if (resData.status === 0) {
            setTimeout(() => {
              root.$message({
                message: "添加成功",
                type: "success"
              });
              data.confirmloading = false;
              refs.dataForm.resetFields();
              emit("GetList");
            }, 500);
            data.AddNewVisible = false;
          }
        })
        .catch(err => {
          root.$message({
            message: "邮箱已被使用",
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
      handleChange,
      getselectvalue,
      confirmAddNew,
      getmodelkey
    };
  }
};
</script>

<style>
.el-dialog {
  width: 35%;
}
</style>