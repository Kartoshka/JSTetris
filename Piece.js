function Piece(fB,blockSize,active)
{
	this.shadow =!active;
	this.fixedBlocks = fB
	this.x=100;
	this.y=-20;
	this.velocity=blockSize; 
	var shape = Math.floor(Math.random()*7);
	switch(shape){
		case 0:
		shape = (new Ls(this.velocity));
		break;
		case 1:
		shape = (new Lf(this.velocity));;
		break;
		case 2:
		shape = (new I(this.velocity));
		break;
		case 3:
		shape = (new T(this.velocity));
		break;
		case 4:
		shape = (new B(this.velocity));
		break;
		case 5:
		shape = (new Ss(this.velocity));
		break;
		case 6:
		shape =(new Sf(this.velocity));
		break;
	}
	this.blocks =shape.blocks;
	this.center = shape.center;

	if(!this.shadow)
		{
			this.shadowPiece = new Piece(this.fixedBlocks, this.velocity, false);
			this.shadowPiece.blocks = shape.blocks;
			this.shadowPiece.center = shape.center;
		}
		
		this.draw = function(context){
		
			if(!this.shadow)
				this.shadowPiece.draw(context);

			for(var i= 0; i<this.blocks.length;i++)
			{
				if(!this.shadow)
					context.fillStyle = this.blocks[i].color;
				else
					context.fillStyle = "#c7c7c7";

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
				if(largestX>this.fixedBlocks.length*this.velocity) //width of window
					this.x-=(largestX-(this.fixedBlocks.length*this.velocity));

		};


		this.rotate = function (angle){
			var angle =angle*2*Math.PI/360;
			var newCoords = [];
			var canMove = true;

			if(this.center[0]==-1) //Prevent square from rotating.... desperate measures
				return;
			//We will calculate the tentative new position of every block and evaluate whether that position is available
			for(var i= 0; i<this.blocks.length && canMove;i++)
			{
				var tempX = Math.cos(angle)*(this.blocks[i].x-this.center[0]) -Math.sin(angle)*(this.blocks[i].y-this.center[1]) +this.center[0];
				var tempY =Math.sin(angle)*(this.blocks[i].x-this.center[0]) +Math.cos(angle)*(this.blocks[i].y-this.center[1]) +this.center[1];

				newCoords.push([tempX,tempY]); //new set of coordiantes

				var blockCol =(Math.round((tempX +this.x)/this.blocks[i].size));
				var blockRow =(Math.round((tempY+this.y)/this.blocks[i].size));

				//If we dont spill out from either wall we verify whether the position is available
				if(blockCol >= 0 && blockCol <(this.fixedBlocks.length))
					canMove = canMove && (this.fixedBlocks[blockCol][blockRow]==null); 
				//We dont actually prevent insertion into out of bounds
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
				if(blockCol != 0 && blockCol != (this.fixedBlocks.length-1))
					canMove = canMove 
						&& (this.fixedBlocks[blockCol-1][blockRow]==null) //Check the column to the left
					 && (this.fixedBlocks[blockCol+1][blockRow]==null);   //Check the column to the right
			}
			if(canMove)
			{
				this.x+=distance;
				this.fitScreen();
			}
			

		};

		this.advance = function(distance)
		{	

				this.y=(Math.floor(this.y/20) +1)*distance;

		};	
};

