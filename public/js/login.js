//获取用户
var user=location.href.split('?')[1];
$('h3').html(''+user);
//存储连接到客户端的用户
var users=[];
//连接到服务器
var socket=io();
socket.on('connect',function(){
	console.log('success');
	socket.emit('user',user);
	//用户加入
	//接受服务器发出的back user事件,data是服务器存的用户
	socket.on('back user',function(data){
		for(var key in data){
			if(users.indexOf(data[key])==-1){//如果当前客户端用户列表不存在此用户则将此用户加入到列表中
                users.push(data[key]);
                //操作DOM用户上线时添加用户对话框
                $('.list-right').append("<div class='users'><div>0</div>"+data[key]+"</div>");
                $("<div class='content-top' style='display:none;'><div class='title'>"+data[key]+"</div></div>").insertBefore($('.content-bottom'));
                console.log(users.indexOf(data[key]));
			}
            
		}
		console.log(users);
	});
	
  //用户离开
socket.on('del user',function(data){
    users.forEach(function(dom,index,arr){
          if(dom==data){
              arr.splice(index,1);
              //操作DOM用户上线时删除用户对话框
              var num=index+1;//数组index与对话框index关系
              $('.list-right .users:eq('+num+')').remove();
              $('.content-top:eq('+num+')').remove();
          }
    });
    console.log(users);
});

});

//切换当前对话用户
$('body').on('click','.users',function(){
	var _this=this;
	$('.users').attr('class','users');
	console.log($('.users'));
	$(this).attr('class','users curr');
	Array.prototype.forEach.call($('.users'),function(dom,index,arr){
         if(dom==$(_this)[0]){
               $('.content-top').hide();
               $('.content-top:eq('+index+')').show();
         }
	});
});

//群聊
function chatGroup(){
   var msg=$('.content-bottom').html();
   socket.emit('chatGroup',msg);
}
//私聊
function oneChat(){
   var msg=$('.content-bottom').html();
   Array.prototype.forEach.call($('.users'),function(dom,index,arr){
         if($(dom).attr('class')=='users curr'){
         	   $('.content-top:eq('+index+')').append("<div class='msg' style='text-align:right;background:#5bc0de;'>"+msg+":"+user+"</div>");
         	   console.log('cao'+dom.innerHTML.split('</div>')[1]);
               socket.emit('oneChat',msg,dom.innerHTML.split('</div>')[1],index);

         }
	});
}

//接群聊
socket.on('backGroup',function(data,who){
	//dom
	$('.content-top:eq(0)').append("<div class='msg' >"+who+":"+data+"</div>");
});
//接私聊
var domNum;
socket.on('backOne',function(data,who){
	var num;
	Array.prototype.forEach.call($('.users'),function(dom,index,arr){
         if(dom.innerHTML.split('</div>')[1]==who){
              num=index; 
              console.log(who);
              console.log(index);
         }

	});
	//新消息通知
	/*
	console.log(num);
	console.log(domNum);
	var number=parseInt(document.querySelector('.users:nth-child('+domNum+') div').innerText)+1;
	document.querySelector('.users:nth-child('+domNum+') div').innerText=number;
	$('.users:eq('+num+') div').css('display','block');*/
	domNum=num;
	if($('.users:eq('+num+')').attr('class')!=='users curr'){
		   var number=parseInt($('.users:eq('+num+') div').text())+1;
		   $('.users:eq('+num+') div').text(number);
           $('.users:eq('+num+') div').show();
           
             }
    //dom
    $('.content-top:eq('+num+')').append("<div class='msg' style='background:#f0ad4e;'>"+who+":"+data+"</div>");
});
//
$('body').on('click','.users',function(){
    $('.users:eq('+domNum+') div')[0].innerHTML=0;
    $('.users:eq('+domNum+') div').hide();
    
});
//发送消息
$('.btn').click(function(){
	if($('.users:eq(0)').attr('class')=='users curr'){//判断是否为群聊
          chatGroup();
	      $('.content-bottom').html('');
	}
	else{//私聊
        oneChat();  
        $('.content-bottom').html('');
	}
});
$(document).keypress(function(e) {  
    // 回车键事件  
       if(e.which == 13) {  
      $('.btn').click();
       }  
   }); 




//$( ".chat" ).draggable();