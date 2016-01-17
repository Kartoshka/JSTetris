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
    echo "<table >
  	<tr>
    <td >Name </td>
    <td >Score</td>
    <td >Date</td>
  	</tr>";
    while($row = $result->fetch_assoc()) {
        echo "<tr>";
		  echo "<td>".$row['Name']."</td>";
		  echo "<td>".$row['Score']."</td>";
		  echo "<td>".$row['Date']."</td>";
		  echo "</tr>";
		}	
	echo "</table>";
} else {
    echo "0 results";
}
?>