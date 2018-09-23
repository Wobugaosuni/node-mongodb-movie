# node-mongodb-movie

Node.js + MongoDB 网站后台增删改查的简单轮子

## 运行项目(以管理员执行)

```bash
  ## 1. 安装项目依赖
  npm install

  ## 2. 启动 MongoDB

  ## 3. 启动项目
  npm start
```

## 技术栈

- **模板引擎**  jade

- **数据库**  MongoDB

- **数据库建模工具** [mongoose](https://mongoosejs.com/docs/api.htm)
  [具体笔记请点击](./docs/mongoose.md)

- **服务器端**  node + express

- **密码加盐** [bcrypt](https://github.com/kelektiv/node.bcrypt.js)
  [具体笔记请点击](./docs/bcrypt.md)

- **保持用户状态**
  会话：跟踪用户，确定用户的身份。会话与会话之间是相互独立的。
  由于http协议是无状态的，所以服务器就无法根据链接跟踪会话了，采用cookie和session来弥补不足。
  cookie：通过在客户端记录信息确定用户身份
  session：通过在服务端记录信息确定用户身份

  - express中有个中间件提供会话支持：[express-session](https://github.com/expressjs/session)

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


  - session持久化的作用及保存地方
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
          secret: 'imooc',
          name: 'connectSessionId',
          store: new MongoStore({   // 持久化
            url: dbUrl,
            collection: sessions,   // 非必填，默认会在数据库中增加一张 sessions 的表
          })
        }))

      ```


