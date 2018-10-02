var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var serveStatic = require('serve-static');
var bodyParser = require('body-parser');

var session = require('express-session')  // 提供会话支持
var MongoStore = require('connect-mongo')(session);  // 会话持久化

var utils = require('./public/js/util')
var movies = require('./back/movies')
var users = require('./back/users')

// 实例化
var app = express();
// 端口
var port = process.env.PORT || 4001;
// 本地数据库地址
var dbUrl = 'mongodb://127.0.0.1:27017/movies'


// 连接本地数据库
mongoose.Promise = global.Promise
mongoose.connect(dbUrl);
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


/**
 * session 会话持久化设置
 */
app.use(session({
	secret: 'imooc',   // Required option, used to sign the session ID cookie，防止篡改cookie
	name: 'connectSessionId',   // 设置 cookie 中保存 session id 的字段名称，默认为connect.sid
	store: new MongoStore({   // 持久化
		url: dbUrl
	})
}))

/**
 * 设置express中间件，对数据格式对象化
 */
app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(bodyParser.json({
	limit: '1mb'
}));


// 静态文件目录
app.use(serveStatic(path.join(__dirname, 'public')))


// 定义本地的变量
app.locals.moment = require('moment');


// 设置视图根目录
app.set('views', './views/pages');
// 设置默认的模板引擎
app.set('view engine', 'pug');

// 监听的端口
app.listen(port);
console.log('server start at port: ' + port);
console.log(`localhost:${port}`);


/**
 * 会话持久化预处理
 * 适配各个路由、各个页面
 * 文档参考：https://expressjs.com/zh-cn/4x/api.html#app.use
 */
app.use(function (req, res, next) {
	console.log('req.session:', req.session);
	var user = req.session.user

	if (user) {
		// 设置本地全局变量
		app.locals.user = user
	}

	// 下一步
	next();
});


// 把模型加载进来
var db = require('./models/db');
var Movie = db.Movie;
var User = db.User

movies(app, Movie)
users(app, User)

