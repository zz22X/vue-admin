<template>
  <div id="login">
    <div class="login_wrap">
      <div class="menu_tab">
        <ul>
          <li
            :class="{ current: item.current }"
            v-for="item in menutab"
            :key="item.txt"
            @click="toggleMenu(item)"
          >{{ item.txt }}</li>
        </ul>
      </div>
      <div class="tab_cnt">
        <div>
          <el-form
            :model="ruleForm"
            status-icon
            :rules="rules"
            ref="ruleForm"
            class="demo-ruleForm"
            size="medium"
          >
            <el-form-item prop="emil">
              <label for="email">邮箱</label>
              <el-input id="email" type="text" v-model="ruleForm.emil" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <label for="password">密码</label>
              <el-input
                type="password"
                v-model="ruleForm.password"
                autocomplete="off"
                maxlength="20"
                minlength="6"
                id="password"
              ></el-input>
            </el-form-item>
            <el-form-item prop="checkPass" v-show="model === 'register'">
              <label for="checkpass">确认密码</label>
              <el-input
                type="password"
                v-model="ruleForm.checkPass"
                autocomplete="off"
                maxlength="20"
                minlength="6"
                id="checkpass"
              ></el-input>
            </el-form-item>
            <el-form-item prop="verify">
              <label for="verify">验证码</label>
              <el-row :gutter="10">
                <el-col :span="15">
                  <el-input v-model="ruleForm.verify" maxlength="6" minlength="6" id="verify"></el-input>
                </el-col>
                <el-col :span="9">
                  <el-button
                    type="success"
                    @click="getSms()"
                    :disabled="verifyButtonStatus.status"
                  >{{ verifyButtonStatus.text }}</el-button>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item class="login_btn">
              <el-button
                type="danger"
                @click="submitForm('ruleForm')"
                :disabled="buttonStatus"
              >{{ model === "login" ? "登录" : "注册" }}</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import sha1 from "js-sha1";
import { reactive, ref, onMounted } from "@vue/composition-api";
import { GetSms, GetRegister } from "@/api/login";
import { stripscript, validateEmil, validatePass, validateVerify } from "@/utils/validate"
export default {
  name: "login",
  //放data数据、生命周期、自定义函数
  setup(props, context) {
    //console.log(context);
    /****************************************************************************************************************************** */
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
    //验证密码
    let validatePassword = (rule, value, callback) => {
      //过滤后的数据
      ruleForm.password = stripscript(value);
      //重新赋予value
      value = ruleForm.password;
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (validatePass(value)) {
        callback(new Error("密码为6至20位的数字或字母"));
      } else {
        if (ruleForm.checkPass !== "") {
          context.refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    //验证确认密码
    let validatePass2 = (rule, value, callback) => {
      if (model.value === "login") {
        callback();
      }
      //过滤后的数据
      ruleForm.checkPass = stripscript(value);
      //重新赋予value
      value = ruleForm.checkPass;
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== ruleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    //验证验证码
    let checkVerify = (rule, value, callback) => {
      //过滤后的数据
      ruleForm.verify = stripscript(value);
      //重新赋予value
      value = ruleForm.verify;
      if (!value) {
        return callback(new Error("请输入验证码"));
      } else if (validateVerify(value)) {
        callback(new Error("验证码格式有误"));
      } else {
        callback();
      }
    };
    /****************************************************************************************************************************** */
    /*
     声明data数据 
     */
    //模板快
    const model = ref("login");
    //登录按钮默认禁用
    const buttonStatus = ref(true);
    //设置定时器名称
    const timer = ref(null);
    //获取验证码按钮状态及文字
    const verifyButtonStatus = reactive({
      status: false,
      text: "获取验证码"
    });
    const menutab = reactive([
      { txt: "登录", current: true, type: "login" },
      { txt: "注册", current: false, type: "register" }
    ]);
    //表单规则
    const ruleForm = reactive({
      emil: "",
      password: "",
      checkPass: "",
      verify: ""
    });
    //验证规则
    const rules = reactive({
      emil: [{ validator: validateEmail, trigger: "blur" }],
      password: [{ validator: validatePassword, trigger: "blur" }],
      checkPass: [{ validator: validatePass2, trigger: "blur" }],
      verify: [{ validator: checkVerify, trigger: "blur" }]
    });
    /****************************************************************************************************************************** */
    /* 
    声明生命周期
     */
    onMounted(() => {});
    /****************************************************************************************************************************** */
    /* 
    声明自定义函数 
    */
    /****************************************************************************************************************************** */
    //切换菜单 login/register
    const toggleMenu = data => {
      menutab.forEach(e => {
        e.current = false;
      });
      data.current = true;
      //修改模块值
      model.value = data.type;
      //重置表单
      //this.$refs[ruleForm].resetFields()  2.0写法
      context.refs.ruleForm.resetFields(); //3.0写法
      //获取验证码按钮重置
      clearInterval(timer.value);
      verifyButtonStatus.status = false;
      verifyButtonStatus.text = "获取验证码";
    };
    /****************************************************************************************************************************** */
    //提交表单
    const submitForm = () => {
      //2.0 this.$refs
      context.refs.ruleForm.validate(valid => {
        if (valid) {
          if (model.value === "login") {
            getLogin();
          } else {
            getRegister();
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    };
    /****************************************************************************************************************************** */
    //获取验证码
    const getSms = () => {
      //验证判断
      if (ruleForm.emil === "") {
        context.root.$message.error("邮箱不能为空!");
        return false;
      }
      if (validateEmil(ruleForm.emil)) {
        context.root.$message.error("邮箱格式有误，请重新输入！");
        return false;
      }
      //修改获取验证码按钮的状态
      verifyButtonStatus.status = true;
      verifyButtonStatus.text = "发送中";
      //请求接口的数据
      let requestData = {
        username: ruleForm.emil,
        module: model.value
      };
      //调用接口设置3秒钟延迟
      setTimeout(() => {
        GetSms(requestData)
          .then(response => {
            let data = response.data;
            context.root.$message({
              message: data.message,
              type: "success"
            });
            //登录/注册按钮启用
            buttonStatus.value = false;
            //请求成功之后，调用倒计时
            countDown(60);
          })
          .catch(error => {
            console.log(error);
          });
      }, 3000);
    };
    /****************************************************************************************************************************** */
    //倒计时 设置60s定时器
    const countDown = number => {
      //先清除之前的定时器
      if (timer.value) {
        clearInterval(timer.value);
      }
      let count = number;
      timer.value = setInterval(() => {
        count--;
        if (count === 0) {
          context.root.$message.error("验证码失效");
          count = 60;
          //修改获取验证码按钮的状态
          verifyButtonStatus.status = false;
          verifyButtonStatus.text = "再次获取";
          clearInterval(timer.value);
        } else {
          //修改验证码按钮文字 ES6
          verifyButtonStatus.text = `倒计时${count}秒`; // ES5:"倒计时" + count + "秒";
        }
      }, 1000);
    };
    /******************************************************************************************************************************/
    //注册
    const getRegister = () => {
      let requestData = {
        username: ruleForm.emil,
        password: sha1(ruleForm.password),
        code: ruleForm.verify
      };
      GetRegister(requestData)
        .then(response => {
          let data = response.data;
          context.root.$message({
            message: data.message,
            type: "success"
          });
          toggleMenu(menutab[0]);
        })
        .catch(error => {
          console.log(error);
        });
    };
    /******************************************************************************************************************************/
    //登录
    const getLogin = () => {
      let requestData = {
        username: ruleForm.emil,
        password: sha1(ruleForm.password),
        code: ruleForm.verify
      };
      //通过store 的 actions 进行异步操作
      context.root.$store
        .dispatch("Login/Login", requestData)
        .then(response => {
          let data = response.data;
          context.root.$message({
            message: data.message,
            type: "success"
          });
          setTimeout(() => {
            context.root.$router.push("/console");
          }, 2000);
          if (timer.value) {
            clearInterval(timer.value);
          }
        })
        .catch(error => {
          console.log(error);
        });
      // GetLogin(requestData)
      //   .then(response => {
      //     let data = response.data;
      //     context.root.$message({
      //       message: data.message,
      //       type: "success"
      //     });
      //     setTimeout(() => {
      //       context.root.$router.push('/console');
      //     },2000)
      //   })
      //   .catch(error => {
      //     console.log(error);
      //   });
    };

    //返回出去********************************************************************************************************
    return {
      model,
      buttonStatus,
      verifyButtonStatus,
      menutab,
      ruleForm,
      rules,
      toggleMenu,
      submitForm,
      getSms
    };
  }
};
</script>
<style scoped>
#login {
  height: 100vh;
  background-color: #344a5f;
  color: #fff;
  text-align: center;
}
.login_wrap {
  padding-top: 100px;
  width: 330px;
  margin: auto auto;
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
