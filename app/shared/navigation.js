var frameModule = require("ui/frame");

module.exports = {
	startingPage: function() {
		return "views/available_units/availableUnits";
	},
	goToAvailableUnitsPage: function() {
		frameModule.topmost().navigate("views/available_units/availableUnits");
	},
	goToUnitPage: function() {
		frameModule.topmost().navigate("views/unit/unit");
	},
	goToLoginPage: function() {
		frameModule.topmost().navigate("views/login/login");
	}
};
