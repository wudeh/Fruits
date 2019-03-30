<template>
  <div>
    <div class="main-div">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <van-tabbar v-model="active" @change="changeTabbar(active)">
      <van-tabbar-item icon="shop">首页</van-tabbar-item>
      <van-tabbar-item icon="records">列表</van-tabbar-item>
      <van-tabbar-item icon="cart" :info="cartNumber">购物车</van-tabbar-item>
      <van-tabbar-item icon="contact" dot>个人中心</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { Toast } from 'vant';
import { mapState } from 'vuex';
  export default {
    name: 'Main',
    data() {
      return {
        active: 0,
        nowPath: '',
      }
    },
    created() {
      this.changeTabbarActive();
    },
    computed: {
      ...mapState(['cartNumber'])
    },
    methods: {
      // 修正下面导航路由刷新后高亮样式会重置为首页的 bug
      changeTabbarActive() {
        this.nowPath = this.$route.path;
        switch(this.nowPath) {
          case '/cart':
            this.active = 2;
            break;
          case '/categoryList': 
            this.active = 1;
            break;
          case '/member':
            this.active = 3;
            break;
          default:
            this.active = 0;
        }
      },
      // 点击下面的导航路由跳转页面
      changeTabbar(active) {
        switch (active) {
          case 0:
            this.$router.push({name: 'shoppingMall'})
            break;
          case 1:
            this.$router.push({name: 'categoryList'});
            break;
          case 2:
            this.$router.push({name: 'cart'});
            break;
          case 3:
            this.$router.push({name: 'member'});
            break;
        }
      }
    },
  }
</script>

<style scoped>

</style>