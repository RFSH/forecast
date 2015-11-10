var imagesSRC = "static/images/";

function processJSON(data) {

    // now tab
    putNowTabValues(data);

    // day tab
    var dayTab = "";
    for (var i = 1; i < 25; i++) {
        try {
            dayTab += createHourRow(data['hourly']['data'][i], i, data['thisCity']);
        } catch (e) {
        }

    }
    if (dayTab == "") {
        dayTab += "<tr><td colspan='5'>" +
            "<div class='alert alert-warning'>" +
            "There is no daily data for this location." +
            "</div>" +
            "</td></tr>";
    }
    $(".table.days-table tbody").html(dayTab);


    // week tab
    var weekTab = "";
    for (var j = 1; j < 8; j++) {
        try {
            weekTab += createDayCard(data['daily']['data'][j], j, data['thisCity']);
        } catch (e) {
        }
    }
    if (weekTab == "") {
        weekTab += "<div class='alert alert-warning'>" +
            "There is no week data for this location." +
            "</div>";
    }
    $(".day-cards").html(weekTab);

    correctUnits(data['thisUnit']);

}

function getIcon(name) {
    switch (name) {
        case "clear-day":
            return "clear.png";
        case "clear-night":
            return "clear_night.png";
        case "rain":
            return "rain.png";
        case "snow":
            return "snow.png";
        case "sleet":
            return "sleet.png";
        case "wind":
            return "wind.png";
        case "fog":
            return "fog.png";
        case "cloudy":
            return "cloudy.png";
        case "partly-cloudy-day":
            return "cloud_day.png";
        case "partly-cloudy-night":
            return "cloud_night.png";
        default:
            return "clear.png";
    }
}

function correctUnits(unit) {
    if (unit == "us") {
        $(".temp-unit").html("&#8457");
        $(".speed-unit").html("mph");
        $(".distance-unit").html("mi");
        $(".pressure-unit").html("mb");
    } else {
        $(".temp-unit").html("&#8451");
        $(".speed-unit").html("m/s");
        $(".distance-unit").html("km");
        $(".pressure-unit").html("hPa");
    }
}

function findPrecipitation(pre, unit) {
    if (unit == "si") {
        pre *= 0.0393701;
    }
    if (pre < 0.002) {
        return "None";
    } else if (pre < 0.017) {
        return "Very Light";
    } else if (pre < 0.1) {
        return "Light";
    } else if (pre < 0.4) {
        return "Moderate";
    } else {
        return "Heavy";
    }

}

function putNowTabValues(data) {
    $(".now-current .image img").attr('src', imagesSRC + getIcon(data['currently']['icon']))
        .attr('alt', data['currently']['summary'])
        .attr('title', data['currently']['summary']);
    $(".now-current .summary").html(data['currently']['summary']);
    $(".now-current .city-name").html(data['thisCity'] + ", " + data['thisState']);
    $(".now-current h1 .weather").html(parseInt(data['currently']['temperature']));
    $(".now-current .low-temp").html(parseInt(data['daily']['data'][0]['temperatureMin']));
    $(".now-current .high-temp").html(parseInt(data['daily']['data'][0]['temperatureMax']));

    // fb params:
    fbOk = true;
    fbParams['name'] = "Current Weather in " + data['thisCity'] + ", " + data['thisState'];
    fbParams["description"] = data['currently']['summary'] + ", " + parseInt(data['currently']['temperature']) + "\xB0" + (data['thisUnit'] == "us" ? "F" : "C");
    fbParams['picture'] = "http://cs-server.usc.edu:45678/hw/hw8/images/" + getIcon(data['currently']["icon"]);

    $(".now-current .now-precipitation").html(findPrecipitation(parseFloat(data['currently']['precipIntensity']), data['thisUnit']));
    $(".now-current .now-rainchance span").html(parseInt(data["currently"]["precipProbability"]) * 100);
    $(".now-current .now-wind .num").html(parseInt(data["currently"]["windSpeed"]));
    $(".now-current .now-dew .num").html(parseInt(data["currently"]["dewPoint"]));
    $(".now-current .now-visibility .num").html(parseInt(data["currently"]["visibility"]));
    $(".now-current .now-humidity span").html(parseInt(data["currently"]["humidity"]));
    $(".now-current .now-sunrise").html(moment(new Date(data['daily']['data'][0]['sunriseTime'] * 1000)).format("hh:mm A"));
    $(".now-current .now-sunset").html(moment(new Date(data['daily']['data'][0]['sunsetTime'] * 1000)).format("hh:mm A"));


}

function createHourRow(data, index) {
    var row = "<tr>";
    row += "<td>" + (data['time'] != undefined ? moment(new Date(data['time'] * 1000)).format("hh:mm A") : "N/A") + "</td>";
    if (data['icon']) {
        row += "<td><img width='40' height='40' src='" + imagesSRC + getIcon(data['icon']) + "'";
        row += " alt='" + (data['summary'] ? data['summary'] : "") + "'";
        row += " title='" + (data['summary'] ? data['summary'] : "") + "'";
        row += "/></td>";
    } else {
        row += "<td>N/A</td>";
    }
    row += "<td>" + (data['cloudCover'] != undefined ? parseInt(parseFloat(data['cloudCover']) * 100) : "N/A") + "%</td>";
    row += "<td>" + (data['temperature'] != undefined ? parseFloat(data['temperature']).toFixed(2) : "N/A") + "</td>";
    row += '<td><a role="button" data-toggle="collapse" href="#tab-day-details-' + index + '">';
    row += '<i class="glyphicon glyphicon-plus"></i></td></tr>';

    row += '<tr class="tab-day-row-collapse"><td colspan="5">';
    row += '<div id="tab-day-details-' + index + '" class="collapse well"><div class="table-responsive">';
    row += '<table class="table details-table"><thead><tr><th>Wind</th><th>Humidity</th>';
    row += '<th>Visibility</th><th>Pressure</th></tr></thead><tbody><tr>';
    row += '<td>' + (data['windSpeed'] != undefined ? data['windSpeed'] : "N/A") + "<span class='speed-unit'></span></td>";
    row += '<td>' + (data['humidity'] != undefined ? parseInt(parseFloat(data['humidity']) * 100) : "N/A") + "%</td>";
    row += '<td>' + (data['visibility'] != undefined ? data['visibility'] : "N/A") + "<span class='distance-unit'></span></td>";
    row += '<td>' + (data['pressure'] != undefined ? data['pressure'] : "N/A") + "<span class='pressure-unit'></span></td>";
    row += "</tr></tbody></table></div></div></td></tr>";

    return row;
}

function createDayCard(data, index, city) {

    var date = (data['time'] ? moment(new Date(data['time'] * 1000)).format("MMM D") : "N/A");
    var day = (data['time'] ? moment(new Date(data['time'] * 1000)).format("dddd") : "N/A");

    var card = '<div class="col-lg-1 col-md-1 col-xs-11 col-sm-11 day-card day-card-' + index + '" data-toggle="modal" ';
    card += 'data-target="#show-details-modal-' + index + '" >';
    card += "<h4 class='day'>" + day + "</h4>";
    card += "<h4 class='date'>" + date + "</h4>";
    if (data['icon']) {
        card += "<img width='70' height='70' src='" + imagesSRC + getIcon(data['icon']) + "'";
        card += " alt='" + (data['summary'] ? data['summary'] : "") + "'";
        card += " title='" + (data['summary'] ? data['summary'] : "") + "'";
        card += "/>";
    } else {
    }
    card += '<h5>Min</h5><h5>Temp</h5>';
    card += '<h2>' + (data['temperatureMin'] != undefined ? parseInt(data['temperatureMin']) : "N/A") + '&deg;</h2>';
    card += '<h5>Max</h5><h5>Temp</h5>';
    card += '<h2>' + (data['temperatureMax'] != undefined ? parseInt(data['temperatureMax']) : "N/A") + '&deg;</h2>';
    card += "</div>";

    card += "<div id='show-details-modal-" + index + "' class='modal fade' role='dialog'>";
    card += '<div class="modal-dialog"><div class="modal-content"><div class="modal-header">';
    card += '<button type="button" class="close" data-dismiss="modal">&times;</button>';
    card += '<h4 class="modal-title">Weather in ' + city + ' on ' + date + '</h4>';
    card += '</div><div class="modal-body">';
    if (data['icon']) {
        card += "<img width='250' height='220' src='" + imagesSRC + getIcon(data['icon']) + "'";
        card += " alt='" + imagesSRC + getIcon(data['icon']) + "'";
        card += " title='" + imagesSRC + getIcon(data['icon']) + "'";
        card += "/>";
    }
    card += '<div><h3>' + day + ': <span class="orange">' + (data['summary'] ? data['summary'] : "N/A") + '</span></h3></div>';
    card += '<div class="row"><div class="col-md-4 col-xs-12 col-sm-12">';
    card += '<h4>Sunrise Time</h4>';
    card += '<div>' + (data['sunriseTime'] != undefined ? moment(new Date(data['sunriseTime'] * 1000)).format("hh:mm A") : "N/A") + '</div>';
    card += '<h4>Wind Speed</h4>';
    card += '<div>' + (data['windSpeed'] != undefined ? data['windSpeed'] : "N/A") + '<span class="speed-unit"></span></div></div>';
    card += '<div class="col-md-4 col-xs-12 col-sm-12"><h4>Sunset Time</h4>';
    card += '<div>' + (data['sunsetTime'] != undefined ? moment(new Date(data['sunsetTime'] * 1000)).format("hh:mm A") : "N/A") + '</div>';
    card += '<h4>Visibility</h4>';
    card += '<div>' + (data['visibility'] != undefined ? data['visibility'] + "<span class='distance-unit'></span>" : "N/A") + "</div></div>";
    card += '<div class="col-md-4 col-xs-12 col-sm-12"><h4>Humidity</h4>';
    card += '<div>' + (data['humidity'] != undefined ? parseInt(parseFloat(data['humidity']) * 100) : "N/A") + '%</div>';
    card += '<h4>Pressure</h4>';
    card += '<div>' + (data['pressure'] != undefined ? data['pressure'] + '<span class="pressure-unit"></span>' : "N/A") + '</div></div></div></div>';
    card += '<div class="modal-footer">';
    card += '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>';
    card += '</div></div></div></div>';

    return card;
}