<template>
  <div class="searchBar">
    <div class="search-bar">
      <div class="search-area">
        <div class="search-icon">
          <img :src="this.searchIcon" width="60%" />
        </div>
        <div class="search-input">
          <input
            type="text"
            placeholder="请输入关键字"
            v-model="keyWord"
            @keyup.enter="search()"
          />
        </div>
      </div>
      <div class="search-click-text" @click="search()">搜索</div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  name: "searchbar",
  data() {
    return {
      keyWord: "",
      searchIcon: require("@/assets/image/search.png") // 搜索图标
    };
  },
  methods: {
    search() {
      if (!this.keyWord) {
        Toast("请输入关键字！！");
        return;
      }
      this.$store.commit("changeKeyWord", this.keyWord);
      // 读取本地存储的搜索历史记录
      let history = localStorage.historyWord
        ? JSON.parse(localStorage.historyWord)
        : [];
      history.unshift(this.keyWord);
      // 最多存储 22 个搜索记录
      if (history.length > 22) {
        history.splice(21, history.length - 22);
      }
      localStorage.historyWord = JSON.stringify(history);
      this.$router.push({
        name: "searchResult",
        query: { keyWord: this.keyWord }
      });
    }
  }
};
</script>

<style scoped>
.searchBar {
  width: 100%;
  position: fixed;
  left: 0;
  top: 0;
}
.search-bar {
  display: flex;
  height: 1.5rem;
  background-color: #e5017d;
  padding: 0.3rem;
}
.search-area {
  flex: 1;
  background-color: #fff;
  border-radius: 1rem;
  display: flex;
}
.search-icon {
  height: 100%;
  width: 1.5rem;
  padding: 0.2rem;
}
.search-click-text {
  width: 2rem;
  line-height: 1.5rem;
  color: #fff;
  text-align: center;
  font-size: 0.8rem;
}
.search-input input {
  height: 100%;
  width: 150%;
  font-size: 0.8rem;
}
</style>
