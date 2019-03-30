const Router = require("koa-router");
const mongoose = require("mongoose");
const fs = require("fs");
let router = new Router();

router.get("/insertallgoodsinfo", async ctx => {
  fs.readFile("./newGoods.json", "utf8", (err, data) => {
    data = JSON.parse(data);
    let count = 0;
    let Goods = mongoose.model("Good");
    data.map(value => {
      let newGoods = new Goods(value);
      newGoods
        .save()
        .then(() => {
          count++;
          console.log("成功" + count);
        })
        .catch(err => {
          console.log(err);
        });
    });
    console.log(count);
  });
  ctx.body = "开始导入数据";
});

router.get("/insertAllCategory", async ctx => {
  fs.readFile("./data_json/category.json", "utf8", (err, data) => {
    data = JSON.parse(data);
    let saveCount = 0;
    let Category = mongoose.model("Category");
    data.RECORDS.map(value => {
      console.log(value);
      let newData = new Category(value);
      newData
        .save()
        .then(() => {
          saveCount++;
          console.log("插入成功" + saveCount);
        })
        .catch(err => {
          console.log("插入失败" + err);
        });
    });
  });
  ctx.body = "插入数据";
});

router.get("/insertAllCategorySub", async ctx => {
  fs.readFile("./data_json/category_sub.json", "utf8", (err, data) => {
    data = JSON.parse(data);
    let saveCount = 0;
    let CategorySub = mongoose.model("CategorySub");
    data.RECORDS.map(value => {
      console.log(value);
      let newData = new CategorySub(value);
      newData
        .save()
        .then(() => {
          saveCount++;
          console.log("插入成功" + saveCount);
        })
        .catch(err => {
          console.log("插入失败" + err);
        });
    });
  });
  ctx.body = "导入子类数据";
});

// 获取商品详情信息接口
router.post("/getDetailGoodsInfo", async ctx => {
  try {
    let goodsId = ctx.request.body.goodsId;
    const Goods = mongoose.model("Good");
    let result = await Goods.findOne({ ID: goodsId });
    ctx.body = {
      code: 200,
      message: result
    };
  } catch (error) {
    ctx.body = {
      code: 500,
      message: error
    };
  }
});

// 根据关键词搜索商品信息
router.post("/getGoodsInfoByKeyWord", async ctx => {
  try {
    let keyword = ctx.request.body.keyWord;
    const Goods = mongoose.model("Good");
    let result = await Goods.find();
    let goodsNeed = [];
    result.map(value => {
      if (value.NAME.indexOf(keyword) >= 0) {
        goodsNeed.push(value);
      }
    });
    ctx.body = {
      code: 200,
      message: goodsNeed
    };
  } catch (error) {
    ctx.body = {
      code: 500,
      message: error
    };
  }
});

// 获取商品大类信息
router.get("/categoryList", async ctx => {
  try {
    const Category = mongoose.model("Category");
    let result = await Category.find();
    ctx.body = {
      code: 200,
      message: result
    };
  } catch (error) {
    ctx.body = {
      code: 500,
      message: error
    };
  }
});

// 获取商品小类数据
router.post("/categorySubList", async ctx => {
  try {
    let categoryId = ctx.request.body.categorySubId;
    const Category = mongoose.model("CategorySub");
    let result = await Category.find({ MALL_CATEGORY_ID: categoryId });
    ctx.body = {
      code: 200,
      message: result
    };
  } catch (error) {
    ctx.body = {
      code: 500,
      message: error
    };
  }
});

// 根据子类id获取商品分页数据
router.post("/getGoodsListByCategorySubId", async ctx => {
  try {
    let categoryId = ctx.request.body.categorySubId;
    let page = ctx.request.body.page; // 当前所处页数
    let num = 10; // 每页要显示的子类商品数目
    let start = (page - 1) * num; // 每页商品开始位置
    const Goods = mongoose.model("Good");
    let result = await Goods.find({ SUB_ID: categoryId })
      .skip(start) // limit() 方法限制从数据库查找的商品数目
      .limit(num); // skip() 方法跳过 start 个商品，从 start+1开始读取数据
    ctx.body = {
      code: 200,
      message: result
    };
  } catch (error) {
    ctx.body = {
      code: 500,
      message: error
    };
  }
});

module.exports = router;
