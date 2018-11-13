/**
 * 因为MongoDB是文档型数据库，所以它没有关系型数据库joins(数据库的两张表通过"外键"，建立连接关系) 特性。也就是在建立数据的关联时会比较麻烦。
 * 实现关系型数据查找，mongoose 封装了 populate: https://mongoosejs.com/docs/populate.html，实现了表之间的关联
 *
 * Mongoose 引用类型（无业务含义、不易重复、减少配置）：
 * ObjectIds: To specify a type of ObjectId, use `Schema.Types.ObjectId` in your declaration.
 * Number
 * String
 * Buffer
 *
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ObjectId = Schema.Types.ObjectId

// 定义模式
var CommentSchema = new Schema({
  movie: {  // 通过 ref 引用查找对应的数据：ObjectId
    type: ObjectId,
    ref: 'Movie',
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
	meta: {
		createAt: {
			type: Date,
			default: Date.now()
		},
		updateAt: {
			type: Date,
			default: Date.now()
		}
	}
});


// 触发 save 之前的钩子，更新时间
CommentSchema.pre('save', function (next) {
	if (this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now();
	} else {
		this.meta.updateAt = Date.now();
	}
	next()
});


// 定义静态方法
// 返回全部数据
CommentSchema.static('fetch', function (cb) {
	return this
		.find()
		.sort('meta.updateAt') // 升序
		.exec(cb);
})

// 返回一条数据
CommentSchema.static('findById', function (id, cb) {
	return this
		.findOne({
			_id: id
		})
		.exec(cb);
})

module.exports = CommentSchema;
