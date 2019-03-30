// 这是所有接口的配置信息
const BASEURL =
  "https://www.easy-mock.com/mock/5c83704322c6e01a284aae93/dianshang/";
const LOCALURL = "http://localhost:3000/";

const url = {
  getShoppingMallInfo: BASEURL + "index", // 这是首页信息接口
  getGoodsInfo: BASEURL + "goodsInfo", // 这是商品详细信息的接口
  registerUser: LOCALURL + "user/register", // 用户注册接口
  loginUser: LOCALURL + "user/login", // 用户登录接口
  getDetailGoodsInfo: LOCALURL + "goods/getDetailGoodsInfo", // 商品详细信息页接口
  getCategoryList: LOCALURL + "goods/categoryList", // 获取商品大类信息
  getCategorySubList: LOCALURL + "goods/categorySubList", // 获取商品小类信息
  getGoodsListByCategorySubId: LOCALURL + "goods/getGoodsListByCategorySubId", // 获取商品小类每页数据
  getGoodsInfoByKeyWord: LOCALURL + "goods/getGoodsInfoByKeyWord", // 根据关键词搜索商品
  payMoney: LOCALURL + "user/payMoney" // 提交订单的时候验证 token 的有效性
};

export default url;
