function classkeyboard() {

	this.keyboard = function(){
		
		document.addEventListener('keydown', keyDown, false);
		document.addEventListener('keyup', keyUp, false);
	}

	keyDown = function(event){
		force = true;
		switch(event.keyCode) { 
			case 39: rightKey = true;break;
			case 37: leftKey = true;break;
			case 38: upKey = true;break;
			case 40: downKey = true;break;
			case 32: shootKey = true;break;
		}
	}
	keyUp = function(event){
		force = false;
		switch(event.keyCode) {
			case 39: rightKey = false;break;
			case 37: leftKey = false;break;
			case 38: upKey = false;break;
			case 40: downKey = false;break;
			case 32: shootKey = false;break;
		}
	}
}