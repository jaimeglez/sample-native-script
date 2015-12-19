var navigation = require("../../shared/navigation");
var Unit = require("../../shared/unit")
var observableModule = require("data/observable");

var pageData = new observableModule.Observable({
  unitObj: { remote_id: '', name: '', remote_location: false },
  checked: false
});

function getUnit() {
  Unit.get().then(function(unit){
    if (unit) {
      pageData.set('unitObj', unit);
      pageData.set('checked', pageData.get('unitObj').remote_location);
    }
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
  unitObj = { remote_id: remote_id.text, name: name.text, remote_location: pageData.get('checked') };
  Unit.save(unitObj, function(unit){
    getUnit();
  });
};

exports.toggleCheckBox = function(){
  unit = pageData.get('unitObj');
  unit.remote_location = !unit.remote_location;
  pageData.set('unitObj', unit);
  pageData.set('checked', unit.remote_location);
};

exports.logout = function(){
  navigation.goToAvailableUnitsPage();
};




