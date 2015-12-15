var inspect = require('util-inspect');
var navigation = require("../../shared/navigation");
// var Authentication = require("../../shared/authentication")

exports.pageLoaded = function pageLoaded(args) {
    var page = args.object;
    console.log('im in superadmin bitches')
    // page.bindingContext = vmModule.mainViewModel;
};

exports.logout = function(){
  navigation.goToAvailableUnitsPage();
};



