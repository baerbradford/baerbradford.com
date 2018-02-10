(function () {
    var dataSet;
	var round;
	var menuMode = true;
	
	$(document).ready(function () {
        centerModals();
		positionFireButton();
		
		$('.viewSetLink').click(function () {
            var id = $('#passwordText').val();
			loadDataSet(id);
			
			if (dataSet != null) {
				transitionToFiringView();			
				fire(2500);
			} else {
				alert('No such dataset exists. You can enter "demo" for a sample.');
			}
			
        });
		
		$('.back').click(function () {
			transitionToMenu();
		});
		
		$('.fire').click(function () {
			fire(500);
		});
		
		$('#aboutLink').click(function (e) {
			$("body").css("overflow", "hidden");

			//Cancel the link behavior
			e.preventDefault();

			//Get the screen height and width
			var maskHeight = $(document).height();
			var maskWidth = $(window).width();

			//Set height and width to mask to fill up the whole screen
			$('#mask').css({ 'width': maskWidth, 'height': maskHeight });
			
			$('#mask').fadeTo("slow", 0.7);					
		
			$('.menu').fadeOut(500);
			$('.results').fadeOut(500);
			$('.fire').fadeOut(500);
			$('#about').fadeIn(500);
		});
		
		$(window).resize(function () {
			if(menuMode) {
				$('.forest').css({
					left: 0
				});
			} else {
				$('.forest').css({
					left: ($('body').width() * -.5)
				});
			}
			
			$('#mask').css({ 'width': $(window).width(), 'height': $(document).height() });
			
			positionFireButton();
			
			$('.arrow').each(function (arrow) {
				$(this).css('left', getOffSet('target').x - Math.floor(200 + Math.random() * 50));
			});
			
			centerModals();
		});
		
		//if close button is clicked
		$('#closeAbout').click(function (e) {
			e.preventDefault();
			closeAbout();
		});

		//if mask is clicked
		$('#mask').click(function () {
			closeAbout();
		});
    });
	
	function animateArrow(value, sample) {        
        var offSet = getOffSet('target');
        var arrow = $('<div style="top: ' + (580 - (value - 4) * 32 - 200) + 'px;" class="arrow"></div>');
        $('body').append(arrow);
        arrow.animate({
            left: offSet.x - Math.floor(200 + Math.random() * 50), // + 10 + (18 - value) * 56,
            top: offSet.y + 580 - (value - 4) * 32
        }, 500, function () {
            arrow.css('width', '300px'); // makes the arrow look embedded
			$('#observation' + (sample + 1)).html(dataSet.data[round][sample]);
        });        
    }
	
	function centerModals() {
		//Get the window height and width
        var winH = $(window).height();
        var winW = $(window).width();

        $('.modal').each(function (i, modal) {
			$(modal).css('top', winH / 2 - $(modal).height() / 1.5);
			$(modal).css('left', winW / 2 - $(modal).width() / 2);
		});
        
	}
	
	function closeAbout() {		
		$('#mask').hide();
		$("body").css("overflow", "");
		if(menuMode) {
			$('.menu').fadeIn(500);
		} else {
			$('.results').fadeIn(500);
		}
		$('#about').fadeOut(500);
	}
	
	function fire(delay) {
		$('.fire').hide();
		
		var pastArrows = $('.arrow');
		pastArrows.fadeOut(750, function() {
			pastArrows.remove();
		});
		
		if(round == 9) {
			round = 0;
		} else {
			round++;
		}
		
		updateTable();
		
		setTimeout(function() {
			(function loop(i) {
				setTimeout(function () {
					var value;
					var sample;
					if (i == 4) {
						sample = 0;										
					} else if (i == 3) {
						sample = 1;
					} else if (i == 2) {
						sample = 2;
					} else if (i == 1) {
						sample = 3;
					}
					value = dataSet.data[round][sample];	

					animateArrow(value, sample);

					if (--i) {
						loop(i);
					} else {
						if (!menuMode)
							$('.fire').show();
					}
				}, 500);
			})(4);
		}, delay);					
	}
	
	function getOffSet(element) {
        var obj = document.getElementById(element);
        var left, top;
        left = top = 0;
        if (obj.offsetParent) {
            do {
                left += obj.offsetLeft;
                top += obj.offsetTop;
            } while (obj = obj.offsetParent);
        }
        return {
            x: left,
            y: top
        };
    }
	
	function loadDataSet(id) {
		var dataSets = new Array();
		
		var demo = new Object();
		demo.name = 'Demo Data Set';
		demo.data = new Array();
		for (var i = 0; i < 10; i++)
			demo.data[i] = new Array(Number((4+(18-4)*Math.random()).toFixed(2)), Number((4+(18-4)*Math.random()).toFixed(2)), Number((4+(18-4)*Math.random()).toFixed(2)), Number((4+(18-4)*Math.random()).toFixed(2)));	
		dataSets['demo'] = demo;
		
		var case1 = new Object();
		case1.name = 'Case 1';
		case1.data = new Array();
		case1.data[0] = new Array(9.60, 12.10, 10.10, 9.00);
		case1.data[1] = new Array(10.90, 6.70, 9.50, 8.10);
		case1.data[2] = new Array(10.80, 12.10, 9.20, 4.70);
		case1.data[3] = new Array(11.50, 11.20, 9.20, 16.10);
		case1.data[4] = new Array(14.20, 16.87, 10.10, 11.23);
		case1.data[5] = new Array(11.50, 8.80, 11.80, 4.70);
		case1.data[6] = new Array(12.80, 14.50, 12.20, 5.30);
		case1.data[7] = new Array(17.28, 6.50, 7.80, 15.62);
		case1.data[8] = new Array(10.90, 11.80, 13.90, 5.60);
		case1.data[9] = new Array(5.47, 12.10, 12.20, 8.95);	
		dataSets['1case'] = case1;
		
		var case2 = new Object();
		case2.name = 'Case 2';
		case2.data = new Array();
		case2.data[0] = new Array(14.90, 16.50, 10.10, 15.30);
		case2.data[1] = new Array(8.20, 11.90, 9.50, 5.60);
		case2.data[2] = new Array(15.90, 7.70, 9.20, 4.00);
		case2.data[3] = new Array(11.50, 11.20, 9.20, 16.10);
		case2.data[4] = new Array(12.98, 8.50, 17.25, 13.67);
		case2.data[5] = new Array(4.10, 5.20, 11.80, 8.70);
		case2.data[6] = new Array(12.8, 14.5, 12.2, 5.3);
		case2.data[7] = new Array(8.8, 6.5, 14.5, 17.4);
		case2.data[8] = new Array(10.9, 11.8, 13.9, 5.6);
		case2.data[9] = new Array(13.7, 5.38, 12.2, 7.44);	
		dataSets['c2ase'] = case2;
		
		var case3 = new Object();
		case3.name = 'Case 3';
		case3.data = new Array();
		case3.data[0] = new Array(9.6, 12.1, 10.1, 9);
		case3.data[1] = new Array(10.90, 11.90, 9.50, 2.90);
		case3.data[2] = new Array(10.80, 12.10, 9.20, 4.70);
		case3.data[3] = new Array(11.50, 11.20, 9.20, 16.10);
		case3.data[4] = new Array(15.50, 12.50, 10.10, 14.30);
		case3.data[5] = new Array(11.50, 8.80, 11.80, 4.70);
		case3.data[6] = new Array(12.80, 14.50, 12.20, 5.30);
		case3.data[7] = new Array(8.80, 12.80, 14.50, 11.10);
		case3.data[8] = new Array(10.90, 11.80, 13.90, 5.60);
		case3.data[9] = new Array(5.24, 6.25, 12.20, 15.03);	
		dataSets['ca3se'] = case3;
		
		var case4 = new Object();
		case4.name = 'Case 4';
		case4.data = new Array();
		case4.data[0] = new Array(9.60, 12.10, 10.10, 9.00);
		case4.data[1] = new Array(10.90, 7.25, 9.50, 7.55);
		case4.data[2] = new Array(10.80, 12.10, 9.20, 4.70);
		case4.data[3] = new Array(11.50, 11.20, 9.20, 16.10);
		case4.data[4] = new Array(14.50, 12.80, 10.10, 15.00);
		case4.data[5] = new Array(5.20, 4.20, 4.50, 4.10);
		case4.data[6] = new Array(12.80, 14.50, 12.20, 5.30);
		case4.data[7] = new Array(8.80, 13.50, 10.80, 14.10);
		case4.data[8] = new Array(10.90, 11.80, 13.90, 5.60);
		case4.data[9] = new Array(13.70, 6.20, 12.20, 6.62);	
		dataSets['cas4e'] = case4;
		
		var case5 = new Object();
		case5.name = 'Case 5';
		case5.data = new Array();
		case5.data[0] = new Array(9.60, 12.10, 10.10, 9.00);
		case5.data[1] = new Array(10.90, 11.90, 9.50, 12.90);
		case5.data[2] = new Array(10.80, 12.10, 9.20, 9.10);
		case5.data[3] = new Array(11.50, 11.20, 9.20, 9.70);
		case5.data[4] = new Array(8.50, 8.50, 10.10, 11.70);
		case5.data[5] = new Array(11.50, 13.90, 11.80, 12.40);
		case5.data[6] = new Array(12.80, 14.50, 12.20, 11.30);
		case5.data[7] = new Array(8.80, 6.50, 7.80, 11.30);
		case5.data[8] = new Array(10.90, 11.80, 13.90, 17.40);
		case5.data[9] = new Array(13.70, 18.20, 12.20, 10.70);	
		dataSets['case5'] = case5;
		
		var case6 = new Object();
		case6.name = 'Case 6';
		case6.data = new Array();
		case6.data[0] = new Array(16.80, 12.10, 10.10, 16.20);
		case6.data[1] = new Array(15.50, 14.00, 14.80, 11.26);
		case6.data[2] = new Array(10.80, 12.10, 10.70, 15.20);
		case6.data[3] = new Array(11.50, 11.20, 15.00, 11.30);
		case6.data[4] = new Array(6.80, 12.80, 10.10, 14.30);
		case6.data[5] = new Array(9.90, 13.00, 9.80, 10.50);
		case6.data[6] = new Array(12.80, 14.50, 12.20, 5.42);
		case6.data[7] = new Array(8.80, 6.50, 11.20, 10.30);
		case6.data[8] = new Array(13.00, 5.50, 5.00, 8.90);
		case6.data[9] = new Array(5.40, 6.20, 9.80, 8.60);	
		dataSets['case6'] = case6;
		
		var case7 = new Object();
		case7.name = 'Case 7';
		case7.data = new Array();
		case7.data[0] = new Array(5.40, 6.20, 9.80, 8.60);
		case7.data[1] = new Array(13.00, 5.50, 5.00, 8.90);
		case7.data[2] = new Array(8.80, 6.50, 11.20, 10.30);
		case7.data[3] = new Array(9.90, 13.00, 9.80, 10.50);
		case7.data[4] = new Array(6.80, 12.80, 10.10, 14.30);
		case7.data[5] = new Array(12.80, 14.50, 12.20, 5.42);
		case7.data[6] = new Array(11.50, 11.20, 15.00, 11.30);
		case7.data[7] = new Array(10.80, 12.10, 10.70, 15.20);
		case7.data[8] = new Array(15.50, 14.00, 14.80, 11.26);
		case7.data[9] = new Array(16.80, 12.10, 10.10, 16.20);
		dataSets['7case'] = case7;
		
		var case8 = new Object();
		case8.name = 'Case 8';
		case8.data = new Array();
		case8.data[0] = new Array(13.10, 13.50, 15.20, 12.20);
		case8.data[1] = new Array(13.00, 8.75, 7.80, 14.85);
		case8.data[2] = new Array(16.20, 15.90, 11.20, 13.50);
		case8.data[3] = new Array(10.20, 13.00, 13.20, 17.80);
		case8.data[4] = new Array(16.80, 12.80, 17.50, 13.30);
		case8.data[5] = new Array(9.90, 14.50, 13.20, 16.40);
		case8.data[6] = new Array(11.50, 11.20, 15.00, 11.30);
		case8.data[7] = new Array(10.80, 12.10, 10.70, 15.20);
		case8.data[8] = new Array(15.50, 14.00, 14.80, 11.26);
		case8.data[9] = new Array(16.80, 12.10, 10.10, 16.20);	
		dataSets['c8ase'] = case8;
		
		var case9 = new Object();
		case9.name = 'Case 9';
		case9.data = new Array();
		case9.data[0] = new Array(9.70, 9.00, 10.00, 8.10);
		case9.data[1] = new Array(13.00, 8.75, 7.80, 16.21);
		case9.data[2] = new Array(6.50, 6.00, 8.90, 12.88);
		case9.data[3] = new Array(10.20, 9.75, 9.80, 9.65);
		case9.data[4] = new Array(7.40, 12.80, 9.80, 7.00);
		case9.data[5] = new Array(9.90, 9.20, 7.20, 6.50);
		case9.data[6] = new Array(11.50, 12.20, 13.00, 10.58);
		case9.data[7] = new Array(10.80, 7.98, 6.78, 7.24);
		case9.data[8] = new Array(8.50, 6.50, 10.03, 10.17);
		case9.data[9] = new Array(10.20, 7.20, 6.78, 12.62);	
		dataSets['ca9se'] = case9;
		
		var case10 = new Object();
		case10.name = 'Case 10';
		case10.data = new Array();
		case10.data[0] = new Array(15.55, 10.78, 11.28, 11.39);
		case10.data[1] = new Array(13.00, 8.75, 9.57, 14.44);
		case10.data[2] = new Array(13.50, 12.89, 14.87, 11.54);
		case10.data[3] = new Array(10.20, 15.90, 9.80, 14.38);
		case10.data[4] = new Array(16.90, 12.80, 9.80, 13.30);
		case10.data[5] = new Array(9.90, 9.20, 7.20, 6.50);
		case10.data[6] = new Array(10.08, 5.20, 6.68, 6.92);
		case10.data[7] = new Array(6.25, 7.89, 10.98, 7.68);
		case10.data[8] = new Array(8.50, 6.50, 10.03, 10.17);
		case10.data[9] = new Array(10.20, 7.20, 6.78, 12.62);
		dataSets['cas10e'] = case10;
		
		var case11 = new Object();
		case11.name = 'Case 11';
		case11.data = new Array();
		case11.data[0] = new Array(14.20, 10.87, 11.28, 13.65);
		case11.data[1] = new Array(11.10, 12.20, 14.40, 12.80);
		case11.data[2] = new Array(13.50, 12.89, 12.20, 11.54);
		case11.data[3] = new Array(10.20, 9.20, 9.80, 10.80);
		case11.data[4] = new Array(16.90, 12.80, 10.80, 12.90);
		case11.data[5] = new Array(9.90, 9.20, 10.20, 9.70);
		case11.data[6] = new Array(10.08, 14.90, 10.99, 12.20);
		case11.data[7] = new Array(7.60, 10.20, 10.98, 9.55);
		case11.data[8] = new Array(9.50, 11.10, 10.03, 10.17);
		case11.data[9] = new Array(10.20, 12.20, 14.20, 12.62);
		dataSets['case11'] = case11;
		
		dataSet = dataSets[id];
		round = -1;
	}
	
	function positionFireButton() {
		$('.fire').css({
			'top': getOffSet('results').y + 220,
			'left': getOffSet('results').x
		});
	}
	
	function transitionToFiringView() {
		menuMode = false;
	
		$('.menu').fadeOut(1000);
		
		$('.boxman').animate({
			left: -500
		}, 1000);
		
		$('.back').fadeIn(1000);
		
		setTimeout(function() {
			$('.target').animate({
				right: ($('body').width() * .15)
			}, 1300);
		}, 700);
				
		$('.results').fadeIn(1000, function () {
			positionFireButton();
		});
		
		$('.forest').animate({
            left: ($('body').width() * -.5)
        }, 2000)		
	}
	
	function transitionToMenu() {
		menuMode = true;
		
		$('.arrow').remove();
	
		$('.menu').fadeIn(1000);
		
		$('.boxman').animate({
			left: 150
		}, 2000);
		
		$('.back').fadeOut(1000);
		
		$('.target').animate({
			right: ($('body').width() * -.15)
		}, 1000);
		
		$('.results').fadeOut(1000);
		$('.fire').fadeOut(1000);
		
		$('.forest').animate({
            left: 0
        }, 2000)
		
		// Clears future arrows that might be drawn.
		setTimeout(function() {
			$('.arrow').remove();
		}, 4000);
	}
	
	function updateTable() {
		$('#dataSetName').html(dataSet.name);
		$('#roundNumber').html(round + 1);
		
		$('#observation1').html('-');
		$('#observation2').html('-');
		$('#observation3').html('-');
		$('#observation4').html('-');
	}
})();