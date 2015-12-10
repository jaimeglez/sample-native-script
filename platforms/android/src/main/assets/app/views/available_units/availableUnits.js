var vmModule = require("./availableUnits-view-model");
var navigation = require("../../shared/navigation");

function pageLoaded(args) {
    var page = args.object;
    page.bindingContext = vmModule.mainViewModel;
};
exports.goToLogin = function(args){
  if(args.direction == 2) //Right to Left
    navigation.goToLoginPage();
};

exports.pageLoaded = pageLoaded;

