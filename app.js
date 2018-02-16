var express = require('express')

// bodyParser模块做文件解析 将表单里的数据格式化
var bodyParser = require("body-parser")
var app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// 文件上传
var fs = require("fs")

// session配置
var cookieParser = require('cookie-parser')
	,session = require('express-session')
app.use(session({ 
     secret: '12345', 
     name: 'demo',   //这里的name值得是cookie的name，默认cookie的name是：connect.sid 
     cookie: {maxAge: 8000000000000000 },  //设置maxAge是80000ms，即80s后session和相应的cookie失效过期 
     resave: false, 
     saveUninitialized: true, 
}));

// 定义渲染html模板
app.engine('.html', require('ejs').__express)
app.set('view engine', 'html')

// 加载静态资源
app.use(express.static(__dirname + '/public'))
app.set('views', __dirname + '/component/views')


var path = require('path')
var multer = require('multer')
var router = express.Router()
app.use(multer({ dest: 'upload-file'}).any())


// 载入mongoose编译后的模型userLogin
// var userLogin = require('./models/userLogin.js')

// 编写路由
require('./public/routes')(app,router,fs)

var server = app.listen(8081, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
})