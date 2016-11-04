var express = require('express');
var router = express.Router();
var blogUsers=require('../models/user');
var blogUser=blogUsers.blogUserModel;
var db=blogUsers.model;
var socket_io=require('socket.io');
//访问次数times
var times=null;
db.find({name:'times'},function(err,info){
     times=info[0].times;
     console.log(times);
});
/*******socket.io**************/
var users={};//{socket.id:'username'}
var soc=null;//{socket.id:socket}
//把每两个socket加入到一个房间

router.prepareSocketIO = function (server) {
    var io = socket_io.listen(server);
    //
    io.on('connection', function (socket) {
       console.log('success');
       //用户加入
       socket.on('user',function(data){
            users[socket.id]=data;
            //users['who']=socket;
            console.log(users);
            soc=io.sockets.sockets;
            console.log(soc);
            for(var key in soc){
            var room=socket.id+key;
            console.log('room:'+room);
            socket.join(room);
            soc[key].join(room);
                  } 
            /*var index=0;//socket个数
            for(var key in soc){
                index++;
            }
            console.log(index);*/
            io.emit('back user',users);
       });
       //用户离开
      socket.on('disconnect',function(){
       	    console.log(socket.id);
       	    io.emit('del user',users[socket.id]);
            delete users[socket.id];
            console.log(users);
        });
      //群聊
      socket.on('chatGroup',function(data){
      	io.emit('backGroup',data,users[socket.id]);
      });
      //私聊
      socket.on('oneChat',function(msg,data,index){
      	var room='';
      	var room2=socket.id;
      	for(var key in users){
      		console.log(data);
             if(data==users[key]){
                  room+=key;
                  room2+=key;
             }
      	}
      	room+=socket.id;
      	console.log('roomsss:'+room);
      	console.log('roomsss:'+room2);
      	socket.broadcast.to(room).emit('backOne',msg,users[socket.id],index);
      	socket.broadcast.to(room2).emit('backOne',msg,users[socket.id],index);
      });

    });

    

};



/* GET home page. */
router.get('/',function(req,res,next){
  times++;
  console.log(times);
  db.update({name:'times'},{times:times},function(err){
     if(err){
          console.log(err);
     }
     else{
          console.log('update success');
     }
});
	res.render('index',{title:'登陆页',times:times+''});
});
router.post('/',function(req,res,next){
	if(req.body.val==undefined){
		blogUser.find({userName:req.body.uname,pwd:req.body.pwd},function(err,info){
		 if(info[0]==undefined){
			  res.send({exist:false}); 
		 } 
		 else{
			 res.send({exist:true});
		 } 
	 });
	}
	else{
		blogUser.find({userName:req.body.val},function(err,info){
		 if(info[0]==undefined){
			  res.send({exist:false}); 
		 } 
		 else{
			 res.send({exist:true});
		 } 
	 });
	}
});

router.get('/reg',function(req,res,next){
	res.render('reg',{title:'注册页'});
});
router.post('/reg',function(req,res,next){
	console.log(req.body.val);
	if(req.body.val==undefined){
		    blogUser.create({userName:req.body.uname,pwd:req.body.pwd},function(err,info){
		if(err){
			console.log(err);
		}
		else{
			console.log(info);
		}
	});
	}
	 else{
		 blogUser.find({userName:req.body.val},function(err,info){
		 if(info[0]==undefined){
			  res.send({exist:false}); 
		 } 
		 else{
			 res.send({exist:true});
		 } 
	 });
	 }
});
router.get('/regSuccess',function(req,res,next){
	res.render('regSuccess',{title:'注册成功'});
});
router.get('/login',function(req,res,next){
	res.render('login',{title:'welcome登陆成功'});
});


module.exports = router;
