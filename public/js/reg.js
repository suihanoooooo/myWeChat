var isReg=false;
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
		$.post('/reg','val='+$(this).val(),function(data){
			if(data.exist){
			$(_this).parent().find('a').html('已存在').css('color','red');
			isReg=false;
		}
		else{
			$(_this).parent().find('a').html('可以使用').css('color','#fff');
			isReg=true;
		}
	});
	}
});
$("input[type='button']").click(function(){
	 var result=$('.login-form').serialize();
	 if($('.login-form div:nth-child(2) input').val()==''){$('.login-form div:nth-child(2) input').parent().find('a').html('请输入').css('color','red')}
	 if(isReg&&$('.login-form div:nth-child(2) input').val()!==''){
		 $.post('/reg',result,function(data){ 
	 });
	 location.href=location.href.slice(0,-3)+'regSuccess';
	 }
});
$('.login-form div:nth-child(3)').click(function(){
	location.href=location.href.slice(0,-3);
});
