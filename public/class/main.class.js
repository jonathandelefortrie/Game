function classmain() {

	var start = false;
	var socket,interval;
	var canvas = document.getElementById( 'canvas' );

	this.main = function () {

		error = window.document.getElementById('message');
		chat = window.document.getElementById('set-text');
		life = window.document.getElementById('life');
		width = window.innerWidth;
		height = window.innerHeight;

		radius = 35;
		force = false;
		racineArray = new Array();
		sqrtArray = new Array();
		memberArray = new Array();
		mysterArray = new Array();

		rightKey = false;
		leftKey = false;
		upKey = false;
		downKey = false;
		shootKey = false;

		mouseX = width * 0.5;
		mouseY = height * 0.5;
		mouseIs = false;
	
		classSocket = new classsocket();
		classMyself = new classmyself();
		classMember = new classmember();
		classMonster = new classmonster();
	  
		if (canvas && canvas.getContext) {
			
			window.addEventListener('keypress', keypress, false);
			window.addEventListener('resize', resize, false);
			context = canvas.getContext('2d');
			socket = new classSocket.socket();	

			ly = new classMyself.myself({
				p: { x: width/2, y: height/2 },
				a: 1.5,
				d: .5,
				v: 10,
				r: radius,
				s: 4,
				l: 25,
				n: "anonymous",
				i: 0
			});
			
			socket.on('connect', function () {
				socket.emit('client_connected', ly);
			});

			socket.on('wait', function (data) {
				var m = "You are " + trans(data.o) + " in the waiting list ...";
				socket.displayError(m);
				setTimeout(function(){socket.emit('client_connected', data);},5000);
			});
			
			socket.on('get_ball', function (data) {
				ly.i = data.i;
				start = data.w;
			});

			socket.on('get_all_messages', function (messageArray) {
				var set = '';
				for(i in messageArray) {
					set += '<span class="row"><p>'+messageArray[i].name+'</p> '+messageArray[i].message+'</span>';
					chat.innerHTML = set; 
				}
			});

			socket.on('get_all_balls', function (dataArray) {
				memberArray = [];
				for(i in dataArray) {
					var member = new classMember.member({
						p: { x: dataArray[i].px, y: dataArray[i].py },
						s: dataArray[i].s,
						c: dataArray[i].c,
						z: dataArray[i].z,
						t: dataArray[i].t,
						n: dataArray[i].n,
						r: dataArray[i].r,
						l: dataArray[i].l,
						i: dataArray[i].i
					});
					if(dataArray[i].i != ly.i) memberArray.push(member);
				}
			});

			socket.on('get_new_message', function (data) {
				
				chat.innerHTML += '<span class="row"><p>'+data.name+'</p> '+data.message+'</span>';
			});

			socket.on('get_new_ball', function (data) {
				var member = new classMember.member({
					p: { x: data.px, y: data.py },
					s: data.s,
					c: data.c,
					z: data.z,
					t: data.t,
					n: data.n,
					r: data.r,
					l: data.l,
					i: data.i
				});
				memberArray.push(member);
			});

			socket.on('move_the_ball', function (data) {
				for(u in memberArray) {
					if(memberArray[u].i == data.i){
						memberArray[u].update(data);
					}
				}
			});

			socket.on('connect', function () {
				var display = {x:width,y:height};
				socket.emit('set_the_monster', display);
			});		

			socket.on('get_the_monster', function (monsterArray) {
				mysterArray = monsterArray;
				lo = new classMonster.monster({
					p: { x: width/2, y: height/2 },
					v: 10,
					r: radius
				});
			});

			socket.on('move_the_monster', function (monsterArray) {
				mysterArray = monsterArray;
			});			

			interval = setInterval( loop, 1000/25 );
		}
	}

	keypress = function(e){
		var code,get,upper;
		if(window.event) code = e.keyCode;
		else if(e.which) code = e.which;
		if(code == 13){
			if(window.document.forms['form-chat'].elements['get-text'].value == "") return false;
			ly.n = clean(window.document.forms['form-name'].elements['get-name'].value, upper=true);
			get = clean(window.document.forms['form-chat'].elements['get-text'].value, upper=false);
			socket.emit('new_message', { 'name' : ly.n, 'message' : get});
			chat.innerHTML += '<span class="row"><p>'+ly.n+'</p> '+get+'</span>';
			window.document.forms['form-chat'].elements['get-text'].value = '';
		}
	}

	trans = function(number){
		var val;
		switch(number.toString())
		{
		case "0": val = "first";break;
		case "1": val = "second";break;
		case "2": val = "third";break;
		default: val = "";break;
		}
		return val;
	}

	clean = function(str, upper){
		var f;
		var spe = /[&\/\\#,+()$~%.'":*?<>{}]/g;
		for(var i = 0; i<str.length; i++){
			f = str.replace(spe, "");	
		}
		if(upper) return f.charAt(0).toUpperCase() + f.substr(1,f.length);
		else return f;		
	}

	racine = function(n){

		if(n.length > 4) for(var u=0; u<n.length; u++){n.shift();}
		var t = Math.sqrt(((n[0] - n[2]) * (n[0] - n[2])) + ((n[1] - n[3]) * (n[1] - n[3]))) - radius;
		return t;
	}

	resize = function(){

		set = window.document.getElementById( 'set' );
    		chat = window.document.getElementById( 'chat' );
		error = window.document.getElementById( 'message' );

		width = window.innerWidth;
		height = window.innerHeight;
		
		canvas.width = width;
		canvas.height = height;

		set.style.height = (height - chat.offsetHeight) + 'px';
		error.style.marginTop = (height/2 - 30) + 'px';
	}
	
	loop = function() {

		context.clearRect(0,0,width,height);
		
		if(start){

			if(ly.l <= 0) {
				socket.emit('dead_the_ball');
				clearInterval(interval);
			}
			else if(typeof(lo) != 'undefined'){
				lo.update(racineArray,mysterArray);
				ly.update(racineArray);
				lo.draw();
				ly.draw();
				socket.emit('move', ly);
				if(memberArray.length >= 1)for(i in memberArray) memberArray[i].draw();
				racineArray = racine(sqrtArray);
			}
		}
	}

	var init = this.main(resize());
}
