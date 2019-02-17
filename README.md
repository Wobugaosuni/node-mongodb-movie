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

## 使用pm2一键部署项目

在服务器搭建好相应的mongodb、做好nginx相关配置（反向代理），可以再项目本地一键部署项目，实现线上的快速更新

```bash
  # Setup deployment at remote location
  pm2 deploy production setup

  # Update remote version
  pm2 deploy production update
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

- **用户权限管理**
  [具体笔记请点击](./docs/用户权限管理.md)

- **文件上传模块**
  [具体笔记请点击](./docs/文件上传模块.md)

- **访客统计**
  [具体笔记请点击](./docs/访客统计.md)

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
  │   │   └── comment.js   --------------------- 电影评论相关接口
  │   │   └── category.js   -------------------- 电影类目相关接口
  │   ├── models        ------------------------ 模型目录，mongoose相关
  │   │   └── db.js     ------------------------ mongoose模型
  │   ├── schemas       ------------------------ 模式目录，mongoose相关
  │   │   ├── movies.js ------------------------ mongoose电影模式
  │   │   └── user.js   ------------------------ mongoose用户模式
  │   │   └── comment.js   --------------------- 电影评论模式
  │   │   └── category.js   -------------------- 电影类目模式
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

## 后台系统页面

- 电影列表页：/admin/movie/list
- 电影新增页：/admin/movie
- 用户列表页：/admin/user/list