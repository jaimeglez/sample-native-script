var application = require("application");
// application.mainModule = "main-page";
application.cssFile = "./app.css";
var navigation = require("./shared/navigation");
applicationModule.mainModule = navigation.startingPage();
application.start();
