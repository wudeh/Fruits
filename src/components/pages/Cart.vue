<template>
  <div>
    <div class="navBar">
      <van-nav-bar title="购物车" />
    </div>
    <div class="notice-bar">
      <van-notice-bar mode="closeable">
            不送货，不送货，自己来取啦啦啦啦啦啦啦啦啦啦
      </van-notice-bar>
    </div>
    <div class="cart-title">
      <van-button size="small" type="danger" @click="clearCart">清空购物车</van-button>
    </div>
    <!-- 显示购物车中的商品 -->
    <div class="cart-list">
      <div class="row" v-for="(item, index) in cartInfo" :key="index">
        <div class="item-img"><img :src="item.image" width="100%"></div>
        <div class="item-text">
          <div class="item-name">{{ item.name }}</div>
          <div class="item-count">
            <van-stepper v-model="item.count" />
          </div>
        </div>
        <div class="item-price">
          <div>{{ item.price | toMoney }}元</div>
          <div>x{{ item.count }}</div>
          <div class="allPrice">总:{{ item.price*item.count | toMoney }}元</div>
        </div>
      </div>
    </div>
    <div class="payMoney">
      <van-submit-bar
        :price="totalMoney * 100"
        button-text="提交订单"
        @submit="onSubmit"
      >
        <span slot="tip">
          点击提交订单就送钱哦~~
        </span>
      </van-submit-bar>
    </div>
  </div>
</template>

<script>
import { toMoney } from '@/assets/js/filter.js'
import { Toast } from 'vant';
import axios from 'axios';
import url from "@/serviceAPI.config.js";
  export default {
    name: 'Cart',
    data() {
      return {
        cartInfo: [],
        Empty: true,
        checked: true  // 默认不全选商品
      }
    },
    created() {
      this.getCartInfo();
    },
    computed: {
      totalMoney() {
        let allMoney = 0;
        this.cartInfo.map(item => {
          allMoney += item.price*item.count;
        })
        localStorage.cartInfo = JSON.stringify(this.cartInfo);
        return allMoney;
      }
    },
    filters: {
      toMoney: function(money) {
        return toMoney(money);
      }
    },
    methods: {
      // 从本地取出商品数据
      getCartInfo() {
        if(localStorage.cartInfo) {
          this.cartInfo = JSON.parse(localStorage.cartInfo);
        }
        this.Empty = this.cartInfo.length > 0 ? false : true;
      },
      // 清空购物车
      clearCart() {
        localStorage.removeItem('cartInfo');
        this.cartInfo = [];
        this.$store.commit('clearCart');
        this.Empty = true;
      },
      // 提交订单 验证 token 有效性
      onSubmit() {
        if(this.Empty) {
          this.$dialog.alert({
          message: '先买点东西好嘛'
          });
          return ;
        }
        axios({
          url: url.payMoney,
          method: 'get'
        }).then(res => {
          if(res.data.code ===200 && res.data.message) {
            Toast("你真的想送我钱嘛");
          }
        }).catch(err => {
          console.log(err);
        })
      }
    },
  }
</script>

<style scoped>
.van-submit-bar {
  bottom: 50px;
}
.cart-title {
  height: 2rem;
  line-height: 2rem;
  background-color: #fff;
  border-bottom: .0625rem solid #e4e7ed;
  padding: .3125rem;
  text-align: right;
}
.cart-list {
  background-color: #fff;
}
.row {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  padding: .5rem;
  font-size: .85rem;
  border-bottom: .0625rem solid #e4e7ed;
}
.item-img {
  flex: 6;
}
.item-text {
  flex: 8;
  padding-left: .625rem;
}
.item-count {
  padding-top: .625rem;
}
.item-price {
  flex: 4;
  text-align: right;
}
.allPrice {
  color: red;
}
.payMoney {
  overflow: scroll;
}
</style>