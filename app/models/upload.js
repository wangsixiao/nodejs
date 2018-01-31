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
function Publich(upload){
  this.address = upload.address
  this.content = upload.content
  this.account = upload.account
}
// 插入
Publich.prototype.uploadInsert = function(callback){
  var user = {
    address : this.address,
    content : this.content,
    account : this.account,
  };
  var INSERT_UPLOAD = "INSERT INTO upload(address,content,account) VALUES (?,?,?)"
  connection.query(INSERT_UPLOAD,[user.address,user.content,user.account],function(err,result){
    if(err){
      console.log("INSERT_UPLOAD Error: " + err.message);
      return;
    }
    callback(err,result);
  })
}
// 查找
Publich.prototype.uploadSelect = function(callback){
  var SELECT_UPLOAD = "SELECT * FROM upload"
  connection.query(SELECT_UPLOAD,function(err,result){
    if(err){
      console.log("SELECT_UPLOAD Error: " + err.message);
      return;
    }
    callback(err,result);
  })
}
Publich.prototype.uploadUserSelect = function(callback){
  var uploadinfo = {
    account: this.account
  }
  var SELECT_UPLOAD = "SELECT * FROM upload WHERE account = ?"
  connection.query(SELECT_UPLOAD,[uploadinfo.account],function(err,result){
    if(err){
      console.log("SELECT_UPLOAD Error: " + err.message);
      return;
    }
    callback(err,result);
  })
}
module.exports = Publich;