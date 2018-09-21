var express = require('express');
var path = require('path');
var port = process.env.PORT || 4001;
var app = express();
var mongoose = require('mongoose');
// var _ = require('underscore');

var serveStatic = require('serve-static');
var bodyParser = require('body-parser');

var utils = require('./public/js/util')


app.use(bodyParser.urlencoded({
	extended: true
})); // 设置express中间件，对数据格式对象化

app.use(bodyParser.json({
	limit: '1mb'
}));
app.use(serveStatic(path.join(__dirname, 'public')))  // 静态文件目录

app.locals.moment = require('moment');


// 设置视图根目录
app.set('views', './views/pages');
// 设置默认的模板引擎
app.set('view engine', 'jade');
// 监听的端口
app.listen(port);

console.log('server start at port: ' + port);
console.log(`localhost:${port}`);


// 连接本地数据库
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/movies');
/**
 * 连接成功
 */
mongoose.connection.on('connected', function () {
	console.log('数据库连接成功');
});

/**
 * 连接异常
 */
mongoose.connection.on('error', function (err) {
	console.log('数据库连接出现错误，错误为：' + err);
});

/**
 * 连接断开
 */
mongoose.connection.on('disconnected', function () {
	console.log('数据库连接断开');
});

// 把模型加载进来
var db = require('./models/db');
var Movie = db.Movie;
var User = db.User


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
	var id = movieObj._id
	var _movie;

	// console.log(req.body.movie);

	if (id !== 'undefined') {
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
		// console.log('newMovie:', newMovie)

		_movie = new Movie(newMovie);

		_movie.save(function (err, movie) {
			if (err) {
				console.log(err)
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
app.delete('/admin/list', function (req, res) {
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



// 注册
app.post('/user/signup', function (req, res) {
	// 拿到参数
	var userInfo = req.body.user
	// 或者通过 req.param('user')
	// console.log('userInfo:', userInfo)

	User.find({name: userInfo.name}, function (error, docs) {
		console.log('find docs:', docs);
		if (docs.length) {
			// 已经注册过了
			res.redirect('/')
		} else {
			// 增加注册
			var _userInfo = new User(userInfo)

			_userInfo.save(function (err, data) {
				if (err) {
					console.log('sigup error:', err);
				}

				console.log('sigup success:', data);
			})

			res.redirect('/admin/userList')
		}
	})

})

app.get('/admin/userList', function (req, res) {
	User.fetch(function (err, docs) {
		if (err) {
			console.log('get userList error:', err);
		}

		res.render('admin/userList', {
			users: docs
		})
	})
})
