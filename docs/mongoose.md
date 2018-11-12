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

## [Populate](https://mongoosejs.com/docs/populate.html)

因为MongoDB是文档型数据库，所以它没有关系型数据库joins(数据库的两张表通过"外键"，建立连接关系) 特性。也就是在建立数据的关联时会比较麻烦。

实现关系型数据查找，mongoose 封装了 populate，实现了表之间的关联

* Mongoose 引用类型（无业务含义、不易重复、减少配置）：
 * ObjectIds: To specify a type of ObjectId, use `Schema.Types.ObjectId` in your declaration. （推荐使用）
 * Number
 * String
 * Buffer
