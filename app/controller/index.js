var db = require('../models/db');

var Movie = db.Movie;

// 首页
exports.index = function (req, res) {
  Movie.fetch(function (err, movies) {
    if (err) {
      console.log('get movies fail:', err)
    }

    console.log('get movies success:', movies);

    // 渲染 ./views/pages/index.jade 页面
    res.render('index', {
      title: '🎬 电影',
      movies,
    })
  });
}
