var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeUp = new Image();
var pipeBottom = new Image();
var fly = new Audio();
var score_audio = new Audio();

bird.src="flappy_bird_bird.png";
bg.src="flappy_bird_bg.png";
fg.src="flappy_bird_fg.png";
pipeUp.src="flappy_bird_pipeUp.png";
pipeBottom.src="flappy_bird_pipeBottom.png";
fly.src="fly.mp3";
score_audio.src="score.mp3";

document.addEventListener("keydown", moveUp);

var score = 0;
var xPos = 10;
var yPos = 150;

function moveUp(){
	yPos -= 25;
	fly.play();
}

var pipe = [];

pipe[0]={
	x: cvs.width,
	y: 0
}

var gap = 90;

function draw() {
	ctx.drawImage(bg, 0 , 0);
	
	requestAnimationFrame(draw);
	for( var i=0; i <pipe.length; i++){
		ctx.drawImage (pipeUp, pipe[i].x, pipe[i].y);
		ctx.drawImage (pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height+gap);
		
		pipe[i].x--;
		if (pipe[i].x == 125){
			pipe.push({
				x: cvs.width,
				y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height
			});
		}
		
		if (pipe[i].x == 5){
			score++;
			score_audio.play();
		}
	}
	ctx.drawImage (fg, 0, cvs.height-fg.height);
	ctx.drawImage (bird, xPos, yPos);
	yPos += 1.5;
	ctx.fillStyle="#000";
	ctx.font="24px Verdana";
	ctx.fillText("Счет:"+score, 10, cvs.height - 20);
	
}
pipeBottom.onload = draw; 


