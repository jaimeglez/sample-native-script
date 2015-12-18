var inspect = require('util-inspect');
var navigation = require("../../shared/navigation");
var appModule = require("application");
var locationModule = require("location");
var ApiService = require('../../shared/api_service');
var isEnabled = locationModule.LocationManager.isEnabled();
var locationManager = new locationModule.LocationManager();
var locationOptions = {
    desiredAccuracy: 3,
    updateDistance: 0,
    minimumUpdateTime: 0,
    timeout: 10000,
    maximumAge: 0
};

function setPosition(latitude, longitude){
  ApiService.setPosition(latitude, longitude);
};

function showEnableLocation(){
  appModule.android.currentContext.startActivityForResult(new android.content.Intent(android.provider.Settings.ACTION_LOCATION_SOURCE_SETTINGS), 0); // show the config to enabled gps
};

function startNotifyAvailability(){
  if (!isEnabled){
    showEnableLocation();
  }else{
    locationManager.startLocationMonitoring(function(location){
      setPosition(location.latitude, location.longitude)
    }, function (error) {
      alert("Location error received: " + error);
    }, locationOptions);
  }
};

exports.pageLoaded = function(args) {
  var page = args.object;
  page.bindingContext = page._navigationContext;
  startNotifyAvailability();
};

exports.stopNotifyAvailability = function(){
  locationManager.stopLocationMonitoring();
  navigation.goToAvailableUnitsPage();
};

