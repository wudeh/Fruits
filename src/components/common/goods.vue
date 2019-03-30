<template>
  <div>
    <div class="hotGoods" @click="goGoods">
      <div class="goods-img">
        <img v-lazy="goods.image" width="90%">
      </div>
      <div class="itemDes">{{ goods.name }}</div>
      <div class="itemPrice">￥{{ goods.price | toMoney }}</div>
    </div>
  </div>
</template>

<script>
import { toMoney } from '@/assets/js/filter'
  export default {
    name: 'goodsComponent',
    props: ['goods'],
    methods: {
      goGoods() {
        this.$router.push({name: "DetailGoodsInfo", query:{goodsId: this.goods.goodsId}})
      }
    },
    filters:{
      toMoney(money) {
        return toMoney(money)
      }
    }
  }
</script>

<style scoped>
.hotGoods {
    background-color: #fff;
    text-align: center;
    border-radius: .3rem;
    margin: .3rem;
  }
  .itemDes {
    padding: 0 .5rem;
    margin-bottom: .2rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
</style>