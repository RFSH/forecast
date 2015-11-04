<div class="now-current col-md-6 col-xs-12">
    <div class="row detail-row">
        <div class="col-md-6 col-xs-12 image">
            <img width="250" height="220" src='<?php echo "$imagesPath/cloudy.png" ?>'/>
        </div>
        <div class="details col-md-6 col-xs-12">
            <h5>
                <span class="summary"></span>
                at
                <span class="city-name"></span>
            </h5>

            <h1>
                <span class="weather"></span>
                <span class="temp-unit"></span>
            </h1>

            <img onclick="addFBPost();" width="40" height="40" class="btn-fb"
                 src='<?php echo "$imagesPath/fb_icon.png" ?>'/>

            <div class="low-high">
                                    <span class="blue">L:
                                        <span class="low-temp"></span>
                                        <span class="temp-unit"></span>
                                    </span>
                |
                                    <span class="green">H:
                                        <span class="high-temp"></span>
                                        <span class="temp-unit"></span>
                                    </span>
            </div>
        </div>
    </div>
    <div class="row">
        <table class="table">
            <tr>
                <td>
                    Precipitation
                </td>
                <td class="now-precipitation">
                </td>
            </tr>
            <tr class="danger">
                <td>
                    Change of Rain
                </td>
                <td class="now-rainchance">
                    <span></span>%
                </td>
            </tr>
            <tr>
                <td>
                    Wind Speed
                </td>
                <td class="now-wind">
                    <span class="num"></span>
                    <span class="speed-unit">mph</span>
                </td>
            </tr>
            <tr class="danger">
                <td>
                    Dew Point
                </td>
                <td class="now-dew">
                    <span class="num"></span>
                    <span class="temp-unit">&#8457</span>
                </td>
            </tr>
            <tr>
                <td>
                    Humidity
                </td>
                <td class="now-humidity">
                    <span></span>%
                </td>
            </tr>
            <tr class="danger">
                <td>
                    Visibility
                </td>
                <td class="now-visibility">
                    <span class="num"></span>
                    <span class="distance-unit">mi</span>
                </td>
            </tr>
            <tr>
                <td>
                    Sunrise
                </td>
                <td class="now-sunrise">
                </td>
            </tr>
            <tr class="danger">
                <td>
                    Sunset
                </td>
                <td class="now-sunset">
                </td>
            </tr>
        </table>
    </div>
</div>
<div class="now-clouds col-md-6 col-xs-12" id="now-map">
    <!-- TODO add the fucking map -->
</div>