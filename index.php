<?php include "resources/search.php"

/*
temp-unit
speed-unit
distance-unit
pressure-unit
*/
?>


<?php if ($showHTML): ?>
    <!DOCTYPE html>
    <html>
    <head>
        <title>Weather Forecast</title>

        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <!-- Latest compiled and minified CSS -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css"
              integrity="sha512-dTfge/zgoMYpP7QbHy4gWMEGsbsdZeCXz7irItjcC3sPUFtf0kuFbDz/ixG7ArTxmDjLXDmezHubeNikyKGVyQ=="
              crossorigin="anonymous">

        <!-- Optional theme -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap-theme.min.css"
              integrity="sha384-aUGj/X2zp5rLCbBxumKTCw2Z50WgIr1vs/PFN4praOTvYXWlVyh2UtNUU0KAUhAX"
              crossorigin="anonymous">
        <link rel="stylesheet" href="static/css/pnotify.custom.min.css">

        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
        <link rel="stylesheet" href="static/css/main.css">

        <!-- jQuery -->
        <script src="https://code.jquery.com/jquery-1.11.3.min.js"></script>

        <!-- Latest compiled and minified JavaScript -->
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"
                integrity="sha512-K1qjQ+NcF2TYO/eI3M6v8EiNYZfA95pQumfvcVrTHtwQVDG+aHRqLi/ETn2uB+1JqwYqVG3LIvdm9lj6imS/pQ=="
                crossorigin="anonymous"></script>

        <!-- jQuery Form -->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.form/3.51/jquery.form.js"></script>

        <!-- jQuery Validate -->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.14.0/jquery.validate.min.js"></script>

        <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.6/moment.min.js"></script>
        <script src="static/js/moment-timezone.min.js"></script>

        <script src="static/js/pnotify.custom.min.js"></script>

<!--        <script src="http://openlayers.org/api/OpenLayers.js"></script>-->

        <script src="static/js/parser.js"></script>
        <script src="static/js/script.js"></script>

    </head>
    <body>
    <div class="container">
        <div class="top">
            <h1>Forecast Search</h1>

            <div class="search-form contianer-fluid">
                <form class="form-inline row" role="form" id="search-form">
                    <div class="form-group  col-md-3">
                        <label for="address" class="control-label">Street Address:<i class="red">*</i></label>
                        <input type="text" class="form-control" id="address" name="address"
                               placeholder="Enter street address"/>
                    </div>
                    <div class="form-group  col-md-2">
                        <label for="city" class="control-label">City:<i class="red">*</i></label>
                        <input type="text" class="form-control" id="city" name="city" placeholder="Enter the city name">
                    </div>
                    <div class="form-group  col-md-2">
                        <label for="state" class="control-label">State:<i class="red">*</i></label>
                        <select class="form-control" name="state" id="state">
                            <option value="">Select your state...</option>
                            <?php
                            foreach ($states as $abv => $complete) {
                                echo "<option value='$abv'>$complete</option>";
                            }
                            ?>
                        </select>
                    </div>
                    <div class="form-group  col-md-2">
                        <label class="control-label">Degree:<i class="red">*</i></label>

                        <div class="form-group">
                            <label class="radio-inline"><input checked type="radio" name="degree" value="us"
                                                               id="us-degree">Fahrenheit</label>
                            <label class="radio-inline"><input type="radio" name="degree" value="si" id="si-degree">Celsius</label>
                        </div>

                    </div>
                    <div class="col-md-3 other-parts">
                        <div class="buttons">
                            <button type="submit" class="btn btn-primary">
                                <i class="glyphicon glyphicon-search"></i>
                                Submit
                            </button>
                            <button type="button" class="btn btn-default" onclick="resetForm();">
                                <i class="glyphicon glyphicon-refresh"></i>
                                Clear
                            </button>
                        </div>
                        <div class="cf"></div>
                        <div class="credits">
                            <span>Powered by </span>
                            <a target="_blank" href="http://forecast.io">
                                <img height="60" width="120"
                                     src='<?php echo "$imagesPath/forecast_logo.png" ?>'/>
                            </a>
                        </div>
                        <div class="cf"></div>
                    </div>
                </form>
            </div>
        </div>
        <hr class="hr-divider cf"/>
        <div id="load-spinner">
            <div class="timer-loader">
                Loading…
            </div>
            <h4>Retrieving Data</h4>
        </div>
        <div class="content" id="result-box">
            <!-- Nav tabs -->
            <ul class="nav nav-tabs" role="tablist">
                <li role="presentation" class="active"><a href="#tab-now" aria-controls="now" role="tab"
                                                          data-toggle="tab">Right Now</a></li>
                <li role="presentation"><a href="#tab-day" aria-controls="day" role="tab"
                                           data-toggle="tab">Next 24 Hours</a></li>
                <li role="presentation"><a href="#tab-week" aria-controls="week" role="tab" data-toggle="tab">Next 7
                        days</a>
                </li>
            </ul>

            <!-- Tab panes -->
            <div class="tab-content">
                <div role="tabpanel" class="tab-pane active row" id="tab-now">
                    <?php include "resources/tab-now.php" ?>
                </div>
                <div role="tabpanel" class="tab-pane " id="tab-day">
                    <?php include "resources/tab-day.php" ?>
                </div>
                <div role="tabpanel" class="tab-pane row" id="tab-week">
                    <?php include "resources/tab-week.php" ?>
                </div>
            </div>

        </div>


    </div>


    </body>


    </html>

<?php endif; ?>