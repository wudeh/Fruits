<template>
  <div class="searchPage">
    <!-- 头部搜索区 -->
    <search-bar></search-bar>
    <!-- 搜索历史区 热门搜索区 搜索结果区-->
    <!-- <search-word></search-word> -->
    <router-view></router-view>
  </div>
</template>

<script>
import searchBar from "@/components/common/searchBar";
export default {
  name: "SearchPage",
  components: {
    searchBar
  }
};
</script>

<style scoped>
.searchPage {
  padding-top: 2.2rem;
}
</style>
