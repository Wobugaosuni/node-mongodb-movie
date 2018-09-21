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

- **服务器端**  node + express

- **密码加盐** [bcrypt](https://github.com/kelektiv/node.bcrypt.js)

  为了密码安全，对传输到数据库的密码，需要进行加密处理。
  使用 bcrypt 加密处理。
  原理是 随机生成盐，将密码和盐混合加密，得到最终的密码

  ```js
    // saltRounds：计算强度。计算密码所需要的资源和时间，强度越大，破解越困难
    // salt：随机生成的盐
    bcrypt.genSalt(saltRounds, function(err, salt) {
      if (err) next(err)
      console.log('genSalt:', salt);

      // password: 用户明文的密码
      // salt: 生成的盐
      // hash: 加盐后，进行hash方法后的 新的hash值
      bcrypt.hash(password, salt, function(err, hash) {
        if (err) next(err)
        console.log('bcrypt.hash:', hash);

        // Store hash in your password DB.
      });
    });
  ```


