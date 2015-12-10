var frameModule = require("ui/frame");

module.exports = {
	startingPage: function() {
		return "views/available_units/availableUnits";
	},
	goToAvailableUnitsPage: function() {
		frameModule.topmost().navigate("views/available_units/availableUnits");
	},
	adminPage: function() {
		// frameModule.topmost().navigate("admin-page");
	},
	goToLoginPage: function() {
		frameModule.topmost().navigate("views/login/login");
	},
	goToListPage: function() {
		// frameModule.topmost().navigate({
		// 	moduleName: "views/list/list",
		// 	clearHistory: true
		// });
	}
};
