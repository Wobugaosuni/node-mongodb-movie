/**
 * 电影的分类
 * 一个类别下有多部电影
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ObjectId = Schema.Types.ObjectId

// 定义模式
var CategorySchema = new Schema({
	name: String,
  movies: [{  // 通过 ref 引用查找对应的数据：ObjectId
    type: ObjectId,
    ref: 'movies_collection',
  }],
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
CategorySchema.pre('save', function (next) {
	if (this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now();
	} else {
		this.meta.updateAt = Date.now();
	}
	next()
});


// 定义静态方法
// 返回全部数据
CategorySchema.static('fetch', function (cb) {
	return this
		.find()
		.sort('meta.updateAt') // 升序
		.exec(cb);
})

// 返回一条数据
CategorySchema.static('findById', function (id, cb) {
	return this
		.findOne({
			_id: id
		})
		.exec(cb);
})

module.exports = CategorySchema;
