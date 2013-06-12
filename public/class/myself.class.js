function classmyself() {

	var isIOS = navigator.userAgent.match(/iPad/i) != null || navigator.userAgent.match(/iPhone/i) != null;
	var isAndroid = navigator.userAgent.match(/Android/i) != null;
	var hasTouchEvent = isIOS || isAndroid;

	var val = 10;
	var step = 0;
	var timer = 0;
	var minSpeed = .5;
	var maxSpeed = 15;

	var classShoot = new classshoot();
	var classMouse = new classmouse();
	var classKeyboard = new classkeyboard();

	this.myself = function(args){

		this.px = args.p.x;
		this.py = args.p.y;
		this.vx = args.v;
		this.vy = args.v;
		this.a = args.a;
		this.d = args.d;
		this.v = args.v;
		this.n = args.n;
		this.s = args.s;
		this.r = args.r;
		this.l = args.l;
		this.z = args.s;
		this.i = args.i;
		this.c = color();
		this.o = this.c;
		this.u = false;

		this.t = new Array();

		(hasTouchEvent)?this.m = new classMouse.touch():this.m = new classMouse.mouse();
		this.k = new classKeyboard.keyboard();

		window.document.forms['form-name'].elements['get-name'].value = this.n + " ...";
	}

	this.myself.prototype.update = function(p){

		var e = this;
		e.mx = mouseX;
		e.my = mouseY;
		e.w = mouseIs;

		life.innerHTML = e.l;
		e.n = window.document.forms['form-name'].elements['get-name'].value;		

		sqrtArray.push(e.px,e.py);

		if(p<e.r){
		    if(force){
			e.vx *= 1.33;
		    	e.vy *= 1.33;
		    }
		    e.dx = sqrtArray[2] - sqrtArray[0];
		    e.dy = sqrtArray[3] - sqrtArray[1];

		    e.vx -= e.dx / 3;
		    e.vy -= e.dy / 3;
		    	
		    if(e.vx > maxSpeed){ e.vx = maxSpeed; }
		    if(e.vx < -maxSpeed){ e.vx = -maxSpeed; } 
		    if(e.vy > maxSpeed){ e.vy = maxSpeed; } 
		    if(e.vy < -maxSpeed){ e.vy = -maxSpeed; }
		    
		    if(Math.abs(e.vx) > minSpeed) e.vx *= .997;
		    if(Math.abs(e.vy) > minSpeed) e.vy *= .997;
	    	}

	    	if(!rightKey && e.vx>0) e.vx -= e.d;
		else if(!leftKey && e.vx<0) e.vx += e.d;
		if(!upKey && e.vy<0) e.vy += e.d;
		else if(!downKey && e.vy>0) e.vy -= e.d;

		if(rightKey && e.vx<e.v) e.vx += e.a;
		else if(leftKey && e.vx>-e.v) e.vx -= e.a;
		if(upKey && e.vy>-e.v) e.vy -= e.a;
		else if(downKey && e.vy<e.v) e.vy += e.a;
	    
	    	e.px += e.vx;
		e.py += e.vy;

		
		if(e.u) {
			e.c = 'rgba(200,15,0';
			if(step == 5) {
				e.u = false;
				step = 0;
			}
			step++;
		} else e.c = e.o;

		if(timer == 10){
			if(e.w){
				if(val == 20) val = 10;
				else if(val == 10) val = 20;
			}
			else val = 10;
			timer = 0;
		}
		timer++;

		e.j = (val - e.z)/10;
	    	e.z += e.j;

	    	e.px = Math.max( Math.min( e.px, width ), 0 );
		e.py = Math.max( Math.min( e.py, height ), 0 );

		classShoot.shoot({
			p: { x: e.px, y: e.py },
			m: { x: e.mx, y: e.my },
			c: e.c + ', 1 )',
			s: e.s,
			w: e.w,
			i: e.i,
			t: e.t
		});
	}

	this.myself.prototype.draw = function(){

		var e = this;

		context.beginPath();
		context.fillStyle = e.c + ', 1 )';
		context.arc(e.px, e.py, e.s, 0, Math.PI*2, true);
		context.fill();

		context.beginPath();
		context.fillStyle = e.c + ', .2 )';
		context.arc(e.px, e.py, e.z, 0, Math.PI*2, true);
		context.fill();
	}

	color = function(){

		return rgba = 'rgba(' + Math.floor(Math.random() * 91) + ', 91, ' + Math.floor(Math.random() * 255);
	}
}
