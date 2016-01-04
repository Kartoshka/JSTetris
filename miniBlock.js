function miniBlock(colorS, xPos, yPos, sizeP)
{
	this.color = colorS;
	this.x = xPos;
	this.y= yPos;
	this.size = sizeP;
}

Ls = function(blockSize){
	this.blocks =[new miniBlock("#9cffb2",0,0,blockSize),new miniBlock("#9cffb2",0,blockSize,blockSize),new miniBlock("#9cffb2",0,2*blockSize,blockSize),new miniBlock("#9cffb2",blockSize,2*blockSize,blockSize)];
	this.center = [0,blockSize];
	};

//L flipped
var Lf = function(blockSize){
	this.blocks =[new miniBlock("#ff69b4",blockSize,0,blockSize),new miniBlock("#ff69b4",blockSize,blockSize,blockSize),new miniBlock("#ff69b4",blockSize,2*blockSize,blockSize),new miniBlock("#ff69b4",0,2*blockSize,blockSize)];
	this.center =[0,blockSize];
	};
//I 
var I = function(blockSize){
	this.blocks =[new miniBlock("#ffb6c1",0,0,blockSize),new miniBlock("#ffb6c1",0,blockSize,blockSize),new miniBlock("#ffb6c1",0,2*blockSize,blockSize),new miniBlock("#ffb6c1",0,60,blockSize)];
	this.center =[0,blockSize];
	};
//T
var T = function(blockSize){
	this.blocks =[new miniBlock("#ffb6ed",0,0,blockSize),new miniBlock("#ffb6ed",blockSize,0,blockSize),new miniBlock("#ffb6ed",2*blockSize,0,blockSize),new miniBlock("#ffb6ed",blockSize,blockSize,blockSize)];
	this.center =[blockSize,0];
	};
//Block
var B= function(blockSize){
	this.blocks = [new miniBlock("#a854f0",0,0,blockSize),new miniBlock("#a854f0",blockSize,0,blockSize),new miniBlock("#a854f0",0,blockSize,blockSize),new miniBlock("#a854f0",blockSize,blockSize,blockSize)];
	this.center =[0,0];
	};
//squigly straight
var Ss= function(blockSize){
	this.blocks = [new miniBlock("#54d5f0",0,0,blockSize),new miniBlock("#54d5f0",blockSize,0,blockSize),new miniBlock("#54d5f0",blockSize,blockSize,blockSize),new miniBlock("#54d5f0",2*blockSize,blockSize,blockSize)];
	this.center = [blockSize,0];
	};
//squigly flipped
var Sf = function(blockSize){
	this.blocks =[new miniBlock("#df54f0",0,blockSize,blockSize),new miniBlock("#df54f0",blockSize,blockSize,blockSize),new miniBlock("#df54f0",blockSize,0,blockSize),new miniBlock("#df54f0",2*blockSize,0,blockSize)];
	this.center =[blockSize,blockSize];
	};