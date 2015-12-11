// var vmModule = require("./availableUnits-view-model");
var navigation = require("../../shared/navigation");

exports.pageLoaded = function pageLoaded(args) {
    var page = args.object;
    // page.bindingContext = vmModule.mainViewModel;
};
exports.goAvailableUnits = function(args){
  if(args.direction == 1) //Left to Right
    navigation.goToAvailableUnitsPage();
};
// exports.login = navigation.goToLoginPage;


