function classsocket(){
   
   this.socket = function (url, options) {

      this.url = url;
      this.options = options
      this.connected = false;

      this.connexion();
    }
   this.socket.prototype.connexion = function() {
      
      var e = this;

      e.socket = io.connect(e.url,e.options);

      e.socket.on('connecting', function(type) {
        console.log('With [' + type + ']...');
        return e.type = type;
      });

      e.socket.on('connect', function() {
        e.connected = true;
        return e.displayError('Connected !');
      });

      e.socket.on('connect_failed', function() {
        return e.displayError('Connection failed, please check your internet connexion ...');
      });

      return e.socket.on('disconnect', function() {
                e.connected = false;
                return e.displayError('You are disconnected !');
      });
    }

    this.socket.prototype.emit = function(event, hash) {
      if (this.connected) {
        return this.socket.emit(event, hash);
      } else {
        return this.displayError('You\'re not connected, please wait ...');
      }
    }
    this.socket.prototype.on = function(event, f) {
      return this.socket.on(event, f);
    }
    this.socket.prototype.displayError = function(mess) {
      	error.value  = '';
	error.innerHTML = '<p>' + mess + '</p>';
	error.style.visibility = 'visible';
	setTimeout(function(){
		error.style.visibility = 'hidden';
	}, 3000);
    }
}
