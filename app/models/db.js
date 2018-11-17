var mongoose = require('mongoose');

var MoiveSchema = require('../schemas/movies');
var UserSchema = require('../schemas/user')
var CommentSchema = require('../schemas/comment')
var CategorySchema = require('../schemas/category')

// 模型
var Movie = mongoose.model('movies_collection', MoiveSchema);
var User = mongoose.model('user_collection', UserSchema);
var Comment = mongoose.model('comment_collection', CommentSchema);
var Category = mongoose.model('category_collection', CategorySchema);

const db = {
  Movie,
  User,
  Comment,
  Category,
}

module.exports = db;
