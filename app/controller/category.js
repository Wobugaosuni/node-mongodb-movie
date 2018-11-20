// 把模型加载进来
var db = require('../models/db');
var Category = db.Category

// 获取类目列表
exports.list = function (req, res) {
  Category.fetch(function (err, docs) {
    if (err) {
      console.log('get categorylist error:', err);
    }

    res.render('admin/categoryList', {
      categories: docs
    })
  })
}

// 录入页
exports.form = function (req, res) {
  // 渲染 ./views/pages/categoryForm.jade 页面
  res.render('admin/categoryForm', {
    title: '后台类目录入',
    category: {
      name: '',
    }
  })
}

// 接口，保存录入
exports.new = function (req, res) {
  var category = JSON.parse(JSON.stringify(req.body.category));

  console.log('category:', category)

    // 新建
    var _category = new Category(category);

    _category.save(function (err, category) {
      if (err) {
        console.log('create category record fail', err)
      }
      console.log('create category record success', category);
      res.redirect('/admin/category/list');
    })
}

// 类目删除
exports.delete = function (req, res) {
  var id = req.query.id;

  if (id) {
    Category.remove({
      _id: id
    }, function (err, movie) {
      if (err) {
        console.log(err)
      } else {
        res.json({
          success: 1
        })
      }
    })
  }
}
