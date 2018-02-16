var User = require('../models/mysql.js')
var crypto = require('crypto')

exports.register = function(req,res){
  var username = req.body.username
  var password = req.body.password
  var password = crypto.createHash("md5").update(password).digest('hex')
  var newUser = new User({
    username : username,
    password : password
  });
  //检查用户名是否已经存在
  newUser.userNum(newUser.username, function (err, results) {
    if (results != null && results[0]['num'] > 0) {
      err = '用户名已存在';
    }
    if (err) {
      res.render('register.html', {errMsg: err });
      return;
    }
    newUser.userSave(function(err,result){
      if(err){
        res.render('register.html', {errMsg: err });
        return;
      }
      if(result.insertId > 0){
        res.locals.status = "success";
        res.redirect('/login');
      }
      else{
        res.render('register.html', {errMsg: err });
      }
     });
  });
}

exports.login = function(req,res){
  //获取form表单提交的登录数据
  var username = req.body.username
  var password = req.body.password
  var password = crypto.createHash('md5').update(password, 'utf8').digest("hex")
  var loginUser = new User({
    username : username,
    password : password
  });
  //通过用户名取到用户信息
  loginUser.userInfo(function(err,result){
    if(err){
      res.render('login.html', {errMsg: err });
      return;
    }
    if(result == ''){
       res.render('login.html', {errMsg: '用户不存在' });
       return;
    }else{
      //判断用户密码是否填写正确  演示没做加密，等有时间再加
      if(result[0]['password'] == password){
        var user = {'username':username};
        req.session.user = user;//保存用户session信息
        res.redirect('/');
      }else{
         res.render('login.html', {errMsg: '密码有误' });
      }
    }
   });
}