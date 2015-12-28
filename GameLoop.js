
//TO DO
/*
-the removal of row changes the number position of the next row to be deleted
-Blocks still clip/overlap on rotation (mostly rotation because it doesnt check for pieces like it does for walls)
-Look into game ending weirdly, one side of the screen was filled, other wasn't, live piece falls in the not full, game ends.
-You don't properly see the gray of the blocks when they're deleted, most likely I have to play around with when all the methods are called
-Score
-Shadow of the piece
-Next Piece
-Hold
*/

//Array function
Array.prototype.contains = function(element) {
	for(var i=0; i<this.length;i++)
	{
		if(this[i] == element)
			return true;
	}
return false;
} ;

//Game
var Live;
var Game ={};
Game.fps = 60;
Game.x =0;
Game.y =0;
Game.questionableRows = [];
Game.deleteRows =[];
Game.music = document.getElementById("music");
Game.music.volume = 0.5

//Set of tetriminos for each block

//L straight
Ls = function(){
	this.blocks =[new miniBlock("#9cffb2",0,0,20),new miniBlock("#9cffb2",0,20,20),new miniBlock("#9cffb2",0,40,20),new miniBlock("#9cffb2",20,40,20)];
	this.center = [0,20];
	};

//L flipped
var Lf = function(){
	this.blocks =[new miniBlock("#ff69b4",20,0,20),new miniBlock("#ff69b4",20,20,20),new miniBlock("#ff69b4",20,40,20),new miniBlock("#ff69b4",0,40,20)];
	this.center =[0,20];
	};
//I 
var I = function(){
	this.blocks =[new miniBlock("#ffb6c1",0,0,20),new miniBlock("#ffb6c1",0,20,20),new miniBlock("#ffb6c1",0,40,20),new miniBlock("#ffb6c1",0,60,20)];
	this.center =[0,20];
	};
//T
var T = function(){
	this.blocks =[new miniBlock("#ffb6ed",0,0,20),new miniBlock("#ffb6ed",20,0,20),new miniBlock("#ffb6ed",40,0,20),new miniBlock("#ffb6ed",20,20,20)];
	this.center =[20,0];
	};
//Block
var B= function(){
	this.blocks = [new miniBlock("#a854f0",0,0,20),new miniBlock("#a854f0",20,0,20),new miniBlock("#a854f0",0,20,20),new miniBlock("#a854f0",20,20,20)];
	this.center =[0,0];
	};
//squigly straight
var Ss= function(){
	this.blocks = [new miniBlock("#54d5f0",0,0,20),new miniBlock("#54d5f0",20,0,20),new miniBlock("#54d5f0",20,20,20),new miniBlock("#54d5f0",40,20,20)];
	this.center = [20,0];
	};
//squigly flipped
var Sf = function(){
	this.blocks =[new miniBlock("#df54f0",0,20,20),new miniBlock("#df54f0",20,20,20),new miniBlock("#df54f0",20,0,20),new miniBlock("#df54f0",40,0,20)];
	this.center =[20,20];
	};

//Game logic variables
//The indices run from 0 at the top of the matrix (ceiling) to 20, bottom of matrix (floor)
Game.fixedBlocks = [[],[],[],[],[],[],[],[],[],[]];
Game.resetField = function()
{
	for(var col =0; col<Game.fixedBlocks.length;col++)
	{
		for(var row =0; row<20;row++)
		{
			Game.fixedBlocks[col].push(null);
		}
	}
}
function collides(p)
{
	for(var i=0; i<p.blocks.length;i++)
	{
		var blockX = p.getBlockPos(i)[0]; //always product of size of the tetrimino
		var ghostCol = Math.round(blockX/20);//Column we're above

		var blockY = p.getBlockPos(i)[1];
		var rayCast = blockY + p.velocity +p.blocks[i].size; //The ray cast in front of the block
		
		for(var c = 0; c<Game.fixedBlocks[(ghostCol)].length;c++)
		{
			//As soon as we hit the top block
			if(Game.fixedBlocks[ghostCol][c] !=null)
			{
				//get that block's height
				var collidingBlockHeight = Game.fixedBlocks[ghostCol][c].size*c;
				//we check if our ray hit something, but also if it's in front of us, not behind us
				if(rayCast>collidingBlockHeight && blockY<collidingBlockHeight) 
				{
					//stops game? maybe XD
					if(collidingBlockHeight == 0)
					{
						Game.stop();
						alert("Game is over");
					}
					//Insert our piece into position
					Game.insertIntoPosition(p, collidingBlockHeight -(blockY+p.blocks[i].size));
					return true;
				}
				break;
			}
		}
		//Screen height
		if(rayCast>=400)
		{
			Game.insertIntoPosition(p,400-(blockY+p.blocks[i].size));
			return true;
		}
	}

	return false;

}

Game.insertIntoPosition =function(piece, extraDistance)
{
	for(var i=0; i<piece.blocks.length;i++)
	{
		var blockCoords = piece.getBlockPos(i);
		//Always round the indices because JS is dumb -_-
		//Calculate row and column in which to insert tetrimino
		var rowInsert = Math.round((blockCoords[1]+extraDistance)/20);
		var colInsert = Math.round(blockCoords[0]/20);		
		Game.fixedBlocks[colInsert][rowInsert] = new miniBlock(piece.blocks[i].color,0,0,20);

		//Questionable row
		if(!Game.questionableRows.contains(rowInsert))
			Game.questionableRows.push(rowInsert)
	}

}

//Piece Stuff, supposed to be currentPiece

function Piece()
{
	this.x=100;
	this.y=-40;
	this.velocity=20; 
	var shape = Math.floor(Math.random()*7);
	switch(shape){
		case 0:
		this.blocks = (new Ls).blocks;
		break;
		case 1:
		this.blocks = (new Lf).blocks;;
		break;
		case 2:
		this.blocks = (new I).blocks;;
		break;
		case 3:
		this.blocks = (new T).blocks;;
		break;
		case 4:
		this.blocks = (new B).blocks;;
		break;
		case 5:
		this.blocks = (new Ss).blocks;;
		break;
		case 6:
		this.blocks =(new Sf).blocks; ;
		break;
	}
		
		this.draw = function(context){
		
			for(var i= 0; i<this.blocks.length;i++)
			{
				context.fillStyle = this.blocks[i].color;
				context.fillRect(this.x+this.blocks[i].x,this.y+this.blocks[i].y,20,20);
				context.strokeStyle ="#000000";
				context.strokeRect(this.x+this.blocks[i].x,this.y+this.blocks[i].y,20,20);
			}
		};
		this.getBlockPos = function(blockNum)
		{
			return [this.x +this.blocks[blockNum].x,this.y +this.blocks[blockNum].y];
		};

		this.fitScreen = function()
		{
			var smallestX = 999999999999;
			var largestX =-9999999;
			for(var i=0; i<this.blocks.length;i++)
			{
				if(this.getBlockPos(i)[0]<smallestX)
					smallestX = this.getBlockPos(i)[0];
				if((this.getBlockPos(i)[0]+this.blocks[i].size)>largestX)
					largestX = (this.getBlockPos(i)[0]+this.blocks[i].size);
			}
			if(smallestX<0)
				this.x-=smallestX;
			if(largestX>200) //width of window
				this.x-=(largestX-200);
		};


		this.rotate = function (angle){
			angle =angle*2*Math.PI/360;
			for(var i= 0; i<this.blocks.length;i++)
			{
				var tempX = this.blocks[i].x;
				var tempY = this.blocks[i].y;
				this.blocks[i].x = Math.cos(angle)*tempX -Math.sin(angle)*tempY;
				this.blocks[i].y = Math.sin(angle)*tempX +Math.cos(angle)*tempY;
			}
			this.fitScreen();
		};

		this.moveSideways = function(distance)
		{
			this.x+=distance;
			this.fitScreen();
		};

		this.advance = function()
		{	
				var currentY = this.y;
				if(!collides(this)){
				this.y=(Math.floor(currentY/20) +1)*20;
				}
				else
				{
					Live = new Piece();
				}
		};	
}

//Tetrimino
function miniBlock(colorS, xPos, yPos, sizeP)
{
	this.color = colorS;
	this.x = xPos;
	this.y= yPos;
	this.size = sizeP;
}

var runtime =0;
Game.updateState = function()
{
	 Game.update();
  	 Game.draw();
}
Game.clearBlocks = function()
{
	while(Game.questionableRows.length !=0)
	{
		var clearRow = true;
		var currentRow = Game.questionableRows.pop();
		console.log("currentRow" + currentRow);
		for(var c=0; c<Game.fixedBlocks.length;c++)
		{
			clearRow = clearRow && (Game.fixedBlocks[c][currentRow] !=null);
		}

		if(clearRow)
		{
			Game.deleteRows.push(currentRow);
			for(var c=0; c<Game.fixedBlocks.length;c++)
			{
			Game.fixedBlocks[c][currentRow].color ="#838182";
			}
		}

	}
	Game.draw();


	while(Game.deleteRows.length !=0)
	{
		//find which row to delete
		var rowDeleted = Game.deleteRows.pop();
		//for every column in that row (supposed to be 10 cols per row)
		for(var c=0; c<Game.fixedBlocks.length;c++)
		{
			//we look at all the tetriminos ABOVE our row to be deleted , so we decrement our indices
			for(var r=rowDeleted;r>0;r--)
			{
				Game.fixedBlocks[c][r] = Game.fixedBlocks[c][r-1];
			}
			Game.fixedBlocks[c][0] =null;
		}
	}

	Game.draw();


}
//Game Stuff

Game.start =function()
{
//Gets drawing element
Game.canvas = document.getElementById("myCanvas").getContext("2d");
//Focuses on canvas
document.getElementById("myCanvas").focus();
//Disables scrolling
window.addEventListener('keydown',stopScroll,true);
//Sets user controls
document.getElementById("myCanvas").addEventListener('keydown', Game.userInput, true);
//Gets music and  plays
Game.music.play()
//Starts update loop
Game.resetField();
Live = new Piece();
Game._intervalId = setInterval(Game.run, 1000 / Game.fps);
}

Game.run = function() {
	if(runtime%20==0)
	 {
	 	Game.updateState();
  	}
  	if(Game.questionableRows.length !=0)
  	{
  		Game.clearBlocks();
  	}
  	runtime++;
};


Game.draw = function(){
	Game.canvas.clearRect(0,0,800,800);
	var context = Game.canvas;
	for(var i=0; i<Game.fixedBlocks.length;i++)
	{
		for(var c=0;c<Game.fixedBlocks[i].length;c++)
		{
			//Draws Grid
			context.strokeStyle = "#C1CCD0";
			context.strokeRect(i*20,c*20,20,20);
			//Draws FixedBox
			if(Game.fixedBlocks[i][c]!=null){
			context.fillStyle=Game.fixedBlocks[i][c].color;
			context.fillRect(i*Game.fixedBlocks[i][c].size,c*Game.fixedBlocks[i][c].size,Game.fixedBlocks[i][c].size,Game.fixedBlocks[i][c].size);
			context.strokeStyle = "#000000";
			context.strokeRect(i*Game.fixedBlocks[i][c].size,c*Game.fixedBlocks[i][c].size,Game.fixedBlocks[i][c].size,Game.fixedBlocks[i][c].size);
			}
		}
	}
	Live.draw(Game.canvas);

}

Game.update = function(){

	if(!collides(Live))
		Live.advance();
	else
	{
		Live = new Piece();
	}


}
Game.stop = function(){
	clearInterval(Game._intervalId);
	Game.music.pause();
	Game.music.currentTime =0;

}
var controlCheck =true;
//Need to fit into bounds the object
Game.userInput = function(e){
		if(controlCheck){
			controlCheck = false;
			switch(e.keyCode){
				case 38 : //Up
				Live.rotate(90);
				break;
				case 40: //Down
				Live.rotate(-90);
				break;
				case 39: //Right
				Live.moveSideways(20);
				break;
				case 37: //Left
				Live.moveSideways(-20);
				break;
				case 32:
				Live.advance();
				break;
			}					
		Game.draw();
		controlCheck =true;
	}
}

stopScroll = function(e)
{
	e.preventDefault();
}
