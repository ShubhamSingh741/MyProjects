<?php
$servername = "localhost";//In my case the server name is "localhost"
$username = "root";//In my case username is "root"
$password = "root";//In my case password is "root"
$dbname = "location";//In my case database name is "location"

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
//Inserting city,state,country,pincode,latitude and longitude in table "address"
$sql = "INSERT INTO address (city, state, country, pincode,latitude,longitude)
VALUES ('$_GET[city]', '$_GET[state]', '$_GET[country]','$_GET[pincode]','$_GET[latitude]','$_GET[longitude]')";

if ($conn->query($sql) === TRUE) {
    echo "Your location is saved in database";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>