// FB
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


var fbParams = {
    'og:url': "http://forecast.io",
    'og:title': 'Here my custom title',
    'og:description': 'here custom description',
    'og:image': 'http://cs-server.usc.edu:45678/hw/hw8/images/bg.jpg'
};

function addFBPost() {
    FB.ui({
        method: 'share_open_graph',
        action_type: 'og.shares',
        action_properties: JSON.stringify({
            object: fbParams
        })
    }, function (response) {
        if (response && !response.error_message) {
            alert('Posted Successfully');
        } else {
            alert('Not Posted');
        }
    });
}


var validator;


jQuery(function () {


    validator = $("#search-form").validate({
        submitHandler: function (form) {
            $.ajax({
                type: "get",
                url: window.url,
                data: $(form).serialize(),
                dataType: "json",
                beforeSend: function () {
                    $("#result-box").hide();
                    $("#load-spinner").show();
                },
                success: function (data) {
                    $("#load-spinner").hide();
                    if (data['op_status'] == 'success') {
                        tdata = data;

                        moment.tz.setDefault(data["timezone"]);

                        //TODO add result to #result-box
                        processJSON(data);

                        //addMap(30, 30);


                        $("#result-box").show();
                    } else {
                        show_message("Error", data['message'], "error");
                    }

                }
                , error: function (err) {
                    $("#load-spinner").hide();
                    show_message("Error", "there is an error", "error");
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

});


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

function addMap(lon, lat) {
    //Center of map
    var lonlat = new OpenLayers.LonLat(lon, lat);

    var map = new OpenLayers.Map("now-map");
    // Create OSM overlays
    var mapnik = new OpenLayers.Layer.OSM();

    var layer_cloud = new OpenLayers.Layer.XYZ(
        "clouds",
        "http://${s}.tile.openweathermap.org/map/clouds/${z}/${x}/${y}.png",
        {
            isBaseLayer: false,
            opacity: 0.7,
            sphericalMercator: true
        }
    );

    var layer_precipitation = new OpenLayers.Layer.XYZ(
        "precipitation",
        "http://${s}.tile.openweathermap.org/map/precipitation/${z}/${x}/${y}.png",
        {
            isBaseLayer: false,
            opacity: 0.7,
            sphericalMercator: true
        }
    );


    map.addLayers([mapnik, layer_precipitation, layer_cloud]);
    map.setCenter(lonlat, 3);

}

PNotify.prototype.options.styling = "bootstrap3";

function show_message(title, content, type) {
    $(function () {
        new PNotify({
            title: title,
            text: content
        });
    });
}

/*
 Source: http://stackoverflow.com/a/18120786/1662057
 */
Element.prototype.remove = function () {
    this.parentElement.removeChild(this);
};
NodeList.prototype.remove = HTMLCollection.prototype.remove = function () {
    for (var i = this.length - 1; i >= 0; i--) {
        if (this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
};

