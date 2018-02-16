// 加载mongoose模块
var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/music')
var db = mongoose.connection
//输出连接日志  
db.on('error', function callback() {  
    console.log("Connection error");  
});  
  
db.once('openUri', function callback() {  
    console.log("Mongo working!");  
});
var userSchema = new mongoose.Schema({
	username: String,
	password: String
})
module.exports = mongoose.model('userLogin', userSchema)
