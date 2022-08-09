 
	
	var canvas = document.querySelector("canvas");
	var cArray = [];  var removed = [];  var passedAway = []; var turnsLeft = 5; var newBalloon = 0; var rotation = '1'; 
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	var myAudio = [];
	for(var a = 1; a<29; a++){
		myAudio[a] = new Audio('sounds/'+a+'.mp3'); 
	}


	$(window).resize(function(e) {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
       
	});

	var c = canvas.getContext("2d");


	var mouseX = 0;
	var mouseY = 0;
	var active_click = 0;
	var speed_control = 0.5;
	var speedRecord = 100;
	var reBalloon = 0;

	
	//var audio_1 = new Audio('sounds/1.mp3');  

	 window.addEventListener('click', function(e){
	 	 active_click = 1;
	 	 mouseX = e.x;
	 	 mouseY = e.y; 
         setTimeout(function() {
 			active_click = 0;
		}, 100);
	 
	 });
 	
	 function Circle(x, y, dy, radius, colors, i, img, rotation){ 
	 	this.dx = x;
	 	this.x = x;
	 	this.y = y;
	 	this.dy = dy;
	 	this.i = i;
	 	this.status = true;
	 	this.radius = radius;
	 	this.colors = colors;
	 	this.widths = 120;
	 	this.heights = 120;
	 	this.img = img;
	 	this.rotation = rotation;

	 	//speed changing 
	 	var speed_score = $(".scoreBoard").text();
		if(speed_score >= speedRecord){
			speed_control = speed_control + 0.5;
			speedRecord = speedRecord + 100;	

			if(speed_control > 2.5){
				speed_control = 2.5;
			}

			$(".gameMsg").fadeIn("");
				$(".gameMsg").html("<p style='color:#fff;'>Level  "+(speedRecord/100)+"</p>");
				$(".gameMsg").css("background", "#ff6666");
				setTimeout(function() {
	 				$(".gameMsg").fadeOut("");
				}, 2000);
			

		}
		this.dy = speed_control;

	 	//Member function generating the new balloons 
	 	this.draw = function(){
	 	
			var Image = document.getElementById("bal"+this.img);
			c.drawImage(Image, this.x, this.y, this.widths, this.heights);
		  
	 	}


	 	//Member function to be called every second and manage the new updates of the screen
	 	this.update = function(){
	 	     
	 	    
	 		if(this.x > window.innerWidth-100){
	 			this.x = getRndInteger(50, window.innerWidth-100);
	 		}
	 		this.y += this.dy;
	 		
	 		if(this.rotation == 'clockwise'){  
	 			this.x = this.x + .3;
	 			if(this.x > this.dx+20){
	 				this.rotation = 'anticlockwise'
	 			}
	 		}else if(this.rotation == 'anticlockwise'){
	 			  
	 			this.x = this.x - .3;
	 			if(this.x < this.dx-20){
	 				this.rotation = 'clockwise'
	 			}
	 		}

	 		if(this.y > window.innerHeight - 100 && this.status == true){
	 			
	 			if(passedAway.includes(this.i, 0) == false){
					//this.updateScoreBoard();
					//alert(turnsLeft);
					this.newBalloon();
					turnsLeft = turnsLeft - 1;
	 				passedAway.push(this.i);

	 				if(turnsLeft < 0){
	 					turnsLeft = 0;
	 				}

	 				if(turnsLeft < 5){
	 					$(".gameMsg").fadeIn("");
	 					$(".gameMsg").html("<p style='color:#fff;'>Only "+turnsLeft+" balloons left.</p>");
	 					$(".gameMsg").css("background", "#ff531a");
	 					setTimeout(function() {
				 			$(".gameMsg").fadeOut("");
						}, 2000);
	 				}

	 				

	 				$(".turnsBoard").text(turnsLeft);

	 			} 

	 			if(removed.includes("game_over", 0) == false && turnsLeft == 0){
 					//	alert("Game Over You Scored "+$(".scoreBoard2").text());
	 			 	$(".scoreBoard2").text($(".scoreBoard").text());
	 				removed.push("game_over");
	 				$("#myModal2").modal("show");
	 				WarningSound();
	 			} 

	 		}
            
	 		//interactivity with mouse click
	 		if(mouseY <= (this.y+80) && mouseY >= (this.y) && mouseX <= (this.x+100) && mouseX >= (this.x+10) && active_click == 1){
	 			this.radius = 0; 
	 			this.status = false;
	 			this.widths = 0;
	 			this.heights = 0;
	 			
	 			//update Score
	 			if(removed.includes(this.i, 0) == false){
                    
	 				this.updateScoreBoard();
	 				this.newBalloon();
	 				removed.push(this.i);
	 			}
 			}
 			
 		 
           
	 		this.draw(); 
	 		
	 	}
	 	
        
	 	//Member function to manipulate the score board and playing audio on balloon hits
	 	this.updateScoreBoard = function(){
	 
	 		    
	  			var score = $(".scoreBoard").text();

	 			score = +score + 10;
	 			$(".scoreBoard").html(score); 
	 			myAudio[this.img].play(); 
	 	}

	 	//Member function to count the total ballons in current screen
	 	this.newBalloon = function(){
	 			newBalloon = newBalloon - 2;
	 			reBalloon = 1;
	 	}
	 }

 	var counter = 1; //counter variable to maintain the balloon index number in order to avoid duplicate ballons indexes
 	//funciton to generate new balloons on 2 balloons hit or on 2 balloons miss
 	function fetchBalloons(){
 	 
 	 	if(newBalloon <= 0){
 	 		if(reBalloon == 0){
	 			var counterLimit = counter + 3;
	 		}else{
	 			var counterLimit = counter + 1; 
	 		}


			for(var i = counter; i < counterLimit; i++){
				var imgNo = getRndInteger(1, 28);
				var x = getRndInteger(50, window.innerWidth-100);
				var y = getRndInteger(-50, 10);
				 

				var dx = 4;
				var dy = .5;
				var radius = 30;
				var color = getRandomColor();

				var rotation = getRndInteger(0,2);
	 	 
				if(rotation == 0){
			 		rotation = 'clockwise';
			 	}else{
			 		rotation = 'anticlockwise';
			 	} 

				cArray.push(new Circle(x, y, dy, radius, color, i, imgNo, rotation));
				counter = counter + 1;
			}

			newBalloon = 2;
		}

		

		setTimeout(function() { 
 			if(turnsLeft > 0 ){ 
 				
 				fetchBalloons();   //Using Recurssion 
			}
		}, 500);
	}

	
	//Managing & clearing the animation pixels
	function animate(){
 		requestAnimationFrame(animate);
		c.clearRect(0, 0, innerWidth, innerHeight);

		for(var i = 0; i < cArray.length; i++){
			cArray[i].update();
		}
	}

	//Playing dynamic audio on balloon hits
	function popSound(audio){

		  
 		 /* var audio2 = new Audio('sounds/'+audio+'.mp3'); 
		  audio2.play();
		  */
		  
		/*  var x = document.getElementById("popMusic"); 
		  x.play();*/
	}

	//playing audio on game finish
	function WarningSound(){
		var audio2 = new Audio('sounds/jump.mp3'); 
		  audio2.play();
	}

	//Generating random hexa color code
	function getRandomColor() {
	  var letters = '0123456789ABCDEF';
	  var color = '#';
	  for (var i = 0; i < 6; i++) {
	    color += letters[Math.floor(Math.random() * 16)];
	  }
	  return color;
	}

	//Generating random numbers in dynamic range
	function getRndInteger(min, max) {
	    return Math.floor(Math.random() * (max - min) ) + min;
	}
 

 	//Initiating the animation
	animate();