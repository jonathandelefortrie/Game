var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

server.listen(1337);

app.configure(function() {
  app.use(express.static(__dirname + '/public'));
});

var set;
var i = 0;
var o = 0;
var dataArray = new Array();
var waitArray = new Array();
var messageArray = new Array();
var monsterArray = new Object();

io.sockets.on('connection', function (socket) {

  socket.on('client_connected', function (data) {
	
	if(i <= 5 && o == 0){
    	dataArray[i] = data;
		dataArray[i].w = true;
		dataArray[i].i = socket.id;
    	socket.player = dataArray[i];
		socket.emit('get_ball', dataArray[i]);
    	socket.emit('get_all_balls', dataArray);
		socket.emit('get_all_messages', messageArray);
		socket.broadcast.emit('get_new_ball', dataArray[i]);
		i++;
	}

	else if(i <= 5 && o >= 1){
		for(u in waitArray){
			if(waitArray[u].i == 0){
				waitArray[o] = data;
				waitArray[o].w = true;
				waitArray[o].i = socket.id;
				waitArray[o].o = o;
				socket.emit('wait', waitArray[o]);
				o++;
			}
			if(waitArray[u].i == data.i){
				if(waitArray[u].o == 0){
	
					dataArray[i] = waitArray[u];
					waitArray.splice(u,1);

					for(u in waitArray){
						waitArray[u].o = u;
					}
					o--;

					socket.player = dataArray[i];
					socket.emit('get_ball', dataArray[i]);
					socket.emit('get_the_balls', dataArray);
					socket.emit('get_all_messages', messageArray);
					socket.broadcast.emit('get_new_ball', dataArray[i]);
					i++;

					return false;
				}
			}
		}
		for(u in waitArray){
			if(waitArray[u].i == data.i){
				socket.emit('wait', waitArray[u]);
				return false;
			}
		}
	}

	else {
		for(u in waitArray){
			if(waitArray[u].i == data.i){
				socket.emit('wait', waitArray[u]);
				return false;
			}
		}
		waitArray[o] = data;
		waitArray[o].w = true; 
		waitArray[o].i = socket.id;
		waitArray[o].o = o;
		socket.emit('wait', waitArray[o]);
		o++;
	}

  });

  socket.on('new_message', function (data) {
  
	messageArray.push(data);
	socket.broadcast.emit('get_new_message', data);
  });

  socket.on('move', function (data) {
  	
  	for(j in dataArray){
		 if(dataArray[j].i == data.i){
			 dataArray[j] = data;
		}
	}
  	socket.broadcast.emit('move_the_ball', data);
  });

  socket.on('dead_the_ball', function () {
	
	socket.disconnect();
  });

  socket.on('disconnect', function () {

	var j = 0;
    var tmpArray = new Array();

	for(n in dataArray) {
    	if(dataArray[n].i != socket.id){
  	    	tmpArray[j] = dataArray[n];
  	    	j++;
  		}
	}
	i = j;
  	dataArray = tmpArray;
  	socket.broadcast.emit('get_all_balls', dataArray);
  });

});

io.sockets.on('connection', function (socket) {

  socket.on('set_the_monster', function(data){
	monsterArray.dx = data.x/2;
	monsterArray.dy = data.y/2;
  	socket.emit('get_the_monster', monsterArray);
	clearInterval(set);
  	set = setInterval(function(){

		monsterArray.dx = Math.max( Math.min( monsterArray.dx, data.x), 0);
		monsterArray.dy = Math.max( Math.min( monsterArray.dy, data.y), 0);

		socket.emit('move_the_monster', monsterArray);
		socket.broadcast.emit('move_the_monster', monsterArray);
	
		monsterArray.dx = Math.round( Math.random() * 1280 );
		monsterArray.dy = Math.round( Math.random() * 720 );
		
	},3000);
  });

  socket.on('disconnect', function () {

  	if(dataArray.length==0) {
  		messageArray = [];
  		clearInterval(set);
  	}
  });

});