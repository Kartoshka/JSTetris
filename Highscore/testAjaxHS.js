function submitScore() {
	var score = Math.random()*10;
	$.post("submitScore.php",{score:score,name:"hi"},function(result){
		$("#demo").html(result); 
	});

};
