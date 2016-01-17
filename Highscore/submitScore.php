
<?php

$score = intval($_POST['score']);
$name = $_POST['name'];

$date= getDate();
$dateS = $date['year']."/".$date['mon']."/".$date['mday'];

$mysqli = new mysqli('localhost','Highscorer','ProWay88','JSTetris');

/* check connection */
if ($mysqli->connect_errno) {
    printf("Connect failed: %s\n", $mysqli->connect_error);
    exit();
}

//INSERTS NEW HIGHSCORE
$query =  "INSERT INTO Highscores (Name, Score, Date)
VALUES ('".$name."', '".$score."', '".$dateS."')";

if ($mysqli->query($query) === TRUE) {
    header("Location : Highscore/seeHighscore.php");
} else {
    echo "Error: " . $sql . "<br>" . $mysqli->error;
}


?>
