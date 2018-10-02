var movies = function (app, Movie) {
  //以下是路由
  // 首页
  app.get('/', function (req, res) {
    Movie.fetch(function (err, movies) {
      if (err) {
        console.log(err)
      }

      // 渲染 ./views/pages/index.jade 页面
      res.render('index', {
        title: '🎬 电影',
        movies,
      })
    });
  });

  // 录入页
  app.get('/admin/movie', function (req, res) {
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
  });

  // 接口，保存录入
  app.post('/admin/movie/new', function (req, res) {
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
  });

  // 详情页
  app.get('/movie/:id', function (req, res) {
    var id = req.params.id;
    Movie.findById(id, function (err, movie) {
      res.render('detail', {
        title: '详情页',
        movie: movie
      })
    })

  });


  // 更新页
  app.get('/admin/update/:id', function (req, res) {
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
  });


  // 列表页
  app.get('/admin/list', function (req, res) {
    Movie.fetch(function (err, movies) {
      if (err) {
        console.log(err)
      }
      res.render('list', {
        title: '电影列表',
        movies: movies
      })
    });
  });


  //删除
  app.delete('/admin/movieList', function (req, res) {
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
  });
}

module.exports = movies
