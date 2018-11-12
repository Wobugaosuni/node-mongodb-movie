// 把模型加载进来
var db = require('../models/db');
var utils = require('../../public/js/util')

var Comment = db.Comment;

// 接口，保存录入
exports.save = function (req, res) {
  var commentObj = JSON.parse(JSON.stringify(req.body.comment));
  var movieId = commentObj.movie

  console.log('commentObj:', commentObj)

  var _comment = new Comment(commentObj)

  _comment.save(function (err, comment) {
    if (err) {
      console.log('save comment fail', err)
    }
    console.log('save comment success', comment);

    // 刷新电影页
    res.redirect('/movie/' + movieId);
  })
}
