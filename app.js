var express = require('express');
var path = require('path');
var port = process.env.PORT || 3000;
var app = express();
var mongoose = require('mongoose');
var _ = require('underscore');

var serveStatic = require('serve-static');
var bodyParser = require('body-parser');

var utils = require('./common/util')


app.use(bodyParser.urlencoded({
	extended: true
})); // 设置express中间件，对数据格式文本化
app.use(bodyParser.json({
	limit: '1mb'
}));
app.use('/static', serveStatic('public'));
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
var Movie = require('./models/movies');

//以下是路由
//index page
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

//admin page
app.get('/admin/movie', function (req, res) {
	// 渲染 ./views/pages/admin.jade 页面
	res.render('admin', {
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

//admin post movie
app.post('/admin/movie/new', function (req, res) {
	var movieObj = JSON.parse(JSON.stringify(req.body.movie));
	var id = movieObj._id
	var _movie;

	// console.log(req.body.movie);

	if (id !== 'undefined') {
		Movie.findById(id, function (err, movie) {
			if (err) {
				console.log(err)
			}
			_movie = _.extend(movie, movieObj);
			_movie.save(function (err, movie) {
				if (err) {
					console.log(err)
				}
				res.redirect('/movie/' + movie._id);
			})
		})
	} else {
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

// detail page
app.get('/movie/:id', function (req, res) {
	var id = req.params.id;
	Movie.findById(id, function (err, movie) {
		res.render('detail', {
			title: '详情页',
			movie: movie
		})
	})

});


//admin update movie
app.get('/admin/update/:id', function (req, res) {
	var id = req.params.id;
	if (id) {
		Movie.findById(id, function (err, movie) {
			if (err) {
				console.log(err)
			}

			console.log('---movie---:', movie);

			res.render('admin', {
				title: '更新电影',
				movie: movie
			})
		})
	}
});


//list page
app.get('/admin/list', function (req, res) {
	Movie.fetch(function (err, movies) {
		if (err) {
			console.log(err)
		}
		res.render('list', {
			title: 'mooc列表',
			movies: movies
		})
	});
});



//list delete
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
})
