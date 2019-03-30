<template>
  <div class="goodsInfo">
    <div class="nav-bar">
      <van-nav-bar
        title="商品详情"
        left-text="返回"
        left-arrow
        @click-left="goBack"
      />
    </div>
    <div class="goodsImg">
      <img :src="goodsInfo.IMAGE1" width="100%" />
    </div>
    <div class="goods-name">{{ goodsInfo.NAME }}</div>
    <div class="goods-price">
      现价：{{ goodsInfo.PRESENT_PRICE | toMoney }}元
    </div>
    <div>
      <van-tabs animated swipeable sticky>
        <van-tab title="商品详情">
          <div v-html="goodsInfo.DETAIL"></div>
        </van-tab>
        <van-tab title="评论">
          评论制作中 评论制作中 评论制作中 评论制作中 评论制作中 评论制作中
          评论制作中 评论制作中 评论制作中 评论制作中 评论制作中 评论制作中
          评论制作中 评论制作中 评论制作中 评论制作中
        </van-tab>
      </van-tabs>
    </div>
    <div class="shopCar">
      <div @click="addGoodsTOCart">
        <van-button size="large" type="primary">加入购物车</van-button>
      </div>
      <div @click="buyDirectly">
        <van-button size="large" type="danger">直接购买</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import url from "@/serviceAPI.config.js";
import { Toast } from "vant";
import { toMoney } from "@/assets/js/filter.js";
export default {
  name: "goodsDetailInfo",
  data() {
    return {
      goodsId: "",
      goodsInfo: {}
    };
  },
  filters: {
    toMoney(money) {
      return toMoney(money);
    }
  },
  created() {
    // 获取到路由传递过来的 商品 id
    this.goodsId = this.$route.query.goodsId
      ? this.$route.query.goodsId
      : this.$route.params.goodsId;
    console.log(this.goodsId);
    this.getInfo();
  },
  methods: {
    getInfo() {
      axios({
        url: url.getDetailGoodsInfo,
        method: "post",
        data: { goodsId: this.goodsId }
      })
        .then(res => {
          if (res.data.code === 200 && res.data.message) {
            this.goodsInfo = res.data.message;
            console.log(this.goodsInfo);
          } else {
            Toast("获取数据失败");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 返回上一页
    goBack() {
      this.$router.go(-1);
    },
    // 增加商品到购物车
    addGoodsTOCart() {
      // 取出本地 localStorage 中的数据
      let cartInfo = localStorage.cartInfo
        ? JSON.parse(localStorage.cartInfo)
        : [];
      // 根据 ID 看此时购物车中有没有已经添加过同样的商品
      let isHaveGoods = cartInfo.find(cart => cart.goodsId === this.goodsId);
      // 如果没有就加入购物车
      if (!isHaveGoods) {
        this.$store.commit("changeCartNumber");
        let newGoodsInfo = {
          goodsId: this.goodsInfo.ID,
          name: this.goodsInfo.NAME,
          price: this.goodsInfo.PRESENT_PRICE,
          image: this.goodsInfo.IMAGE1,
          count: 1
        };
        cartInfo.push(newGoodsInfo);
        localStorage.cartInfo = JSON.stringify(cartInfo);
        Toast.success("加入购物车成功");
      } else {
        Toast("购物车已有此商品");
      }
      // this.$router.push({name: 'cart'});
    },
    // 点击直接购买
    buyDirectly() {
      this.$dialog.alert({
        message: "给我" + this.goodsInfo.PRESENT_PRICE + "元就行啦"
      });
    }
  }
};
</script>

<style scoped>
.goodsInfo {
  padding-bottom: 3.5rem;
}
.goods-name,
.goods-price {
  background-color: #fff;
  font-size: 1rem;
  text-align: center;
}
.shopCar {
  width: 100%;
  height: 3.5rem;
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: #fff;
  display: flex;
  flex-flow: nowrap;
}
.shopCar > div {
  flex: 1;
  border-radius: 2rem;
  padding: 0.2rem;
}
</style>
