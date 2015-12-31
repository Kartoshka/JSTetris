
//TO DO
/*
-Allow repositioning when almost locked into place
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
Game.music.volume = 0.25
Game.score =0;
Game.UI = new GameUI();


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
					//Game.insertIntoPosition(p, collidingBlockHeight -(blockY+p.blocks[i].size));
					return (collidingBlockHeight -(blockY+p.blocks[i].size));
				}
				break;
			}
		}
		//Screen height
		if(rayCast>=400)
		{
			//Game.insertIntoPosition(p,400-(blockY+p.blocks[i].size));
			return 400-(blockY+p.blocks[i].size);
		}
	}

	return null;

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

		//Questionable row for row clearing
		if(!Game.questionableRows.contains(rowInsert))
			Game.questionableRows.push(rowInsert)
	}

}

//Piece Stuff, supposed to be currentPiece


//Tetrimino

var runtime =0;

Game.clearBlocks = function()
{
	while(Game.questionableRows.length !=0)
	{
		var clearRow = true;
		var currentRow = Game.questionableRows.pop();
		for(var c=Game.fixedBlocks.length-1; c>=0;c--)
		{
			clearRow = clearRow && (Game.fixedBlocks[c][currentRow] !=null);
		}

		if(clearRow)
		{
			Game.deleteRows.push(currentRow);
		}

	}
	//we sort this array so that we start deleting top rows first
	Game.deleteRows = Game.deleteRows.sort();
	//Delete every row in the array
	for(var i=0;i<Game.deleteRows.length;i++)
	{
		//find which row to delete
		var rowDeleted = Game.deleteRows[i];
		//for every column in that row (supposed to be 10 cols per row)
		for(var c=0; c<Game.fixedBlocks.length;c++)
		{
			//we look at all the tetriminos ABOVE our row to be deleted , so we decrement our indices
			for(var r=rowDeleted;r>0;r--)
			{
				//We bring down the 
				Game.fixedBlocks[c][r] = Game.fixedBlocks[c][r-1];
			}
			//Top block becomes null
			Game.fixedBlocks[c][0] =null;
		}
	}
	Game.score += Game.deleteRows.length;
	Game.deleteRows= [];

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
Game.music.play();
//Starts update loop
Game.resetField();
Live = new Piece();
Game._intervalId = setInterval(Game.run, 1000 / Game.fps);
}

Game.run = function() {

		 Game.update();
  	if(Game.questionableRows.length !=0)
  	{
  		Game.clearBlocks();
  	}
  	runtime++;
 	Game.draw();
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
	Game.UI.draw();

}

Game.update = function(){


	var collider = collides(Live);
	if((runtime%20) ==0){
		if(collider == null )
			Live.advance();
		else
		{
			Game.insertIntoPosition(Live,collider);
			Live = new Piece();
		}
	}
	this.UI.updateScore(this.score);


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
				var collider = collides(Live)
				if(collider == null)
					Live.advance();
				break;
			}						
	}
	controlCheck =true;
}

stopScroll = function(e)
{
	e.preventDefault();
}

