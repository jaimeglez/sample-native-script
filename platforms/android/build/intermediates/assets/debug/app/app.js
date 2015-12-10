var application = require("application");
// application.mainModule = "main-page";
application.cssFile = "./app.css";
var navigation = require("./shared/navigation");
application.mainModule = navigation.mainPage();
application.start();
