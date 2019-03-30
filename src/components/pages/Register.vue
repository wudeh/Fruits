<template>
  <div>
    <van-nav-bar
      title="用户注册"
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
        @click-icon="userName=''"
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
        <van-button type="primary" @click="registerAction" size="large" :loading="openLoading">马上注册</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import url from "@/serviceAPI.config.js"
import { Toast } from "vant"
  export default {
    name: "Register",
    data() {
      return {
        userName: '',
        passWord: '',
        openLoading: false,  // 决定用户注册按钮的状态
        userNameErrorMsg: '',// 用户名出错时的信息
        passWordErrorMsg: '',// 密码出错时的信息
      }
    },
    methods: {
      goBack() {
        this.$router.go(-1);
      },
      registerAction() {
        this.checkForm() && this.axiosRegisterUser();
      },
      axiosRegisterUser() {
        this.openLoading = true;
        axios({
          url: url.registerUser,
          method: "post",
          data: {
            userName: this.userName,
            passWord: this.passWord
          }
        })
        .then(res => {
          this.openLoading = false;
          if(res.data.code === 200) {
            Toast.success(res.data.message);
            console.log(res);
            this.$router.push("/login");
          }else {
            Toast.fail("注册失败");
            console.log(res);
          }
        })
        .catch(err => {
          this.openLoading = false;
          console.log(err);
        })
      },
      // 验证表单数据正确与否
      checkForm() {
        let isOk = true;
        if(this.userName.length < 5) {
          isOk = false;
          this.userNameErrorMsg = "用户名长度不能低于5位";
        }else {
          this.userNameErrorMsg = "";
        }
        if(this.passWord.length < 6) {
          isOk = false;
          this.passWordErrorMsg = "密码长度不能低于6位";
        }else {
          this.passWordErrorMsg = "";
        }
        return isOk;
      }
    },
  }
</script>

<style scoped>
  .register-panel {
    width: 96%;
    border-radius: .3rem;
    margin: 9.2rem auto;
    padding-bottom: 15rem;
  }
  .register div {
    border-radius: 5rem;
  }
  .register-botton {
    padding-top: .9rem;
  }
</style>