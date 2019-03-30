const mongoose = require("mongoose");
const DB = "mongodb://localhost/dianshan-db";
const glob = require("glob");
const { resolve } = require("path"); // 把相对路径转为绝对路径

let maxConnectTimes = 0;

exports.initSchema = () => {
  // 把所有的数据模型 schema 都引过来
  glob.sync(resolve(__dirname, "./schema/", "**/*.js")).forEach(require);
};

exports.connect = () => {
  // 连接数据库
  mongoose.connect(DB, {
    useCreateIndex: true,
    useNewUrlParser: true
  });

  return new Promise((resolve, reject) => {
    // 断开连接 重新连接
    mongoose.connection.on("disconnected", () => {
      console.log("******数据库连接出错******");
      if (maxConnectTimes <= 3) {
        maxConnectTimes += 1;
        mongoose.connect(DB);
      } else {
        throw new Error("数据库连接错误，请人为修理");
      }
    });

    // 连接出错 重新连接
    mongoose.connection.on("error", err => {
      console.log("******数据库连接出错******");
      if (maxConnectTimes <= 3) {
        maxConnectTimes += 1;
        mongoose.connect(DB);
      } else {
        reject(err);
        throw new Error("数据库连接错误，请人为修理");
      }
    });

    // 连接成功
    mongoose.connection.once("open", () => {
      console.log("数据库连接成功");
      resolve();
    });
  });
};
