const fs = require("fs");

fs.readFile("./goods.json", "utf8", (err, data) => {
  let jsondata = JSON.parse(data);
  let newdata = [];
  let i = 0;
  jsondata.RECORDS.map((value, index) => {
    if (value.IMAGE1) {
      newdata.push(value);
      i++;
    }
  });
  console.log(i);
  fs.writeFile("./newGoods.json", JSON.stringify(newdata), err => {
    if (err) console.log("写入文件失败");
    else console.log("写入文件成功");
  });
});
