var GameUI = function(){
	
	this.score =0;
	this.nextPiece =null;
	this.holdPiece= null;
	var canvas =document.getElementById("UI").getContext("2d");
	canvas.scale(0.8,0.8);

	this.updateScore = function(amount){
		this.score = amount;
	};


	this.draw = function(){

		
		canvas.font = "30px Arial";
		canvas.clearRect(0,0,800,800);
		canvas.fillText("Score","5","70");
		canvas.fillText(this.score,"25","100");

		canvas.fillText("Next","5","200");
		if(next !=null)
			this.drawPiece(next,30,230,1,1,canvas);

		canvas.fillText("Hold","5","400");

		if(hold !=null)
			this.drawPiece(hold,30,430,1,1,canvas);

	};

	this.drawPiece = function(p,x,y,xS,yS,context)
	{
		for(var b=0; b<p.blocks.length;b++)
		{
			context.fillStyle = p.blocks[b].color;
			context.fillRect(x+p.blocks[b].x,y+p.blocks[b].y,p.blocks[b].size,p.blocks[b].size);
		}

		canvas.fillStyle ="black";

	};

	this.onHold = function(p){
		this.holdPiece= p;
	};

	this.nextP = function(p){
		this.nextPiece = p;
	};
}