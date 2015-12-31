var GameUI = function(){
	
	this.score =0;
	this.nextPiece =null;

	this.updateScore = function(amount){
		this.score = amount;
	}


	this.draw = function(){

		var canvas =document.getElementById("UI").getContext("2d");
		canvas.font = "30px Arial";
		canvas.clearRect(0,0,800,800);
		canvas.fillText(this.score,"25","100");
	}
}