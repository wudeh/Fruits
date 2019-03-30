<template>
  <div>
    <van-nav-bar
      title="用户登陆"
      left-text="返回"
      left-arrow
      @click-left="goBack"
    />
    <div class="register-panel">
      <!-- 用户名输入框 -->
      <van-field
        v-model="userName"
        label="用户名"
        icon="clear"
        @click-icon="userName = ''"
        placeholder="请输入用户名"
        required
        :error-message="userNameErrorMsg"
      />
      <!-- 密码输入框 -->
      <van-field
        v-model="passWord"
        type="passWord"
        label="密码"
        placeholder="请输入密码"
        required
        :error-message="passWordErrorMsg"
      />
      <!-- 注册按钮 -->
      <div class="register-button">
        <van-button
          type="primary"
          @click="loginAction"
          size="large"
          :loading="openLoading"
          >登陆</van-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import url from "@/serviceAPI.config.js";
import { Toast } from "vant";
import decode from "jwt-decode";
export default {
  name: "Register",
  data() {
    return {
      userName: "",
      passWord: "",
      openLoading: false, // 决定用户登陆按钮的状态
      userNameErrorMsg: "", // 用户名出错时的信息
      passWordErrorMsg: "" // 密码出错时的信息
    };
  },
  created() {
    // 一进入登陆页面就发送 token 给后端 没过期就不用登陆了
    axios({
      url: url.payMoney,
      method: "get"
    })
      .then(res => {
        if (res.data.code === 200 && res.data.message) {
          this.$dialog({
            message: "不用再登陆啦"
          }).then(() => {
            this.$router.push("/");
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    // 点击登陆按钮 判断用户名和密码
    loginAction() {
      this.checkForm() && this.axiosLoginUser();
    },
    // 用户登陆
    axiosLoginUser() {
      this.openLoading = true;
      axios({
        url: url.loginUser,
        method: "post",
        data: {
          userName: this.userName,
          passWord: this.passWord
        }
      })
        .then(res => {
          console.log(res);
          if (res.data.code === 200 && res.data.message === true) {
            new Promise(resolve => {
              const token = res.data.token;
              localStorage.DStoken = token;
              const user = decode(token);
              localStorage.DSuser = JSON.stringify(user);
              console.log(user);
              this.$store.commit("getDStoken", token);
              this.$store.commit("getDSUser", user);
              // 设置一个定时器 确保登录状态存储成功之后再显示登录成功
              setTimeout(() => {
                resolve();
              }, 500);
            })
              .then(() => {
                Toast.success("登录成功");
                this.$router.push("/");
              })
              .catch(err => {
                Toast.fail("登录失败，请尝试再次登录");
                console.log(err);
              });
          } else if (
            res.data.code === 200 &&
            res.data.message === "用户名不存在"
          ) {
            Toast.fail(res.data.message);
            this.openLoading = false;
          } else {
            Toast.fail("密码错误");
            this.openLoading = false;
          }
        })
        .catch(err => {
          console.log(err);
          Toast.fail("登录失败，可能是网络出问题了");
        });
    },
    // 验证表单数据正确与否
    checkForm() {
      let isOk = true;
      if (this.userName.length < 5) {
        isOk = false;
        this.userNameErrorMsg = "用户名长度不能低于5位";
      } else {
        this.userNameErrorMsg = "";
      }
      if (this.passWord.length < 6) {
        isOk = false;
        this.passWordErrorMsg = "密码长度不能低于6位";
      } else {
        this.passWordErrorMsg = "";
      }
      return isOk;
    }
  }
};
</script>

<style scoped>
.register-panel {
  width: 96%;
  border-radius: 0.3rem;
  margin: 9.2rem auto;
  padding-bottom: 15rem;
}
.register div {
  border-radius: 5rem;
}
.register-botton {
  padding-top: 0.9rem;
}
</style>
