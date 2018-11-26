/**
 * 用来处理 multipart/form-data 的中间件
 * https://github.com/expressjs/multer
 */
var multer  = require('multer')
// 图片上传完后，保存到根目录public/uploads/下
var upload = multer({ dest: 'public/uploads/' })

var Index = require('../app/controller/index')
var Movie = require('../app/controller/movie')
var User = require('../app/controller/user')
var Comment = require('../app/controller/comment')
var Category = require('../app/controller/category')

const routes = function (app) {
  // 首页
  app.get('/', Index.index)

  /**
   * 电影相关
   */
  // 电影录入页
  app.get('/admin/movie', User.loginRequired, User.adminReqiured, Movie.form)

  // 新增电影接口，涉及到上传的，上传完之后再保存
  // upload.single(name)里的name要和input的name一致！
  app.post('/admin/movie/new', User.loginRequired, User.adminReqiured, upload.single('uploadPoster'), Movie.new)

  app.get('/movie/:id', Movie.detail)
  app.get('/admin/movie/update/:id', User.loginRequired, User.adminReqiured, Movie.update)
  app.get('/admin/movie/list', User.loginRequired, User.adminReqiured, Movie.list)
  app.delete('/admin/movie/list', User.loginRequired, User.adminReqiured, Movie.delete)


  /**
   * 用户相关
   */
  // 用户删除
  app.delete('/admin/user/list', User.loginRequired, User.adminReqiured, User.delete)
  // 注册
  app.post('/user/signup', User.signUp)
  // 登录
  app.post('/user/signin', User.signIn)
  // 登出
  app.get('/logout', User.logout)
  // 获取用户列表
  app.get('/admin/user/list', User.loginRequired, User.adminReqiured, User.list)
  // 登录页，第一个参数是页面路由，第二个参数是，匹配到路由后执行的回调函数
  app.get('/signin', User.showSignin)
  // 注册页
  app.get('/signup', User.showSignup)


  /**
   * 评论相关
   */
  // 保存评论
  app.post('/user/comment', User.loginRequired, Comment.save)


  /**
   * 类别相关
   */
  // 类别列表页
  app.get('/admin/category/list', User.loginRequired, User.adminReqiured, Category.list)
  // 类别录入页
  app.get('/admin/category', User.loginRequired, User.adminReqiured, Category.form)
  // 新增类别接口
  app.post('/admin/category/new', User.loginRequired, User.adminReqiured, Category.new)
  // 类目删除
  app.delete('/admin/category/list', User.loginRequired, User.adminReqiured, Category.delete)
}

module.exports = routes
