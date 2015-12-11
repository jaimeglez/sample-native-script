var vmModule = require("./availableUnits-view-model");
var navigation = require("../../shared/navigation");
var observableModule = require("data/observable");
var observableArrayModule = require("data/observable-array");

var pageData = new observableModule.Observable({
    unitList: new observableArrayModule.ObservableArray([
        { name: "622" },
        { name: "622 Terranova" },
        { name: "640" }
    ])
});

exports.pageLoaded = function(args) {
    var page = args.object;
    page.bindingContext = pageData;
};

exports.goToLogin = function(args){
  if(args.direction == 2) //Right to Left
    navigation.goToLoginPage();
};

exports.goToUnit = function(){
  navigation.goToUnitPage();
};

