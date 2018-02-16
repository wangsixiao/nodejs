// 连接数据库
var mysql      = require('mysql')
var DB_NAME= 'music'
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'Wang1104.',
  database : 'music'
})
connection.connect()

// 发布信息
function Friend(param){
  this.id = param.id
  this.friendname = param.friendname
  this.accountname = param.accountname
}
// 插入
Friend.prototype.friendInsert = function(callback){
  var user = {
    friendname : this.friendname,
    accountname : this.accountname,
  };
  var INSERT_UPLOAD = "INSERT INTO friend(friendname,accountname) VALUES (?,?)"
  connection.query(INSERT_UPLOAD,[user.friendname,user.accountname],function(err,result){
    callback(err,result);
  })
}
// 查找
Friend.prototype.friendSelect = function(callback){
  var user = {
    accountname : this.accountname,
  };
  var SELECT_UPLOAD = "SELECT * FROM friend WHERE accountname = ?"
  connection.query(SELECT_UPLOAD,[user.accountname],function(err,result){
    callback(err,result);
  })
}
Friend.prototype.friendBaseSelect = function(callback){
  var user = {
    accountname : this.accountname,
  };
  var SELECT_UPLOAD = "SELECT friend.*,upload.* FROM friend LEFT JOIN upload ON friend.friendname = upload.account WHERE friend.accountname = ?"
  connection.query(SELECT_UPLOAD,[user.accountname],function(err,result){
    callback(err,result);
  })
}
module.exports = Friend;