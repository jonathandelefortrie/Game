function classmember() {

	var life = 0;
	var distance = 0;
	var classShoot = new classshoot();

	this.member = function(args){
		this.px = args.p.x;
		this.py = args.p.y;
		this.s = args.s;
		this.z = args.z;
		this.c = args.c;
		this.i = args.i;
		this.t = args.t;
		this.r = args.r;
		this.l = args.l;
		this.n = args.n;
	}
	this.member.prototype.update = function (v) {

		var e = this; 
	
		e.px = v.px;
		e.py = v.py;
	    	e.z = v.z;
		e.n = v.n;
		e.l = v.l;
		e.c = v.c;

		classShoot.shoot({
			p: { x: e.px, y: e.py },
			m: { x: v.mx, y: v.my },
			c: e.c + ',1)',
			s: e.s,
			t: e.t,
			i: e.i,
			w: v.w
		});
	}
	this.member.prototype.draw = function () {

		var e = this;

		life = ((e.l / 25) * 100) * 60 / 100;
		distance = Math.sqrt(Math.pow(mouseX-e.px,2)+Math.pow(mouseY-e.py,2));

		if(distance < e.r/2){

			context.beginPath();
			context.font = "10pt Helvetica-Neue-Medium-Condensed";
			context.fillStyle = e.c + ', 1 )';
			context.fillText(clean(e.n,upper=false), e.px+15, e.py-2);
			context.fill();

			context.beginPath();
			context.strokeStyle= e.c + ', 1 )';
			context.lineWith = "1";
			context.rect((e.px+15),(e.py+5),(60),(5));
			context.stroke();

			context.beginPath();
			context.fillStyle = e.c + ', 1 )';
			context.rect((e.px+15),(e.py+5),(life),(5));
			context.fill();
		}

		context.beginPath();
		context.fillStyle = e.c + ', 1 )';
		context.arc(e.px, e.py, e.s, 0, Math.PI*2, true);
		context.fill();

		context.beginPath();
		context.fillStyle = e.c + ', .2 )';
		context.arc(e.px, e.py, e.z, 0, Math.PI*2, true);
		context.fill();
	}	
}
