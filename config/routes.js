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

  // 用户相关
  app.delete('/admin/userList', User.delete)
  app.post('/user/signup', User.signUp)
  app.post('/user/signin', User.signIn)
  app.get('/logout', User.logout)
  app.get('/admin/userList', User.list)
}

module.exports = routes
