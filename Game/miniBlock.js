function miniBlock(colorS, xPos, yPos, sizeP)
{
	this.color = colorS;
	this.x = xPos;
	this.y= yPos;
	this.size = sizeP;
}

Ls = function(blockSize){
	this.color ="#9cffb2";
	this.blocks =[new miniBlock(this.color,0,0,blockSize),new miniBlock(this.color,0,blockSize,blockSize),new miniBlock(this.color,0,2*blockSize,blockSize),new miniBlock(this.color,blockSize,2*blockSize,blockSize)];
	this.center = [0,blockSize];
	};

//L flipped
var Lf = function(blockSize){
	this.color ="#ff69b4";
	this.blocks =[new miniBlock(this.color,blockSize,0,blockSize),new miniBlock(this.color,blockSize,blockSize,blockSize),new miniBlock(this.color,blockSize,2*blockSize,blockSize),new miniBlock(this.color,0,2*blockSize,blockSize)];
	this.center =[0,blockSize];
	};
//I 
var I = function(blockSize){
	this.color ="#b662aa";
	this.blocks =[new miniBlock(this.color,0,0,blockSize),new miniBlock(this.color,0,blockSize,blockSize),new miniBlock(this.color,0,2*blockSize,blockSize),new miniBlock(this.color,0,3*blockSize,blockSize)];
	this.center =[0,blockSize];
	};
//T
var T = function(blockSize){
	this.color ="#f268ad";
	this.blocks =[new miniBlock(this.color,0,0,blockSize),new miniBlock(this.color,blockSize,0,blockSize),new miniBlock(this.color,2*blockSize,0,blockSize),new miniBlock(this.color,blockSize,blockSize,blockSize)];
	this.center =[blockSize,0];
	};
//Block
var B= function(blockSize){
	this.color ="#a854f0";
	this.blocks = [new miniBlock(this.color,0,0,blockSize),new miniBlock(this.color,blockSize,0,blockSize),new miniBlock(this.color,0,blockSize,blockSize),new miniBlock(this.color,blockSize,blockSize,blockSize)];
	this.center =[-1,-1];
	};
//squigly straight
var Ss= function(blockSize){
	this.color ="#54d5f0";
	this.blocks = [new miniBlock(this.color,0,0,blockSize),new miniBlock(this.color,blockSize,0,blockSize),new miniBlock(this.color,blockSize,blockSize,blockSize),new miniBlock(this.color,2*blockSize,blockSize,blockSize)];
	this.center = [blockSize,0];
	};
//squigly flipped
var Sf = function(blockSize){
	this.color ="#df54f0";
	this.blocks =[new miniBlock(this.color,0,blockSize,blockSize),new miniBlock(this.color,blockSize,blockSize,blockSize),new miniBlock(this.color,blockSize,0,blockSize),new miniBlock(this.color,2*blockSize,0,blockSize)];
	this.center =[blockSize,blockSize];
	};