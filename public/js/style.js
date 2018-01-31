$(function(){
	// 发布信息
	$(".circle-list video").css("max-width",$(window).width() - 30)
	// 基本信息上传
	$("#nickname").click(function(){
		var json = {
			title:"昵称",
			msg:"4-30个字符，支持中英文、数字",
			input:{ type:"text", placeholder:"请输入昵称" },
			buttons:[
				// 设置 autoClose:false 会禁止自动关闭弹窗
				{ 
					title:"OK", 
					autoClose:false, click:function(text,element){
						if (text !== "") {
							// 使用 $.closeView() 关闭弹窗
							$.ajax({
								data:{
									name:$("#popup-dialog input").val(),
									sex:$("#sex").text(),
									area: $("#area").text(),
									intro: $("#intro").text(),
									birthday: $("#birthday").text(),
									qqnumber: $("#qqnumber").text(),
									weixin: $("#weixin").text()
								},
								url:'/person',
								type:'POST'
							})
							$("#nickname").text($("#popup-dialog input").val())
							$("#titlename").text($("#popup-dialog input").val())
							$.closeView();
						}else{
							element.find("input").css("border","red solid 1px");
						}
					} 
				},
				{ title:"Cancel" }
			]
		}
	
        $.alertView(json);
        $("#popup-dialog-mask").height($(document).height())
	})
	$("#sex").click(function(){
		var json = {
			title:"性别",
			buttons:[
				{ title:"女",click:function(){
					$.ajax({
						data:{
							name:$("#name").text(),
							sex:"女",
							area: $("#area").text(),
							intro: $("#intro").text(),
							birthday: $("#birthday").text(),
							qqnumber: $("#qqnumber").text(),
							weixin: $("#weixin").text()
						},
						url:'/person',
						type:'POST'
					})
					$("#sex").text("女")
					$.closeView()
					} 
				},
				{ title:"男",click:function(){
					$.ajax({
						data:{
							name:$("#name").text(),
							sex:"男",
							area: $("#area").text(),
							intro: $("#intro").text(),
							birthday: $("#birthday").text(),
							qqnumber: $("#qqnumber").text(),
							weixin: $("#weixin").text()
						},
						url:'/person',
						type:'POST'
					})
					$("#sex").text("男")
					$.closeView()} },
				{ title:"默认",click:function(){
					$.ajax({
						data:{
							name:$("#name").text(),
							sex:"默认",
							area: $("#area").text(),
							intro: $("#intro").text(),
							birthday: $("#birthday").text(),
							qqnumber: $("#qqnumber").text(),
							weixin: $("#weixin").text()
						},
						url:'/person',
						type:'POST'
					})
					$("#sex").text("默认")
					$.closeView()} }
			]
		}
	
        $.alertView(json);
        $("#popup-dialog-mask").height($(document).height())
	})
	$("#area").click(function(){
		var json = {
			title:"所在地",
			input:{ type:"text", placeholder:"请输入所在地" },
			buttons:[
				// 设置 autoClose:false 会禁止自动关闭弹窗
				{ 
					title:"OK", 
					autoClose:false, click:function(text,element){
						if (text !== "") {
							// 使用 $.closeView() 关闭弹窗
							$.ajax({
								data:{
									name:$("#nickname").text(),
									sex:$("#sex").text(),
									area: $("#popup-dialog input").val(),
									intro: $("#intro").text(),
									birthday: $("#birthday").text(),
									qqnumber: $("#qqnumber").text(),
									weixin: $("#weixin").text()
								},
								url:'/person',
								type:'POST'
							})
							$("#area").text($("#popup-dialog input").val())
							$.closeView();
						}else{
							element.find("input").css("border","red solid 1px");
						}
					} 
				},
				{ title:"Cancel" }
			]
		}
	
        $.alertView(json);
        $("#popup-dialog-mask").height($(document).height())
	})
	$("#intro").click(function(){
		var json = {
			title:"签名",
			input:{ type:"text", placeholder:"请输入签名" },
			buttons:[
				// 设置 autoClose:false 会禁止自动关闭弹窗
				{ 
					title:"OK", 
					autoClose:false, click:function(text,element){
						if (text !== "") {
							// 使用 $.closeView() 关闭弹窗
							$.ajax({
								data:{
									name:$("#nickname").text(),
									sex:$("#sex").text(),
									area: $("#area").text(),
									intro: $("#popup-dialog input").val(),
									birthday: $("#birthday").text(),
									qqnumber: $("#qqnumber").text(),
									weixin: $("#weixin").text()
								},
								url:'/person',
								type:'POST'
							})
							$("#intro").text($("#popup-dialog input").val())
							$(".mod-fil-desc").text($("#popup-dialog input").val())
							$.closeView();
						}else{
							element.find("input").css("border","red solid 1px");
						}
					} 
				},
				{ title:"Cancel" }
			]
		}
	
        $.alertView(json);
        $("#popup-dialog-mask").height($(document).height())
	})
	$("#birthday").click(function(){
		var json = {
			title:"生日",
			input:{ type:"text", placeholder:"请输入生日" },
			buttons:[
				// 设置 autoClose:false 会禁止自动关闭弹窗
				{ 
					title:"OK", 
					autoClose:false, click:function(text,element){
						if (text !== "") {
							// 使用 $.closeView() 关闭弹窗
							$.ajax({
								data:{
									name:$("#nickname").text(),
									sex:$("#sex").text(),
									area: $("#area").text(),
									intro: $("#intro").text(),
									birthday: $("#popup-dialog input").val(),
									qqnumber: $("#qqnumber").text(),
									weixin: $("#weixin").text()
								},
								url:'/person',
								type:'POST'
							})
							$("#birthday").text($("#popup-dialog input").val())
							$.closeView();
						}else{
							element.find("input").css("border","red solid 1px");
						}
					} 
				},
				{ title:"Cancel" }
			]
		}
	
        $.alertView(json);
        $("#popup-dialog-mask").height($(document).height())
	})
	$("#qqnumber").click(function(){
		var json = {
			title:"QQ号码",
			input:{ type:"text", placeholder:"请输入QQ号码" },
			buttons:[
				// 设置 autoClose:false 会禁止自动关闭弹窗
				{ 
					title:"OK", 
					autoClose:false, click:function(text,element){
						if (text !== "") {
							// 使用 $.closeView() 关闭弹窗
							$.ajax({
								data:{
									name:$("#nickname").text(),
									sex:$("#sex").text(),
									area: $("#area").text(),
									intro: $("#intro").text(),
									birthday: $("#birthday").text(),
									qqnumber: $("#popup-dialog input").val(),
									weixin: $("#weixin").text()
								},
								url:'/person',
								type:'POST'
							})
							$("#qqnumber").text($("#popup-dialog input").val())
							$.closeView();
						}else{
							element.find("input").css("border","red solid 1px");
						}
					} 
				},
				{ title:"Cancel" }
			]
		}
	
        $.alertView(json);
        $("#popup-dialog-mask").height($(document).height())
	})
	$("#weixin").click(function(){
		var json = {
			title:"昵称",
			msg:"4-30个字符，支持中英文、数字",
			input:{ type:"text", placeholder:"请输入昵称" },
			buttons:[
				// 设置 autoClose:false 会禁止自动关闭弹窗
				{ 
					title:"OK", 
					autoClose:false, click:function(text,element){
						if (text !== "") {
							// 使用 $.closeView() 关闭弹窗
							$.ajax({
								data:{
									name:$("#nickname").text(),
									sex:$("#sex").text(),
									area: $("#area").text(),
									intro: $("#intro").text(),
									birthday: $("#birthday").text(),
									qqnumber: $("#qqnumber").text(),
									weixin: $("#popup-dialog input").val()
								},
								url:'/person',
								type:'POST'
							})
							$("#weixin").text($("#popup-dialog input").val())
							$.closeView();
						}else{
							element.find("input").css("border","red solid 1px");
						}
					} 
				},
				{ title:"Cancel" }
			]
		}
	
        $.alertView(json);
        $("#popup-dialog-mask").height($(document).height())
	})

})