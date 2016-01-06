<?php

$mysqli = new mysqli('localhost','Highscorer','ProWay88','JSTetris');


/* check connection */
if ($mysqli->connect_errno) {
    printf("Connect failed: %s\n", $mysqli->connect_error);
    exit();
}


//DISPLAYS HIGHSCORES
$query = "SELECT * FROM Highscores";
$result = $mysqli->query($query);


/* numeric array */
if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
        echo "Name: " . $row["Name"]. " - score: " . $row["Score"]. "Date: " . $row["Date"]. "<br>";
    }
} else {
    echo "0 results";
}
?>