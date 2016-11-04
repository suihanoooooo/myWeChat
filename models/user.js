var mongoose=require('mongoose');
var blogUserDb=mongoose.connect('mongodb://localhost/blogUser');

var blogUserSchema=new mongoose.Schema({
	userName:String,
	pwd:String
});

var Schema=new mongoose.Schema({
	times:Number,
	name:String
});

var blogUserModel=blogUserDb.model('user',blogUserSchema);
var model=blogUserDb.model('time',Schema);
//module.exports=blogUserModel;

exports.blogUserModel=blogUserDb.model('user',blogUserSchema);
exports.model=blogUserDb.model('time',Schema);

