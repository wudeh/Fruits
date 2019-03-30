<template>
  <div>
    <div class="nav-bar">
      <van-nav-bar title="商品分类" left-arrow @click-left="goBack" />
    </div>
    <div>
      <van-row>
          <van-col span="6">
            <div id="leftNav" ref="leftNav">
              <ul>
                <li @click="click_category(index, item.ID)" :class="{categoryActive:categoryIndex==index}" v-for="(item, index) in category" :key="index">
                  {{ item.MALL_CATEGORY_NAME }}
                </li>
              </ul>
            </div>
        </van-col>
        <van-col span="18">
          <div class="tabGategorySub">
            <van-tabs v-model="active" @click="onClickCategorySub">
              <van-tab v-for="(item, index) in categorySub" :key="index" :title="item.MALL_SUB_NAME"></van-tab>
            </van-tabs>
          </div>
          <div class="list" ref="list">
            <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
              <van-list v-model="loading" :finished="finished" @load="onload">
                <div class="list-item" @click="goGoodsDetail(item.ID)" v-for="(item, index) in goodsSubList" :key="index">
                  <div class="list-item-img">
                    <img :src="item.IMAGE1" width="100%" :onerror="errorImg">
                  </div>
                  <div class="list-item-text">
                    <div>{{ item.NAME }}</div>
                    <div class="item-price">现价：{{ item.ORI_PRICE | toMoney }}元</div>
                  </div>
                </div>
              </van-list>
            </van-pull-refresh>
          </div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import url from "@/serviceAPI.config.js";
  import { Toast } from 'vant';
  import { toMoney } from '@/assets/js/filter.js';
  export default {
    name: 'categoryList',
    data() {
      return {
        active: 0,        // vant ui 里用来激活对应小类商品的值
        category: [],
        categoryIndex: 0,  // 记录点击的列表索引 用来改变背景颜色
        categorySub: [],   // 商品子类信息
        loading: false,    // 触发上拉加载时会自动变为 true，要手动变为 false
        finished: false,   // 上拉加载是否有数据，为 true 时上拉不再执行
        page: 1,
        goodsSubList: [],   // 具体的商品子类数据
        categorySubId: '',  // 商品子类ID      
        isRefresh: false,   // 控制是否下拉刷新
        errorImg: 'this.src="' + require('@/assets/image/errorimg.png') + '"'
      }
    },
    filters: {
      toMoney: function(money) {
        return toMoney(money);
      }
    },
    created() {
      this.getCategoryList();
    },
    mounted() {
      let windowHeight = document.documentElement.clientHeight;
      // document.getElementById('leftNav').style.height = windowHeight - 46 + 'px';
      this.$refs.leftNav.style.height = windowHeight - 46 + 'px';   // 给左侧大类列表一个具体高度 防止超出屏幕
      // 屏幕高度减去 顶部返回栏高度 46 tab 栏高度 44 底部导航高度 50
      this.$refs.list.style.height = windowHeight - 90 - 50 + 'px';      // 给右边商品区域一个具体高度 实现滚动效果
    },
    methods: {
      goBack() {
        this.$router.go(-1);
      },
      // 获取商品大类数据
      getCategoryList() {
        axios({
          url: url.getCategoryList,
          method: 'get'
        }).then(res => {
          if(res.data.code === 200 && res.data.message){
            this.category = res.data.message;
            this.getCategorySubList(this.category[0].ID);  // 获取第一个大类的子类列表
          }else {
            Toast("数据获取失败");
          }
        })
      },
      // 点击对应大类商品列表
      click_category(index, categoryId) {
        this.getCategorySubList(categoryId);   // 获取子类列表
        this.categoryIndex = index;            // 根据索引改变对应大类颜色
        this.page = 1;                        //  分页数据重置为第一页
        this.finished = false;                //  重置上拉加载效果
        this.goodsSubList = [];               //  分页数据清空
      },
      // 点击大类获取子类列表
      getCategorySubList(categoryId) {
        axios({
          url: url.getCategorySubList,
          method: 'post',
          data: {
            categorySubId: categoryId
          }
        }).then(res => {
          if(res.data.code === 200 && res.data.message) {
            this.categorySub = res.data.message;        // 获取子类列表
            this.categorySubId = this.categorySub[0].ID;// 默认获取第一个子类的ID
            this.active = 0;                            // 重置显示子类的索引
            this.onload();                              // 获取子类第一页分页数据
          }
        }).catch(err => {
          Toast('数据获取失败')
        })
      },
      // 上拉加载方法
      onload() {
        setTimeout(() => {
          this.categorySubId = this.categorySubId?this.categorySubId:this.categorySub[0].ID;
          this.getGoodsSubList();
        }, 1000);
      },
      // 下拉加载方法
      onRefresh() {
        setTimeout(() => {
          this.isRefresh = false;
          this.goodsSubList = []; // 清空原来的分页数据
          this.finished = false;  // 防止不能执行上拉加载方法
          this.page = 1;          // 分页数据重置到第一页
          this.onload();          // 上拉加载第一页分页数据
        }, 500);
      },
      // 获取子类商品分页数据 上拉加载触发
      getGoodsSubList() {
        axios({
          url: url.getGoodsListByCategorySubId,
          method: 'post',
          data: {
            categorySubId: this.categorySubId,
            page: this.page
          }
        }).then(res => {
          if(res.data.code ===200 && res.data.message.length){
            this.page++;
            this.goodsSubList = this.goodsSubList.concat(res.data.message);  //以前的数据和新获得的分页数据合并
          }else {
            this.finished = true;  // 如果后台已经没有分页数据的话就不再执行上拉加载方法
          }
          this.loading = false;
        }).catch(err => {
          console.log(err);
        })
      },
      // 点击子类
      onClickCategorySub(index, title) {
        this.categorySubId = this.categorySub[index].ID;  // 点击子类获取对应ID
        this.goodsSubList = [];                       // 如果点击其他子类就要清空分页数据
        this.page = 1;
        this.finished = false;                                // 重置分页页数为 1
        this.onload();
      },
      // 跳转到商品详情页
      goGoodsDetail(id) {
        this.$router.push({name:'DetailGoodsInfo',params: {goodsId: id}});
      }
    },
  }
</script>

<style scoped>
#leftNav {
  background-color: aliceblue;
}
#leftNav ul li {
  line-height: 2.4rem;
  border-bottom: 1px solid #e4e7ed;
  padding: .1875rem;
  font-size: .8rem;
  text-align: center;
}
.categoryActive {
  background-color: #fff;
}
.list {
  overflow: scroll;
}
.list-item{
        display: flex;
        flex-direction: row;
        font-size:0.8rem;
        border-bottom: 1px solid #f0f0f0;
        background-color: #fff;
        padding: 0.3125rem;
    }
#list-div{
    overflow: scroll;
}
.list-item-img{
    flex:8;
}
.list-item-text{
    flex:16;
    margin-top:10px;
    margin-left:10px;
}
.item-price {
  margin-top: 1.2rem;
}
</style>