import Vue from "vue";
import Router from "vue-router";
import shoppingMall from "@/components/pages/ShoppingMall";
import register from "@/components/pages/Register";
import login from "@/components/pages/Login";
import DetailGoods from "@/components/pages/Goods";
import categoryList from "@/components/pages/CategoryList";
import cart from "@/components/pages/Cart";
import main from "@/components/pages/Main";
import searchPage from "@/components/pages/SearchPage";
import searchWord from "@/components/pages/SearchWord";
import searchResult from "@/components/pages/SearchResult";
import member from "@/components/pages/Member";
import { Dialog } from "vant";
Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      // name: "main",
      component: main,
      children: [
        {
          path: "/",
          name: "shoppingMall",
          component: shoppingMall
        },
        {
          path: "/cart",
          name: "cart",
          component: cart
        },
        {
          path: "/categoryList",
          name: "categoryList",
          component: categoryList
        },
        {
          path: "/member",
          name: "member",
          component: member
        }
      ]
    },
    {
      path: "/getDetailGoodsInfo",
      name: "DetailGoodsInfo",
      component: DetailGoods
    },
    {
      path: "/register",
      name: "register",
      component: register
    },
    {
      path: "/login",
      name: "login",
      component: login
    },
    {
      path: "/search",
      component: searchPage,
      children: [
        {
          path: "/",
          name: "searchWord",
          component: searchWord
        },
        {
          path: "/searchResult",
          name: "searchResult",
          component: searchResult
        }
      ]
    }
  ]
});

// 路由守卫
router.beforeEach((to, from, next) => {
  const page = [
    "login",
    "register",
    "searchResult",
    "searchWord",
    "search",
    "DetailGoodsInfo",
    "member",
    "categoryList",
    "cart",
    "shoppingMall"
  ];
  if (page.includes(to.name)) {
    next();
  } else {
    Dialog.alert({
      message: "这个页面真没有"
    }).then(() => {
      // on close
      router.push("/");
    });
    next();
  }
});

export default router;
