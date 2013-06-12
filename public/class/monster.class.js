function classmonster() {

	var distance = 0;
	var affected = false;

	this.monster = function(args){

		this.px = args.p.x;
		this.py = args.p.y;
		this.v = args.v;
		this.r = args.r;
	}

	this.monster.prototype.update = function(t,m){

		var e = this;
		sqrtArray.push(e.px,e.py);

		//distance = Math.sqrt(Math.pow(m.dx-e.px,2)+Math.pow(m.dy-e.py,2));
		
	    	//e.vx = e.v * Math.cos((m.dx-e.px) / (1+distance/10));
	    	//e.vy = e.v * Math.sin((m.dy-e.py) / (1+distance/10));
		
		e.vx = (m.dx - e.px)/10;
		e.vy = (m.dy - e.py)/10;		

		e.px += e.vx;
		e.py += e.vy;

		if(t < e.r){
	        	e.affected = true;
	        	e.l = (65 - e.r)/5;
	        	e.r += e.l;
	    	} else {
	    		e.affected = false;
	    		e.l = (35 - e.r)/5;
	        	e.r += e.l;
	        }
	}

	this.monster.prototype.draw = function(){

		var e = this;

		context.beginPath();
		context.fillStyle = 'rgba(210, 210, 209, 1)';
		context.arc(e.px, e.py, e.r/5, 0, Math.PI*2, false);
	    	context.fill();

		context.beginPath();
	    	context.lineWidth = 2;
	    
	    	if(e.affected){
	        	context.fillStyle = 'rgba(50, 133, 158, .2)';
	    		context.strokeStyle = 'rgba(50, 133, 158, 1)';
	    	} else {
	        	context.fillStyle = 'rgba(210, 210, 209, .2)';
			context.strokeStyle = 'rgba(210, 210, 209, 1)';
	    	}
	    	context.arc(e.px, e.py, e.r, 0, Math.PI*2, false);
	    	context.fill();
	    	context.stroke();
	}
}
