// 把模型加载进来
var db = require('../models/db');
var utils = require('../../public/js/util')

var Movie = db.Movie;
var Comment = db.Comment

// 录入页
exports.form = function (req, res) {
  // 渲染 ./views/pages/admin.jade 页面
  res.render('admin/admin', {
    title: '后台录入',
    movie: {
      title: '',
      doctor: '',
      country: '',
      year: '',
      poster: '',
      flash: '',
      summary: '',
      language: ''
    }
  })
}

// 接口，保存录入
exports.new = function (req, res) {
  var movieObj = JSON.parse(JSON.stringify(req.body.movie));

  console.log('movieObj:', movieObj)

  var id = movieObj._id
  var _movie;

  // console.log(req.body.movie);

  if (id.length) {
    // 编辑
    Movie.findById(id, function (err, movie) {
      if (err) {
        console.log(err)
      }

      _movie = Object.assign(movie, movieObj)

      _movie.save(function (err, movie) {
        if (err) {
          console.log(err)
        }
        res.redirect('/movie/' + movie._id);
      })
    })
  } else {
    // 新建
    const newMovie = utils.removeObjKey('_id', movieObj)
    console.log('newMovie:', newMovie)

    _movie = new Movie(newMovie);

    _movie.save(function (err, movie) {
      if (err) {
        console.log('create movie record fail', err)
      }
      console.log('create movie record success', movie);
      res.redirect('/movie/' + movie._id);
    })
  }
}

// 详情页
exports.detail = function (req, res) {
  var id = req.params.id;
  Movie.findById(id, function (err, movie) {
    // 找到相关评论
    Comment.find({movie: id}, function (err, comment) {
      res.render('detail', {
        title: '详情页',
        movie: movie,
        comment,
      })
      console.log('find movie comment success:', comment);
    })
  })

}


// 更新页
exports.update = function (req, res) {
  var id = req.params.id;
  console.log('--------id--------:', id);

  if (id) {
    Movie.findById(id, function (err, movie) {
      if (err) {
        console.log(err)
      }

      console.log('---movie---:', movie);

      res.render('admin/admin', {
        title: '更新电影',
        movie: movie
      })
    })
  }
}


// 列表页
exports.list = function (req, res) {
  Movie.fetch(function (err, movies) {
    if (err) {
      console.log(err)
    }
    res.render('list', {
      title: '电影列表',
      movies: movies
    })
  });
}


//删除
exports.delete = function (req, res) {
  var id = req.query.id;

  if (id) {
    Movie.remove({
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
