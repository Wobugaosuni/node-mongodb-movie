## **保持用户状态**
  会话：跟踪用户，确定用户的身份。会话与会话之间是相互独立的。
  由于http协议是无状态的，所以服务器就无法根据链接跟踪会话了，采用cookie和session来弥补不足。
  cookie：通过在客户端记录信息确定用户身份
  session：通过在服务端记录信息确定用户身份

## express中有个中间件提供会话支持：[express-session](https://github.com/expressjs/session)

  ```js
    var session = require('express-session')

    // 挂载中间件（中间件实例化）
    app.use(session({
      secret: 'imooc'   // 通过设置 secret 来计算 hash 值并放在 cookie 中，防止cookie被篡改
      name: '',   // 设置 cookie 中保存 session id 的字段名称，默认为connect.sid
    }))
  ```

  通过 `req.session`获取当前用户的会话对象

  但上述的方法当服务器重启时，用户状态就没了


## session持久化的作用及保存地方
  可用户操作页面时服务器当掉了，session可以把用户进程保存在4个地方
  1.cookie
  2.内存
  3.redis
  4.mongoDB  √ (本项目使用 mongoDB)

  - [connect-mongo](https://github.com/jdesboeufs/connect-mongo)
    ```js
      var session = require('express-session')  // 提供会话支持
      var MongoStore = require('connect-mongo')(session);  // 会话持久化
      var dbUrl = 'mongodb://localhost:27017/movies'

      app.use(session({
        secret: 'imooc',  // Required option, used to sign the session ID cookie，防止篡改cookie
        name: 'connectSessionId',  // 设置 cookie 中保存 session ID 的字段名称，默认为connect.sid
        store: new MongoStore({   // 持久化
          url: dbUrl,
          collection: sessions,   // 非必填，默认会在数据库中增加一张 sessions 的表
        })
      }))

    ```

## 会话预处理逻辑
  在用户成功登录后，需要把用户的信息保存到session里，再注入到本地的变量

  1. 登录成功后，把用户信息保存到session里
  ```js
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
  ```

  2. 适配各个页面，把登录的用户信息保存到本地变量中
  ```js
    /**
     * 会话持久化预处理
     * 适配各个路由、各个页面
     * 文档参考：https://expressjs.com/zh-cn/4x/api.html#app.use
     */
    app.use(function (req, res, next) {
      var user = req.session.user

      if (user) {
        // 设置本地全局变量
        app.locals.user = user
      }

      // 下一步
      next();
    });
  ```
