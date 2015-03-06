var lastUpdate;
var player;

$(document).ready(function() {
	$("body").css("display", "none");		 
	$("body").fadeIn(3000, function() {
		lastUpdate = 0;
		player = Player('player');
		requestAnimationFrame(update);
	});
	
	$('body').click(function(e) {
		if (typeof player != 'undefined') {
			player.move(e.clientX, e.clientY);
		}
	 });
});

function update(time) {
	var t = time - lastUpdate;
	lastUpdate = time;
	
	player.update();
	
	requestAnimationFrame(update);
}

/*
 *  The ship controlled by the player. 
 */
var Player = function(elementName) {
	var element = $('#' + elementName);
	var PLAYER_HEIGHT = 180;
	var PLAYER_WIDTH = 275;
	var position = [element.position().left, element.position().top];
	var speed = 8;
	var targetPosition = [0, 0];
	
	/*
	 *  Construction
     */
	 targetPosition[0] = Math.floor(innerWidth * .25);
	 targetPosition[0] = targetPosition[0] < 0 ? 0 : targetPosition[0];
	 targetPosition[1] = Math.floor(innerHeight * .7 - PLAYER_HEIGHT);
	 targetPosition[1] = targetPosition[1] < 0 ? 0 : targetPosition[1];
	 	 
	/* 
	 *  Changes the target position of the ship.
	 */
	var move = function(x, y) {
		targetPosition[0] = Math.floor(x - PLAYER_WIDTH * .4);
		targetPosition[1] = Math.floor(y - PLAYER_HEIGHT * .4);
		targetPosition[0] = targetPosition[0] < 0 ? 0 : targetPosition[0];
		targetPosition[1] = targetPosition[1] < 0 ? 0 : targetPosition[1];
	}
	
	/*
	 *  Run every frame.
	 */
	var update = function() {
		// Adjust the player's position.
		if (targetPosition[0] > position[0]) {
			position[0] += speed;
			
			if (position[0] > targetPosition[0]) {
				position[0] = targetPosition[0];
			}
		} else if (targetPosition[0] < position[0]) {
			position[0] -= speed;
			
			if (position[0] < targetPosition[0]) {
				position[0] = targetPosition[0];
			}
		}
		
		if (targetPosition[1] > position[1]) {
			position[1] += speed;
			
			if (position[1] > targetPosition[1]) {
				position[1] = targetPosition[1];
			}
		} else if (targetPosition[1] < position[1]) {
			position[1] -= speed;
			
			if (position[1] < targetPosition[1]) {
				position[1] = targetPosition[1];
			}
		}
		
		var maxPosition = innerWidth * .5 - PLAYER_WIDTH;
		maxPosition = maxPosition < 0 ? 0 : maxPosition;
		if (position[0] > maxPosition) {
			position[0] -= speed;
			targetPosition[0] = position[0];
		}
		
		// The height of the player is 180px, so stop it before any part of the player extends off the screen.
		if (position[1] >= innerHeight - PLAYER_HEIGHT) {
			position[1] -= speed;
			targetPosition[1] = position[1];
		}
		
		element.css('left', position[0] + 'px');
		element.css('top', position[1] + 'px');
	}
	
	return {
		getPosition: function() { return position; },
		move: move,
		update: update		
	}
}