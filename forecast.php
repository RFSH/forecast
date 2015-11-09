<?php
//---------------- Vars --------------------------
$forecastAPIKey = "5da81a80cfe885b7c14af59f27ca5004";
$googleAPIKey = "AIzaSyAFIPKJi-UN8HyfnKZ6QiSkZj_VK9Ugd-I";

header('Content-Type: application/json');

if (isset($_GET['city']) && isset($_GET['state']) && isset($_GET['address']) && isset($_GET['degree'])) {
    // get lat and lng
    $googleURL = "https://maps.googleapis.com/maps/api/geocode/xml?address=" . urlencode(trim($_POST["address"])) . ",";
    $googleURL .= urlencode(trim($_GET["city"])) . "," . urlencode(trim($_GET["state"])) . "&key=" . $googleAPIKey;
    $xml = simplexml_load_file($googleURL) or die("Error: Cannot Convert Address");

    if ($xml->xpath("//status")[0] != "OK") {
        $data = array("op_status" => "error", "message" => "The given location is invalid.");
    } else {
        $lat = $xml->xpath('//location/lat')[0];
        $lng = $xml->xpath('//location/lng')[0];

        // get weather
        $forecastURL = "https://api.forecast.io/forecast/" . $forecastAPIKey . "/" . $lat . "," . $lng;
        $forecastURL .= "?units=" . $_GET["degree"] . "&exclude=flags";

        $content = file_get_contents($forecastURL) or die("Error: Cannot connect to forecast!");
        $data = json_decode($content, true);
        $data["thisCity"] = $_GET["city"];
        $data["thisAddress"] = $_GET["address"];
        $data["thisState"] = $_GET["state"];
        $data["thisUnit"] = $_GET["degree"];
        $data["op_status"] = "success";
    }

} else {
    $data = array("op_status" => "error", "message" => "Invalid Parameters, required parameters are city, state, address and degree.");
}

echo json_encode($data);