const Koa = require("koa");
const app = new Koa();
const { connect, initSchema } = require("./dataBase/init");
const bodyParser = require("koa-bodyparser");
const cors = require("koa2-cors");
const koajwt = require("koa-jwt");

app.use(bodyParser());
app.use(cors());

(async () => {
  await connect();
  initSchema(); // 引入数据模型 schema
})();

// token 错误处理
app.use((ctx, next) => {
  return next().catch(err => {
    if (err.status === 401) {
      ctx.status = 401;
      ctx.body = {
        code: 401,
        message: "token过期"
      };
    } else {
      throw err;
    }
  });
});

// 除了指定的路由外 其它路由请求都要验证token
app.use(
  koajwt({
    secret: "my_token"
  }).unless({
    path: [/\/user\/login/, /\/user\/register/, /\/goods/]
  })
);

const Router = require("koa-router");
// 引入 用户路由
let user = require("./appAPI/user.js");
let goods = require("./appAPI/goods.js");

// 装载所有子路由
let router = new Router();
router.use("/user", user.routes());
router.use("/goods", goods.routes());

// 加载路由中间件
app.use(router.routes());
app.use(router.allowedMethods());

app.use(async ctx => {
  ctx.body = "<h1>hello </h1>";
});

app.listen(3000, () => {
  console.log("service starting at port 3000");
});
