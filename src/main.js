import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import fastclick from "fastclick";
import "@/assets/css/reset.css";

import {
  SubmitBar,
  Cell,
  CellGroup,
  Tabbar,
  TabbarItem,
  Stepper,
  PullRefresh,
  Button,
  Row,
  Col,
  Swipe,
  SwipeItem,
  Lazyload,
  List,
  Field,
  NavBar,
  Tab,
  Tabs,
  Icon,
  Checkbox,
  NoticeBar,
  Loading,
  Notify
} from "vant";

Vue.use(Button)
  .use(Notify)
  .use(Loading)
  .use(NoticeBar)
  .use(Checkbox)
  .use(SubmitBar)
  .use(Cell)
  .use(CellGroup)
  .use(PullRefresh)
  .use(Row)
  .use(Col)
  .use(Swipe)
  .use(SwipeItem)
  .use(Lazyload)
  .use(List)
  .use(Field)
  .use(NavBar)
  .use(Tab)
  .use(Tabs)
  .use(Stepper)
  .use(Tabbar)
  .use(TabbarItem)
  .use(Icon);

Vue.config.productionTip = false;

// 解决移动端点击延迟 330ms 问题
fastclick.attach(document.body);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
