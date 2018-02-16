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
  this.amount = upload.amount
  this.id = upload.id
}
// 插入
Publich.prototype.uploadInsert = function(callback){
  var user = {
    address : this.address,
    content : this.content,
    account : this.account,
    amount : this.amount,
  };
  var INSERT_UPLOAD = "INSERT INTO upload(address,content,account,amount) VALUES (?,?,?,?)"
  connection.query(INSERT_UPLOAD,[user.address,user.content,user.account,user.amount],function(err,result){
    if(err){
      console.log("INSERT_UPLOAD Error: " + err.message);
      return;
    }
    callback(err,result);
  })
}
// 查找
Publich.prototype.uploadSelect = function(callback){
  var SELECT_UPLOAD = "SELECT * FROM upload ORDER BY id DESC"
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
  var SELECT_UPLOAD = "SELECT * FROM upload WHERE account = ? ORDER BY id DESC"
  connection.query(SELECT_UPLOAD,[uploadinfo.account],function(err,result){
    if(err){
      console.log("SELECT_UPLOAD Error: " + err.message);
      return;
    }
    callback(err,result);
  })
}
Publich.prototype.singleSelect = function(callback){
  var uploadinfo = {
    id: this.id
  }
  var SELECT_SINGLE = "SELECT upload.*,u_comment.* FROM upload INNER JOIN u_comment ON upload.id = u_comment.accountid WHERE upload.id = ?"
  connection.query(SELECT_SINGLE,[uploadinfo.id],function(err,result){
    callback(err,result);
  })
}
Publich.prototype.singleBaseSelect = function(callback){
  var uploadinfo = {
    id: this.id
  }
  var SELECT_SINGLE = "SELECT * FROM upload WHERE id = ?"
  connection.query(SELECT_SINGLE,[uploadinfo.id],function(err,result){
    callback(err,result);
  })
}
// 点赞更新
Publich.prototype.uploadUpdate = function(callback){
  var uploadinfo = {
    amount: this.amount,
    id: this.id
  }
  var UPDATE_BASEINFO = "UPDATE upload SET amount=? WHERE id = ?"
  connection.query(UPDATE_BASEINFO,[uploadinfo.amount,uploadinfo.id],function(err,result){
    callback(err,result);
  })
}
module.exports = Publich;