<template>
    <div>
        <div>
            <van-nav-bar  title="会员中心" />
        </div>
        <div class="top">
           <img :src="picture" class="top-img" />
           <div class="welcom">欢迎您，{{ this.DSuser ? this.DSuser.name : '游客' }}</div>
        </div>
        <div class="login" v-if="!DSuser">
            <div><van-button type="warning" @click="goLogin">我要登录</van-button></div>
            <div><van-button type="primary" @click="goRegister">我要注册</van-button></div>
        </div>
        <div @click="useless">
            <van-cell-group>
                <van-cell title="会员卡" is-link />
                <van-cell title="地址管理" is-link  />
                <van-cell title="我的订单" is-link  />
                <van-cell title="会员权益" is-link />
                <van-cell title="联系我们" is-link  />
            </van-cell-group>

        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
    export default {
        name: "Member",
        data() {
            return {
                picture: require('@/assets/image/picture.jpg'),
                user: {}
            }
        },
        computed: {
            ...mapState(['DSuser'])
        },
        methods: {
            goLogin() {
                this.$router.push("/login");
            },
            goRegister() {
                this.$router.push("/register");
            },
            useless() {
                this.$notify('不好意思，这个没写');
            }
        },
    }
</script>

<style scoped>
    .top-img{
        width:70px;
        height: 70px;
        border-radius: 50px;
        margin-bottom: .3rem;
    }
    .top{
        height:5rem;
        text-align: center;
        padding-top: 1rem;
        padding-bottom: 1rem;
        background-color: #EEA2AD;
        font-size: 0.8rem;
    }
    .login{
        display: flex;
        flex-direction: row;
        background-color: #fff;
        padding:10px;
    }
    .login div{
        flex:1;
        text-align: center;
    }
</style>