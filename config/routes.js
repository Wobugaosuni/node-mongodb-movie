var Index = require('../app/controller/index')
var Movie = require('../app/controller/movie')
var User = require('../app/controller/user')

const routes = function (app) {
  // 首页
  app.get('/', Index.index)

  // 电影相关
  app.get('/admin/movie', Movie.form)
  app.post('/admin/movie/new', Movie.new)
  app.get('/movie/:id', Movie.detail)
  app.get('/admin/update/:id', Movie.update)
  app.get('/admin/list', Movie.list)
  app.delete('/admin/movieList', Movie.delete)


  /**
   * 用户相关
   */
  // 用户删除
  app.delete('/admin/userList', User.delete)
  // 注册
  app.post('/user/signup', User.signUp)
  // 登录
  app.post('/user/signin', User.signIn)
  // 登出
  app.get('/logout', User.logout)
  // 获取用户列表
  app.get('/admin/userList', User.list)
  // 登录页，第一个参数是页面路由，第二个参数是，匹配到路由后执行的回调函数
  app.get('/signin', User.showSignin)
  // 注册页
  app.get('/signup', User.showSignup)
}

module.exports = routes
