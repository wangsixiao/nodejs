var Index = require('../component/controllers/index')
var User = require('../component/models/mysql.js')
var Base = require('../component/models/baseinfo.js')
var Publish = require('../component/models/upload.js')
var Comment = require('../component/models/comment.js')
var Friend = require('../component/models/friend.js')
// 文件上传
var fs = require("fs")

// 抛出模块
module.exports = function(app,router){
    // sendFile()函数将html文件send到浏览器然后自动被浏览器解析
    // 注册
    app.route("/register")
      .get(function (req, res) {
         res.render('register.html',{errMsg:""})
      })
      .post(Index.register)

    // 登录
    app.route("/login")
      .get(function(req,res){
        res.render('login.html',{errMsg: '' })
      })
      .post(Index.login)

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
    app.route("/person")
      .get(function(req,res){
        var accountname
        var flag
        var account = req.session.user
        if(account){
          if(req.url == "/person"){
            // 个人中心
            accountname = account.username
            flag = true
          }else{
            // 从好友列表里进入到个人中心里
            accountname = req.query.accountname
            flag = false
          }
          var baseinfo = new Base({
            username: accountname
          })
          baseinfo.userSelect(function(err,result){
            var personinfo = result[0]
            var publish = new Publish({
              account: accountname
            })
            publish.uploadUserSelect(function(err,result){
              res.render('person/person.html',{
                personInfoList: personinfo,
                publishList: result,
                flag: flag
              })
            })
          })
        }else{
          res.render("login.html",{
            errMsg:"请重新登录"
          })
        }
      })
      .post(function(req,res){
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
      var account = req.session.user
      if(account){
        if(req.url == "/allUser"){
          var base = new Base({})
          base.userAllSelect(function(err,result){
            var allUser = result
            var friend = new Friend({
              accountname: req.session.user.username
            })
            friend.friendSelect(function(err,result){
              res.render("allUser/user.html",{
                allUserList: allUser,
                friendList: result
              })
            })
          })
        }else{
          // 添加朋友
          var friend = new Friend({
            friendname: req.query.friendname,
            accountname: req.session.user.username
          })
          friend.friendInsert(function(err,result){
            res.send("添加成功")
          })
        }
      }else{
        res.render("login.html",{
          errMsg:"请重新登录"
        })
      }
    })
    app.get("/allUser/singleEnter",function(req,res){
      if(req.session.user){
        var publish = new Publish({
          account: req.query.username
        })
        publish.uploadUserSelect(function(err,result){
          res.render('release/circle.html',{
            publishList: result
          })
        })
      }else{
        res.render("login.html",{
          errMsg:"请重新登录"
        })
      }
    })
    // 发布信息
    app.get("/release",function(req,res){
      res.render("release/release.html")
    })
    app.route("/file_upload")
      .get(function(req,res){
        var account = req.session.user
        var publish = new Publish({})
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
      .post(function(req,res){
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
          var publish = new Publish({
            address: address,
            content: publishContent,
            account: account.username,
            amount: 0
          })
          publish.uploadInsert(function(err,result){
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
      var publish
      if(account){
        if(req.url == '/circle'){
          publish = new Publish({})
          publish.uploadSelect(function(err,result){
            res.render("release/circle.html",{
              publishList: result
            })
          })
        }else if(req.query.account_id){
          // 进入评论里
          publish = new Publish({
            id: req.query.account_id
          })
          // 获取进入分享的信息
          publish.singleBaseSelect(function(err,result){
            var singleBase = result
            publish.singleSelect(function(err,result){
              res.render("release/comment.html",{
                publishList: result,
                baseinfo: singleBase[0]
              })
            })
          })
        }else{
          // 点赞
          publish = new Publish({
            id: req.query.id,
            amount: req.query.amount
          })
          publish.uploadUpdate(function(err,result){
            res.send(result)
          })
        }
      }else{
        res.render("login.html",{
          errMsg:"请重新登录"
        })
      }
    })
    // 评论
    app.post("/circle/compose",function(req,res){
      var account = req.session.user
      var comment = new Comment({
        comment:req.body.comment,
        commentname:req.session.user.username,
        accountid: req.body.account_id
      })
      comment.commentInsert(function(err,result){
        res.send("success")
      })
    })
    app.get("/circle/compose",function(req,res){
      res.render("release/compose.html")
    })
    // 好友列表
    app.get("/friend",function(req,res){
      if(req.session.user){
        var friend = new Friend({
          accountname: req.session.user.username
        })
        friend.friendBaseSelect(function(err,result){
          res.render("friend/friend.html",{
            friendList: result
          })
        })
      }else{
        res.render("login.html",{
          errMsg:"请重新登录"
        })
      }
    })

}
