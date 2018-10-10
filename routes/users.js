// 把模型加载进来
var db = require('./models/db');
var User = db.User

const users = function (app) {
  // 用户删除
  app.delete('/admin/userList', function (req, res) {
    var id = req.query.id;

    if (id) {
      User.remove({
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
          res.redirect('/admin/userList')
        })
      }
    })

  })


  // 登录
  app.post('/user/signin', function (req, res) {
    var userInfo = req.body.user

    User.findOne({name: userInfo.name}, function (error, docs) {
      if (error) {
        console.log('findOne user error:', error);
      }
      if (!docs) {
        // null
        res.redirect('/')
      }

      console.log('docs:', docs);

      // 实例的方法，校验密码
      docs.comparePassword(userInfo.password, (error, isMatch) => {
        if (error) {
          console.log('comparePassword error:', error);
        }

        if (isMatch) {
          console.log('comparePassword success');

          // 保存session
          req.session.user = docs

          return res.redirect('/')
        } else {
          console.log('comparePassword fail');
        }
      })
    })
  })

  /**
   * 登出
   * 就是把库里的session.user删除
   */
  app.get('/logout', function (req, res) {
    // 1. 删除 req.session.user 属性 和 库里的 session.user
    delete req.session.user
    // 2. 删除 本地的全局变量 属性
    delete app.locals.user

    // 3. 跳转到首页
    res.redirect('/')
  })


  // 获取用户列表
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
}

module.exports = users
