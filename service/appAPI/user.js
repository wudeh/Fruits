const Router = require("koa-router");
const mongoose = require("mongoose");
let router = new Router();
const jwt = require("jsonwebtoken");

router.get("/", async ctx => {
  ctx.body = "这是用户操作首页";
});

/**
 * 用户注册接口
 */
router.post("/register", async ctx => {
  const User = mongoose.model("User");
  let newUser = new User(ctx.request.body);
  console.log(ctx.request.body);
  await newUser
    .save()
    .then(() => {
      ctx.body = {
        code: 200,
        message: "注册成功"
      };
    })
    .catch(err => {
      ctx.body = {
        code: 500,
        message: err
      };
    });
});

// 用户登录接口
router.post("/login", async ctx => {
  let loginUser = ctx.request.body;
  let userName = loginUser.userName;
  let passWord = loginUser.passWord;
  // 引入 User model
  const User = mongoose.model("User");
  // 根据用户名查找用户数据
  await User.findOne({ userName: userName })
    .exec()
    .then(async result => {
      console.log(result);
      // 找到用户则比对密码
      if (result) {
        let newUser = new User();
        await newUser
          .comparePassword(passWord, result.passWord)
          .then(isMatch => {
            const token = jwt.sign(
              {
                name: result.userName
              },
              "my_token",
              { expiresIn: "2h" }
            );
            ctx.body = {
              code: 200,
              token: "Bearer " + token,
              message: isMatch
            };
          })
          .catch(err => {
            console.log(err);
            ctx.body = {
              code: 500,
              message: "服务器错误"
            };
          });
      } else {
        ctx.body = {
          code: 200,
          message: "用户名不存在"
        };
      }
    })
    .catch(err => {
      console.log(err);
      ctx.body = {
        code: 500,
        message: "服务器出错"
      };
    });
});

// 点击提交订单的时候验证 token 是否还有效
router.get("/payMoney", async ctx => {
  ctx.body = {
    code: 200,
    message: "token 有效，可以购买"
  };
});
module.exports = router;
