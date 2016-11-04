var mongoose=require('mongoose');
var timesDB=mongoose.connect('mongodb://localhost/timesDB');

var Schema=new mongoose.Schema({
	times:Number,
	name:String
});

var model=timesDB.model('time',Schema);

module.exports=model;