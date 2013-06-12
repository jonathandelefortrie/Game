function classmouse() {

	this.touch = function(){

		document.addEventListener('touchstart', touchStart, false);
	}
	touchStart = function(event) {
		if(event.touches.length == 1) {
			event.preventDefault();
			mouseX = event.touches[0].pageX - (window.innerWidth - width) * .5;;
			mouseY = event.touches[0].pageY - (window.innerHeight - height) * .5;
		}
	}
	
	this.mouse = function(){

		document.addEventListener('mousemove', mouseMove, false);
		document.addEventListener('mousedown', mouseDown, false);
		document.addEventListener('mouseup', mouseUp, false);
	}
	mouseMove = function(event){
		mouseX = event.clientX - (window.innerWidth - width) * .5;
		mouseY = event.clientY - (window.innerHeight - height) * .5;
	}
	mouseDown = function(event){
		mouseIs = true;
	}
	mouseUp = function(event){
		mouseIs = false;
	}
}