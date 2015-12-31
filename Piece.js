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
			//returns [x,y] in absolute position
			return [this.x +this.blocks[blockNum].x,this.y +this.blocks[blockNum].y];
		};

		this.fitScreen = function()
		{
			if(!(this.x>=0 && this.x<(4*this.blocks[0].size)))
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
			}
		};


		this.rotate = function (angle){
			angle =angle*2*Math.PI/360;
			var newCoords = [];
			var canMove = true;
			//We will calculate the tentative new position of every block and evaluate whether that position is available
			for(var i= 0; i<this.blocks.length;i++)
			{
				
				var tempX =Math.cos(angle)*this.blocks[i].x -Math.sin(angle)*this.blocks[i].y;
				var tempY =Math.sin(angle)*this.blocks[i].x +Math.cos(angle)*this.blocks[i].y;
				newCoords.push([tempX,tempY]); //new set of coordiantes

				var blockCol =(Math.round((tempX +this.x)/this.blocks[i].size));
				var blockRow =(Math.round((tempY+this.y)/this.blocks[i].size));
				if(blockCol >= 0 && blockCol <(Game.fixedBlocks.length))
					canMove = canMove && (Game.fixedBlocks[blockCol][blockRow]==null);   

			}

			if(canMove)
			{
				for(var b=0; b<newCoords.length;b++)
				{
					this.blocks[b].x = newCoords[b][0];
					this.blocks[b].y= newCoords[b][1];
				}
				this.fitScreen();
			}
		};

		this.moveSideways = function(distance)
		{
			var canMove = true;	
			for(var i = 0; i<this.blocks.length;i++)
			{
				//Row of the block we're looking at
				var blockRow =(Math.round(this.getBlockPos(i)[1]/this.blocks[i].size));
				//Column of the row we're looking at 
				var blockCol =(Math.round(this.getBlockPos(i)[0]/this.blocks[i].size));
				//If our block is on the edges of the screen, we do not need to check for collisions with block, 
				//because there are none on the outside and our fitScreen method will take care of that
				if(blockCol != 0 && blockCol != (Game.fixedBlocks.length-1))
					canMove = canMove 
						&& (Game.fixedBlocks[blockCol-1][blockRow]==null) //Check the column to the left
					 && (Game.fixedBlocks[blockCol+1][blockRow]==null);   //Check the column to the right
			}
			if(canMove)
			{
				this.x+=distance;
				this.fitScreen();
			}
			

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
