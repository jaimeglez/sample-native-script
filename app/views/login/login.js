// var vmModule = require("./availableUnits-view-model");
var navigation = require("../../shared/navigation");
var Authentication = require("../../shared/authentication")

exports.pageLoaded = function pageLoaded(args) {
    var page = args.object;
    // page.bindingContext = vmModule.mainViewModel;
    password = page.getViewById("password");
};
exports.goAvailableUnits = function(args){
  if(args.direction == 1) //Left to Right
    navigation.goToAvailableUnitsPage();
};

exports.authenticate = function() {
  Authentication.Login(password.text, function(response){
    if (response.success){
      // Authentication.SetCredentials(response.type);
      navigation.goToAdminPage(response.type);
    } else {
      alert(response.message);
    }
  });
}



