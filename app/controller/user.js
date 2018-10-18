// 把模型加载进来
var db = require('../models/db');
var User = db.User

// 用户删除
exports.delete = function (req, res) {
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
}

// 注册
exports.signUp = function (req, res) {
  // 拿到参数
  var userInfo = req.body.user
  // 或者通过 req.param('user')
  // console.log('userInfo:', userInfo)

  User.find({name: userInfo.name}, function (error, docs) {
    console.log('find docs:', docs);
    if (docs.length) {
      // 已经注册过了，跳转到登录页
      res.redirect('/signin')
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

}


// 登录
exports.signIn = function (req, res) {
  var userInfo = req.body.user

  User.findOne({name: userInfo.name}, function (error, docs) {
    if (error) {
      console.log('findOne user error:', error);
    }
    if (!docs) {
      // 跳转到注册页
      return res.redirect('/signup')
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
        return res.redirect('/signin')
      }
    })
  })
}

/**
 * 登出
 * 就是把库里的session.user删除
 */
exports.logout = function (req, res) {
  // 1. 删除 req.session.user 属性 和 库里的 session.user
  delete req.session.user
  // 2. 删除 本地的全局变量 属性（改成在 app.use 统一清）
  // delete app.locals.user

  // 3. 跳转到首页
  res.redirect('/')
}


// 获取用户列表
exports.list = function (req, res) {
  User.fetch(function (err, docs) {
    if (err) {
      console.log('get userList error:', err);
    }

    res.render('admin/userList', {
      users: docs
    })
  })
}

// 登录页
exports.showSignin = function (req, res) {
  res.render('user/signin')
}

// 注册页
exports.showSignup = function (req, res) {
  res.render('user/signup')
}

// 登录中间件
exports.loginRequired = function (req, res, next) {
  const user = req.session.user

  if (!user) {
    return res.redirect('/signin')
  } else {
    next()
  }
}

// 管理员鉴权中间件
exports.adminReqiured = function (req, res, next) {
  // 已经做过登录判断了，这里不再需要做
  const user = req.session.user
  if (user.role <= 10) {
    // 没权限
    return res.redirect('/signin')
  } else {
    next()
  }
}
