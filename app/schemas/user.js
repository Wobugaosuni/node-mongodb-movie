var mongoose = require('mongoose')
var bcrypt = require('bcrypt')

var saltRounds = 10

// 定义模式
var UserSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,  // 唯一的。https://mongoosejs.com/docs/api.html#schematype_SchemaType-unique
  },
  password: String,
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
})


UserSchema.pre('save', function (next) {
  var user = this

  if (this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now();
	} else {
		this.meta.updateAt = Date.now();
	}

  // 使用 bcrypt 加密处理
  // 随机生成盐，将密码和盐混合加密，得到最终的密码
  // saltRounds：计算强度。计算密码所需要的资源和时间，强度越大，破解越困难
  // salt：随机生成的盐
  bcrypt.genSalt(saltRounds, function(err, salt) {
    if (err) next(err)
    console.log('genSalt:', salt);  // $2b$10$/lDvxVDCYJ3PLeWeiIMg2u

    // user.password: 用户明文的密码
    // salt: 生成的盐
    // hash: 加盐后，进行hash方法后的 新的hash值
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) next(err)
      console.log('bcrypt.hash:', hash);  // $2b$10$/lDvxVDCYJ3PLeWeiIMg2u/E11z09CP5SYwMPXVHhqGaCNwypvZl6

      // Store hash in your password DB.
      user.password = hash

      next()
    });
  });

})

UserSchema.static('fetch', function (cb) {
  return this
    .find()
    .sort('meta.updateAt')
    .exec(cb)
})

// 实例的方法
UserSchema.method('comparePassword', function (password, cb) {
  const user = this
  bcrypt.compare(password, user.password, function(error, isMatch) {
    // isMatch == true

    if (error) {
      cb(error)
    }

    cb(null, isMatch)
  });
})


module.exports = UserSchema;
