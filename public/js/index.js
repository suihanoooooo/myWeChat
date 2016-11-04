var isLogin=false;
$(".login-form div:nth-child(3)").click(function(){
	location.href=location.href+'reg';
});
$('.login-form div:nth-child(1) input').keydown(function(){
	var _this=this;
	$(_this).parent().find('a').html('');
});
$('.login-form div:nth-child(2) input').keydown(function(){
	var _this=this;
	$(_this).parent().find('a').html('');
});
$('.login-form div:nth-child(1) input').blur(function(){
	var _this=this;
	if($(_this).val()==''){
			$(_this).parent().find('a').html('请输入').css('color','red');
		}
	else{
		$.post('/','val='+$(this).val(),function(data){
			if(data.exist){
			$(_this).parent().find('a').html('可用').css('color','#fff');
			isLogin=true;
		}
		else{
			$(_this).parent().find('a').html('不存在').css('color','red');
			isLogin=false;
		}
	});
	}
});

$("input[type='button']").click(function(){
	if($('.login-form div:nth-child(2) input').val()==''){$('.login-form div:nth-child(2) input').parent().find('a').html('请输入').css('color','red')}
	else{
		var result=$('.login-form').serialize();
	$.post('/',result,function(data){
		if(data.exist){
			location.href=location.href+'login?'+$('.login-form div:nth-child(1) input').val();
		}
		else{
			$('.login-form div:nth-child(2) input').parent().find('a').html('密码错误').css('color','red')
		}
	});
	}
});

