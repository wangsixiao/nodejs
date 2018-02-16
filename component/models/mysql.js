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
// exports.connection = connection
//创建连接池 createPool(Object)

// Object和createConnection参数相同。
// var pool = mysql.createPool({
//       host : '127.0.0.1',
//       user : 'root',
//       password :'Wang1104',
//       database:'music',
//   });
// //可以监听connection事件，并设置session值
// pool.on('connnection',function(connection){
//   console.log("pool on");
//   connection.query('SET SESSION auto_increment_increment=1')
// });

function User(user){
  this.username = user.username;
  this.password = user.password;
}
// 插入
User.prototype.userSave = function save(callback){
  var user = {
    username : this.username,
    password : this.password
  };
  // 插入用户登录信息
  var INSERT_USER = "INSERT INTO user(username,password) VALUES (?,?)"
    connection.query(INSERT_USER,[user.username,user.password],function(err,result){
      if(err){
        console.log("INSERT_USER Error: " + err.message);
        return;
      }
      // 获取登录的用户id
      // var SELECT_USERID = "SELECT id FROM user WHERE username = ?";
      // connection.query(SELECT_USERID, [user.username], function (err, result) {
      //   if (err) {
      //     console.log("SELECT_USERID Error: " + err.message);
      //     return;
      //   }
        // 将用户id保存到基本信息表里
        var INSERT_BASEUSERID = "INSERT INTO baseinfo(username) VALUES (?)"
        connection.query(INSERT_BASEUSERID,[user.username],function(err,result){
          if(err){
            console.log("INSERT_USER Error: " + err.message);
            return;
          }
        })
      // });
      // connection.release();
      callback(err,result);
    })
}

//根据用户名得到用户数量
User.prototype.userNum = function(username, callback) {
    // console.log("getConnection");
    // console.log("getUserNumByName");
    var SELECT_NUM = "SELECT COUNT(1) AS num FROM user WHERE username = ?";
    	connection.query(SELECT_NUM, [username], function (err, result) {
	      if (err) {
	        console.log("SELECT_NUM Error: " + err.message);
	        return;
	      }
	      // connection.release();
	      callback(err,result);
	    });
}

User.prototype.userInfo = function(callback){
  var user = {
    username : this.username,
    password : this.password
  };
  var SELECT_LOGIN ="SELECT * FROM user WHERE username = ?";
    connection.query(SELECT_LOGIN,[user.username],function(err,result){
      if (err) {
        console.log("SELECT_LOGIN Error: " + err.message);
        return;
      }
      // connection.release();
      callback(err,result);
    });
}


// 用户信息
function Base(base){
  this.name = base.name
  this.sex = base.sex
}
Base.prototype.userUpdate = function(callback){
  var baseinfo = {
    name : this.name,
    sex : this.sex
  };
  var INSERT_USER = "INSERT INTO baseinfo(name,sex) VALUES (?,?)"
  connection.query(INSERT_USER,[baseinfo.name,baseinfo.sex],function(err,result){
    if(err){
      console.log("INSERT_USER Error: " + err.message);
      return;
    }
    callback(err,result);
  })
}
module.exports = User;