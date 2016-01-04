
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
Game.level;
Game.speed =30;
Game.x =0;
Game.y =0;
Game.height;
Game.width;
Game.blockSize =20;
Game.questionableRows = [];
Game.deleteRows =[];
Game.music = document.getElementById("music");
Game.musicToggle =true;
Game.music.volume = 0.25
Game.score =0;
Game.UI = new GameUI();


//Game logic variables
//The indices run from 0 at the top of the matrix (ceiling) to 20, bottom of matrix (floor)
Game.fixedBlocks;
Game.resetField = function()
{
	Game.fixedBlocks =[];
	for(var col =0; col<Game.width/Game.blockSize;col++)
	{
		Game.fixedBlocks.push([]);
		for(var row =0; row<(Game.height/Game.blockSize);row++)
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
		var rayCast = blockY + p.blocks[i].size; //The ray cast in front of the block
		var ghostRow = Math.round(rayCast/20);
		if(rayCast == Game.height) //screenSize
		{
			Game.fixPieceInMatrix(p);
			return true;
		}
		else if(Game.fixedBlocks[ghostCol][ghostRow] !=null)
		{
			if(blockY <= 0) //If our block just spawned and it collided, game ends
			{
				alert("Game is over");
				Game.stop();
			}
			Game.fixPieceInMatrix(p);
			return true;
		}
	}
	return false;
};


Game.fixPieceInMatrix = function(piece)
{
	for(var i=0; i<piece.blocks.length;i++)
	{
		var blockCoords = piece.getBlockPos(i);
		//Calculate row and column in which to insert tetrimino
		var rowInsert = Math.round((blockCoords[1]/20));
		var colInsert = Math.round(blockCoords[0]/20);

		Game.fixedBlocks[colInsert][rowInsert] = new miniBlock(piece.blocks[i].color,0,0,piece.blocks[i].size);

		if(!Game.questionableRows.contains(rowInsert)) //Questionable row for row clearing
			Game.questionableRows.push(rowInsert)
	}
	

};


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

};
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
if(Game.musicToggle)
	Game.music.play();

//Gets screen dimension
Game.height = document.getElementById("myCanvas").height;
Game.width = document.getElementById("myCanvas").width;

//Starts update loop
Game.resetField();
Live = new Piece(Game.fixedBlocks, Game.blockSize);
Game._intervalId = setInterval(Game.run, 1000 / Game.fps);

};

Game.run = function() {

	if(runtime%Game.speed ==0)
	{
		Game.update();
	}

  	if(Game.questionableRows.length !=0)
  	{
  		Game.clearBlocks();
  		Game.UI.updateScore(Game.score);
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

};

Game.update = function(){

	if(!collides(Live))
	{
		Live.advance(); //TODO set by specific distance
	}
	else
	{
		Live = new Piece(Game.fixedBlocks,Game.blockSize);
	}
};

Game.stop = function(){
	Live.y =-999999999;//Hides piece
	clearInterval(Game._intervalId);
	Game.music.pause();
	Game.resetField();
	Game.music.currentTime =0;
	Game.score =0;
	Game.UI.updateScore(Game.score);
	Game.draw();
	Live=null;

};
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
				Game.update();
				break;
			}						
	}
	controlCheck =true;
};

stopScroll = function(e)
{
	e.preventDefault();	
};

//Jquery
$(document).ready(function(){
    $('a.toggler').click(function(){
        $(this).toggleClass('off');
        if(Live !=null)
        {
        if(Game.musicToggle)
        	Game.music.pause();
        else
        	Game.music.play();
   		}	
        Game.musicToggle = !Game.musicToggle;
    });
});