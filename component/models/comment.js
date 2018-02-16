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
function Comment(upload){
  this.comment = upload.comment
  this.commentname = upload.commentname
  this.accountid = upload.accountid
  this.id = upload.id
}
// 插入
Comment.prototype.commentInsert = function(callback){
  var user = {
    comment : this.comment,
    commentname : this.commentname,
    accountid : this.accountid,
  };
  var INSERT_UPLOAD = "INSERT INTO u_comment(comment,commentname,accountid) VALUES (?,?,?)"
  connection.query(INSERT_UPLOAD,[user.comment,user.commentname,user.accountid],function(err,result){
    callback(err,result);
  })
}
module.exports = Comment;