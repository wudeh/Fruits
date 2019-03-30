<template>
  <div class="shoppingMall">
    <div class="search-bar">
      <van-row class="search-row">
        <van-col span="3">
          <img :src="locationIcon" width="50%" class="search-icon" />
        </van-col>
        <van-col span="16">
          <input
            type="text"
            class="search-input"
            placeholder="查找"
            @click="goSearchPage"
          />
        </van-col>
        <van-col span="5" class="search-button">
          <van-button round size="mini">搜索</van-button>
        </van-col>
      </van-row>
    </div>
    <!-- swiper area -->
    <div class="swiper-area">
      <van-swipe :autoplay="1000">
        <van-swipe-item
          class="swipe-item"
          v-for="img in bannerPicArray"
          :key="img.imageUrl"
        >
          <img :src="img.image" width="100%" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 水果导航 -->
    <div class="fruite-nav" @click="goCategoryList">
      <div v-for="img in fruiteNav" :key="img.image">
        <img v-lazy="img.image" width="100%" />
        <span class="fruite-des">{{ img.mallCategoryName }}</span>
      </div>
    </div>
    <!-- 广告 -->
    <div class="ad">
      <img v-lazy="adImg.PICTURE_ADDRESS" width="100%" />
    </div>
    <!-- 商品推荐区域 -->
    <div class="recommend-area">
      <div class="recommend-title">商品推荐</div>
      <div class="recommend-body">
        <swiper :options="swiperOption">
          <swiper-slide v-for="(item, index) in recommendGoods" :key="index">
            <div class="recommend-item" @click="goDetail(item.goodsId)">
              <img :src="item.image" width="100%" />
              <div class="goodsName">{{ item.goodsName }}</div>
              <div class="price-control">
                <span class="mallPrice"
                  >原价：{{ item.mallPrice | toMoney }}</span
                ><br />
                <span class="price">现价：{{ item.price | toMoney }}</span>
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
    <!-- 楼层不规则层 -->
    <floor-component
      :floorData="floor1"
      :floorName="floorName.floor1"
    ></floor-component>
    <floor-component
      :floorData="floor2"
      :floorName="floorName.floor2"
    ></floor-component>
    <floor-component
      :floorData="floor3"
      :floorName="floorName.floor3"
    ></floor-component>
    <!-- 热卖商品 -->
    <div class="hotGoods-title">热卖商品</div>
    <div class="hotGoods">
      <van-list>
        <van-row gutter="20">
          <van-col span="12" v-for="(item, index) in hotGoods" :key="index">
            <goods-component :goods="item"></goods-component>
          </van-col>
        </van-row>
      </van-list>
    </div>
  </div>
</template>

<script>
import axios from "@/axiosBlock";
import "swiper/dist/css/swiper.css";
import floorComponent from "../common/floor";
import goodsComponent from "../common/goods";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import { toMoney } from "@/assets/js/filter";
import url from "@/serviceAPI.config.js";
export default {
  name: "shoppingMall",
  data() {
    return {
      locationIcon: require("../../assets/image/location.png"),
      bannerPicArray: [], // 轮播图
      fruiteNav: [], // 水果导航
      adImg: "", // 广告图
      recommendGoods: [], // 商品推荐数据
      floor1: [],
      floor2: [],
      floor3: [],
      floorName: {},
      hotGoods: [],
      swiperOption: {
        slidesPerView: 3
      }
    };
  },
  components: {
    swiper,
    swiperSlide,
    floorComponent,
    goodsComponent
  },
  created() {
    axios({
      url: url.getShoppingMallInfo,
      method: "get"
    })
      .then(res => {
        if (res.status === 200) {
          let data = res.data.data;
          this.bannerPicArray = data.slides;
          this.fruiteNav = data.category;
          this.adImg = data.advertesPicture;
          this.recommendGoods = data.recommend;
          this.floorName = data.floorName;
          this.floor1 = data.floor1;
          this.floor2 = data.floor2;
          this.floor3 = data.floor3;
          this.hotGoods = data.hotGoods;
        }
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    goSearchPage() {
      this.$router.push({ name: "searchWord" });
    },
    goCategoryList() {
      this.$router.push({ name: "categoryList" });
    },
    goDetail(goodsId) {
      this.$router.push({ name: "DetailGoodsInfo", query: { goodsId } });
    }
  },
  filters: {
    toMoney(money) {
      return toMoney(money);
    }
  }
};
</script>

<style scoped>
.shoppingMall {
  padding-bottom: 50px;
}
.search-row {
  overflow: hidden;
  background-color: #e5017d;
  height: 2.2rem;
  line-height: 2.2rem;
}
.search-input {
  width: 100%;
  height: 1.3rem;
  border-top: 0;
  border-left: 0;
  border-right: 0;
  border-bottom: 1px solid #fff;
  background-color: #e5017d;
}
.search-icon {
  padding-top: 0.5rem;
  padding-left: 0.6rem;
}
.search-button {
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
}
.swiper-area {
  width: 100%;
  overflow: hidden;
  max-height: 13rem;
  margin-bottom: 0;
}
.fruite-nav {
  display: flex;
  margin: 0 0.2rem 0.2rem 0.2rem;
  border-radius: 0.3rem;
  flex-direction: row;
  flex-wrap: nowrap;
  background-color: #fff;
}
.fruite-nav div {
  flex: 1;
  padding: 0.5rem;
  font-size: 0.2rem;
  text-align: center;
}
.fruite-nav .fruite-des {
  display: inline-block;
  margin-top: 0.2rem;
}
.recommend-area {
  background-color: #fff;
  height: 11rem;
}
.recommend-title {
  height: 1rem;
  line-height: 1rem;
  padding-left: 0.2rem;
  font-size: 0.8rem;
  color: #e5017d;
  border-bottom: 1px solid #ccc;
}
.recommend-body {
  text-align: center;
  font-size: 0.6rem;
  border-bottom: 1px solid #ccc;
}
.recommend-item {
  border-right: 1px solid #ccc;
  height: 10rem;
}
.price-control {
  width: 100%;
  position: absolute;
  bottom: 0;
}
.mallPrice {
  text-decoration: line-through;
}
.hotGoods-title {
  color: #e5017d;
  font-size: 0.875rem;
  padding: 0.3rem 0;
  height: 0.9rem;
  line-height: 0.9rem;
  text-align: center;
}
.hotGoods {
  padding: 0 0.8rem;
}
</style>
