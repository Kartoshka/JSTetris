function miniBlock(colorS, xPos, yPos, sizeP)
{
	this.color = colorS;
	this.x = xPos;
	this.y= yPos;
	this.size = sizeP;
}

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