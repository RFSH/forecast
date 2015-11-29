// ----------------------- Map ----------------------------
var map;
var coor_from = new OpenLayers.Projection("EPSG:4326");
var coor_to = new OpenLayers.Projection("EPSG:900913");

function addMap(lat, lon) {
    $("#now-map").html("");

    var center = new OpenLayers.LonLat(lon, lat);
    center.transform(coor_from, coor_to);

    map = new OpenLayers.Map("now-map", {numZoomLevels: 2});
    var mapnik = new OpenLayers.Layer.OSM();

    var layer_cloud = new OpenLayers.Layer.XYZ(
        "clouds",
        "http://${s}.tile.openweathermap.org/map/clouds/${z}/${x}/${y}.png",
        {
            isBaseLayer: false,
            opacity: 0.4,
            sphericalMercator: true
        }
    );

    var layer_precipitation = new OpenLayers.Layer.XYZ(
        "precipitation",
        "http://${s}.tile.openweathermap.org/map/precipitation/${z}/${x}/${y}.png",
        {
            isBaseLayer: false,
            opacity: 0.4,
            sphericalMercator: true
        }
    );
    map.addLayers([mapnik, layer_precipitation, layer_cloud]);
    map.setCenter(center, 9);

    $("img").error(function () {
        $(this).attr('src', 'static/images/missing.jpg');
    });
}

function changeMapCenter(lat, lon) {
    var lonlat = new OpenLayers.LonLat(lon, lat);
    lonlat.transform(coor_from, coor_to);
    map.setCenter(lonlat, 9);
}

// ----------------------- FB ----------------------------
var fbParams = {
    method: "feed",
    caption: "WEATHER INFORMATION FROM FORECAST.IO",
    name: "",
    link: "http://forecast.io",
    description: "",
    message: ""
};
var fbOk = false;
window.fbAsyncInit = function () {
    FB.init({
        appId: '950680011671276',
        xfbml: true,
        version: 'v2.5'
    });
};
(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
function addFBPost() {
    if (fbOk) {
        FB.ui(fbParams, function (response) {
            if (response != undefined && response != null && !response.error_message) {
                show_message("", 'Posted Successfully', "success");
            } else {
                show_message("", 'Not Posted', "warning");
            }
        });
    }
}

// ----------------------- Validator ----------------------------
var validator;
jQuery(function () {

    validator = $("#search-form").validate({
        submitHandler: function (form) {
            $('a[href="#tab-now"]').tab('show');
            $.ajax({
                type: "get",
                url: "forecast.php",
                data: $(form).serialize(),
                dataType: "json",
                beforeSend: function () {
                    $(".buttons button").attr("disabled", "disabled");
                    $(".content").hide();
                    $("#load-spinner").show();
                },
                success: function (data) {
                    $(".buttons button").removeAttr("disabled");
                    $("#load-spinner").hide();
                    if (data['op_status'] == 'success') {
                        tdata = data;

                        //moment.tz.setDefault(data["timezone"]);

                        $(".content").show();

                        processJSON(data);

                        addMap(parseFloat(data['latitude']), parseFloat(data['longitude']));

                    } else {
                        show_message("Error", data['message'], "error");
                    }

                }
                , error: function (err) {
                    $(".buttons button").removeAttr("disabled");
                    $("#load-spinner").hide();
                    show_message("Oops..", "There was a problem with the connection, Try Again.", "error");
                }
            });
        },
        rules: {
            address: "required",
            city: "required",
            state: "required"
        },
        messages: {
            address: "Please enter the street address",
            city: "Please enter the city",
            state: "Please select a state"
        }

    });

    jQuery("#reset").click(function () {
        resetForm();
    });

    $(".now-clouds").css('height', $(".now-current").height());

    $(".content").hide();
});

// ----------------------- Clear Button ----------------------------
function resetForm() {
    document.getElementById("city").value = "";
    document.getElementById("address").value = "";
    document.getElementById("state").value = "";
    document.getElementById("us-degree").checked = true;
    if (validator) {
        validator.resetForm();
    }
    $("#result-box").hide();
}

// ----------------------- Show Message ----------------------------
function show_message(title, content, type) {
    alert(content);
}

// Showing something instead of images
$(window).bind('load', function () {
    $('img').each(function () {
        if ((typeof this.naturalWidth != "undefined" &&
            this.naturalWidth == 0 )
            || this.readyState == 'uninitialized') {
            $(this).attr('src', 'static/images/missing.jpg');
            $(this).html("<span>Image Not Found</span>")
        }
    });
});


//$("img").error(function () {
//    $(this).attr('src', 'static/images/missing.jpg');
//}).initialize(function () {
//    if ((typeof this.naturalWidth != "undefined" &&
//        this.naturalWidth == 0 )
//        || this.readyState == 'uninitialized') {
//        $(this).attr('src', 'static/images/missing.jpg');
//    }
//});

$(function () {
    $(".olImageLoadError").initialize(function () {
        $(this).attr('src', 'static/images/missing.jpg');
    });
});

//---------------------- details table width -------------
$(window).resize(function () {
    $(".tab-day-row-collapse td .well").css('width', $("#tab-day").width());

});
