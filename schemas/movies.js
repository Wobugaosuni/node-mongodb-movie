var mongoose = require('mongoose');

// 定义模式
var MoiveSchema = new mongoose.Schema({
	doctor: String,
	title: String,
	language: String,
	country: String,
	summary: String,
	flash: String,
	poster: String,
	year: String,
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
MoiveSchema.pre('save', function (next) {
	if (this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now();
	} else {
		this.meta.updateAt = Date.now();
	}
	next()
});


// 定义静态方法
// 返回全部数据
MoiveSchema.static('fetch', function (cb) {
	return this
		.find()
		.sort('meta.updateAt') // 升序
		.exec(cb);
})

// 返回一条数据
MoiveSchema.static('findById', function (id, cb) {
	return this
		.findOne({
			_id: id
		})
		.exec(cb);
})

module.exports = MoiveSchema;
