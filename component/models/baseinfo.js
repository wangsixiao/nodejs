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

// 用户信息 
function Base(base){
  this.name = base.name
  this.sex = base.sex
  this.area = base.area
  this.intro = base.intro
  this.birthday = base.birthday
  this.qqnumber = base.qqnumber
  this.weixin = base.weixin
  this.username = base.username
}
// 插入
Base.prototype.userInsert = function(callback){
  var user = {
    name : this.name,
    sex : this.sex,
    area : this.area,
    intro : this.intro,
    birthday : this.birthday,
    qqnumber : this.qqnumber,
    weixin : this.weixin,
  };
  var INSERT_USER = "INSERT INTO baseinfo(name,sex) VALUES (?,?)"
  connection.query(INSERT_USER,[user.name,user.sex],function(err,result){
    if(err){
      console.log("INSERT_USER Error: " + err.message);
      return;
    }
    callback(err,result);
  })
}
// 修改
Base.prototype.userUpdate = function(callback){
  var baseinfo = {
    name : this.name,
    sex : this.sex,
    area : this.area,
    intro : this.intro,
    birthday : this.birthday,
    qqnumber : this.qqnumber,
    weixin : this.weixin,
    username : this.username
  };
  var UPDATE_BASEINFO = "UPDATE baseinfo SET name=?,sex=?,area=?,intro=?,birthday=?,qqnumber=?,weixin=? WHERE username = ?"
  connection.query(UPDATE_BASEINFO,[baseinfo.name,baseinfo.sex,baseinfo.area,baseinfo.intro,baseinfo.birthday,baseinfo.qqnumber,baseinfo.weixin,baseinfo.username],function(err,result){
    console.log(result)
    callback(err,result);
  })
}
// 查找
Base.prototype.userSelect = function(callback){
  var baseinfo = {
    username : this.username
  };
  var SELECT_BASEINFO = "SELECT * FROM baseinfo WHERE username = ?"
  connection.query(SELECT_BASEINFO,[baseinfo.username],function(err,result){
    callback(err,result);
  })
}
Base.prototype.userAllSelect = function(callback){
  var SELECT_BASEINFO = "SELECT * FROM baseinfo"
  connection.query(SELECT_BASEINFO,function(err,result){
    callback(err,result);
  })
}

module.exports = Base;