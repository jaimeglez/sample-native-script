var frameModule = require("ui/frame");

module.exports = {
	startingPage: function() {
		return "views/available_units/availableUnits";
	},
	goToAvailableUnitsPage: function() {
		frameModule.topmost().navigate("views/available_units/availableUnits");
	},
	goToUnitPage: function(unit) {
    var navigationEntry = {
      moduleName: "views/unit/unit",
      context: unit,
      animated: true
    };
		frameModule.topmost().navigate(navigationEntry);
	},
	goToLoginPage: function() {
		frameModule.topmost().navigate("views/login/login");
	},
  goToAdminPage: function(admin){
    if (admin == 'admin'){
      frameModule.topmost().navigate("views/admin/admin");
    }else{
      frameModule.topmost().navigate("views/superAdmin/superAdmin");
    }
  }
};
