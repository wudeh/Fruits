const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// 商品分类 Schema
const categorySchema = new Schema({
  ID: { unique: true, type: String },
  MALL_CATEGORY_NAME: { type: String },
  IMAGE: { type: String },
  TYPE: { type: Number },
  SORT: { type: Number },
  COMMENTS: { type: String }
});

mongoose.model("Category", categorySchema);
