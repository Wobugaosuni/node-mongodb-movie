var db = require('../models/db');

var Movie = db.Movie;
var Category = db.Category

// 首页，查找各个类目下的电影
exports.index = function (req, res) {
  Category
    .find()
    .populate({
      path: 'category-collection',
      options: {
        limit: 4,   // 最多4条数据
      }
    })
    .exec(function (err, categories) {
      if (err) {
        console.log('get categories fail:', err)
      }

      console.log('get categories success:', categories)
      // 渲染 ./views/pages/index.jade 页面
      res.render('index', {
        title: '🎬 电影',
        categories,
      })
    })
}
