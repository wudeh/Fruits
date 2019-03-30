const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

// 加盐强度
const SALT_WORK_FACTOR = 10;
// 这是给每个数据自动生成的 id
let ObjectId = Schema.Types.ObjectId;

// 通过 schema 定义数据模型
const userSchema = new Schema({
  userId: { type: ObjectId },
  userName: { type: String, unique: true },
  passWord: { type: String },
  createTime: { type: Date, default: Date.now() },
  lastLoginTime: { type: Date, default: Date.now() }
});

// 数据保存之前要执行加盐处理和加密处理 next 是 不管成不成功都要执行的操作
userSchema.pre("save", function(next) {
  // 加盐处理
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err);
    // 加密处理
    bcrypt.hash(this.passWord, salt, (err, hash) => {
      if (err) return next(err);
      this.passWord = hash;
      next();
    });
  });
});

// 定义一个登陆密码比对的实例方法
userSchema.methods = {
  comparePassword: (_password, password) => {
    return new Promise((resolve, reject) => {
      bcrypt.compare(_password, password, (err, isMatch) => {
        if (!err) resolve(isMatch);
        else reject(err);
      });
    });
  }
};
// 发布模型
mongoose.model("User", userSchema);
