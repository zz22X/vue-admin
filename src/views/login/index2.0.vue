<template>
  <div id="login">
    <div class="login_wrap">
      <div class="menu_tab">
        <ul>
          <li 
          :class="{'current': item.current}" 
          v-for="item in menutab" 
          :key="item.txt"
          @click="toggleMenu(item)"
          >{{item.txt}}</li>
        </ul>
      </div>
      <div class="tab_cnt">
            <div>
    <el-form
      :model="ruleForm"
      :label-position="labelPosition"
      status-icon
      :rules="rules"
      ref="ruleForm"
      class="demo-ruleForm"
      size="medium"
    >
      <el-form-item prop="emil">
        <label>邮箱</label>
        <el-input type="text" v-model="ruleForm.emil" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <label>密码</label>
        <el-input
          type="password"
          v-model="ruleForm.password"
          autocomplete="off"
          maxlength="20"
          minlength="6"
        ></el-input>
      </el-form-item> 
      <el-form-item prop="checkPass" v-show="model === 'register'">
        <label>确认密码</label>
        <el-input
          type="password"
          v-model="ruleForm.checkPass"
          autocomplete="off"
          maxlength="20"
          minlength="6"
        ></el-input>
      </el-form-item>
      <el-form-item prop="verify">
        <label>验证码</label>
        <el-row :gutter="10">
          <el-col :span="15">
            <el-input v-model.number="ruleForm.verify" maxlength="4" minlength="4"></el-input>
          </el-col>
          <el-col :span="9">
            <el-button type="success">获取验证码</el-button>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item class="login_btn">
        <el-button type="danger" @click="submitForm('ruleForm')" disabled>注册</el-button>
      </el-form-item>
    </el-form>
  </div>
      </div>
    </div>
  </div>
</template>

<script>
import { stripscript, validateEmil, validatePass, validateVerify } from "@/utils/validate"
export default {
  name: "login",
  data() {
    //验证邮箱
    var validateEmail = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入邮箱"));
      } else if (validateEmil(value)) {
        callback(new Error("邮箱格式错误"));
      } else {
        callback();
      }
    };
    //验证密码
    var validatePassword = (rule, value, callback) => {
      //过滤后的数据
      this.ruleForm.password = stripscript(value);
      //重新赋予value
      value = this.ruleForm.password;
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (validatePass(value)) {
        callback(new Error("密码为6至20位的数字或字母"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    //验证确认密码
    var validatePass2 = (rule, value, callback) => {
      if(this.model === 'login') { callback(); }
      //过滤后的数据
      this.ruleForm.checkPass = stripscript(value);
      //重新赋予value
      value = this.ruleForm.checkPass;
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    //验证验证码
    var checkVerify = (rule, value, callback) => {
      //过滤后的数据
      this.ruleForm.verify = stripscript(value);
      //重新赋予value
      value = this.ruleForm.verify;
      if (!value) {
        return callback(new Error("请输入验证码"));
      } else if (validateVerify(value)) {
        callback(new Error("验证码格式有误"));
      } else {
        callback();
      }
    };
    return {
      model: 'login',
      menutab: [
        {txt: '登录', current: true, type: "login"},
        {txt: '注册', current: false, type: "register"}
      ],
      ruleForm: {
        emil: "",
        password: "",
        checkPass: "",
        verify: ""
      },
      //验证规则
      rules: {
        emil: [{ validator: validateEmail, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        verify: [{ validator: checkVerify, trigger: "blur" }]
      },
      labelPosition: "top"
    };
  },
  methods: {
    toggleMenu(data) {
      this.menutab.forEach(e=> {
        e.current = false
      })
      data.current = true
      this.model = data.type
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
<style scoped>
#login {
  height: 100vh;
  background-color: #344a5f;
}
.login_wrap {
  padding-top: 100px;
  width: 330px;
  margin: auto auto;;
}
.menu_tab {
  text-align: center;
  margin-bottom: 30px;
}
.menu_tab li {
  display: inline-block;
  width: 88px;
  line-height: 36px;
  border-radius: 2px;
  font-size: 14px;
  color: #fff;
  cursor: pointer;
}
.current {
  background-color: rgba(0, 0, 0, 0.1);
  font-weight: 600;
}
.el-form {
  text-align: left;
}
.el-form-item {
  margin-bottom: 8px;
}
label {
  font-size: 14px;
  color: #eee;
  line-height: 45px;
}
.el-button {
  width: 100%;
}
.login_btn {
  margin-top: 32px;
}
</style>
