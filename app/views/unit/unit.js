var inspect = require('util-inspect');

var buttonModule = require("ui/button");
var appModule = require("application");
var platformModule = require("platform");

var locationModule = require("location");
var isEnabled = locationModule.LocationManager.isEnabled();
var locationManager = new locationModule.LocationManager();
var locationOptions = {
    desiredAccuracy: 3,
    updateDistance: 0,
    minimumUpdateTime: 5000,
    maximumAge: 20000
};

exports.pageLoaded = function(args) {
  var page = args.object;
  page.bindingContext = page._navigationContext;
};

exports.testing = function(args){
  var page = args.object;
  alert(isEnabled.toString());
  if (!isEnabled){
    appModule.android.currentContext.startActivityForResult(new android.content.Intent(android.provider.Settings.ACTION_LOCATION_SOURCE_SETTINGS), 0); // show the config to enabled gps
  }else{
    alert('Im in');
    locationManager.startLocationMonitoring(function(location){
      console.log("Location received: " + location);
    }, function (error) {
      console.log("Location error received: " + error);
    }, locationOptions);
  }
};
