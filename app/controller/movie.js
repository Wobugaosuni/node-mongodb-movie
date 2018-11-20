// 把模型加载进来
var db = require('../models/db');
var utils = require('../../public/js/util')

var Movie = db.Movie;
var Comment = db.Comment;
var Category = db.Category;

// 录入页
exports.form = function (req, res) {
  // 获取类目列表
  Category.find(function (err, categories) {
    if (err) {
      console.log('get categories error:', err)
    }

    console.log('get categories success:', categories)
    // 渲染 ./views/pages/movieForm.jade 页面
    res.render('admin/movieForm', {
      title: '后台录入',
      movie: {
        title: '',
        doctor: '',
        country: '',
        year: '',
        poster: '',
        flash: '',
        summary: '',
        language: '',
        categories,
      }
    })
  })
}

function saveMovie(_movie, res) {
  _movie.save(function (err, movie) {
    if (err) {
      console.log(err)
    }

    // 找到电影对应的类目
    const newCategoryId = _movie.category
    Category.findById(newCategoryId, function (err, category) {
      if (err) {
        console.log('find category fail', err)
        return
      }
      console.log('find category success', category);

      // category是Document，在相应的类目中增加电影的_id
      category.movies.push(movie._id)

      console.log('category pushed:', category);

      category.save(function (err, cat) {
        if (err) {
          console.log('save category fail', err)
          return
        }
        console.log('save category success', cat);

        // 跳转到电影详情页
        res.redirect('/movie/' + movie._id);
      })
    })
  })
}

// 接口，保存录入
exports.new = function (req, res) {
  var movieObj = JSON.parse(JSON.stringify(req.body.movie));

  console.log('movieObj:', movieObj)

  var id = movieObj._id
  var _movie;

  // console.log(req.body.movie);

  if (id) {
    // 编辑
    Movie.findById(id, function (err, movie) {
      if (err) {
        console.log(err)
      }

      // 删掉分类中对应的电影
      const oldCategoryId = movie.category
      Category.findById(oldCategoryId, function (err, category) {
        if (err) {
          console.log('find category fail', err)
          return
        }
        console.log('find category success', category);


        category.movies = category.movies.filter(id => {
          const idStr = id.toString()
          const movieIdStr = movie._id.toString()

          // console.log('----id----:', idStr);
          // console.log('----movieIdStr----:', movieIdStr)
          // console.log('is id match:', idStr === movieIdStr)

          return idStr !== movieIdStr
        })

        console.log('category update:', category);

        category.save(function (err, cat) {
          if (err) {
            console.log('save category fail', err)
            return
          }
          console.log('save category success', cat);

          // 更改后的电影
          _movie = Object.assign(movie, movieObj)
          saveMovie(_movie, res)
        })
      })
    })
  } else {
    // 新建
    // const newMovie = utils.removeObjKey('_id', movieObj)
    console.log('newMovie:', movieObj)

    _movie = new Movie(movieObj);
    saveMovie(_movie, res)
  }
}

// 详情页
exports.detail = function (req, res) {
  var id = req.params.id;

  Movie
    .find({_id: id})
    .populate('category', 'name')
    .exec(function (err, movie) {
      console.log('find movie success:', movie)

      // 找到相关评论
      Comment
        .find({movie: id})
        .populate('from', 'name')  // 找到相关的引用对应的值。 user_collection表中对应id记录的name
        .exec(function (err, comment) {
          if (err) {
            console.log('find movie comment error:', err)
            return
          }
          res.render('detail', {
            title: '详情页',
            movie: movie[0],
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

  // 获取类目列表
  Category.find(function (err, categories) {
    if (err) {
      console.log('get categories error:', err)
      return
    }

    console.log('get categories success:', categories);

    if (id) {
      Movie.findById(id, function (err, movie) {
        if (err) {
          console.log(err)
        }

        const data = movie
        data.categories = categories
        console.log('---data---:', data);

        res.render('admin/movieForm', {
          title: '更新电影',
          movie: data,
        })
      })
    }
  })

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
