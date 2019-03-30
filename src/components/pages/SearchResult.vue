<template>
  <div>
    <!-- 搜索结果商品区域 -->
    <div class="searchResult" ref="searchResultArea">
      <van-list>
        <van-row>
          <van-col span="12" v-for="(item, index) in searchResult" :key="index">
            <goods-search :goods="item"></goods-search>
          </van-col>
        </van-row>
      </van-list>
    </div>
  </div>
</template>

<script>
import goodsSearch from '../common/goodsSearch';
import axios from 'axios';
import url from '@/serviceAPI.config.js';
import { mapState } from 'vuex';
  export default {
    name: "searchResult",
    data() {
      return {
        searchResult: [],
        keyWord: ''
      }
    },
    watch: {
      searchKeyWord() {   // 监听搜索关键词的变化 一旦变化重新获取数据
        this.getSearchResult();
      }
    },
    computed: {
    // 取出公用数据， 把 vuex 里面的公用数据映射到 computed 的计算属性 city 里
    ...mapState(['searchKeyWord'])
    },
    created() {
      console.log("这是刷新后的搜索词"+ this.searchKeyWord);
      this.getSearchResult();
    },
    components: {
      goodsSearch
    },
    methods: {
      getSearchResult() {
        axios({
          url: url.getGoodsInfoByKeyWord,
          method: 'post',
          data: { keyWord: this.searchKeyWord }
        }).then((res) => {
          console.log(res)
          if(res.data.code === 200 && res.data.message) {
            this.searchResult = res.data.message;
            console.log(this.searchResult)
          }
        }).catch((err) => {
          Toast("服务器错误啦")
          console.log(err);
        });
      }
    },
  }
</script>

<style scoped>
.searchResult {
  overflow-y: scroll;
  overflow-x: hidden;
}
</style>