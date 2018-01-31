var Index = require('../app/controllers/index')
var User = require('../app/models/mysql.js')
var Base = require('../app/models/baseinfo.js')
var Publich = require('../app/models/upload.js')
// 文件上传
var fs = require("fs")

// 抛出模块
module.exports = function(app){
    // sendFile()函数将html文件send到浏览器然后自动被浏览器解析
    app.get('/register', function (req, res) {
       res.render('register.html',{errMsg:""})
    })
    // 注册
    app.post('/register', Index.register)
    // 登录
    app.get('/login',function(req,res){
      res.render('login.html',{errMsg: '' })
    })
    app.post('/login',Index.login)
// 主页
    app.get('/',function(req,res){
      if(req.session.user){
        res.render("index.html") 
      }else{
        res.render("login.html",{
          errMsg:"您还未登录"
        })
      }
    })
    // 用户信息
    app.get('/person',function(req,res){
      var account = req.session.user
      if(account){
        var baseinfo = new Base({
          username: account.username
        })
        baseinfo.userSelect(function(err,result){
          var personinfo = result[0]
          var publish = new Publich({
            account: account.username
          })
          publish.uploadUserSelect(function(err,result){
            res.render('person/person.html',{
              // name:result[0].name,
              // sex: result[0].sex,
              // area: result[0].area,
              // intro: result[0].intro,
              // birthday: result[0].birthday,
              // qqnumber: result[0].qqnumber,
              // weixin: result[0].weixin,
              personInfoList: personinfo,
              publishList: result
            })
          })
        })
      }else{
        res.render("login.html",{
          errMsg:"请重新登录"
        })
      }
    })
    app.post('/person',function(req,res){
      if(req.session.user){
        var basename = req.body.name
        var basesex = req.body.sex
        var basearea = req.body.area
        var baseintro = req.body.intro
        var basebirthday = req.body.birthday
        var baseqqnumber = req.body.qqnumber
        var baseweixin = req.body.weixin
        var baseinfo = new Base({
          name: basename,
          sex: basesex,
          area: basearea,
          intro: baseintro,
          birthday: basebirthday,
          qqnumber: baseqqnumber,
          weixin: baseweixin,
          username: req.session.user.username
        })
        baseinfo.userUpdate(function(err,result){
         
        })
      }else{
        res.render("login.html",{
          errMsg:"请重新登录"
        })
      }
    })
    // 热门视听
    app.get('/allUser',function(req,res){
      res.render("allUser/user.html",{
        name:'',
        sex:''
      })
    })
    // 发布信息
    app.get("/release",function(req,res){
      res.render("release/release.html")
    })
    app.get("/file_upload",function(req,res){
      var account = req.session.user
      var publish = new Publich({})
      if(account){
        publish.uploadSelect(function(err,result){
          res.render("release/circle.html",{
            publishList: result
          })
        })
      }else{
        res.render("login.html",{
          errMsg:"请重新登录"
        })
      }
    })
    app.post("/file_upload",function(req,res){
      var account = req.session.user,
          originalname,
          fieldname,
          publishContent = req.body.content,
          des_file,
          address
      if(account){
        for(var i = 0;i < req.files.length;i++){
          originalname = req.files[i].originalname
          fieldname = req.files[i].fieldname
          if(i == 0){
            address = ["/" + fieldname + "/" + originalname]
          }else{
            address = address + ";" + ["/" + fieldname + "/" + originalname]
          }
          
          des_file = __dirname + "/images/" + originalname
          fs.readFile( req.files[i].path, function (err, data) {
            fs.writeFile(des_file, data, function (err) {
              if( err ){
                console.log( err )
              }
           })
          })
        }
        // 将上传的文件路径存储到数据库中
        var publish = new Publich({
          address: address,
          content: publishContent,
          account: account.username
        })
        publish.uploadInsert(function(err,result){
          if(err){
            res.render('release/circle.html',{errMsg:err})
            return
          }
          publish.uploadSelect(function(err,result){
            res.render("release/circle.html",{
              publishList: result
            })
          })
        })
      }else{
        res.render("login.html",{
          errMsg:"请重新登录"
        })
      }
    })
    // 退出
    app.get("/exit",function(req,res){
      res.render("login.html",{
          errMsg:""
        })
    })
    // 好友圈
    app.get("/circle",function(req,res){
      var account = req.session.user
      var publish = new Publich({})
      if(account){
        publish.uploadSelect(function(err,result){
          res.render("release/circle.html",{
            publishList: result
          })
        })
      }else{
        res.render("login.html",{
          errMsg:"请重新登录"
        })
      }
    })



}
