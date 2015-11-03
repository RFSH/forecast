<?php
include "vars.php";

$showHTML = true;

if (isset($_GET['city']) && isset($_GET['state']) && isset($_GET['address']) && isset($_GET['degree'])) {
    // POST: form is submitted

    // get lat and lng
    $googleURL = "https://maps.googleapis.com/maps/api/geocode/xml?address=" . urlencode(trim($_POST["address"])) . ",";
    $googleURL .= urlencode(trim($_GET["city"])) . "," . urlencode(trim($_GET["state"])) . "&key=" . $googleAPIKey;
    $xml = simplexml_load_file($googleURL) or die("Error: Cannot Convert Address");


    header('Content-Type: application/json');

    if ($xml->xpath("//status")[0] != "OK") {
        $data = array("op_status"=>"error", "message" => "The given location is invalid.");
    } else {
        $lat = $xml->xpath('//location/lat')[0];
        $lng = $xml->xpath('//location/lng')[0];

        // get weather
        $forecastURL = "https://api.forecast.io/forecast/" . $forecastAPIKey . "/" . $lat . "," . $lng;
        $forecastURL .= "?units=" . $_GET["degree"] . "&exclude=flags";

        $content = file_get_contents($forecastURL) or die("Error: Cannot connect to forecast!");
        $data = json_decode($content, true);
        $data["currentAddress"] = $xml->xpath("//formatted_address")[0];
        $data["thisCity"] = $_GET["city"];
        $data["thisAddress"] = $_GET["address"];
        $data["thisState"] = $_GET["state"];
        $data["thisUnit"] = $_GET["degree"];
        $data["op_status"] = "success";


    }
    $showHTML = false;
    echo json_encode($data);
}

?>