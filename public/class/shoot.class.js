function classshoot() {

	var bullet;
	var shot = 0;
	var classBullet = new classbullet();

	this.shoot = function(args){

		this.px = args.p.x;
		this.py = args.p.y;
		this.mx = args.m.x;
		this.my = args.m.y;
		this.s = args.s;
		this.c = args.c;
		this.m = args.w;
		this.i = args.i;
		this.t = args.t;

		if(this.m) shot++;

		if(shot == 5){
			bullet = new classBullet.bullet({
				p: { x: this.px, y: this.py, z:25 },
				m: { x: this.mx, y: this.my },
				v: 10,
				s: this.s,
				c: this.c
			});
			this.t.push(bullet);
			shot = 0;
		}
		shooting(this.t,this.i);
	}
	shooting = function(t,i){
		if(t.length >= 1){
			for(n in t){
				t[n].update();
				t[n].draw();
				if(t[n].s <= 0.5){
					t[n].destroy();
					t.splice(n,1);
				}
				else{
					var r = rayon(t[n].px,t[n].py,ly.px,ly.py);
					if(r <= ly.r && i != ly.i){
						t[n].destroy();
						t.splice(n,1);
						ly.u = true;
						ly.l--;
					}
				}
			}
		}
	}
	rayon = function(ax,ay,bx,by){
		var r = Math.sqrt(((ax - bx) * (ax - bx)) + ((ay - by) * (ay - by)));
		return r;
	}
}
