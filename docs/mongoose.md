**数据库建模工具** [mongoose](https://mongoosejs.com/docs/api.htm)
  使用到的接口如下：


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
