**数据库建模工具** [mongoose](https://mongoosejs.com/docs/api.htm)
  - 能够对 MongoDB 进行建模


## 三个概念

- Schema：模式
- Model：模型
- Document：文档


## Schema类

  - [Schema.prototype.static()](https://mongoosejs.com/docs/api.html#schema_Schema-static)
  Adds static "class" methods to **Models** compiled from this schema.
  定义静态方法

  - [Schema.prototype.pre()](https://mongoosejs.com/docs/api.html#schema_Schema-pre)
  Defines a pre hook for the **document**.
  定义实例的钩子

  - [Schema.prototype.method()](https://mongoosejs.com/docs/api.html#schema_Schema-method)
  Adds an instance method to **documents** constructed from Models compiled from this schema.
  定义实例的方法


## Model类

  - [Model.find()](https://mongoosejs.com/docs/api.html#model_Model.find)
  Finds **documents**. return []

  - [Model.findOne()](https://mongoosejs.com/docs/api.html#model_Model.findOne)
  Finds **one document**. return {}

  - [Model.remove()](https://mongoosejs.com/docs/api.html#model_Model.remove)
  Removes all **documents** that match conditions from the collection. To remove just the first document that matches conditions, set the single option to true.

## Documents类

  - [Document.prototype.isNew](https://mongoosejs.com/docs/api.html#document_Document-isNew)
  Boolean flag specifying if the **document** is new.
  实例是否是新建的

## [Populate实现表之间的关联](https://mongoosejs.com/docs/populate.html)

因为MongoDB是文档型数据库，所以它没有关系型数据库joins(数据库的两张表通过"外键"，建立连接关系) 特性。也就是在建立数据的关联时会比较麻烦。

实现关系型数据查找，mongoose 封装了 populate，实现了表之间的关联

* Mongoose 引用类型（无业务含义、不易重复、减少配置）：
  * ObjectIds: To specify a type of ObjectId, use `Schema.Types.ObjectId` in your declaration. （推荐使用）
  * Number
  * String
  * Buffer

使用：

例如电影的相关评论。评论列表有相关的字段：
- movie，对应的电影，与 Movie 相关联
- from，评价人，与 User 相关联
- to，评价人，与 User 相关联
- content，评价内容

1. 在定义模式时，定义相关的引用

注意：引用的是相关数据库中的表名，而不是模型！
```js
  // 定义模式
  var CommentSchema = new Schema({
    movie: {  // 通过 ref 引用查找对应的数据：ObjectId
      type: ObjectId,
      ref: 'movies_collection',
    },
    from: {
      type: ObjectId,
      ref: 'user_collection',   // 引用数据库中的用户表
    },
    to: {
      type: ObjectId,
      ref: 'user_collection',
    },
    content: String,
    ...
  });

```

2. 获取完电影详情后，获取相关评论

```js
  // 详情页
  exports.detail = function (req, res) {
    var id = req.params.id;

    Movie.findById(id, function (err, movie) {
      // 找到相关评论
      Comment
        .find({movie: id})
        .populate('from', 'name')  // 找到相关的引用对应的值。 user_collection表中对应id记录的name
        .exec(function (err, comment) {
          if (err) {
            console.log('find movie comment error:', err)
            return
          }
          res.render('detail', {
            title: '详情页',
            movie,
            comment,
          })
          console.log('find movie comment success:', comment);
        })
    })

  }
```


