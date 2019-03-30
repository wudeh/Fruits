<template>
  <div>
    <!-- 搜索历史区 -->
    <div class="search-history">
      <div class="history-title">搜索历史</div>
      <div class="history-word">
        <ul>
          <li
            v-for="(item, index) in historyWord"
            :key="index"
            @click="search(item)"
          >
            {{ item }}
          </li>
        </ul>
      </div>
    </div>
    <!-- 热门搜索 -->
    <div class="search-hot">
      <div class="searchhot-title">热门搜索</div>
      <div class="searchhot-word">
        <ul>
          <li>天然水</li>
          <li>哈哈哈哈哈哈</li>
          <li>咳咳</li>
          <li>苹果</li>
          <li>苹果</li>
          <li>苹果</li>
          <li>苹果</li>
          <li>苹果</li>
          <li>苹果</li>
          <li>苹果</li>
          <li>苹果</li>
          <li>苹果</li>
          <li>苹果</li>
          <li>苹果</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "searchWord",
  data() {
    return {
      historyWord: []
    };
  },
  created() {
    this.historyWord = localStorage.historyWord
      ? JSON.parse(localStorage.historyWord)
      : [];
  },
  methods: {
    search(item) {
      this.$store.commit("changeKeyWord", item);
      // 读取本地存储的搜索历史记录
      let history = localStorage.historyWord
        ? JSON.parse(localStorage.historyWord)
        : [];
      history.unshift(item);
      // 最多存储 22 个搜索记录
      if (history.length > 22) {
        history.splice(21, history.length - 22);
      }
      localStorage.historyWord = JSON.stringify(history);
      this.$router.push({ name: "searchResult", query: { keyWord: item } });
    }
  }
};
</script>

<style scoped>
.search-history {
  background-color: #fff;
  min-height: 2rem;
}
.history-title,
.searchhot-title {
  height: 1rem;
  line-height: 1rem;
  padding-left: 0.2rem;
  font-size: 0.8rem;
  color: #e5017d;
  border-bottom: 1px solid rgb(209, 190, 190);
}
.history-word,
.searchhot-word {
  padding: 0.5rem;
  color: #e5017d;
}
.history-word ul,
.searchhot-word ul {
  display: flex;
  flex-wrap: wrap;
}
.history-word ul li,
.searchhot-word ul li {
  margin-right: 0.9rem;
  margin-bottom: 0.5rem;
  line-height: 1.3rem;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.1);
  font-size: 0.8rem;
  border-radius: 0.5rem;
  padding: 0.2rem;
}
.search-hot {
  background: #fff;
}
</style>
