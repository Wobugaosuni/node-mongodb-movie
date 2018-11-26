var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

// 定义模式
var MoiveSchema = new Schema({
	douban: String,
	category: {
		type: ObjectId,
		ref: 'category_collection',  // 引用类目表
	},
	// 统计页面浏览量
	pv: {
		type: Number,
		default: 0,
	},
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
