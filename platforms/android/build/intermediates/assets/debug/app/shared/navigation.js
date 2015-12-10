var frameModule = require("ui/frame");

module.exports = {
	mainPage: function() {
		return "views/available_units/availableUnits";
	},
	adminPage: function() {
		// frameModule.topmost().navigate("admin-page");
	},
	goToPasswordPage: function() {
		// frameModule.topmost().navigate("views/password/password");
	},
	goToListPage: function() {
		// frameModule.topmost().navigate({
		// 	moduleName: "views/list/list",
		// 	clearHistory: true
		// });
	}
};
