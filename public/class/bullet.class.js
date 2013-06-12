function classbullet(){

	var maxpz = 350;

	this.bullet = function(args){

		this.px = args.p.x;
		this.py = args.p.y;
		this.pz = args.p.z;
		this.mx = args.m.x;
		this.my = args.m.y;
		this.v = args.v;
		this.s = args.s;
		this.c = args.c;
		
	    	this.vz = this.v;
	    	this.dx = this.mx - this.px;
		this.dy = this.my - this.py;
		this.rotation = Math.atan2(this.dy,this.dx);
	}
	this.bullet.prototype.update = function(){
		var e = this;

		e.vx = e.v * Math.cos(e.rotation);
	    	e.vy = e.v * Math.sin(e.rotation);
		
		e.px += e.vx;
		e.py += e.vy;
		e.pz += e.vz;

		if(e.pz>maxpz) e.pz = maxpz;
		e.s = (maxpz - e.pz) / maxpz;
	}
	this.bullet.prototype.draw = function(){
		var e = this;

		context.beginPath();
		context.fillStyle = e.c;
		context.arc(e.px, e.py, e.s, 0, Math.PI*2, true);
		context.fill();
	}
	this.bullet.prototype.destroy = function(){
		var e = this;
		for (key in e) { e[key]=null; }
	}
}
