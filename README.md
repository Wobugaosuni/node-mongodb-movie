# node-mongodb-movie

Node.js + MongoDB 网站后台增删改查的简单轮子

## 运行项目(以管理员执行)

```bash
  ## 1. 安装项目依赖
  npm install

  ## 2. 启动 mongo 服务端
  sudo mongod

  ## 3. 启动 mongo 服务端
  mongo

  ## 4. 启动项目
  grunt
```

## 技术栈

- **模板引擎**  jade

- **数据库**  MongoDB

- **数据库建模工具** [mongoose](https://mongoosejs.com/docs/api.html)
  [具体笔记请点击](./docs/mongoose.md)

- **服务器端**  node + express
  [express 4x api](https://expressjs.com/zh-cn/4x/api.html)

- **密码加盐** [bcrypt](https://github.com/kelektiv/node.bcrypt.js)
  [具体笔记请点击](./docs/bcrypt.md)

- **保持用户状态**
  [具体笔记请点击](./docs/session.md)

## 目录结构

```
  .
  ├── .bowerrc    ------------------------------ bower配置文件
  ├── README.md   ------------------------------ 项目说明
  ├── app         ------------------------------ 开发目录，MVC层
  │   ├── controller   ------------------------- 控制层，接口层
  │   │   ├── index.js  ------------------------ 主入口，首页接口
  │   │   ├── movie.js  ------------------------ 电影相关接口
  │   │   └── user.js   ------------------------ 用户相关接口
  │   ├── models        ------------------------ 模型目录，mongoose相关
  │   │   └── db.js     ------------------------ mongoose模型
  │   ├── schemas       ------------------------ 模式目录，mongoose相关
  │   │   ├── movies.js ------------------------ mongoose电影模式
  │   │   └── user.js   ------------------------ mongoose用户模式
  │   └── views         ------------------------ 视图层目录
  │       ├── includes
  │       │   ├── head.pug
  │       │   └── header.pug
  │       ├── layout.pug
  │       └── pages
  │           ├── admin
  │           │   ├── admin.pug
  │           │   └── userList.pug
  │           ├── detail.pug
  │           ├── index.pug
  │           └── list.pug
  ├── app.js            ------------------------ 项目主入口
  ├── bower.json        ------------------------ bower相关配置
  ├── config            ------------------------ 项目配置目录
  │   └── routes.js     ------------------------ 项目路由配置
  ├── docs              ------------------------ 项目文档目录
  │   ├── bcrypt.md     ------------------------ 密码加盐相关
  │   ├── mongoose.md   ------------------------ mongoose相关
  │   └── session.md    ------------------------ 会话相关
  ├── gruntfile.js      ------------------------ grunt配置文件
  ├── package.json      ------------------------ npm包管理
  └── public            ------------------------ 项目代码共用目录
      ├── js            ------------------------ js目录
      │   ├── admin.js  ------------------------ ajax请求相关
      │   └── util.js   ------------------------ 项目js工具库
      └── libs          ------------------------ 项目外部资源目录
          ├── bootstrap
          └── jquery
```
