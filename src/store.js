import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 刷新后数据会消失 从本地读取数据
    searchKeyWord: localStorage.historyWord
      ? JSON.parse(localStorage.historyWord)[0]
      : "", // 搜索商品的关键词
    cartNumber: localStorage.cartInfo
      ? JSON.parse(localStorage.cartInfo).length
      : 0, // 购物车数量
    DStoken: localStorage.DStoken || null, // token
    DSuser: localStorage.DSuser ? JSON.parse(localStorage.DSuser) : null // 存储用户信息
  },
  mutations: {
    changeKeyWord(state, value) {
      // 改变搜索关键词
      state.searchKeyWord = value;
    },
    // 购物车商品数量加 1
    changeCartNumber(state) {
      state.cartNumber++;
    },
    // 清空购物车商品数量
    clearCart(state) {
      state.cartNumber = 0;
    },
    // 存储 token
    getDStoken(state, token) {
      state.DStoken = token;
    },
    // 存储用户信息
    getDSUser(state, user) {
      state.DSuser = user;
    },
    // token 过期，清空 token 和 用户信息
    clearDStokenUser(state) {
      state.DStoken = null;
      state.DSuser = null;
    }
  },
  actions: {}
});
