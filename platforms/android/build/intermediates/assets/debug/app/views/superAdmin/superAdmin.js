var inspect = require('util-inspect');
var navigation = require("../../shared/navigation");
var Unit = require("../../shared/unit")
var observableModule = require("data/observable");

var pageData = new observableModule.Observable({
  unitObj: { remote_id: '', name: '', remote_location: false }
});

function getUnit() {
  Unit.get().then(function(unit){
    // console.log(inspect(unit));
    pageData.set('unitObj', unit);
  });
};

exports.pageLoaded = function pageLoaded(args) {
  var page = args.object;
  page.bindingContext = pageData;
  remote_id = page.getViewById("remote-id");
  name = page.getViewById("unit-name");
  getUnit();
};

exports.saveUnit = function() {
  unitObj = { remote_id: remote_id.text, name: name.text, remote_location: false };
  Unit.save(unitObj, function(unit){
    getUnit();
  });
};

exports.logout = function(){
  navigation.goToAvailableUnitsPage();
};




