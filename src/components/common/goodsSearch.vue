<template>
  <div>
    <div class="hotGoods" @click="goGoods">
      <div class="goods-img">
        <img :src="goods.IMAGE1" width="90%" :onerror="errorImg">
      </div>
      <div class="itemDes">{{ goods.NAME }}</div>
      <div class="itemPrice">￥{{ goods.PRESENT_PRICE | toMoney }}</div>
    </div>
  </div>
</template>

<script>
import { toMoney } from '@/assets/js/filter'
  export default {
    name: 'goodsComponent',
    data() {
      return {
        errorImg: 'this.src="' + require('@/assets/image/errorimg.png') + '"'
      }
    },
    props: ['goods'],
    methods: {
      goGoods() {
        this.$router.push({name: "DetailGoodsInfo", query:{goodsId: this.goods.ID}})
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